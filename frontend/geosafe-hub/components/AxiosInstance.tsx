// Mechanism to send data from backend to frontend and other way around
import axios, { AxiosInstance as AxiosInstanceType } from "axios";

const baseURL = "http://127.0.0.1:8000/api";

const AxiosInstance: AxiosInstanceType = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

export default AxiosInstance;
