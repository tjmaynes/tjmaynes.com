import * as React from "react"
import {graphql, StaticQuery} from "gatsby";

const Social: React.FC = () =>
    <StaticQuery
        query={graphql`
      query SocialQuery {
        site {
          siteMetadata {
            social {
                name
                link
            }
          }
        }
      }`}
        render={({site: {siteMetadata: {social}}}) => (
            <section>
                <ul className="social">
                    {social.map(({name, link}, index) => <li key={index}>
                        <a href={link}>{name}</a>
                    </li>)}
                </ul>
            </section>
        )}
    />

export default Social
