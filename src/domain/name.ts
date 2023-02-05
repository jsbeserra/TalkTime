export default class Name {
    constructor(readonly value: string) {
        if (!this.isValidLength(value)) throw new Error("Name must contain at least 1 characters")
        if (!this.isValidCharacters(value)) throw new Error("Name must not contain numbers and special characters")
    }

    private isValidLength(name: string) {
        if (!name) return false
        return true
    }
    
    public isValidCharacters(name:string){
        const regex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/
        const patt = new RegExp(regex)
        return patt.test(name)
    }
}