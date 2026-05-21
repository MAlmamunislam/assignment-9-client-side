'use client'
import React, { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Calendar, MessageSquare, ArrowUpRight } from 'lucide-react';
import CommentEditModal from '@/component/EditCommentModal';
import CommentDelete from '@/component/CommentDelete';



const MyInteractives = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    const { data: session } = authClient.useSession();
    const user = session?.user;

  
    const fetchMyComments = async () => {
        if (!user?.email) return;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_DATA_URL}/my-comments?email=${user.email}`);
            const data = await res.json();
            setComments(data || []);
        } catch (error) {
            console.error("Error fetching my comments:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyComments();
    }, [user?.email]);



    return (
        <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased text-slate-800">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight sm:text-3xl">
                        My Interactives
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Manage and track all the comments you have made on various ideas.
                    </p>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <p className="text-slate-400 text-sm font-medium animate-pulse">Loading interactives...</p>
                    </div>
                ) : comments.length === 0 ? (
                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center">
                        <MessageSquare className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                        <p className="text-slate-500 text-sm font-medium">No comments found.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {comments.map((comment) => (
                            <div key={comment._id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between gap-4 transition-all hover:shadow-md/50">

                                <div className="space-y-2">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold border border-indigo-100/50">
                                            <MessageSquare className="size-3.5" /> Commented on Idea
                                        </span>
                                        <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                                            <Calendar className="size-3.5" /> {new Date(comment.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </span>
                                    </div>

                                    {/* Comment Text */}
                                    <p className="text-sm text-slate-700 font-medium leading-relaxed bg-slate-50/50 p-3.5 rounded-xl border border-slate-100">
                                        "{comment.text}"
                                    </p>
                                </div>

                                {/* Footer Action Buttons */}
                                <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                                    <Link
                                        href={`/allidea/${comment.ideaId}`}
                                        className="inline-flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 font-bold transition-colors"
                                    >
                                        View Original Idea <ArrowUpRight className="size-3.5" />
                                    </Link>

                                    {/* 🎯 EDIT & DELETE ACTIONS */}
                                    <div className="flex items-center gap-4 text-xs font-semibold">

                                        <div className="flex items-center gap-4 text-xs font-semibold">

                                            <CommentEditModal
                                                commentId={comment._id}
                                                currentText={comment.text}
                                                onEditSuccess={() => {
                                                    window.location.reload();
                                                }}
                                            />


                                            <CommentDelete
                                                commentId={comment._id}
                                                onDeleteSuccess={() => {
                                                    window.location.reload();
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyInteractives;