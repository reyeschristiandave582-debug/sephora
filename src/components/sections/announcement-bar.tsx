"use client";

import React, { useEffect, useState } from "react";
import { Lock, Sparkles, Check, ShieldCheck, Clock } from "lucide-react";

interface NotificationItem {
  name: string;
  action: string;
}

const firstNames = [
  "Emma", "Olivia", "Ava", "Isabella", "Sophia", "Charlotte", "Mia", "Amelia", "Harper", "Evelyn",
  "Abigail", "Emily", "Ella", "Elizabeth", "Camila", "Sienna", "Scarlett", "Victoria", "Madison", "Luna",
  "Grace", "Chloe", "Penelope", "Layla", "Riley", "Zoey", "Nora", "Lily", "Eleanor", "Hannah",
  "Lillian", "Addison", "Aubrey", "Stella", "Natalie", "Zoe", "Lainey", "Audrey", "Savannah", "Claire",
  "Skylar", "Paisley", "Everly", "Anna", "Caroline", "Nova", "Genesis", "Aaliyah", "Kennedy", "Maya"
];

const lastInitials = ["A.", "C.", "E.", "G.", "H.", "K.", "N.", "O.", "R.", "S.", "T.", "U.", "W.", "Y.", "Z."];

const actions = [
  "just claimed a $750 Sephora card!",
  "just claimed a $750 Sephora voucher!",
  "just unlocked reward eligibility!",
  "just completed the review survey!",
  "just verified eligibility!"
];

const notifications: NotificationItem[] = Array.from({ length: 100 }, (_, i) => ({
  name: `${firstNames[(i * 7) % firstNames.length]} ${lastInitials[(i * 5) % lastInitials.length]}`,
  action: actions[i % actions.length]
}));

export default function AnnouncementBar() {
  const [currentNotif, setCurrentNotif] = useState<NotificationItem | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // 5-minute persistent countdown timer (300 seconds)
  const [timeLeft, setTimeLeft] = useState<number>(300);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const showRandomNotif = () => {
      const randomIndex = Math.floor(Math.random() * notifications.length);
      setCurrentNotif(notifications[randomIndex]);
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
      }, 3500);
    };

    const initialTimer = setTimeout(() => {
      showRandomNotif();
    }, 1500);

    const interval = setInterval(() => {
      showRandomNotif();
    }, 7000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/* Top Banner Bar - Custom Dark Background with iOS Safe Area Padding & Security Badges */}
      <div 
        className="sticky top-0 z-50 w-full bg-[#000001] border-b border-white/10 pb-2 px-3 sm:px-4 shadow-sm backdrop-blur-md"
        style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 12px)" }}
      >
        {/* Background Sparkles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
          <Sparkles 
            className="absolute left-[2%] sm:left-[6%] top-1/2 -translate-y-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 text-white animate-pulse" 
            strokeWidth={1.5}
          />
          <Sparkles 
            className="absolute right-[2%] sm:right-[6%] top-1/2 -translate-y-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 text-white animate-pulse" 
            strokeWidth={1.5}
          />
        </div>

        {/* Content Stack */}
        <div className="relative z-10 flex flex-col items-center justify-center max-w-xl mx-auto space-y-1">
          {/* Headline with Live Timer */}
          <div className="flex items-center justify-center gap-1.5 w-full text-center">
            <Lock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white shrink-0 -mt-0.5" strokeWidth={2.5} />
            <p className="text-white text-[9.5px] xs:text-[10.5px] sm:text-[11.5px] font-bold tracking-tight leading-none flex items-center gap-1.5 flex-wrap justify-center">
              <span>Your spot is reserved for:</span>
              <span className="inline-flex items-center gap-1 bg-[#18181b] border border-white/20 text-white px-1.5 py-0.5 rounded font-mono text-[9px] xs:text-[10px] sm:text-[11px] font-bold shadow-sm">
                <Clock className="w-2.5 h-2.5 text-white animate-pulse" />
                <span>{formatTime(timeLeft)}</span>
              </span>
            </p>
          </div>

          {/* Subtext Trust Badges */}
          <div className="flex items-center justify-center gap-1.5 text-white/90">
            <span className="text-[7.5px] xs:text-[8px] sm:text-[8.5px] uppercase tracking-wider font-semibold">
              OVER 1,400+ VERIFIED TODAY
            </span>
            <span className="text-white/40 text-[7.5px]">&bull;</span>
            <div className="flex items-center gap-1 text-[7.5px] xs:text-[8px] sm:text-[8.5px] font-semibold text-white/95">
              <ShieldCheck className="w-2.5 h-2.5 text-emerald-300" strokeWidth={2.5} />
              <span className="uppercase tracking-wider">256-BIT SSL SECURED</span>
            </div>
          </div>
        </div>

        {/* Shimmer Line */}
        <div className="absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent w-full opacity-60 overflow-hidden">
          <div className="absolute inset-0 bg-white/40 animate-shine"></div>
        </div>
      </div>

      {/* Floating Social Proof Toast */}
      {currentNotif && (
        <div
          className={`fixed top-14 left-3 right-3 sm:left-4 sm:right-auto z-[9999] max-w-[340px] mx-auto sm:mx-0 flex items-center gap-2 rounded-full border border-gray-200/90 bg-white/98 backdrop-blur-md px-3 py-1.5 shadow-md overflow-hidden transition-all duration-300 ease-in-out pointer-events-none ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "-translate-y-3 opacity-0"
          }`}
        >
          <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#000001] text-white">
            <Check className="w-2.5 h-2.5" strokeWidth={3} />
          </div>

          <div className="text-[9.5px] sm:text-[10.5px] text-[#222222] truncate leading-tight">
            <span className="font-bold">{currentNotif.name} </span>
            <span className="text-[#555555]">{currentNotif.action}</span>
          </div>
        </div>
      )}
    </>
  );
}
