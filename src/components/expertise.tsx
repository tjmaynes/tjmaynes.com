import * as React from "react"
import { graphql, StaticQuery } from "gatsby"

const Expertise: React.FC = () =>
  <StaticQuery
    query={graphql`
      query ExpertiseQuery {
        site {
          siteMetadata {
            expertise
          }
        }
      }`}
    render={({ site: { siteMetadata: { expertise } } }) => (
      <article>
        <h2>Expertise</h2>
        <ul className="expertise">
          {expertise.map((experience, index) => <li key={index}>{experience}</li>)}
        </ul>
      </article>
    )}
  />

export default Expertise