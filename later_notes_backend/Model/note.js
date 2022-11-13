class RegisterUserNotes{  

    constructor(usernote){
        this.title = usernote.title;
        this.desc = usernote.desc;
        this.ownerId = usernote.ownerId;
    }
}

module.exports = RegisterUserNotes