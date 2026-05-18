import FilterAndAllCard from '@/component/IdeaFile/FilterAndAllCard'
import React from 'react'

const allIdeaPage = () => {
    return (
        <div>
            <div>
                <div className="container mx-auto p-4 md:p-6">
                  
                    <div className="relative overflow-hidden w-full min-h-[180px] md:min-h-[220px] rounded-2xl bg-gradient-to-r from-[#f3f0ff] via-[#e8e9ff] to-[#f1f3fe] flex flex-col justify-center px-8 md:px-16 py-8">

                        {/* Soft Decorative Ambient Blobs in Background using pure CSS blur */}
                        <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-200/50 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute bottom-0 right-10 w-60 h-60 bg-blue-200/40 rounded-full blur-2xl pointer-events-none"></div>

                        {/* Text Content Area */}
                        <div className="z-10 flex flex-col gap-2 max-w-2xl">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-[#091133] tracking-tight">
                                All Ideas
                            </h1>
                            <p className="text-base md:text-lg text-gray-600 font-medium leading-relaxed">
                                Explore creative startup ideas shared by innovators from around the world.
                            </p>
                        </div>

                    </div>
                </div>
            </div>


            <div>
                <FilterAndAllCard />
            </div>


        </div>
    )
}

export default allIdeaPage