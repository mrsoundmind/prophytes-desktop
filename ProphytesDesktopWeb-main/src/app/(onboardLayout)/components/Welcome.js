"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setOnboardPage } from "@/src/redux/slices/onboardingSlice";

const Welcome = () => {
    const dispatch = useDispatch();
    const [mounted, setMounted] = useState(false);
    const [isExiting, setIsExiting] = useState(false); // New exit state

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleGetStarted = () => {
        // Trigger exit animation
        setIsExiting(true);

        // Wait for animation to finish before dispatching
        setTimeout(() => {
            // Mark onboarding as explicitly started using a simple boolean flag
            localStorage.setItem("onboardingStarted", "true");
            dispatch(setOnboardPage(""));
        }, 800); // 800ms matches the CSS duration
    };

    return (
        // Fixed Inset-0 breaks out of any parent container to guarantee full screen
        // Added transition-opacity for smooth exit
        <div className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden transition-opacity duration-1000 ${isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>

            {/* Cinematic Background: Spotlight Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900/40 via-black to-black opacity-80 pointer-events-none" />

            {/* Subtle Grid Texture */}
            <div className="absolute inset-0 bg-[url('/img/grid.svg')] opacity-[0.02] bg-[length:30px_30px] pointer-events-none mix-blend-overlay" />

            <div className={`relative z-10 px-6 text-center transition-all duration-1000 ease-out transform ${mounted && !isExiting ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>

                {/* Brand Badge */}
                <div className="mb-10">
                    <span className="inline-flex items-center px-4 py-1.5 text-[10px] font-bold tracking-[0.3em] text-gray-400 uppercase border border-white/10 rounded-full bg-white/5 backdrop-blur-md">
                        Official Member Portal
                    </span>
                </div>

                {/* Main Headline */}
                <h1 className="mb-8 font-montserrat font-bold text-6xl md:text-8xl tracking-tighter text-white leading-[0.9]">
                    Welcome to <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600">
                        Prophytes
                    </span>
                </h1>

                {/* Subtext */}
                <p className={`max-w-xl mx-auto mb-16 text-lg md:text-xl text-gray-400 font-light leading-relaxed tracking-wide transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    Connect with your chapter, verify your legacy, and access the exclusive Divine Nine network.
                </p>

                {/* Premium CTA Button */}
                <button
                    onClick={handleGetStarted}
                    className={`group relative inline-flex items-center justify-center px-12 py-5 text-lg font-bold text-black transition-all duration-500 bg-white rounded-full hover:bg-gray-100 hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} delay-500`}
                >
                    <span className="relative z-10">Get Started</span>
                    <svg
                        className="w-5 h-5 ml-3 transition-transform duration-300 transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>
            </div>

            {/* Footer EST */}
            <div className={`absolute bottom-8 text-xs font-mono text-gray-700 tracking-widest transition-opacity duration-1000 delay-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                EST. 2024
            </div>
        </div>
    );
};

export default Welcome;
