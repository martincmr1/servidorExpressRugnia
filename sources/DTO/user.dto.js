class UserDto {
  constructor(userInfo) {
    this.first_name = userInfo.first_name;
    this.last_Name = userInfo.last_name;
    this.email = userInfo.email;
    this.role = userInfo.role;
  }
}

module.exports = UserDto;
