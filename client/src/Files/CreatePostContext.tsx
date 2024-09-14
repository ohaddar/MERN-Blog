import React, { ReactNode, createContext, useContext, useState } from "react";
import { Post } from "../types";

interface PostContextProps {
  title: string;
  summary: string;
  content: string;
  file: File | null;
  setTitle: (title: string) => void;
  setSummary: (summary: string) => void;
  setContent: (content: string) => void;
  setFile: (file: File | null) => void;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  addPost: (post: Post) => void;
}

const CreatePostContext = createContext<PostContextProps | undefined>(
  undefined
);
export const useCreatePostContext = () => {
  const context = useContext(CreatePostContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
};
interface PostProviderProps {
  children: ReactNode;
}
export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const addPost = (post: Post) => {
    setPosts((prevPosts) => [...prevPosts, post]);
  };

  return (
    <CreatePostContext.Provider
      value={{
        title,
        summary,
        content,
        file,
        posts,

        setTitle,
        setSummary,
        setContent,
        setFile,
        addPost,
        setPosts,
      }}
    >
      {children}
    </CreatePostContext.Provider>
  );
};
