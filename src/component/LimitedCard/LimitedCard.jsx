'use client';

import { FetchAllData } from '@/service/fatchedata';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const LimitedCard = () => {
    const [ideas, setIdeas] = useState([]);
    useEffect(() => {
        const getData = async () => {
            try {
                const datas = await FetchAllData();
                const data = datas.slice(0, 4);
                console.log(data);
                setIdeas(data);
            } catch (error) {
                console.error(error);
            }
        };

        getData();
    }, []);
    console.log('kiya howa' , ideas);
    return (
        <div className="container mx-auto py-8">
            <div className=" container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {
                    ideas.map((idea, index) => {
                        return (
                            <div key={index} className="max-w-[320px] bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100 p-3 font-sans">


                                <Image
                                    src={idea.imageURL}
                                    alt={idea.ideaTitle}
                                    width={320}
                                    height={340}
                                    className="w-full h-48 object-cover rounded-tl-[24px] rounded-tr-[24px]"
                                />


                                <div className="pt-4 pb-2 px-1">
                                    <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                                       {idea.ideaTitle}
                                    </h3>
                                    <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">
                                       {idea.shortDescription}
                                    </p>
                                </div>


                                <div className="flex items-center justify-between pt-3 pb-1 px-1 mt-2 border-t border-gray-50">


                                    <button className="border border-[#7C3AED] text-[#7C3AED] w-full font-semibold text-sm px-5 py-2 rounded-xl hover:bg-purple-50 transition-colors duration-150">
                                        View Details
                                    </button>

                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default LimitedCard