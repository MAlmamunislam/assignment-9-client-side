'use client'
import { authClient } from '@/lib/auth-client'
import React, { useEffect, useState } from 'react'
import CommentDelete from './CommentDelete';
import CommentEditModal from './EditCommentModal';

const FatchComment = ({ id }) => {
    const [comments, setComments] = useState([]);


    const { data: session } = authClient.useSession();
    const currentUser = session?.user;


    useEffect(() => {
        if (!id) return;
        fetch(`${process.env.NEXT_PUBLIC_FETCH_DATA_URL}/comments/${id}`)
            .then(res => res.json())
            .then(data => setComments(data))
            .catch(err => console.error("Error fetching comments:", err));
    }, [id]);

    return (
        <div className="w-full max-w-2xl mx-auto mt-6 space-y-3">

            {comments.map((comment) => {

                const isMyComment = currentUser?.email === comment.userEmail;

                return (
                    <div key={comment._id} className="flex gap-3 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm text-slate-800">

                        <img src={comment.userImage} alt="" className="w-8 h-8 rounded-full object-cover shrink-0" />

                        <div className="flex flex-col flex-1">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold">{comment.userName}</span>


                                <span className="text-[10px] text-slate-400">
                                    {new Date(comment.createdAt).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </span>
                            </div>

                            <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                                {comment.text}
                            </p>


                            {isMyComment && (
                                <div className="flex gap-3 text-[11px] text-slate-400 font-medium mt-2 justify-end">

                                  
                                    <CommentEditModal
                                        commentId={comment._id}
                                        currentText={comment.text}
                                        onEditSuccess={(updatedId, newText) => {
                                          
                                            setComments(comments.map(c => c._id === updatedId ? { ...c, text: newText } : c));
                                        }}
                                    />

                                   
                                    <CommentDelete
                                        commentId={comment._id}
                                        onDeleteSuccess={(deletedId) => {
                                            setComments(comments.filter(c => c._id !== deletedId));
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                    </div>
                );
            })}

            {comments.length === 0 && (
                <p className="text-xs text-slate-400 italic text-center py-4">No comments yet.</p>
            )}

        </div>
    )
}

export default FatchComment