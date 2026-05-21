"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";

const IdeaFormDesign = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router =useRouter();

  const submitdata = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const result = Object.fromEntries(formData.entries());

    const data = {
      ...result,
      tags: typeof result.tags === "string"
        ? result.tags.split(",").map(t => t.trim())
        : result.tags,
      userName: user?.name,
      userImage: user?.image,
      userEmail: user?.email,
    };

    await fetch(`${process.env.NEXT_PUBLIC_FETCH_DATA_URL}/allidea`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    router.push('/ideas')
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl shadow-slate-100 border border-slate-100 p-8 md:p-10">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
            Share Your Idea
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Please fill out the form below to share your idea.
          </p>
        </div>

        <form onSubmit={submitdata} className="space-y-6">
          {/* Idea Title */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Idea Title
            </label>
            <input
              type="text"
              name="ideaTitle"
              required // Required field - cannot be left empty
              placeholder="Enter your idea title"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 bg-slate-50/50 transition-all"
            />
          </div>

          {/* Short Description & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Short Description
              </label>
              <input
                type="text"
                name="shortDescription"
                required // Required field - cannot be left empty
                placeholder="Brief summary"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 bg-slate-50/50 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Category
              </label>
              <div className="relative">
                <select
                  name="category"
                  required // Required field - a category must be selected
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 bg-slate-50/50 appearance-none cursor-pointer text-slate-600"
                >
                  <option value="">Select Category</option>
                  <option value="Tech">Tech</option>
                  <option value="Health">Health</option>
                  <option value="Ai">AI</option>
                  <option value="Aducation">Education</option>
                  <option value="Pets">Pets</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Description */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Detailed Description
            </label>
            <textarea
              name="detailedDescription"
              rows="4"
              required // Required field - cannot be left empty
              placeholder="Describe your idea in detail..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 bg-slate-50/50 resize-none transition-all"
            ></textarea>
          </div>

          {/* Problem & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Problem Statement
              </label>
              <textarea
                name="problemStatement"
                rows="3"
                required // Required field - cannot be left empty
                placeholder="What problem does it solve?"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 bg-slate-50/50 resize-none transition-all"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Proposed Solution
              </label>
              <textarea
                name="proposedSolution"
                rows="3"
                required // Required field - cannot be left empty
                placeholder="How does your idea solve it?"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 bg-slate-50/50 resize-none transition-all"
              ></textarea>
            </div>
          </div>

          {/* Budget, Audience, Tags */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Estimated Budget
              </label>
              <input
                type="text"
                name="estimatedBudget"
                required // Required field - cannot be left empty
                placeholder="e.g. $500"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 bg-slate-50/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Target Audience
              </label>
              <input
                type="text"
                name="targetAudience"
                required // Required field - cannot be left empty
                placeholder="e.g. Students"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 bg-slate-50/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                required // Required field - cannot be left empty
                placeholder="e.g. AI, Tech"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 bg-slate-50/50 transition-all"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Image URL
            </label>
            <input
              type="url" // Changed to 'url' to validate the input format
              name="imageURL"
              required // Required field - cannot be left empty
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 bg-slate-50/50 transition-all"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3.5 px-6 rounded-xl transition-all shadow-sm hover:cursor-pointer"
            >
              Submit Idea
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IdeaFormDesign;