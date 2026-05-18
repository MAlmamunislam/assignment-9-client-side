import React from 'react'
import { Cpu, ArrowRight } from 'lucide-react';

const ThirdSilde = () => {
  return (
    <div 
      className="relative w-full mt-5 mx-auto min-h-[280px] rounded-2xl p-8 md:p-12 flex items-center overflow-hidden font-sans bg-cover bg-center bg-no-repeat"
      style={{ 
      
        backgroundImage: `url('/image/third.png')`,
        backgroundColor: '#e6f4ea' 
      }}
    >

      <div className="absolute inset-0 bg-white/10 pointer-events-none" />


      <div className="relative z-10 flex-1 space-y-4 max-w-xl text-left">
        
        
        <div className="inline-flex items-center gap-2 bg-[#e6f4ea] text-[#059669] text-xs font-semibold px-3 py-1.5 rounded-full">
          <Cpu className="w-3.5 h-3.5 text-[#059669]" />
          <span>Innovate. Inspire. Impact.</span>
        </div>

      
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#0f172a] leading-tight">
          Innovate Today, <br />
          <span className="text-[#059669]">Impact Tomorrow</span>
        </h1>

   
        <p className="text-gray-600 text-sm md:text-base font-medium max-w-sm md:max-w-md">
          Leverage technology and creativity to solve real-world problems and create a better future.
        </p>

    
        <div className="pt-2">
          <button className="inline-flex items-center gap-2 bg-[#00875a] hover:bg-[#006d48] text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all duration-200 shadow-md shadow-emerald-100">
            <span>Share Your Idea</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    

    </div>
  )
}

export default ThirdSilde