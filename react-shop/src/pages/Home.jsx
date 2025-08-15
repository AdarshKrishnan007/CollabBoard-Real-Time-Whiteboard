import React, { useState, useEffect } from "react";
import "./Home.css";

import CategoryCard from "../components/ui/cards/CategoryCard";
import Sidebar from "../components/navigation/sidebar";
import CategoryPage from "./CategoryPage";
import Navbar from "../components/navigation/navbar";
import Dashboard from "./Dashboard";
import AppRoutes from "../routes/AppRoutes";

const Home = () => {
  const [data, setData] = useState([]);
  const [filterCategory, setFilterCategory] = useState("all");

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  const filteredItems = data.filter((item) => {
    if (filterCategory === "active") return item.isActive;
    if (filterCategory === "inactive") return !item.isActive;
    return true; // show all
  });

  const handleRemoveCard = (nameRemove) => {
    setData(data.filter((item) => item.name !== nameRemove));
  };

  return (
    <section className="hero">
      <Navbar className="topbar" />

      <Sidebar className="sidebar" />

      {/* <CategoryPage
        filterCategory={filterCategory}
        onFilterChange={setFilterCategory}
        className="category"
      /> */}
      <div className="category-layout">
        <AppRoutes />
      </div>
    </section>
  );
};

export default Home;
