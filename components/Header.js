import useSWR from "swr";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import colors from "../utils/colors";
import { loadCartProducts } from "../api/cart";
import useI18n from "../effects/useI18n";

const title = "Magatama";
const desc =
  "Great place to get your anime merchandise, props and accessories.";
const Header = () => {
  const i18n = useI18n();
  const router = useRouter();
  const { lang } = router.query;
  const { data } = useSWR("/api/cart", loadCartProducts, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  let products = [];
  if (data && data.list) {
    products = data.list;
  }
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
          <Link href={`/${lang ? "[lang]" : ""}`} as={`/${lang || ""}`}>
            <a className="navbar-brand text-white">
              <span>Magatama</span> Shop
            </a>
          </Link>
          <Link href="/[lang]/cart" as={`/${lang}/cart`}>
            <a className="text-white d-flex align-items-center">
              {i18n.t("cart")}{" "}
              {products && products.length > 0 && (
                <span className="badge badge-light text-dark ml-2">
                  {products.length}
                </span>
              )}
            </a>
          </Link>
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
