import "./SuccessPage.css";
import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";


export default function SuccessPage() {



  return (
    <main className="SuccessPage">
        <h1>✅ Payment was Successful! </h1>
        <p>Thanks for your order. We’re getting it ready.</p>
        <Link className='MenuSelector' to="/menu">Menu</Link>
    </main>
  )
}