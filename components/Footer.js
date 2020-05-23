import React from "react";
import moment from "moment";
import useI18n from "../effects/useI18n";

function Footer() {
  const i18n = useI18n();
  return (
    <footer className="text-muted pb-3 pt-3 bg-dark mt-3">
      <div className="container">
        <p className="mb-0 text-center text-white">
          {i18n.t('developed_by')}{" "}
          <a target="_blank" href="https://github.com/vitalyliber">
            Vitaly Liber,
          </a>{" "}
          {moment().format("YYYY")}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
