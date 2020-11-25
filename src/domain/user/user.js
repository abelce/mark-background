import Constants from '@common/constants/user';

class User {
    constructor(data) {
        this.name = data.name;
        this.phone = data.phone;
        this.email = data.email;
        this.type = data.type;
        this.id = data.id;
        this.status = data.status;
        this.description = data.description;
        this.logoImage = data.logoImage;
        this.address = data.address;
        this.avatar = data.avatar;
        this.weiChat = data.weiChat;
        this.github = data.github;
        this.organization = data.organization;
        this.twitter = data.twitter;
    }

    isAdmin() {
        return this.type === Constants.USER_TYPE_ADMIN;
    }
}

export function FormatOperator(data) {
    const {attributes,id,} = data;
    return new User({
        id,
        ...attributes,
    });
    
}

export default User;