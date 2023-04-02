import React, { memo, useEffect, useState } from "react";

import Loading from "Components/Atoms/Loading";
import BooksAPI from "Apis/book";
import NumberOfPaginate from "Components/Atoms/NumberOfPaginate";
import dayjs from "dayjs";
import Stars from "Components/Organisms/Stars/Stars";
import { Tooltip } from "react-tooltip";
import ReactDOMServer from "react-dom/server";
import { Trash } from "Components/Atoms/Icons";
import EditIcon from "Components/Atoms/Icons/edit";
import Paginate from "Components/Atoms/Paginate";
import ReactSelect from "react-select";
import CreateCategory from "../Create";
import Filters from "../Filters";

const options = [
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 30, label: "30" },
];

const ListCategories = memo(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [books, setBooks] = useState([]);
  const [textFilter, setTextFilter] = useState([]);

  const getList = async (params) => {
    setIsLoading(true);
    try {
      const response = await BooksAPI.list(params);
      const { data } = response;
      const { data: result } = data;
      const { page: bookPages, total: bookTotal, items } = result;
      if (items) {
        setBooks(items);
        setPage(bookPages);
        setTotal(bookTotal);
      }
    } catch (error) {}
    setIsLoading(false);
  };

  const getOptionValue = (value) => {
    return options.find((item) => item.value === value);
  };

  useEffect(() => {
    getList({
      page,
      limit,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, textFilter]);

  const changePage = ({ page }) => {
    setPage(page);
  };

  const filterText = (evt) => {
    const val = evt.target.value;
    setTextFilter(val);
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <div className="card">
        <div className="card-body p-4">
          <div className="card-header flex-row">
            <h2 className="text-2xl font-bold">Quản lý sách</h2>
            <div className="card-toolbar flex justify-end space-x-2">
              <input
                placeholder="Tìm kiếm"
                className="px-2 py-2 border rounded-md border-gray-200 min-w-[300px]"
                onChange={filterText}
              />
              <div className="card-toolbar">
                <Filters />
              </div>
              <CreateCategory />
            </div>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr className="text-left">
                  <th>Mã sách</th>
                  <th>Tên sách</th>
                  <th>Tác giả</th>
                  <th>Nhà xuất bản</th>
                  <th>Thể loại</th>
                  <th>Số bình luận</th>
                  <th>Số trang</th>
                  <th>Ngày xuất bản</th>
                  <th>Đánh giá</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => {
                  return (
                    <tr key={book.id}>
                      <td>
                        <span className="px-2 ">{book.book_id}</span>
                      </td>
                      <td className="max-w-[300px]">
                        <a
                          className="text-blue-500 text-max"
                          href={book.link}
                          title={book.title}
                          data-tooltip-id={book.id}
                          data-tooltip-content={book.title}
                        >
                          {book.title}
                        </a>
                        <Tooltip id={book.id} />
                      </td>
                      <td>
                        <a
                          className="text-blue-500"
                          title={book.author}
                          href={book.author_link}
                        >
                          {book.author}
                        </a>
                      </td>
                      <td>
                        <span>{book.publisher}</span>
                      </td>
                      <td>
                        {/* {book.characters.map((character) => {
                          return <span>{character}</span>;
                        })} */}
                      </td>
                      <td>{book.review_count}</td>
                      <td>
                        <span>{book.number_of_pages}</span>
                      </td>
                      <td>{dayjs(book.year_publish).format("DD/MM/YYYY")}</td>
                      <td>
                        <span
                          className="flex space-x-1 cursor-pointer"
                          data-tooltip-id={`rating-${book.id}`}
                          data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
                            <div>
                              <p>Tổng đánh giá: {book.rating_count}</p>
                              <p>Đánh giá 5 sao: {book.five_star_ratings}</p>
                              <p>Đánh giá 4 sao: {book.four_star_ratings}</p>
                              <p>Đánh giá 3 sao: {book.three_star_ratings} </p>
                              <p>Đánh giá 2 sao: {book.two_star_ratings} </p>
                              <p>Đánh giá 1 sao: {book.one_star_ratings}</p>
                            </div>
                          )}
                        >
                          <Stars star={book.average_rating} />
                          <span>{book.average_rating}</span>
                        </span>
                        <Tooltip id={`rating-${book.id}`} />
                      </td>
                      <td>
                        <span className="flex">
                          <div className="p-1 text-blue-500 flex flex-row cursor-pointer">
                            <EditIcon />
                          </div>
                          <div className="p-1 text-red-400 flex flex-row cursor-pointer">
                            <Trash />
                          </div>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-between text-gray-700 mt-4 items-center border-t border-gray-300">
          <div className="px-4 flex">
            <div className="w-20">
              <ReactSelect
                options={options}
                defaultValue={options[0]}
                value={getOptionValue(limit)}
                menuPlacement="top"
                menuPosition="fixed"
                onChange={(select) => setLimit(select.value)}
              />
            </div>
            <NumberOfPaginate value={total} />
          </div>
          <div className="flex flex-col items-center my-5 mx-5">
            <Paginate
              currentPage={page}
              lastPage={total / 20 + 1}
              changePage={changePage}
              total={total}
            />
          </div>
        </div>
      </div>
    </>
  );
});

export default ListCategories;
