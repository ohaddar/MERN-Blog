import { AuthProvider } from "./Files/AuthContext";
import { PostProvider } from "./Files/CreatePostContext";
import { CreatePostPage } from "./Files/CreatePostPage";
import IndexPage from "./Files/IndexPage";
import LoginPage from "./Files/LoginPage";
import RegisterPage from "./Files/RegisterPage";
import Layout from "./pages/Layout";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/create" element={<CreatePostPage />} />
          </Route>
        </Routes>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;
