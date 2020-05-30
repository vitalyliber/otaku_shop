import React from "react";
import SubcategoryCard from "./SubcategoryCard";

const Categories = ({ list }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          {list.map((category) => (
            <div key={category.id}>
              <h2 className="text-muted pb-3 mt-2">{category.title}</h2>
              <div className="card-columns">
                {category.subcategories.map((el) => (
                  <SubcategoryCard categoryId={category.id} item={el} />
                ))}
              </div>
            </div>
          ))}
          <br />
        </div>
      </div>
    </div>
  );
};

export default Categories;
