import "./App.css";
import IndexPage from "./Files/IndexPage";
import LoginPage from "./Files/LoginPage";
import RegisterPage from "./Files/RegisterPage";
import Layout from "./pages/Layout";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default App;
