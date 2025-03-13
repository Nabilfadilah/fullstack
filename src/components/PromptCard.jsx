"use client";

import Image from "next/image";
import React, {useState} from "react";

const PromptCard = ({post, handleTagClick, handleEdit, handleDelete}) => {
  const [copied, setCopied] = useState(""); // State untuk menyimpan teks yang sudah disalin

  // Fungsi untuk menyalin teks prompt ke clipboard
  const handleCopy = () => {
    setCopied(post.prompt); // Menandai bahwa prompt ini telah disalin
    navigator.clipboard.writeText(post.prompt); // Salin teks ke clipboard

    // Setelah 3 detik, hapus status "copied"
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <div className="prompt_card">
      {/* Bagian atas kartu: menampilkan informasi pengguna */}
      <div className="flex justify-between items-start gap-5">
        {/* Informasi pengguna (foto, nama, email) */}
        <div className="flex-1 flex justify-center items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image} // Gambar profil pengguna
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username} {/* Nama pengguna */}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email} {/* Email pengguna */}
            </p>
          </div>
        </div>

        {/* Tombol untuk menyalin prompt */}
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt ? "/assets/tick.svg" : "/assets/copy.svg"
            } // Ubah ikon jika prompt sudah disalin
            alt="copy_icon"
            width={16}
            height={16}
          />
        </div>
      </div>

      {/* Bagian isi prompt */}
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>

      {/* Tag prompt (dapat diklik jika handleTagClick ada) */}
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
    </div>
  );
};

export default PromptCard;
