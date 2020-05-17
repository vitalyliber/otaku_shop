import React from "react";
import moment from "moment";

function Footer() {
  return (
    <footer className="text-muted pb-3 pt-3 bg-dark mt-3">
      <div className="container">
        <p className="mb-0 text-center text-white">
          Developed by{" "}
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
