import { useRouter } from "next/router";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Card from "../../components/Card";
import {fetchProducts} from "../../api/products";
import Loading from "../../components/Loading";

export default function Home({ list }) {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <>
        <Header />
        <br />
        <Loading />
      </>
    );
  }
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

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  };
}

export async function getStaticProps({ params }) {
  const { lang } = params;
  const { list } = await fetchProducts({lang});
  return { unstable_revalidate: 1, props: { list } };
}
