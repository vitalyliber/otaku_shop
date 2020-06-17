import { useRouter } from "next/router";
import Header from "../../../components/Header";
import React from "react";
import Loading from "../../../components/Loading";
import Head from "next/head";
import Footer from "../../../components/Footer";
import { fetchProduct } from "../../../api/products";
import Card from "../../../components/Card";

function Packages({ data }) {
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
  const { title, desc, image } = data;
  return (
    <div>
      <Header />
      <Head>
        <title>{title}</title>
        <meta name="Description" content={desc} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={image && image.url} />
      </Head>
      <br />
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12 col-sm-12 col-md-12 col-lg-8">
            <Card item={data} shortDesc={false} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Packages;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}
export async function getStaticProps({ params }) {
  const { id, lang } = params;
  const data = await fetchProduct({ id, lang });
  return { unstable_revalidate: 1, props: { data } };
}
