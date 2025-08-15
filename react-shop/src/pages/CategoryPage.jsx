import "./CategoryPage.css";

const CategoryPage = ({ filterCategory, onFilterChange, className }) => {
  return (
    <div className={`category-flex ${className}`}>
      <div className="left-part">
        <h1>Extensions List</h1>
      </div>
      <div className="right-part">
        <button
          className={filterCategory === "all" ? "active-btn" : ""}
          onClick={() => onFilterChange("all")}
        >
          All
        </button>

        <button
          className={filterCategory === "active" ? "active-btn" : ""}
          onClick={() => onFilterChange("active")}
        >
          Active
        </button>

        <button
          className={filterCategory === "inactive" ? "active-btn" : ""}
          onClick={() => onFilterChange("inactive")}
        >
          Inactive
        </button>
      </div>
    </div>
  );
};

export default CategoryPage;
