import { useMemo } from "react";
import moment from "moment";
import useSWR, { mutate } from "swr";

import Photo from "./Photo";
import {loadCartProducts} from "../api/cart";

function Card({ item }) {
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
    updated_at,
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
          <h3>{title}</h3>
          {desc && <p className="mt-2">{desc}</p>}
          <p className="mt-2 text-muted font-weight-bold">{price} $</p>
          <small>
            <p className="text-muted">{moment(updated_at).fromNow()}</p>
          </small>
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
                localStorage.setItem('products', JSON.stringify(newProducts))
                mutate("/api/cart", { list: newProducts }, false);
              }}
              className="btn btn-primary btn-sm btn-block"
            >
              Add to cart
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
                      localStorage.setItem('products', JSON.stringify(newProducts))
                      mutate("/api/cart", { list: newProducts }, false);
                    } else {
                      const amount = existingProduct.amount - 1;
                      const newProducts = [
                        ...products.filter((el) => el.id !== id),
                        { id, amount },
                      ];
                      localStorage.setItem('products', JSON.stringify(newProducts))
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
                    localStorage.setItem('products', JSON.stringify(newProducts))
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
