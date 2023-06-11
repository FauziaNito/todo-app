import axios from "axios";

const todoApi = axios.create({ baseURL: "http://localhost:3020" });

export default todoApi;
