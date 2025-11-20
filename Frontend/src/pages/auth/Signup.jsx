// src/pages/auth/Signup.jsx
import React, { useState } from "react";
import SocialAuthButtons from "./SocialAuthButtons";
import { motion } from "framer-motion";

export default function Signup() {
  const [role, setRole] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center px-4 
      bg-gradient-to-br from-blue-700 via-blue-900 to-black relative">

      {/* Glow effect */}
      <motion.div
        className="absolute w-[600px] h-[600px] bg-blue-500/40 blur-[150px] rounded-full"
        animate={{ x: [0, 60, 0], y: [0, -60, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="relative w-full max-w-xl bg-white/10 backdrop-blur-xl 
        border border-white/20 p-10 rounded-3xl shadow-2xl z-10">

        <h1 className="text-4xl font-bold text-white text-center mb-6">
          Create Your Account
        </h1>

        <p className="text-blue-200 text-center mb-4">
          Choose your role to continue
        </p>

        {/* Role Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {["participant", "evaluator", "organizer"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`
                py-3 rounded-xl text-lg capitalize transition-all 
                ${role === r
                  ? "bg-blue-600 text-white"
                  : "bg-white/10 text-blue-200 hover:bg-white/20"}
              `}
            >
              {r}
            </button>
          ))}
        </div>

        {role !== "" && (
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-4 bg-white/10 border border-white/20 text-white rounded-xl focus:outline-none"
              required
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-4 bg-white/10 border border-white/20 text-white rounded-xl focus:outline-none"
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-4 bg-white/10 border border-white/20 text-white rounded-xl focus:outline-none"
              required
            />

            {role === "participant" && (
              <>
                <input
                  type="text"
                  placeholder="College / University"
                  className="w-full p-4 bg-white/10 border border-white/20 text-white rounded-xl"
                />
                <input
                  type="text"
                  placeholder="Department / Branch"
                  className="w-full p-4 bg-white/10 border border-white/20 text-white rounded-xl"
                />
                <input
                  type="text"
                  placeholder="Year (e.g., 2nd Year)"
                  className="w-full p-4 bg-white/10 border border-white/20 text-white rounded-xl"
                />
              </>
            )}

            {role === "evaluator" && (
              <>
                <input
                  type="text"
                  placeholder="Professional Role (e.g., Professor, Developer)"
                  className="w-full p-4 bg-white/10 border border-white/20 text-white rounded-xl"
                />
                <input
                  type="text"
                  placeholder="Expertise Domain"
                  className="w-full p-4 bg-white/10 border border-white/20 text-white rounded-xl"
                />
              </>
            )}

            {role === "organizer" && (
              <>
                <input
                  type="text"
                  placeholder="Organization / University"
                  className="w-full p-4 bg-white/10 border border-white/20 text-white rounded-xl"
                />
                <input
                  type="text"
                  placeholder="Position (e.g., Event Manager)"
                  className="w-full p-4 bg-white/10 border border-white/20 text-white rounded-xl"
                />
              </>
            )}

            <button className="w-full py-4 bg-blue-600 text-white rounded-xl text-lg hover:bg-blue-700 transition">
              Create Account
            </button>
          </form>
        )}

        {/* Social buttons */}
        <SocialAuthButtons />

        <p className="text-center text-blue-200 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-white underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
