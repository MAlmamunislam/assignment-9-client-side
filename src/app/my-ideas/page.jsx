"use client";
import { authClient } from "@/lib/auth-client";
import React, { useEffect, useState } from "react";
import { ArrowRight, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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

 

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

 
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {
            myIdeas.map((idea, index) => {
                return (
                     <div className="group max-w-[380px] bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md shadow-slate-100/40 hover:shadow-2xl hover:shadow-slate-200/60 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
            
            {/* ১. ইমেজ সেকশন */}
            <div key={index} className="relative h-56 w-full overflow-hidden bg-slate-50">
                <Image
                    src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97" // তোর ইচ্ছামতো ইমেজ লিংক দিবি
                    alt="Static Idea Image"
                    fill
                    sizes="380px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                
                {/* স্ট্যাটিক গ্লাসমরফিক ক্যাটাগরি ব্যাজ */}
                <span className="absolute top-4 left-4 text-[11px] font-bold tracking-wide px-3 py-1.5 rounded-xl border border-purple-200/50 bg-purple-500/10 text-purple-600 backdrop-blur-md shadow-sm uppercase z-10">
                    AI & Tech
                </span>
            </div>

            {/* ২. মেইন কন্টেন্ট সেকশন */}
            <div className="p-6">
                {/* টাইটেল */}
                <h3 className="text-xl font-bold text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors duration-200">
                    Automated Saas Platform
                </h3>
                
                {/* ডেসক্রিপশন */}
                <p className="mt-2 text-slate-500 text-sm leading-relaxed">
                    Build a modern software solution that automates daily workflows using minimal microservices and premium UI components.
                </p>

                {/* স্ট্যাটিক ট্যাগস */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                    <span className="inline-flex items-center gap-1 bg-slate-50 text-slate-500 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-slate-100">
                        <Tag className="w-3 h-3 stroke-[2]" />
                        Next.js
                    </span>
                    <span className="inline-flex items-center gap-1 bg-slate-50 text-slate-500 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-slate-100">
                        <Tag className="w-3 h-3 stroke-[2]" />
                        Tailwind
                    </span>
                </div>

                {/* ৩. ফুটার সেকশন (প্রোফাইল ও বাটন) */}
                <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                    
                    {/* ইউজার প্রোফাইল */}
                    <div className="flex items-center gap-2.5">
                        <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-slate-100 bg-slate-100">
                            <img
                                src="https://i.ibb.co/6R7v6gX/anon-user.png" // ইউজারের প্রোফাইল পিকচার
                                alt="User Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-slate-700 text-xs font-bold leading-tight">
                                Asif Rahman
                            </span>
                            <span className="text-[10px] font-medium text-slate-400 mt-0.5">Creator</span>
                        </div>
                    </div>

                    {/* প্রিমিয়াম অ্যাকশন বাটন */}
                    <button>edit</button>
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
                )
            })
        }

    </div>
       </div>
   
  );
};

export default MyIdeas;