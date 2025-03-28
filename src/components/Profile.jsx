"use client";

import React from "react";
import PromptCard from "./PromptCard";

const Profile = ({name, desc, data, handleEdit, handleDelete}) => {
  return (
    <section className="mx-3 w-full">
      <h5 className="text-2xl mt-5 font-bold text-gray-300 text-left">
        {name} Profile
      </h5>
      <p className="desc text-left">{desc}</p>

      <div className="mt-2 prompt_Profile_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
