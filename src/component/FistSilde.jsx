import React from 'react'
import { Rocket, ArrowRight } from 'lucide-react';

const FistSilde = () => {
  return (
    <div 
      className="relative w-full max-w-6xl mx-auto min-h-[280px] rounded-2xl p-8 md:p-12 flex items-center overflow-hidden font-sans bg-cover bg-center bg-no-repeat"
      style={{ 
       
        backgroundImage: `url('/image/first.png' )`,
        backgroundColor: '#f3f0ff' 
      }}
    >

      <div className="absolute inset-0 bg-white/20 pointer-events-none" />

      <div className="relative z-10 flex-1 space-y-4 max-w-xl text-left">
        
   
        <div className="inline-flex items-center gap-2 bg-[#e9e3ff] text-[#6366f1] text-xs font-semibold px-3 py-1.5 rounded-full">
          <Rocket className="w-3.5 h-3.5 text-[#6366f1]" />
          <span>Share. Explore. Innovate.</span>
        </div>

     
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#111827] leading-tight">
          Great Ideas Start <br />
          with a <span className="text-[#6366f1]">Single Spark</span>
        </h1>

       
        <p className="text-gray-600 text-sm md:text-base font-medium max-w-sm md:max-w-md">
          Share your startup ideas, get valuable feedback, and turn your vision into reality.
        </p>

        <div className="pt-2">
          <button className="inline-flex items-center gap-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all duration-200 shadow-md shadow-indigo-200">
            <span>Explore Ideas</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    

    </div>
  )
}

export default FistSilde