export const loadCartProducts = () => {
  const productsData = localStorage.getItem("products");
  let newProducts = []
  if (productsData) {
    newProducts = JSON.parse(productsData);
  }
  return { list: newProducts };
};
