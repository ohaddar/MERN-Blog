import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCreatePostContext } from "./CreatePostContext";
import { useAuth } from "./AuthContext";

export const CreatePostPage: React.FC = () => {
  const {
    title,
    summary,
    content,
    file,
    setTitle,
    setSummary,
    setContent,
    setFile,
    addPost,
  } = useCreatePostContext();
  const { post } = useAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const createNewPost = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission

    const data = new FormData();
    data.append("title", title);
    data.append("summary", summary);
    data.append("content", content);
    if (file) {
      data.append("file", file); // Append the file to FormData
    }

    try {
      const response = await fetch("http://localhost:4000/post", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);

        // Assurez-vous que result contient l'ID
        // Exemple de structure attendue de result : { _id: "...", title: "...", ... }
        if (result._id) {
          addPost(result); // Ajoutez le post au contexte avec l'ID inclus
        } else {
          console.error("Post creation failed: Missing post ID");
        }

        // Optionnel : rediriger ou effectuer d'autres actions après la création du post
        post();
      } else {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form
      onSubmit={createNewPost}
      className="space-y-6 max-w-3xl mx-auto p-6 bg-white rounded-md shadow-lg"
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
      <input
        type="file"
        onChange={handleFileChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
      <ReactQuill
        value={content}
        onChange={setContent}
        className="h-64 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
      <button
        type="submit"
        className="absolute w-[86%] bg-purple-600 text-white py-2 rounded-md font-bold hover:bg-purple-800"
      >
        Create Post
      </button>
    </form>
  );
};
