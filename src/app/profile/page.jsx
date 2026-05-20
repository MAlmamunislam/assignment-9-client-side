"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import React from "react";

const Profile = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-light-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

        <div className="relative px-8 py-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl w-80 text-center">
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-yellow-400 to-fuchsia-600">
              <Image
                width={96}
                height={96} 
                src={user?.image || "https://i.pravatar.cc/150?img=12"}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-2 border-white/10"
              />
            </div>
            <span className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-white/20 rounded-full"></span>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {user?.name}
            </h2>
            <p className="text-blue-100 text-sm font-medium mt-1 opacity-80">
              {user?.email}
            </p>
          </div>

          <button className="mt-8 w-full py-3 px-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg">
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;