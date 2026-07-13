import { Route, Routes, useLocation } from "react-router";
import { LoginApp } from "./LoginApp/LoginApp";
import { ChatApp } from "./ChatApp/ChatApp";
import { ProductDetail } from "./ProductDetail/ProductDetail";
import { Header } from "./Header";

function RoutesApp() {
  const location = useLocation();
  const isLoginScreen = location.pathname === "/";
  return (
    <>
      {/* {!isLoginScreen && <Header />} */}
      <Routes>
        <Route path="/" element={<LoginApp />} />
        <Route path="/chat" element={<ChatApp />} />
        <Route path="/product" element={<ProductDetail />} />
      </Routes>
    </>
  );
}

export default RoutesApp;
