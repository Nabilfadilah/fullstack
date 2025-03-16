"use client";

import React from "react";
import Link from "next/link";

const Form = ({type, post, setPost, submitting, handleSubmit}) => {
  return (
    <section className="w-full max-w-2xl mx-auto px-4">
      <h1 className="head_text text-left">
        <span className="blue_gradient text-3xl">{type} Post</span>
      </h1>
      <p className="desc text-left">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 w-full flex flex-col gap-6 glassmorphism p-6 rounded-lg"
      >
        {/* Input Prompt */}
        <div className="form_group">
          <label className="text-gray-900 font-semibold mb-2 block">
            Your AI Prompt
          </label>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({...post, prompt: e.target.value})}
            placeholder="Write your prompt here..."
            required
            className="form_textarea h-40"
          />
        </div>

        {/* Input Tag */}
        <div className="form_group">
          <label className="text-gray-900 font-semibold mb-2 block">
            Tag{" "}
            <span className="font-normal text-gray-900">
              (#product, #webdeveloper, #idea)
            </span>
          </label>
          <input
            value={post.tag}
            onChange={(e) => setPost({...post, tag: e.target.value})}
            placeholder="#tag"
            required
            className="form_input"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <Link
            href="/"
            className="px-4 py-2 text-gray-900 font-bold text-sm rounded-md border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2 text-sm bg-green-800 rounded-md text-white font-bold hover:bg-green-700 transition disabled:opacity-50"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
