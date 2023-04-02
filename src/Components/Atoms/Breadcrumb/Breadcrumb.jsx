import React, { Fragment, memo } from "react";

const Breadcrumb = memo(({ breadcrumbs = [] }) => {
  return (
    <ol className="breadcrumb m-0 flex flex-row">
      <li className="breadcrumb-item">
        <a href="/">Trang chủ</a>
      </li>

      {breadcrumbs.map((breadcrumb) => {
        return (
          <Fragment key={breadcrumb.name}>
            {!breadcrumb.isActive ? (
              <li className="breadcrumb-item">
                <a href={breadcrumb.path}>{breadcrumb.name}</a>
              </li>
            ) : (
              <li className="breadcrumb-item active">{breadcrumb.name}</li>
            )}
          </Fragment>
        );
      })}
    </ol>
  );
});
export default Breadcrumb;
