const generateUsers = require("../utils/mock.util");

class MockUsersManager {
  async getMockUsers(req, res) {
    try {
      const { numUsers = 1 } = req.query;
      const users = await generateUsers(numUsers);
      res.json({ payload: users });
    } catch (error) {}
  }
}

module.exports = MockUsersManager;
