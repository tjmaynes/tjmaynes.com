import * as React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Expertise from "../components/expertise";
import About from "../components/about";

const Index: React.FC = () => (
  <Layout>
    <SEO pageTitle="TJ Maynes" />
    <About />
    <hr />
    <Expertise />
  </Layout>
)

export default Index
