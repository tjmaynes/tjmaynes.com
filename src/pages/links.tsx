import { graphql, StaticQuery } from "gatsby";
import * as React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";

type LinkMetadata = { name: string, link: string };

const LinkSection: React.FC<{ name: string, links: LinkMetadata[] }> = ({ name, links }) => (
    <section className={name}>
        <h2>{name}</h2>
        <ul>
            {links.map(({ name, link }, index) => <li key={index}><a href={link}>{name}</a></li>)}
        </ul>
    </section>
)

const LinksPage: React.FC = () =>
    <StaticQuery
        query={graphql`
      query LinksQuery {
        site {
          siteMetadata {
            links {
                social { name, link }
            }
          }
        }
      }`
        }
        render={({ site: { siteMetadata: { links: { social } } } }) => (
            <Layout>
                <SEO pageTitle="Links" />
                <LinkSection name="social" links={social} />
            </Layout>
        )}
    />

export default LinksPage
