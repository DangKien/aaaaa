import Axios from "axios";

// Axios.defaults.headers.common["X-CSRF-TOKEN"] = window.Laravel.csrfToken;
Axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;

export default Axios;
