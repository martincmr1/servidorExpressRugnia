class UserDto {
  constructor(userInfo) {
    (this.name = userInfo.name),
      (this.lastName = userInfo.last_name),
      (this.email = userInfo.email),
      (this.age = userInfo.age),
      (this.password = userInfo.password);
  }
}

module.exports = UserDto;
