import React, { useEffect } from "react";
import { useCreatePostContext } from "../Files/CreatePostContext";
import axios from "axios";
import { Link } from "react-router-dom";

export const Post: React.FC = () => {
  const { posts, setPosts } = useCreatePostContext();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("There was an error fetching the posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
        Posts
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <article key={post._id} className="bg-white p-4 rounded-lg shadow-md">
            <header>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
                {post.title}
              </h2>
            </header>

            {post.cover && (
              <figure className="post-cover mb-4">
                <img
                  className="w-full h-48 object-cover rounded-md shadow-sm"
                  src={`http://localhost:4000/${post.cover}`}
                  alt="Post Cover"
                />
              </figure>
            )}

            <section className="text-gray-700 leading-relaxed text-sm md:text-base mb-4">
              {/* Affiche un extrait du contenu */}
              {post.summary}
            </section>

            <Link
              to={`/posts/${post._id}`} // Redirige vers la page de détail de l'article
              className="text-blue-500 hover:underline"
            >
              Lire la suite
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};
