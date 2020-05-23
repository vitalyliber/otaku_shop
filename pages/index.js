import React, { useMemo } from "react";
import I18n from "../utils/i18n";
import Header from "../components/Header";
import Link from "next/link";
import Footer from "../components/Footer";
import useI18n from "../effects/useI18n";

function HomePage({}) {
  const lang = useMemo(() => I18n({}).currentLocale(), []);
  const i18n = useI18n();

  return (
    <div className="mainWrapper">
      <Header />
      <br />
      <div className="container wrapper">
        <div className="row">
          <div className="col">
            <div className="jumbotron text-center bg-dark text-white">
              <h1 className="display">{i18n.t("title")}</h1>
              <p className="lead">{i18n.t("desc")}</p>
              <Link href="/[lang]" as={`/${lang}`}>
                <a
                  className="btn btn-primary btn-lg mt-4"
                  href="#"
                  role="button"
                >
                  {i18n.t("go_to_website")}
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <style jsx>{`
        .wrapper {
          height: calc(100vh - 152px);
        }
        .mainWrapper {
          background-color: aquamarine;
        }
      `}</style>
    </div>
  );
}

export default HomePage;
