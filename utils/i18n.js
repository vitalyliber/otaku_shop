import I18n from "i18n-js";
import browserLang from "browser-lang";
I18n.defaultLocale = "en";
I18n.translations["en"] = {
  loading: "Loading...",
  title: "Magatama",
  desc: "Great place to get your anime merchandise, props and accessories.",
  go_to_website: "Go to website",
  whatsapp_cart_notice: "* Directly connect to supplier via WhatsApp",
  create_order: "Create order",
  currency: "$",
  add_to_cart: "Add to cart",
  list_is_empty: "List is empty",
  products_in_cart: "Products in a cart",
  failed_to_load: "Failed to load",
  developed_by: "Developed by",
  cart: "Cart",
};
I18n.translations["ru"] = {
  loading: "Загрузка...",
  title: "Magatama",
  desc: "Аниме товары, реквизит и аксессуары.",
  go_to_website: "Открыть",
  whatsapp_cart_notice: "* Заказ будет сформирован через WhatsApp",
  create_order: "Создать заказ",
  currency: "₽",
  add_to_cart: "Добавить в корзину",
  list_is_empty: "Список пуст",
  products_in_cart: "Продукты в корзине",
  failed_to_load: "Ошибка загрузки",
  developed_by: "Разработан",
  cart: "Корзина",
};
const languages = ["ru", "en"];
const fallback = "en";
const i18nInit = ({ lang = fallback, force = false }) => {
  if (force) {
    I18n.locale = languages.includes(lang) ? lang : fallback;
  } else {
    if (process.browser) {
      const myLanguage = browserLang({
        languages: languages,
        fallback,
      });
      I18n.locale = myLanguage || lang;
    } else {
      I18n.locale = lang;
    }
  }
  return I18n;
};

export default i18nInit;
