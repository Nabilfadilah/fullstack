import Prompt from "@/models/prompt";
import {connectToDB} from "@/utils/database";

// get (read)
export const GET = async (request, {params}) => {
  try {
    await connectToDB(); // Menghubungkan ke database sebelum melakukan query

    // Mengambil semua data prompt dari database dan sekaligus mengambil data creator-nya
    const prompts = await Prompt.findById(params.id).populate("creator");

    // Mengembalikan response dalam format JSON dengan status 200 (OK)
    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    // Jika terjadi error, mengembalikan response dengan pesan error dan status 500 (Internal Server Error)
    return new Response("Failed to fetch all prompts", {
      status: 500,
    });
  }
};

// patch (update)
export const PATCH = async (request, {params}) => {
  const {prompt, tag} = await request.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) return new Response("Prompt not found", {status: 404});

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), {status: 200});
  } catch (error) {
    return new Response("Failed to fetch all prompts", {
      status: 500,
    });
  }
};

// delete
export const DELETE = async (request, {params}) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndDelete(params.id);

    return new Response("Prompt delete successfully", {status: 200});
  } catch (error) {
    return new Response("Failed to fetch all prompts", {
      status: 500,
    });
  }
};
