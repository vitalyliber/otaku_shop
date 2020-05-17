import Footer from "../components/Footer";
import Header from "../components/Header";
import Card from "../components/Card";
import {fetchProducts} from "../api/products";

export default function Home({ list }) {
  return (
    <>
      <Header />
      <br/>
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
      <Footer />
    </>
  )
}

export async function getStaticProps({ params }) {
  const { list } = await fetchProducts();
  return { unstable_revalidate: 1, props: { list } };
}
