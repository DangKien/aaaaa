import React from "react";
import { path } from "Constants/menu";
import ListCategories from "Pages/Category/List";
export const menus = [
  {
    key: "dashboard",
    name: "Thống kê",
    hasChild: false,
    path: path.home,
    items: [],
    isPrivate: true,
    component: <ListCategories />,
    exact: true,
    showSidebar: true,
  },
];

export default menus;
