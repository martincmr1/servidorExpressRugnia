const mongoose = require("mongoose");

const { DELETE_ALL_USERS } = require("../sources/services/users.service");



const connectMongo = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://martincmr1:admin@cluster0.0spsbev.mongodb.net/ecommerce?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error);
  }
};

connectMongo();




const mockProduct = {
  title: "mochila",
  description: "urbana",
  code: "hhh55",
  price: 500,
  stock: 45,
  category: "nueva linea",
  thumbnails: "www.google.com.ar",
  status: "true",
};

const mockUser = {
  first_name: "Jose",
  last_Name: "Morales",
  age: 43,
  email: "martinybelen1980@.gmail.com",
  password: "1234",
  role: "admin",
};

const chai = require("chai");
const supertest = require("supertest");


const expect = chai.expect;
const requester = supertest("http://localhost:3000");

describe("testing de la API del e-commerce", () => {
  describe("Test de Carts", () => {
    it("el endpoint post debe crear un nuevo carrito", async () => {
      const response = await requester.post("/cartsMongo");
    
  
    
      const cartId = response.body.newCart._id;

      expect(cartId).to.exist;
    });
    it("el endpoint GET por ID devolvera el contenido del carrito", async () => {
      const response = await requester.post("/cartsMongo");

      const body = response.body.newCart;

      expect(body).to.have.property("products");
    });

    it("el enpoint Post cartsMongo/id/products/id debera agregar un producto al carrito", async () => {
      const response = await requester.post("/mongo").send(mockProduct);
      const productId = response.body.createdProduct._id;

      const responseCart = await requester.post("/cartsMongo");

      const cartID = responseCart.body.newCart._id;

      const newProductToCart = await requester.post(
        `/cartsMongo/${cartID}/products/${productId}/`
      );

      expect(newProductToCart.status).to.equal(200);
    });
  });

  describe("Test de products", () => {
    it("el endpoint POST /mongo debe crear un producto correctamente", async () => {
      const response = await requester.post("/mongo").send(mockProduct);
      expect(response.statusCode).to.equal(201);
      expect(response.body.createdProduct).to.have.property("_id");
    });

    it("error al crear un producto con el body vacio", async () => {
      const response = await requester.post("/mongo").send();

      expect(response.statusCode).to.equal(400);
      expect(response.body.message).to.equal(
        "Todos los campos son obligatorios o no tienen el formato adecuado"
      );
    });

    it("al obtener los productos con un metodo get la respuesta debe tener el campo status", async () => {
      const response = await requester.get("/mongo");
      expect(response.status).to.exist;
    });
    it("el metodo put debe actualizar correctamente el precio del producto ", async () => {
      const mockProductUpdate = {
        title: "cartera",
        description: "urban",
        code: "hhh55ggg",
        price: 5000000,
        stock: 45000000000,
        category: "nueva lineaa",
        thumbnails: "www.googlepage.com.ar",
        status: "false",
      };

      const createProductResponse = await requester
        .post("/mongo")
        .send(mockProduct);

      const originalProduct = createProductResponse.body.createdProduct;

      const responseID = originalProduct._id;

      const UpdatedProduct = await requester
        .put(`/mongo/${responseID}`)
        .send(mockProductUpdate);

      expect(UpdatedProduct.body.updatedProduct.price).to.not.equal(
        mockProduct.price
      );
    });

    it("el metodo delete debe eliminar correctamente el producto ", async () => {
      const createProductResponse = await requester
        .post("/mongo")
        .send(mockProduct);
      const originalProduct = createProductResponse.body.createdProduct;
      const responseID = originalProduct._id;

      expect(createProductResponse.status).to.equal(201);

      const deleteProductResponse = await requester.delete(
        `/mongo/${responseID}`
      );

      expect(deleteProductResponse.status).to.equal(200);

      const getProductResponse = await requester.get(`/mongo/${responseID}`);

      expect(getProductResponse.status).to.equal(400);
    });
    describe("test de LOGIN", function () {
      this.timeout(10000);
      it("se podrá registrar correctamente un usuario", async () => {
        await DELETE_ALL_USERS();

        const userRegister = await requester
          .post("/auth/register")
          .send(mockUser);

        expect(userRegister.body.payload._id).to.exist;
      });
      it("el usuario podrá loguearse correctamente", async () => {
        const userLogged = await requester
          .post("/auth/login")
          .send({ email: mockUser.email, password: mockUser.password });

        expect(userLogged.status).to.equal(200);
      });
    });
  });
});
