"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    title: "RESERVE WORLD-CLASS STUDIOS FOR YOUR NEXT CREATIVE PRODUCTION",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1600&auto=format&fit=crop",
    category: "Film Sound Stage",
  },
  {
    id: 2,
    title: "RECORD PROFESSIONAL PODCASTS IN ACOUSTICALLY PERFECT SPACES",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1600&auto=format&fit=crop",
    category: "Podcast Lounge",
  },
  {
    id: 3,
    title: "CAPTURE STUNNING VISUALS WITH ADVANCED CYC WALLS",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1600&auto=format&fit=crop",
    category: "Photography Cyc Wall",
  },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  return (
   <section className="relative bg-white dark:bg-[#0B0F19] py-8 sm:py-12 overflow-hidden transition-colors duration-300">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative w-full h-100 sm:h-120 lg:h-130 rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
          
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                width={300}
                height={300}
                className="w-full h-full object-cover brightness-[0.45]"
              />
              <div className="absolute inset-0 bg-linear-to-b from-[#0B0F19]/80 via-transparent to-black/40" />
            </div>
          ))}

          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 sm:px-12 max-w-4xl mx-auto">
            
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-wider text-white uppercase mb-8 leading-tight drop-shadow-md">
              {slides[currentIndex].title}
            </h1>

            <div className="flex flex-row items-center justify-center gap-4 sm:gap-6">
              
              <Link
                href="/studios"
                className="px-6 sm:px-8 py-3 rounded-xl bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium text-sm sm:text-base shadow-lg shadow-blue-600/30 transition-all transform hover:scale-105"
              >
                Explore Studios
              </Link>

              <Link
                href="/host"
                className="px-6 sm:px-8 py-3 rounded-xl bg-slate-900/60 dark:bg-slate-950/40 hover:bg-slate-800/80 dark:hover:bg-slate-900/60 border border-blue-400/60 text-white font-medium text-sm sm:text-base backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all transform hover:scale-105"
              >
                Host Your Space
              </Link>

            </div>

          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-slate-900/70 dark:bg-slate-950/60 border border-slate-600 dark:border-slate-700 text-white hover:bg-blue-600 transition-colors backdrop-blur-sm"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-slate-900/70 dark:bg-slate-950/60 border border-slate-600 dark:border-slate-700 text-white hover:bg-blue-600 transition-colors backdrop-blur-sm"
            aria-label="Next Slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? "w-8 bg-blue-500" : "w-2 bg-white/50 hover:bg-white"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;