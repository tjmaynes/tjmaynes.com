import { graphql, Link, StaticQuery } from "gatsby";
import * as React from "react";


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
            tagline
          }
        }
      }`
    }
    render={({ site: { siteMetadata: { tagline } } }) => (
      <header>
        <span>👨‍💻</span>
        <h1>Hi, I'm <a href="/links">TJ Maynes</a>.</h1>
        <p>{tagline}</p>
      </header>
    )}
  />

export default Header
