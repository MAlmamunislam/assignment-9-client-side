'use client'
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const CommentForm = ({ideaId}) => {
  const [commentText, setCommentText] = useState('');
   const { data: session } = authClient.useSession();
    const user = session?.user;
    const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setCommentText('');
    const formData = new FormData(e.currentTarget);
    const result = Object.fromEntries(formData.entries());

    const data = {
      ...result,
      ideaId: ideaId,
      userName: user?.name,
      userImage: user?.image,
      userEmail: user?.email,
      createdAt: new Date().toISOString(),
    };
     await fetch(`${process.env.NEXT_PUBLIC_FETCH_DATA_URL}/postcomment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setCommentText(''); 
  toast.success("Comment added successfully!");
  
window.location.reload();
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-6">
      <form  onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-md border border-slate-100 rounded-2xl p-4 shadow-sm">
        
   
        <div className="relative">
          <textarea
            rows="3"
            name="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a respectful comment..."
            className="w-full p-3 text-sm bg-slate-50/50 border border-slate-200/60 rounded-xl placeholder:text-slate-400 focus:outline-none focus:border-indigo-500/50 focus:bg-white text-slate-800 transition-all resize-none"
          />
        </div>

     
        <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-50">
          <p className="text-[11px] text-slate-400">
            {commentText.length} characters
          </p>
          
          <button
            type="submit"
            disabled={!commentText.trim()}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-100 text-white disabled:text-slate-400 text-xs font-semibold rounded-xl shadow-sm transition-all duration-200"
          >
            Comment
          </button>
        </div>

      </form>
    </div>
  );
};

export default CommentForm;