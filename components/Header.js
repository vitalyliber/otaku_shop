import Head from "next/head";
import Link from "next/link";
import colors from "../utils/colors";

const title = "Magatama";
const desc =
  "Great place to get your anime merchandise, props and accessories.";
const Header = () => {
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
