const chai = require("chai");
const supertest = require("supertest");

const expect = chai.expect;
const requester = supertest("http://localhost:3000");

mockProduct = {
  title: "mochila",
  description: "urbana",
  code: "hhh55",
  price: 500,
  stock: 45,
  category: "nueva linea",
  thumbnails: "www.google.com.ar",
  status: "true",
};

describe("testing de la API del e-commerce", () => {
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

    it('al obtener los productos con un metodo get la respuesta debe tener el campo status', async () => {
      const response = await requester.get('/mongo');
      expect(response.status).to.exist;
    });

    it('el metodo put debe actualizar correctamente comparando el valor previo', async () => {
      const response = await requester.post("/mongo").send(mockProduct);
      const responseID = response.body._id;

      const mockProductUpdate = {
        title: "cartera",
        description: "urbana",
        code: "hhh55",
        price: 500,
        stock: 45,
        category: "nueva linea",
        thumbnails: "www.google.com.ar",
        status: "true",
      };

      // Realizar la solicitud PUT para actualizar el producto
      await requester.put(`/mongo/${responseID}`).send(mockProductUpdate);

      // Obtener el producto actualizado después del PUT
      const updatedProductResponse = await requester.get(`/mongo/${responseID}`);

      // Verificar que los datos del producto actualizado no sean iguales a los datos originales
      expect(updatedProductResponse.body).not.toEqual(response.body);
    });
  });
}); 


