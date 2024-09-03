export class User {
    name
    email
    birthday
    phone_number
    user_type
    password

    constructor(data?: any) {
        this.name = data.name || ''
        this.email = data.email || ''
        this.birthday = data.birthday || ''
        this.phone_number = data.phone_number || ''
        this.user_type = data.user_type || ''
        this.password = data.password || ''
    }
}