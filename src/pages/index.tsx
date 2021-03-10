import { graphql, StaticQuery } from "gatsby";
import * as React from "react";
import About from "../components/about";
import Expertise from "../components/expertise";
import Layout from "../components/layout";
import SEO from "../components/seo";

const IndexPage: React.FC = () =>
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

export default IndexPage
