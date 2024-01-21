import { io } from "socket.io-client";
import { SERVER_URL } from "../Utils/urls";

const socket = io(SERVER_URL, { autoConnect: false });

export default socket;