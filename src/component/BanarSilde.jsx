'use client';
import React, { useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/pagination';

import { ChevronLeft, ChevronRight } from 'lucide-react';


import { Pagination, Autoplay } from 'swiper/modules';

import FistSilde from './FistSilde';
import SecondSlide from './SecondSlide';
import ThirdSilde from './ThirdSilde';

const BannerSlider = () => {

  const swiperRef = useRef(null);

  return (
    <div className="relative w-full group">

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        onBeforeInit={(swiper) => {
   
          swiperRef.current = swiper;
        }}
        className="mySwiper rounded-2xl overflow-hidden"
      >

        <SwiperSlide>
          <FistSilde/>
        </SwiperSlide>

    
        <SwiperSlide>
          <SecondSlide/>
        </SwiperSlide>

    
        <SwiperSlide>
          <ThirdSilde/>
        </SwiperSlide>
      </Swiper>

   
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white hover:bg-gray-50 text-gray-600 rounded-full flex items-center justify-center shadow-md transition-all duration-200 active:scale-95 opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 text-gray-500" strokeWidth={2.5} />
      </button>

      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white hover:bg-gray-50 text-gray-600 rounded-full flex items-center justify-center shadow-md transition-all duration-200 active:scale-95 opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 text-gray-500" strokeWidth={2.5} />
      </button>

      <style jsx global>{`
        .swiper-pagination-bullet-active {
          background: #6366f1 !important; 
          width: 24px !important;
          border-radius: 4px !important;
          transition: width 0.3s ease;
        }
        .swiper-pagination-bullet {
          margin: 0 4px !important;
        }
      `}</style>
    </div>
  );
};

export default BannerSlider;