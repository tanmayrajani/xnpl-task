import axios, { AxiosInstance } from "axios";

let instance: AxiosInstance;
export const createInstance = () => {
  instance = axios.create({
    baseURL: "https://api.github.com",
    headers: {
      Authorization: `token ${process.env.REACT_APP_GTHB_TOKEN}`
    }
  });
};

export const getInstance = () => instance;
