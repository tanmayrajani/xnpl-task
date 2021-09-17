import axios, { AxiosInstance } from "axios";

let instance: AxiosInstance;
export const createInstance = () => {
  instance = axios.create({
    baseURL: "https://api.github.com",
    headers: {
      Authorization: "token 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"
    }
  });
};

export const getInstance = () => instance;
