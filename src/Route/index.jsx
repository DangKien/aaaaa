import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { menus } from "Layouts/menu";
import Layout from "Layouts";
import Progress from "Components/Atoms/Progress/Progress";

function RouterRoot() {
  const [menu, setMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const listMenu = [];
    menus.forEach((sub) => {
      const { path, component, children = [] } = sub;
      if (path && component) {
        listMenu.push(sub);
      }
      if (children.length > 0) {
        children.forEach((subItem) => {
          if (subItem.path && subItem.component) {
            listMenu.push(subItem);
          }
        });
      }
    });
    setMenu(listMenu);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      <Progress isAnimating={isLoading} key={location.key} />
      <Routes>
        {menu.map((sub) => {
          return (
            <Route
              {...sub}
              loading
              element={
                <>
                  <Layout>{sub.component}</Layout>
                </>
              }
            />
          );
        })}
      </Routes>
    </>
  );
}

export default RouterRoot;
