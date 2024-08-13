export class User {
    firstName
    lastName
    email
    birthday
    role
    active

    constructor(data?: any) {
        this.firstName = data?.firstName || ''
        this.lastName = data?.lastName || ''
        this.email = data?.email || ''
        this.birthday = data?.birthday || ''
        this.role = data?.role || ''
        this.active = data?.active
    }
}