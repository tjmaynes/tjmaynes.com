import * as React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {Link} from "gatsby";

const NotFoundPage: React.FC = () => (
  <Layout>
    <SEO pageTitle="404" />
    <div className="centered">
      <h1>404 - Page not found 😦</h1>
      <p>There's no place like <Link to="/">home</Link>!</p>
    </div>
  </Layout>
)

export default NotFoundPage
