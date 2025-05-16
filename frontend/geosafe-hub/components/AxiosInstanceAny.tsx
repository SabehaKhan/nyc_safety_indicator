import axios from "axios";

const AxiosInstanceAny = axios.create({
  baseURL:
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/api` ||
    "http://localhost:8000/api",
  timeout: 500000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});


export default AxiosInstanceAny;
