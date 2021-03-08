import * as React from "react"

import { graphql, StaticQuery, Link } from "gatsby";

type PageLink = { name: string, link: string };

const PageLinks: React.FC<{ links: PageLink[] }> = ({ links }) => (
  <ul>
    { links.map(({ name, link }) => <li><Link to={link}>{ name }</Link></li>) }
  </ul>
)

const Header: React.FC = () =>
  <StaticQuery
    query={graphql`
      query HeaderQuery {
        site {
          siteMetadata {
            tagline,
            pages {
              name, link
            }
          }
        }
      }`
    }
    render={({ site: { siteMetadata: { tagline, pages } } }) => (
      <header>
        <span>👨‍💻</span>
        <h1>Hi, I'm TJ Maynes.</h1>
        <p>{tagline}</p>
      </header>
    )}
  />

export default Header
