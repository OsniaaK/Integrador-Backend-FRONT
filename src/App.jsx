import GeneralHeader from "./components/Header/GeneralHeader.jsx";
import { Routes, Route, Outlet } from "react-router";
import Home from "./page/Home/Home.jsx";
import Products from "./page/Products/Products.jsx";
import Contact from "./page/Contact/Contact.jsx";
import About from "./page/About/About.jsx";
import AdminPanel from "./page/Admin/AdminPanel";

export const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <GeneralHeader />
              <Outlet />
            </>
          }
        >
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
        </Route>
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </>
  );
};
