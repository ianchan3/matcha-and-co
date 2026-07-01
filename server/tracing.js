import 'dotenv/config';

import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR);

import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';

import exporterPkg from '@opentelemetry/exporter-metrics-otlp-http';
const { OTLPMetricExporter } = exporterPkg;

import metricsPkg from '@opentelemetry/sdk-metrics';
const { PeriodicExportingMetricReader } = metricsPkg;

import tracePkg from '@opentelemetry/exporter-trace-otlp-http';
const { OTLPTraceExporter } = tracePkg;

import logExporterPkg from '@opentelemetry/exporter-logs-otlp-http';
const { OTLPLogExporter } = logExporterPkg;

import logSdkPkg from '@opentelemetry/sdk-logs';
const { SimpleLogRecordProcessor } = logSdkPkg.default ?? logSdkPkg;

// Extract "Basic BASE64STRING" from "Authorization=Basic BASE64STRING"
const authHeader = (process.env.OTEL_EXPORTER_OTLP_HEADERS || '').replace('Authorization=', '');

const headers = { Authorization: authHeader };

const sdk = new NodeSDK({
  logRecordProcessor: new SimpleLogRecordProcessor(
    new OTLPLogExporter({
      url: `${process.env.OTEL_EXPORTER_OTLP_ENDPOINT}/v1/logs`,
      headers,
    })
  ),
  traceExporter: new OTLPTraceExporter({
    url: `${process.env.OTEL_EXPORTER_OTLP_ENDPOINT}/v1/traces`,
    headers,
  }),
  // PeriodicExportingMetricReader gathers all data every 30s and hands it to OTLPMetricExporter
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({
      url: `${process.env.OTEL_EXPORTER_OTLP_ENDPOINT}/v1/metrics`,
      headers,
    }),
    exportIntervalMillis: 30_000,
  }),
  // getNodeAutoInstrumentations sets up sensors on Express and MongoDB automatically
  instrumentations: [
    getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-fs': { enabled: false },
    }),
  ],
});

sdk.start();
process.on('SIGTERM', () => sdk.shutdown());
