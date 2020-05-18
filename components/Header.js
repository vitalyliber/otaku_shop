import { useEffect } from "react";
import useSWR, { mutate } from "swr";
import Head from "next/head";
import Link from "next/link";
import colors from "../utils/colors";

const title = "Magatama";
const desc =
  "Great place to get your anime merchandise, props and accessories.";
const Header = () => {
  useEffect(() => {
    const productsData = localStorage.getItem("products");
    if (productsData) {
      const newProducts = JSON.parse(productsData);
      setTimeout(
        () => mutate("/api/cart", { products: newProducts }, false),
        1000
      );
    }
  }, []);
  const { data } = useSWR("/api/cart", () => null, {
    initialData: { products: [] },
  });
  let products = [];
  if (data && data.products) {
    products = data.products;
  }
  console.log("products..", products);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="Description" content={desc} />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="https://magatama.casply.com/favicon.ico"
        />
        <link
          rel="apple-touch-icon"
          type="image/png"
          href="https://magatama.casply.com/favicon.png"
        />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="https://magatama.casply.com/twitter-card.jpg"
        />
      </Head>

      <nav className="navbar navbar-light bg-dark">
        <div className="container justify-content-between">
          <Link href="/" as="/">
            <a className="navbar-brand text-white">
              <span>Magatama</span> Shop
            </a>
          </Link>
          <div className="text-white d-flex align-items-center">
            Cart{" "}
            {products && products.length > 0 && (
              <span className="badge badge-light text-dark ml-2">
                {products.length}
              </span>
            )}
          </div>
        </div>
      </nav>
      <style jsx>{`
        span {
          color: ${colors.main};
        }
      `}</style>
    </>
  );
};

export default Header;
