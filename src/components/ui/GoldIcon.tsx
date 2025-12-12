"use client";

import { LucideIcon } from "lucide-react";

interface GoldIconProps {
  icon: LucideIcon;
  className?: string;
}

export const GoldIcon = ({ icon: Icon, className = "" }: GoldIconProps) => {
  return (
    <div 
      className={`
        relative flex items-center justify-center
        h-14 w-14 rounded-xl shrink-0
        bg-gradient-to-br from-amber-50 to-amber-100/50 
        border border-amber-200 
        shadow-[0_4px_20px_-4px_rgba(251,191,36,0.3)]
        group-hover:scale-110 group-hover:shadow-amber-500/20
        transition-all duration-500 ease-out
        ${className}
      `}
    >
      {/* Inner Glow Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/80 to-transparent opacity-50" />
      
      {/* The Icon */}
      <Icon 
        className="relative z-10 h-7 w-7 text-amber-600 drop-shadow-sm" 
        strokeWidth={1.5}
      />
    </div>
  );
};
