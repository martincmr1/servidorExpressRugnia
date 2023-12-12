const { getHashedPassword } = require("../sources/utils/password");
const chai = require("chai");
const bcrypt = require("bcrypt");

const expect = chai.expect;
const MockUser = {
  first_name: "Martincho",
  last_name: "Rug",
  email: "martin@rug.com",
  age: 43,
  password: "martin1234",
};

describe("testear Bcrypt", () => {
  it("verificar el hasheo del password", async function () {
    const result = await getHashedPassword(MockUser.password);
    expect(result).is.not.equal(MockUser.password);
  });
  it("verificar la contraseña hasheada", async function () {
    const hashedPassword = await getHashedPassword(MockUser.password);
    const result = bcrypt.compareSync(MockUser.password, hashedPassword);

    expect(result).to.be.true;
  });
});
