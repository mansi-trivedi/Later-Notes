class RegisterUser{  

    constructor(userData){
        this.username = userData.username;
        this.email = userData.email;
        this.password = userData.password;
        this.reEnterPassword = userData.password;
    }
}

module.exports = RegisterUser