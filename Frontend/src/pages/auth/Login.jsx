// src/pages/auth/Login.jsx
import React from "react";
import { motion } from "framer-motion";
import SocialAuthButtons from "./SocialAuthButtons";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 
      bg-gradient-to-br from-blue-700 via-blue-900 to-black relative">

      {/* Glow */}
      <motion.div
        className="absolute w-[600px] h-[600px] bg-purple-500/40 blur-[150px] rounded-full"
        animate={{ x: [-40, 40, -40], y: [0, -40, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="relative w-full max-w-xl bg-white/10 backdrop-blur-xl 
        border border-white/20 p-10 rounded-3xl shadow-2xl z-10">

        <h1 className="text-4xl font-bold text-white text-center mb-6">
          Welcome Back
        </h1>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-4 bg-white/10 border border-white/20 text-white rounded-xl"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 bg-white/10 border border-white/20 text-white rounded-xl"
          />

          <button className="w-full py-4 bg-blue-600 text-white rounded-xl text-xl hover:bg-blue-700 transition">
            Login
          </button>
        </form>

        <SocialAuthButtons />

        <p className="text-center text-blue-200 mt-6">
          Don't have an account?{" "}
          <a href="/signup" className="text-white underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
