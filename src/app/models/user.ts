export class User {
  ID: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  jwt?: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    password?: string,
    jwt?: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password ? password : "";
    this.jwt = jwt ? jwt : "";
  }
  static fromForm(formJSON) {
    return new User(
      formJSON.firstName,
      formJSON.lastName,
      formJSON.email,
      formJSON.phoneNumber,
      formJSON.password
    );
  }
  static fromJSON(json) {
    return new User(
      json.first_name,
      json.last_name,
      json.email,
      json.phone_number,
      undefined,
      json.jwt
    );
  }
  toJSON() {
    return {
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      phone_number: this.phoneNumber,
      password: this.password,
      jwt: this.jwt
    };
  }
}
