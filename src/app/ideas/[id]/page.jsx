import React from 'react';

import { ArrowLeft, DollarSign, Folder, Tag, Calendar, FileText, AlertCircle, Lightbulb, Users, Trash2, } from 'lucide-react';
import Image from 'next/image';
import { Plus } from '@gravity-ui/icons';
import { Button } from '@heroui/react';
import CommentForm from '@/component/IdeaFile/CommentForm';
import CommentItem from '@/component/IdeaFile/CommentForm';
import IdeaDetailsPage from '@/component/FatchComment';
import FatchComment from '@/component/FatchComment';

const IdeaDetails = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_DATA_URL}/allidea/${id}`, {
  cache: 'no-store' 
});
  const data = await res.json();

  return (
    <div>
      <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 font-sans antialiased text-slate-800">
        <div className="max-w-6xl mx-auto">

          {/* Back Button */}
          <button className="flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-700 mb-6 transition-colors">

            Back to Ideas
          </button>

          {/* MAIN LAYOUT: Flexbox for absolute safety */}
          <div className="flex flex-col lg:flex-row gap-8 items-start w-full">

            {/* LEFT SIDE: MAIN CONTENT & COMMENTS */}
            <div className="w-full lg:w-2/3 space-y-6">

              {/* Main Project Card */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm space-y-6">
                {/* Main Image */}
                <div className="w-full h-64 sm:h-96 rounded-xl overflow-hidden shadow-inner">
                  <Image
                    src={data.imageURL}
                    alt={data.ideaTitle}
                    width={320}
                    height={340}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
                    {data.ideaTitle}
                  </h1>
                  <p className="text-base sm:text-lg font-medium text-emerald-600">
                    {data.shortDescription}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-3 py-1 bg-emerald-50 text-emerald-700 rounded-md text-xs font-semibold border border-emerald-100">
                    {data.category}
                  </span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-semibold">{data.tags[0]}</span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-semibold">{data.tags[1]}</span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-semibold">{data.tags[3]}</span>
                </div>

                <hr className="border-slate-100" />

                {/* Info Sections */}
                <div className="space-y-6">
                  {/* Description */}
                  <div className="flex items-start">

                    <div>
                      <h3 className="text-base font-bold text-slate-900 mb-1">Description</h3>
                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                        {data.detailedDescription}
                      </p>
                    </div>
                  </div>

                  <hr className="border-slate-100" />

                  {/* Problem Statement */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-2 bg-rose-50 text-rose-500 rounded-lg mr-4">

                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 mb-1">Problem Statement</h3>
                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                        {data.problemStatement}
                      </p>
                    </div>
                  </div>

                  <hr className="border-slate-100" />

                  {/* Proposed Solution */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-2 bg-amber-50 text-amber-500 rounded-lg mr-4">

                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 mb-1">Proposed Solution</h3>
                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                        {data.proposedSolution}
                      </p>
                    </div>
                  </div>

                  <hr className="border-slate-100" />

                  {/* Target Audience */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-2 bg-indigo-50 text-indigo-500 rounded-lg mr-4">

                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 mb-1">Target Audience</h3>
                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                        {data.targetAudience}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* NEW COMMENT SECTION */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-slate-900">
                  Comments (2)
                </h2>

                {/* Input Box */}
            <CommentForm ideaId={id}></CommentForm>

                {/* Comments List */}
                <div className="pt-2 space-y-4">
                  {/* Single Comment */}
                <FatchComment id={id} ></FatchComment>
                </div>
              </div>

            </div>

            {/* RIGHT SIDE: SIDEBAR CARD */}
            <div className="w-full lg:w-1/3 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-5 lg:sticky lg:top-8">

              {/* Estimated Budget */}
              <div className="flex items-center">

                <div>
                  <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Estimated Budget</span>
                  <span className="text-2xl font-black text-slate-900">${data.estimatedBudget}</span>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Category */}
              <div className="flex items-center">

                <div>
                  <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Category</span>
                  <span className="text-sm font-bold text-slate-800">{data.category}</span>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Tags */}
              <div className="flex items-start">

                <div>
                  <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Tags</span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded text-xs font-bold border border-emerald-100">{data.tags[0]}</span>
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded text-xs font-bold border border-emerald-100">{data.tags[1]}</span>
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded text-xs font-bold border border-emerald-100">{data.tags[2]}</span>
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Posted On */}
              <div className="flex items-center">

                <div>
                  <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Posted On</span>
                  <span className="text-sm font-bold text-slate-800">May 18, 2025</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

    </div>

  )
}

export default IdeaDetails