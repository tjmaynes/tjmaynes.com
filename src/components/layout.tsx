import * as React from "react"

import Header from "./header"
import Footer from "./footer"

const Layout = ({ children }) => (
  <section className="container">
    <Header />
    <hr />
    {children}
    <hr />
    <Footer />
  </section>
);

export default Layout;
