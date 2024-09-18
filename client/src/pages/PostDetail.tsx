import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Post } from "../types";
import { useAuth } from "../Files/AuthContext";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    fetch(`http://localhost:4000/posts/${id}`)
      .then((response) => response.json())
      .then((data) => setPost(data))
      .catch((error) => console.error("Error fetching post:", error));
  }, [id, isAuthenticated, navigate]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
        {post.title}
      </h1>

      {post.cover && (
        <figure className="post-cover mb-6">
          <img
            className="w-full h-64 object-cover rounded-md shadow-sm"
            src={`http://localhost:4000/${post.cover}`}
            alt="Post Cover"
          />
        </figure>
      )}

      <section
        className="text-gray-700 leading-relaxed text-sm md:text-base"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
};

export default PostDetail;
