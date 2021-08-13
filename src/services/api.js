import axios from "axios";

export const api = axios.create({
  baseURL: "https://kabit-api.herokuapp.com",
});
