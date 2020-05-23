import React, { useMemo } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import useSWR from "swr";
import { fetchProducts } from "../../api/products";
import Card from "../../components/Card";
import { loadCartProducts } from "../../api/cart";
import useI18n from "../../effects/useI18n";

const Cart = () => {
  const i18n = useI18n();
  const { data: cartData } = useSWR("/api/cart", loadCartProducts, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const { data, error } = useSWR(["/api/cart/all", cartData], () => {
    if (cartData && cartData.list.length > 0) {
      return fetchProducts({
        lang: i18n.currentLocale(),
        ids: cartData && cartData.list.map((el) => el.id),
      });
    } else {
      return [];
    }
  });
  let products = [];
  if (data && data.list) {
    products = data.list;
  }
  const sum = useMemo(() => {
    let allSum = 0;
    if (products.length > 0) {
      cartData.list.forEach((cartEl) => {
        const apiEl = products.find((el) => el.id === cartEl.id);
        allSum += cartEl.amount * apiEl.price;
      });
    }
    return allSum;
  }, [data]);
  const generateListOfLinks = useMemo(() => {
    if (products.length > 0 && cartData && cartData.list.length > 0) {
      return products
        .map(({ title, id }) => {
          const cartEl = cartData.list.find((el) => el.id === id);
          return `${title} (${cartEl.amount})`;
        })
        .join(",%20");
    }
    return "";
  }, data);
  return (
    <>
      <Header />
      <br />
      <h4 className="text-center">{i18n.t('products_in_cart')}</h4>
      <br />
      <div className="container">
        <div className="row">
          <div className="col">
            {error && <div>{i18n.t('failed_to_load')}</div>}
            {!data && <div className="text-center">{i18n.t("loading")}</div>}
            <div className="card-columns">
              {products.map((el) => (
                <Card key={el.id} item={el} />
              ))}
            </div>
            {data && products.length === 0 && (
              <div className="text-center">{i18n.t("list_is_empty")}</div>
            )}
            <br />
            <h5 className="text-center text-muted">
              {sum} {i18n.t("currency")}
            </h5>
            <br />
            {products.length === 0 && (
              <button
                disabled={products.length === 0}
                className="btn btn-info btn-block btn-lg"
              >
                {i18n.t("create_order")}
              </button>
            )}
            {products.length > 0 && (
              <a
                href={`https://wa.me/79194825880?text=I%20want%20to%20make%20order%20with%20price%20${sum}USD%20${generateListOfLinks}`}
                className="btn btn-info btn-block btn-lg"
              >
                {i18n.t("create_order")}
              </a>
            )}
            <p className="text-center mb-0 mt-2">
              <small>{i18n.t("whatsapp_cart_notice")}</small>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
