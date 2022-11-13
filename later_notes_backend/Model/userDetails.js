class UserDetails{  

    constructor(user){
        this.username = user.username;
        this.email = user.email;
        this.address = user.address;
        this.phone = user.phone;
        this.city = user.city;
        this.state = user.state;
        this.photo = user.photo;
        this.ownerId = user.ownerId;
    }
}

module.exports = UserDetails