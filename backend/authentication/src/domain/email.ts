export default class Email{
    constructor(readonly value:string){
        if(!this.validateEmail(value)) throw new Error('invalid email')
        this.value = value
    }

    private validateEmail(email: string) {
        const regexValidateEmail = "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
        const patt = new RegExp(regexValidateEmail)
        return patt.test(email)
    }
}