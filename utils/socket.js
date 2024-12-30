import { io } from "socket.io-client"

var token = null
if (typeof window !== "undefined") {
    token = localStorage.getItem("token")
}

export const socket = io(`https://verifysms.org/`, {
    auth: {
        token: token
    }
})