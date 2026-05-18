import React from 'react'
import { Users, ArrowRight } from 'lucide-react';

const SecondSlide = () => {
  return (
    <div 
      className="relative w-full mt-5 mx-auto min-h-[280px] rounded-2xl p-8 md:p-12 flex items-center overflow-hidden font-sans bg-cover bg-center bg-no-repeat"
      style={{ 
        
        backgroundImage: `url('/image/second.png')`,
        backgroundColor: '#e0f2fe' 
      }}
    >
    
      <div className="absolute inset-0 bg-white/10 pointer-events-none" />

      
      <div className="relative z-10 flex-1 space-y-4 max-w-xl text-left">
        
    
        <div className="inline-flex items-center gap-2 bg-[#dbeafe] text-[#2563eb] text-xs font-semibold px-3 py-1.5 rounded-full">
          <Users className="w-3.5 h-3.5 text-[#2563eb]" />
          <span>Collaborate. Connect. Create.</span>
        </div>

    
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#0f172a] leading-tight">
          Ideas Grow Stronger <br />
          with <span className="text-[#2563eb]">Collaboration</span>
        </h1>

     
        <p className="text-gray-600 text-sm md:text-base font-medium max-w-sm md:max-w-md">
          Connect with like-minded people, discuss ideas, and build the next big thing together.
        </p>

     
        <div className="pt-2">
          <button className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all duration-200 shadow-md shadow-blue-200">
            <span>Join the Community</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    
    </div>
  )
}

export default SecondSlide