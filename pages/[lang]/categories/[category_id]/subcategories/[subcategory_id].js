import React from "react";
import Header from "../../../../../components/Header";
import { fetchProducts } from "../../../../../api/products";
import Card from "../../../../../components/Card";

const CategorySubcategory = ({ list }) => {
  return (
    <>
      <Header />
      <br />
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card-columns">
              {list.map((el) => (
                <Card key={el.id} item={el} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategorySubcategory;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { lang, category_id, subcategory_id } = params;
  const { list } = await fetchProducts({ lang, category_id, subcategory_id });
  return { unstable_revalidate: 1, props: { list } };
}
