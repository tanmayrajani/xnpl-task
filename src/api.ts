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
