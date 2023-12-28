const mongoose = require("mongoose");
const chai = require("chai");
const {
  CREATE_USER,
  DELETE_ALL_USERS,
  GET_USERS,
} = require("../sources/services/users.service");
const Users = require("../sources/Dao/models/users.model");

mongoose.connect(
  "mongodb+srv://martincmr1:admin@cluster0.0spsbev.mongodb.net/ecommerce?retryWrites=true&w=majority"
);

const expect = chai.expect;

const MockUser = {
  first_name: "Martincho",
  last_name: "Rug",
  email: "martin@rug.com",
  age: 43,
  password: "martin1234",
};

describe("Testear DAO de usuario con CHAI", () => {
  before(function () {
    CREATE_USER();
  });
  beforeEach(async function () {
    this.timeout(6000);
    await DELETE_ALL_USERS();
  });

  it("El DAO debe poder obtener los usuarios en forma de array", async function () {
    const result = await GET_USERS();

    //const result = {}
    expect(result).to.be.deep.equal([]);
  });

  it("El DAO debe agregar un usuario a la base de datos", async function () {
    const result = await CREATE_USER(MockUser);
    expect(result).to.have.property("_id");
  });

  it("El DAO agregara un arreglo vacio de carts", async function () {
    const result = await CREATE_USER(MockUser);
    expect(result).to.be.have.property("cart").to.be.an("array").that.is.empty;
  });

  it("El DAO puede obtener a un usuario por Email", async function () {
    const result = await CREATE_USER(MockUser);

    const user = await Users.findOne({ email: result.email });

    expect(user).to.have.property("email");
  });
});
