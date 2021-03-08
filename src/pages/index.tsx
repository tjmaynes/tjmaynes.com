import * as React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Expertise from "../components/expertise";
import About from "../components/about";

import { graphql, StaticQuery } from "gatsby";

const Index: React.FC = () =>
  <StaticQuery
    query={graphql`
      query IndexQuery {
        site {
          siteMetadata {
            title
          }
        }
      }`
    }
    render={({ site: { siteMetadata: { title } } }) => (
      <Layout>
        <SEO pageTitle={title} />
        <About />
        <hr />
        <Expertise />
      </Layout>
    )}
  />

export default Index
