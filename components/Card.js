import { useMemo } from "react";
import useSWR, { mutate } from "swr";

import Photo from "./Photo";
import { loadCartProducts } from "../api/cart";
import useI18n from "../effects/useI18n";
import Link from "next/link";

function Card({ item }) {
  const i18n = useI18n();
  const lang = i18n.currentLocale();
  const { data } = useSWR("/api/cart", loadCartProducts, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  let products = [];
  if (data && data.list) {
    products = data.list;
  }
  const {
    id,
    image,
    title,
    desc,
    currency,
    price,
    image_big: { url },
  } = item;
  const existingProduct = useMemo(() => products.find((el) => el.id === id), [
    products,
    id,
  ]);

  return (
    <>
      <div className="card m-2 mb-3 m-sm-0 mb-sm-3">
        <Photo item={image} title={title} big_url={url} />
        <div className="card-body">
          <Link href="[lang]/products/[id]" as={`${lang}/products/${id}`}>
            <a>
              <h3 className="text-dark">{title}</h3>
            </a>
          </Link>
          {desc && <p className="mt-2">{desc}</p>}
          <p className="mt-2 text-muted font-weight-bold">
            {price} {currency}
          </p>
          {!existingProduct && (
            <div
              onClick={() => {
                let newProducts = [];
                let amount = 1;
                if (existingProduct) {
                  amount = existingProduct.amount + 1;
                  newProducts = [
                    ...products.filter((el) => el.id !== id),
                    { id, amount },
                  ];
                } else {
                  newProducts = [...products, { id, amount }];
                }
                localStorage.setItem("products", JSON.stringify(newProducts));
                mutate("/api/cart", { list: newProducts }, false);
              }}
              className="btn btn-primary btn-sm btn-block"
            >
              {i18n.t("add_to_cart")}
            </div>
          )}
          {existingProduct && (
            <div className="btn btn-primary btn-sm btn-block">
              <div className="d-flex justify-content-between">
                <div
                  onClick={() => {
                    if (existingProduct.amount === 1) {
                      const newProducts = [
                        ...products.filter((el) => el.id !== id),
                      ];
                      localStorage.setItem(
                        "products",
                        JSON.stringify(newProducts)
                      );
                      mutate("/api/cart", { list: newProducts }, false);
                    } else {
                      const amount = existingProduct.amount - 1;
                      const newProducts = [
                        ...products.filter((el) => el.id !== id),
                        { id, amount },
                      ];
                      localStorage.setItem(
                        "products",
                        JSON.stringify(newProducts)
                      );
                      mutate("/api/cart", { list: newProducts }, false);
                    }
                  }}
                  className="w-25 font-weight-bold"
                >
                  -
                </div>
                <div className="font-weight-bold">{existingProduct.amount}</div>
                <div
                  className="w-25 font-weight-bold"
                  onClick={() => {
                    const amount = existingProduct.amount + 1;
                    const newProducts = [
                      ...products.filter((el) => el.id !== id),
                      { id, amount },
                    ];
                    localStorage.setItem(
                      "products",
                      JSON.stringify(newProducts)
                    );
                    mutate("/api/cart", { list: newProducts }, false);
                  }}
                >
                  +
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Card;
