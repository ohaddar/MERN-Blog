import { AuthProvider } from "./Files/AuthContext";
import { PostProvider } from "./Files/CreatePostContext";
import { CreatePostPage } from "./Files/CreatePostPage";
import IndexPage from "./Files/IndexPage";
import LoginPage from "./Files/LoginPage";
import RegisterPage from "./Files/RegisterPage";
import Layout from "./pages/Layout";
import { Route, Routes } from "react-router-dom";
import PostDetail from "./pages/PostDetail";

function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/Logout" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/create" element={<CreatePostPage />} />
            <Route path="/posts/:id" element={<PostDetail />} />
          </Route>
        </Routes>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;
