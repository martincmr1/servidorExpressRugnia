class UserDto {
  constructor(userInfo) {
    this.first_name = userInfo.first_name;
    this.last_name = userInfo.last_name;
    this.number = userInfo.number;
    this.email = userInfo.email;
    this.role = userInfo.role;
    this.password = userInfo.password;
    this.number = userInfo.number;
    this.createdAt = new Date();
  }
}
module.exports = UserDto;
