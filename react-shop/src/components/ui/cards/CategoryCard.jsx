import "./card.css";

const CategoryCard = ({ logo, name, description, isActive, onRemove }) => {
  return (
    <div className="category-card">
      <div className="Top-part">
        <div className="left-part">
          <img src={logo} alt="no-image" />
        </div>
        <div className="right-part">
          <h1>{name}</h1>
          <p>{description}</p>
        </div>
      </div>

      <div className="Bottom-part">
        <button onClick={() => onRemove(name)}>Remove</button>

        <div className="toggle-btn">
          <label class="switch">
            <input type="checkbox" checked={isActive} />
            <span class="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
