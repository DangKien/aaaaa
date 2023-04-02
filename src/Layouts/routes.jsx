/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { Route } from "react-router-dom";
// import Layout from ".";

export default class RouteLayout extends React.Component {
  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <>
        <Route {...rest} loading element={<></>} />
      </>
    );
  }
}
