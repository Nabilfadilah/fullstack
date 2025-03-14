"use client";

import React, {useState} from "react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import Form from "@/components/Form";

const page = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  // deklarasi session
  const {data: session} = useSession();
  const router = useRouter();

  const createPrompt = async (e) => {
    e.preventDefault();

    // kondisi untuk mengecek session (ke cobaan pake nu di comment)
    // if (!session?.user) {
    //   alert("You must be logged in to create a prompt.");
    //   return;
    // }

    setSubmitting(true);

    // api call
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          // userId: session.user.id, // Pasti sudah terdefinisi
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
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
      />
    </div>
  );
};

export default page;
