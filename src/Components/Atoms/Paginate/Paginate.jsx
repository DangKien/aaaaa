import React from "react";

export default function Paginate({
  currentPage = 1,
  lastPage = 0,
  changePage,
  ...props
}) {
  const pagesDisplayed = 3;
  const renderPage = (page) => {
    return (
      <div
        {...props}
        onClick={() => changePage({ page })}
        key={page}
        className={`relative cursor-pointer inline-flex items-center px-5 py-5 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
          currentPage === page
            ? "text-blue-600 border-blue-300 bg-blue-50"
            : null
        }`}
      >
        {page}
      </div>
    );
  };

  const renderPages = () => {
    const items = [];
    let leftSide = pagesDisplayed / 2;
    let rightSide = pagesDisplayed - leftSide;
    let breakView;

    if (currentPage > lastPage - pagesDisplayed / 2) {
      rightSide = lastPage - currentPage;
      leftSide = pagesDisplayed - rightSide;
    } else if (currentPage < pagesDisplayed / 2) {
      leftSide = currentPage;
      rightSide = pagesDisplayed - leftSide;
    }

    for (let page = 1; page <= lastPage; page++) {
      if (page <= pagesDisplayed) {
        items.push(renderPage(page));
        continue;
      }
      if (page > lastPage - pagesDisplayed) {
        items.push(renderPage(page));
        continue;
      }
      if (page >= currentPage - leftSide && page <= currentPage + rightSide) {
        items.push(renderPage(page));
        continue;
      }

      if (items[items.length - 1] !== breakView) {
        breakView = (
          <div
            key={page}
            className={`relative cursor-pointer inline-flex items-center px-5 py-5 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
              currentPage === page ? "border-red-600" : null
            }`}
          >
            ...
          </div>
        );
        items.push(breakView);
      }
    }
    return items;
  };
  return (
    <>
      {props.total > 0 && (
        <div className="flex text-gray-700">
          <div className="flex h-8 font-medium ">{renderPages()}</div>
        </div>
      )}
    </>
  );
}
