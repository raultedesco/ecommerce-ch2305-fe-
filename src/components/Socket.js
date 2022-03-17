import io from "socket.io-client";

let socket = io("https://ecommerce-ch2305.herokuapp.com/");
// let socket = io("//localhost:3001");

export default socket;