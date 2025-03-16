"use client";

import React, {useEffect, useState} from "react";
import PromptCard from "./PromptCard";

// Komponen PromptCardList bertanggung jawab untuk menampilkan daftar kartu prompt
const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className="mt-8 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

// Komponen utama Feed bertanggung jawab untuk menangani pencarian dan mengambil data prompt dari API
const Feed = () => {
  const [searchText, setSearchText] = useState(""); // State untuk menyimpan teks pencarian
  const [posts, setPosts] = useState([]); // State untuk menyimpan daftar prompt yang diambil dari API
  const [filteredPosts, setFilteredPosts] = useState([]);

  // Mengambil data prompt dari API ketika komponen pertama kali dirender
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch("/api/prompt"); // Memanggil endpoint API untuk mendapatkan data prompt
        const data = await response.json(); // Mengonversi response menjadi format JSON

        setPosts(data); // Menyimpan data prompt ke dalam state
        setFilteredPosts(data); // default, tampilkan semua data
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };

    fetchPost();
  }, []); // Efek ini hanya dijalankan sekali saat komponen pertama kali dimuat (karena dependensi [] kosong)

  // Fungsi untuk menangani perubahan input pencarian (belum diimplementasikan)
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchText(query);

    // filter berdasarkan prompt, tag, atau username
    const filtered = posts.filter(
      (post) =>
        post.prompt.toLowerCase().includes(query) ||
        post.tag.toLowerCase().includes(query) ||
        post.creator.username.toLowerCase().includes(query)
    );

    setFilteredPosts(filtered);
  };

  // handle click tag
  const handleTagClick = (tag) => {
    setSearchText(tag);
    const filtered = posts.filter((post) =>
      post.tag.toLowerCase().includes(tag.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  return (
    <section className="feed">
      {/* Form untuk pencarian prompt berdasarkan tag atau username */}
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username" // Placeholder untuk input pencarian
          value={searchText} // Menghubungkan state searchText dengan input
          onChange={handleSearchChange} // Memanggil fungsi handleSearchChange ketika input berubah
          required // Input harus diisi sebelum form bisa dikirim
          className="search_input peer" // Kelas Tailwind CSS untuk styling
        />
      </form>

      {/* Menampilkan daftar prompt yang diambil dari API */}
      <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
