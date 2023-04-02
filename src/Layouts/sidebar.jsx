import React, { memo } from "react";
import { NavLink } from "react-router-dom";

import Logo from "Components/Layouts/Logo";
import { menus } from "./menu";

const Sidebar = memo(() => {
  return (
    <aside className="aside aside-left aside-fixed d-flex flex-column flex-row-auto">
      <Logo />
      <div className="aside-menu-wrapper flex-column-fluid">
        <div className="aside-menu my-4 scroll">
          <ul className="menu-nav">
            {menus.map((sub) => {
              return (
                <div key={sub.key}>
                  {sub.showSidebar && (
                    <ul className="menu">
                      {!sub.hasChild ? (
                        <li className="menu-item">
                          <NavLink to={sub.path || ""} className="menu-link">
                            <span className="svg-icon menu-icon">
                              {sub.icon}
                            </span>
                            <span className="menu-text">{sub.name}</span>
                          </NavLink>
                        </li>
                      ) : (
                        <li className="menu-item menu-item-sub">
                          <a
                            href="#javascript"
                            className="menu-link menu-toggle"
                          >
                            <span className="svg-icon menu-icon">
                              {sub.icon}
                            </span>
                            <span className="menu-text">{sub.name}</span>
                          </a>
                          {sub.children && sub.children?.length > 0 && (
                            <div className="menu-sub">
                              <ul className="menu-sub-nav">
                                {sub.children.map((itemSub) => (
                                  <li key={itemSub.key} className="menu-item">
                                    <NavLink
                                      to={itemSub.path || ""}
                                      className="menu-link"
                                    >
                                      <i className="menu-bullet menu-bullet-dot rounded-full">
                                        <span />
                                      </i>
                                      <span className="menu-text">
                                        {itemSub.name}
                                      </span>
                                    </NavLink>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
});

export default Sidebar;
