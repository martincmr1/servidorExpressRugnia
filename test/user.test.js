/*const mongoose = require("mongoose");
const Assert = require("node:assert");
const {
  GET_USERS,
  DELETE_ALL_USERS,
  CREATE_USER,
} = require("../sources/services/users.service");
const Users = require("../sources/Dao/models/users.model");
//const Users = require('../sources/Dao/models/users.model');

mongoose.connect(
  "mongodb+srv://martincmr1:admin@cluster0.0spsbev.mongodb.net/ecommerce?retryWrites=true&w=majority"
);

const MockUser = {
  first_name: "Martincho",
  last_name: "Rug",
  email: "martin@rug.com",
  age: 43,
  password: "martin1234",
};

const assert = Assert.strict;

describe("Testear DAO de usuario", () => {
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
    assert.strictEqual(Array.isArray(result), true);
  });

  it("El DAO debe agregar un usuario a la base de datos", async function () {
    const result = await CREATE_USER(MockUser);
    assert.ok(result._id);
  });

  it("El DAO agregara un arreglo vacio de carts", async function () {
    const result = await CREATE_USER(MockUser);
    assert.deepStrictEqual(result.cart, []);
  });

  it("El DAO puede obtener a un usuario por Email", async function () {
    const result = await CREATE_USER(MockUser);

    const user = await Users.findOne({ email: result.email });

    assert.strictEqual(typeof user, "object");
  })
});



*/