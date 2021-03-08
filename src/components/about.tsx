import * as React from "react"
import { graphql, StaticQuery } from "gatsby";

const About: React.FC = () =>
  <StaticQuery
    query={graphql`
      query AboutQuery {
        site {
          siteMetadata {
            about
          }
        }
      }`}
    render={({ site: { siteMetadata: { about } } }) => (
      <article className="about">
        <h2>About</h2>
        {about.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      </article>
    )}
  />

export default About