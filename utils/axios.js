import axios from "axios"
const SANDBOX_MODE = false

var token = null
if (typeof window !== "undefined") {
    token = localStorage.getItem("token")
}

export const mainURL = "https://verifysms.org"
export const sanboxURL = "http://verifysms.org:8080"

export const api = axios.create({
    baseURL: SANDBOX_MODE ? sanboxURL : mainURL,
    headers: {
        'Authorization': 'Bearer ' + token,
    },
})