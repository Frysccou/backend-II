export class UserDTO {
    constructor(user) {
        this.id = user.id;
        this.firstName = user.first_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.age = user.age;
        }
}