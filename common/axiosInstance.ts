import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api/adv/",
});

export { axiosInstance };
