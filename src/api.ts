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
