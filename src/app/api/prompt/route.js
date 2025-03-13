import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";

// Mendefinisikan fungsi GET untuk menangani permintaan GET ke endpoint ini
export const GET = async (request) => {
    try {
        await connectToDB(); // Menghubungkan ke database sebelum melakukan query

        // Mengambil semua data prompt dari database dan sekaligus mengambil data creator-nya
        const prompts = await Prompt.find({}).populate('creator');

        // Mengembalikan response dalam format JSON dengan status 200 (OK)
        return new Response(JSON.stringify(prompts), {
            status: 200
        });
    } catch (error) {
        // Jika terjadi error, mengembalikan response dengan pesan error dan status 500 (Internal Server Error)
        return new Response("Failed to fetch all prompts", {
            status: 500
        });
    }
};