import "./SuccessPage.css";
import { useState, useEffect } from "react";
import React from "react";
import NavBar from "../NavBar/NavBar";


export default function SuccessPage() {
  useEffect(() => {
    if (localStorage.getItem("cart")) {
      localStorage.removeItem("cart");
    }
    fetch("/api/cart", { method: "GET" }).catch(() => {});
  }, []);  

  return (
    <main className="SuccessPage">
      <NavBar />
        <h1>✅ Payment was Successful! </h1>
        <p>Thanks for your order. We’re getting it ready.</p>
    </main>
  )
}