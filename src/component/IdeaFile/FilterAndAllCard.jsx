'use client';
import React, { useEffect, useState } from 'react'
import { Search, ChevronDown, Calendar, SlidersHorizontal, MessageSquare, Bookmark, ArrowRight } from 'lucide-react';
import Image from 'next/image';

import { FetchAllData } from '@/service/fatchedata';
import Link from 'next/link';

const FilterAndAllCard = () => {
    const [ideas, setIdeas] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    // fatch fata 
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await FetchAllData();

                console.log(data);
                setIdeas(data);
            } catch (error) {
                console.error(error);
            }
        };

        getData();
    }, []);
    // search  and filter logic
    const filteredIdeas = ideas.filter(idea => {
        const matchesSearch = idea.ideaTitle.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All Categories' || idea.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });
    return (
        <div>

            <div className="max-w-7xl mx-auto p-4 md:p-6">

                <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-transparent">


                    <div className="flex flex-col sm:flex-row flex-1 items-stretch sm:items-center gap-3">


                        {/* Search Input Box */}
                        <div className="relative flex-1 min-w-[200px] flex items-center">
                            <input
                                type="text"
                                name='search'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search ideas by title..."
                                className="w-full pl-10 pr-24 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                            />
                            <button className="absolute right-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors">
                                Search
                            </button>
                        </div>

                        {/* All Categories Dropdown Selector */}
                        <div className="relative min-w-[150px]">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full appearance-none pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 font-medium focus:outline-none focus:border-purple-500 cursor-pointer transition-colors"
                            >
                                <option value="All Categories">All Categories</option>
                                <option value="Finance">Finance</option>
                                <option value="Tech">Tech</option>
                                <option value="Health">Health</option>
                                <option value="Education">Education</option>
                                <option value="AI">AI</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>




                    </div>



                </div>
            </div>
            {/* all card section  */}

            <div className=" container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6">

                {
                    filteredIdeas.length > 0 ? (
                        filteredIdeas.map((idea, index) => {
                            return (
                                <div key={index} className="max-w-md bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 font-sans">

                                    <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                                        <Image
                                            src={idea.imageURL || "/placeholder.jpg"}
                                            alt={idea.ideaTitle}
                                            fill
                                            sizes="(max-w-7xl) 33vw, 100vw"
                                            className="object-cover"
                                        />
                                        <div className="absolute bottom-4 left-4 bg-purple-600/90 text-white text-xs font-semibold px-2.5 py-1 rounded-lg backdrop-blur-sm z-10">
                                            {idea.category}
                                        </div>
                                    </div>


                                    <div className="p-6">
                                        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                                            {idea.ideaTitle}
                                        </h2>
                                        <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                                            {idea.shortDescription}
                                        </p>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            <span className="bg-purple-50 text-purple-600 text-xs font-medium px-3 py-1.5 rounded-xl">
                                                {idea.tags ? idea.tags.join(', ') : ''}
                                            </span>
                                        </div>


                                        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">

                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={idea.userImage || "https://i.ibb.co/6R7v6gX/anon-user.png"}
                                                    alt={idea.userName}
                                                    className="w-16 h-16 rounded-full object-cover ring-4 ring-purple-50"
                                                />
                                                <span className="text-gray-800 text-sm font-bold max-w-[100px] leading-tight">
                                                    {idea.userName || "Anonymous"}
                                                </span>
                                            </div>

                                            <Link href={`/ideas/${idea._id}`} className="flex items-center gap-2 border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-all px-4 py-3 rounded-xl text-xs font-bold tracking-wide">
                                                <span className="text-center">View<br />Details</span>
                                                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className="col-span-full text-center py-16 px-4 backdrop-blur-sm bg-gray-50/50 rounded-2xl border border-dashed border-gray-200 max-w-md mx-auto my-6 transition-all duration-300 hover:shadow-md">

                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-gray-100 to-gray-200 text-gray-400 mb-4 shadow-inner animate-pulse">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>


                            <h3 className="text-xl font-semibold text-gray-800 mb-1 tracking-tight">
                                No Ideas Found
                            </h3>


                            <p className="text-sm text-gray-500 max-w-xs mx-auto">
                                We couldn't find any ideas matching your search. Try using different keywords.
                            </p>
                        </div>
                    )
                }


            </div>



        </div>
    )
}

export default FilterAndAllCard