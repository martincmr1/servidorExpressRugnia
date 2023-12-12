const { faker } = require("@faker-js/faker");

const generateProducts = (numProducts) => {
  const products = [];

  for (let i = 0; i < numProducts; i++) {
    products.push(generateProduct());
  }

  return products;
};

const generateProduct = () => {
  const numOfProducts = faker.string.numeric();

  const products = [];

  for (let i = 0; i < numOfProducts; i++) {
    products.push(generateProducts());
  }

  return {
    _id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    stock: faker.string.numeric({ length: 2, exclude: ["0"] }),
    description: faker.lorem.lines(3),
    image: faker.image.urlLoremFlickr({ category: "food" }),
  };
};

module.exports = generateProducts;
