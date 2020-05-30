import moment from "moment";
import { fetchProducts } from "../api/products";

const Sitemap = () => null;
Sitemap.getInitialProps = async (ctx) => {
  const hostname = "https://magatama.casply.com";
  let content = "";
  const addUrl = ({
    url = "",
    updated_at = "",
    changefreq = "daily",
    priority = "0.5",
  } = {}) =>
    (content += `<url><loc>${hostname}${url}</loc><lastmod>${moment(
      updated_at
    ).format(
      "YYYY-MM-DD"
    )}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`);

  const { res } = ctx;
  if (!res) return {};
  res.setHeader("content-type", "application/xml");
  const { list } = await fetchProducts({ sitemap: true });
  list.forEach(({ id, updated_at }) =>
    addUrl({ url: `/ru/products/${id}`, updated_at })
  );
  list.forEach(({ id, updated_at }) =>
    addUrl({ url: `/en/products/${id}`, updated_at })
  );
  res.setHeader("content-type", "application/xml");
  res.end(
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${content}</urlset>`
  );
  return {};
};
export default Sitemap;
