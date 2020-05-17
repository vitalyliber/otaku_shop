import moment from 'moment';

import Photo from "./Photo";

function Card({ item }) {
  const { image, title, desc, updated_at, price } = item;
  return (
    <>
      <div className="card m-2 mb-3 m-sm-0 mb-sm-3">
        <Photo item={image} title={title} />
        <div className="card-body">
          <h3>{title}</h3>
          {desc &&
            <p className="mt-2">{desc}</p>
          }
          <p className="mt-2 text-muted font-weight-bold">{price} $</p>
          <small>
            <p className="text-muted">{moment(updated_at).fromNow()}</p>
          </small>
          <div
            href=""
            className="btn btn-primary btn-sm btn-block"
          >
            Add to cart
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
