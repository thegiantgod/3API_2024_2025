
const customUpperCase = (value) => {
    if (typeof value !== "string") {
        throw new Error("You need to send a String object !")
    }
    return value.toUpperCase();
}


module.exports = {
    customUpperCase
}