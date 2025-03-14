"use client";

import React, {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {useRouter, useSearchParams} from "next/navigation";
import Form from "@/components/Form";

const page = () => {
  // deklarasi session
  const router = useRouter();
  const {data: session} = useSession();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  // fetch api get data by id
  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);

      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  // update form
  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // cek apakah id ada
    if (!promptId) return alert("Prompt ID not found");

    // kondisi untuk mengecek session (ke cobaan pake nu di comment)
    if (!session?.user) {
      alert("You must be logged in to create a prompt.");
      return;
    }

    // api call
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
    </div>
  );
};

export default page;
