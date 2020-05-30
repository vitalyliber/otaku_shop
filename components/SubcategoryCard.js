import React from "react";
import useI18n from "../effects/useI18n";
import Image from "./Image";
import Link from "next/link";

const SubcategoryCard = ({
  categoryId,
  item: {
    id,
    title,
    image,
  },
}) => {
  const i18n = useI18n();
  const lang = i18n.currentLocale();
  return (
    <div className="card">
      <Image item={image} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <Link
          href="/[lang]/categories/[category_id]/subcategories/[subcategory_id]"
          as={`/${lang}/categories/${categoryId}/subcategories/${id}`}
        >
          <a className="btn btn-primary btn-block">
            {i18n.t("open")}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default SubcategoryCard;
