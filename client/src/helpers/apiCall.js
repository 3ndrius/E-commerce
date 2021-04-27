import axios from "axios";

// Change the baseURL to the servers web address
// in production

export default axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080/api/v1/"
      : `${process.env.REACT_APP_PROD_API_URL}/api/v1/`,
  withCredentials: true,
  credentials: "include",
});
