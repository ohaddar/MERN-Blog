import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCreatePostContext } from "./CreatePostContext";

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
  } = useCreatePostContext();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const createNewPost = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    if (file) {
      data.set("file", file); // Set the file in FormData
    }

    try {
      const response = await fetch("http://localhost:4000/post", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={createNewPost}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input type="file" onChange={handleFileChange} />
      <ReactQuill value={content} onChange={setContent} />
      <button
        type="submit"
        className="mt-5 bg-amber-700 w-40 h-8 mx-96 font-bold"
      >
        Create Post
      </button>
    </form>
  );
};
