import React, { useState, useEffect } from "react";
import "./App.css";
import { supabase } from "./client";
import CardInfoPage from "./pages/CardInfoPage";
import CreatePage from "./pages/CreatePage";
import GalleryPage from "./pages/GalleryPage";
import HomePage from "./pages/HomePage";
import UpdatePage from "./pages/UpdatePage";
import Navbar from "./components/Navbar";
import PageNotFound from "./pages/PageNotFound";
import { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";

const App = () => {
  const [crewmates, setCrewmates] = useState([]);

  useEffect(() => {
    const fetchCrewmates = async () => {
      const { data } = await supabase
        .from("Crew")
        .select()
        .order("created_at", { ascending: true });

      // set state of posts
      setCrewmates(data);
    };
    fetchCrewmates();
  }, []);

  return (
    <Router>
      <Toaster position="bottom-center" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Outlet />
            </>
          }
        >
          <Route index={true} element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/barracks" element={<GalleryPage data={crewmates} />} />
          <Route
            path="/barracks/:id"
            element={<CardInfoPage data={crewmates} />}
          />
          <Route
            path="/barracks/editRebel/:id"
            element={<UpdatePage data={crewmates} />}
          />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
