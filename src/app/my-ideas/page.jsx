"use client";
import { authClient } from "@/lib/auth-client";
import React, { useEffect, useState } from "react";
import { ArrowRight, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import DeleteIdeaModal from "@/component/MyideaDleteModal";

const MyIdeas = () => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [myIdeas, setMyIdeas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //  if user data fatch 
        if (user?.email) {
            fetch(`${process.env.NEXT_PUBLIC_FETCH_DATA_URL}/myidea?email=${user.email}`)
                //   http://localhost:5000/myidea?email=uthsabghosh51@gmail.com
                .then((res) => res.json())
                .then((data) => {
                    setMyIdeas(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching my ideas:", error);
                    setLoading(false);
                });
        } else if (!isPending && !user) {

            setLoading(false);
        }
    }, [user, isPending]);

    if (isPending || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <p className="text-slate-500 font-medium">Loading your ideas...</p>
            </div>
        );
    }

    if (myIdeas.length === 0) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-2xl border border-slate-100 max-w-xl mx-auto p-8 shadow-sm">
                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800">No Ideas Found</h3>
                <p className="text-slate-500 text-sm mt-2">You haven't created any ideas yet. Start sharing your brilliant thoughts!</p>
            </div>
        </div>
    );
}





    return (
        <div className="container mx-auto  py-8">


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    myIdeas.map((idea, index) => {
                        return (
                            <div className="group max-w-[380px] bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md shadow-slate-100/40 hover:shadow-2xl hover:shadow-slate-200/60 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">

                                <div key={index} className="relative h-56 w-full overflow-hidden bg-slate-50">
                                    <Image
                                        src={idea.imageURL || "https://images.unsplash.com/photo-1521737604893-d14cc237f11d"}
                                        alt={idea.ideaTitle}
                                        fill
                                        sizes="380px"
                                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                    />


                                    <span className="absolute top-4 left-4 text-[11px] font-bold tracking-wide px-3 py-1.5 rounded-xl border border-purple-200/50 bg-purple-500/10 text-purple-600 backdrop-blur-md shadow-sm uppercase z-10">
                                        {idea.category}

                                    </span>
                                    <div className="absolute top-2 left-25 text-[11px] font-bold tracking-wide px-3 py-1.5   uppercase z-10">   <DeleteIdeaModal ideaId={idea._id}          
                                        ideaTitle={idea.ideaTitle}></DeleteIdeaModal> </div>

                                </div>


                                <div className="p-6">

                                    <h3 className="text-xl font-bold text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors duration-200">
                                        {idea.ideaTitle}
                                    </h3>


                                    <p className="mt-2 text-slate-500 text-sm leading-relaxed">
                                        {idea.shortDescription}
                                    </p>


                                    <div className="mt-4 flex flex-wrap gap-1.5">
                                        <span className="inline-flex items-center gap-1 bg-slate-50 text-slate-500 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-slate-100">
                                            <Tag className="w-3 h-3 stroke-[2]" />
                                            {idea.tags ? idea.tags.join(', ') : ''}
                                        </span>

                                    </div>

                                    <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">


                                        <div className="flex items-center gap-2.5">
                                            <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-slate-100 bg-slate-100">
                                                <Image
                                                    width={10} height={10} src={user?.image || "https://i.pravatar.cc/150?img=12"}
                                                    alt="User Avatar"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-slate-700 text-xs font-bold leading-tight">
                                                    {user?.name}
                                                </span>
                                                <span className="text-[10px] font-medium text-slate-400 mt-0.5">Creator</span>
                                            </div>
                                        </div>

                                        {/* action button  */}

                                        <div className="flex items-center gap-2">


                                            <Link
                                                href={`/ideas/edit/${idea._id}`}
                                                className="inline-flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-indigo-600 transition-all duration-300 px-3 py-2.5 rounded-xl text-xs font-bold border border-slate-100"
                                            >
                                                <span>Edit</span>
                                            </Link>


                                            <Link
                                                href={`/ideas/${idea._id}`}
                                                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white transition-all duration-300 pl-4 pr-3.5 py-2.5 rounded-xl text-xs font-bold shadow-sm hover:shadow-md hover:shadow-indigo-100"
                                            >
                                                <span>Details</span>
                                                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-0.5 transition-transform duration-200" />
                                            </Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>

    );
};

export default MyIdeas;