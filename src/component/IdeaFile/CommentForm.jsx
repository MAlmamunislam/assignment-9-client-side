'use client';

import React from 'react';
import { Button } from '@heroui/react';
import { Plus } from '@gravity-ui/icons';

const CommentForm = () => {

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData)
   console.log(data)

    e.target.reset();
    const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_DATA_URL}/postcomment`,{
        method: "POST",
        headers : {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(data),

    });
    const result = res.json();
    console.log('Update Response ' , result)

  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">

      <textarea
        name="comment"
        rows="3"
        placeholder="Add your comment..."
        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm resize-none transition-all placeholder:text-slate-400"
      />

      <Button type="submit" variant="secondary">
        <Plus />
        Post Comment
      </Button>

    </form>
  );
};

export default CommentForm;