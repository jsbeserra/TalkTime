export default class Password {
    constructor(readonly value: string) {
        if (!this.validLength(value)) throw new Error("Invalid length, password must contain at least 6 characters")
        if (!this.existSpecialCharacter(value)) throw new Error("Password must contain at least one special character")
        if (!this.containACapitalLetter(value)) throw new Error("Must contain a capital letter")
        if (!this.containALowercaseLetter(value)) throw new Error("Must contain a lowercase letter")
        if (!this.containANumber(value)) throw new Error("Must contain numbers")
    }

    private validLength(password: string) {
        if (password.length < 6) return false
        return true
    }

    private existSpecialCharacter(password: string) {
        const regex = /.*[@!#$%^&*()/\\]/
        const patt = new RegExp(regex)
        return patt.test(password)
    }

    private containACapitalLetter(password: string) {
        const regex = /[A-Z]/
        const patt = new RegExp(regex)
        return patt.test(password)
    }

    private containALowercaseLetter(password: string) {
        const regex = /[a-z]/
        const patt = new RegExp(regex)
        return patt.test(password)
    }

    private containANumber(password: string) {
        const regex = /[\d]/
        const patt = new RegExp(regex)
        return patt.test(password)
    }
}