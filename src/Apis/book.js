import Axios from "./default";

const apiPath = "api/books";

const list = (params) =>
  Axios.get(`${apiPath}`, {
    params: { ...params },
  });
const BooksAPI = {
  list,
};

export default BooksAPI;
