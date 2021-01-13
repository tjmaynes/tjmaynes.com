import * as React from "react"

import Social from "./social"
import {graphql, StaticQuery} from "gatsby";

const Header: React.FC = () =>
    <StaticQuery
        query={graphql`
      query ExpertiseQuery {
        site {
          siteMetadata {
            tagline
          }
        }
      }`}
        render={({site: {siteMetadata: {tagline}}}) => (
            <header>
                <span>👨‍💻</span>
                <h1>Hi, I'm TJ Maynes.</h1>
                <p>{ tagline }</p>
                <Social />
            </header>
        )}
    />

export default Header
