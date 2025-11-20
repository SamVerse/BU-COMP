// src/pages/auth/SocialAuthButtons.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";

export default function SocialAuthButtons() {
  return (
    <div className="space-y-4 mt-8">

      {/* Google Button */}
      <button
        className="
          w-full py-3 flex items-center justify-center gap-3
          bg-white/20 backdrop-blur-xl border border-white/30 
          rounded-xl text-white text-lg

          transition-all duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]
          hover:scale-[1.04] hover:bg-white/30 
          hover:shadow-[0_0_16px_rgba(80,150,255,0.45)]
        "
      >
        <FontAwesomeIcon icon={faGoogle} className="text-xl" />
        Continue with Google
      </button>

      {/* GitHub Button */}
      <button
        className="
          w-full py-3 flex items-center justify-center gap-3
          bg-white/20 backdrop-blur-xl border border-white/30 
          rounded-xl text-white text-lg
          
          transition-all duration-150 ease-[cubic-bezier(0.22,1,0.36,1)]
          hover:scale-[1.04] hover:bg-white/30 
          hover:shadow-[0_0_16px_rgba(80,150,255,0.45)]
        "
      >
        <FontAwesomeIcon icon={faGithub} className="text-xl" />
        Continue with GitHub
      </button>
    </div>
  );
}
