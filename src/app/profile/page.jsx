"use client";

import Profile from "@/components/Profile";
import {useSession} from "next-auth/react";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

const page = () => {
  const {data: session} = useSession();
  const [posts, setPosts] = useState([]);

  // router
  const router = useRouter();

  // Mengambil data prompt dari API ketika komponen pertama kali dirender
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`); // Memanggil endpoint API untuk mendapatkan data prompt
      const data = await response.json(); // Mengonversi response menjadi format JSON

      setPosts(data); // Menyimpan data prompt ke dalam state
    };

    if (session?.user.id) fetchPost();
  }, []); // Efek ini hanya dijalankan sekali saat komponen pertama kali dimuat (karena dependensi [] kosong)

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = () => {};

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default page;
