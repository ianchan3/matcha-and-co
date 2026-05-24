import 'dotenv/config';

import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR);

import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';

import exporterPkg from '@opentelemetry/exporter-metrics-otlp-http';
const { OTLPMetricExporter } = exporterPkg;

import metricsPkg from '@opentelemetry/sdk-metrics';
const { PeriodicExportingMetricReader } = metricsPkg;

// Extract "Basic BASE64STRING" from "Authorization=Basic BASE64STRING"
const authHeader = (process.env.OTEL_EXPORTER_OTLP_HEADERS || '').replace('Authorization=', '');
console.log('Auth header prefix:', authHeader.substring(0, 15));
console.log('Endpoint:', process.env.OTEL_EXPORTER_OTLP_ENDPOINT);

const sdk = new NodeSDK({
  // PeriodicExportingMetricReader gathers all data every 30s and hands it to OTLPMetricExporter
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({
      url: `${process.env.OTEL_EXPORTER_OTLP_ENDPOINT}/v1/metrics`,
      headers: {
        Authorization: authHeader,
      },
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
