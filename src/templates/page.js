import '../polyfills';
import React from 'react';
import Layout from '../components/Layouts';

// Components
import Snippet from '../components/CodeSnippet';
import PageTable from '../components/PageTable';
import BackToTop from '../components/BackToTop';
import TitleBlock from '../components/TitleBlock';
import AnchorLinks from '../components/AnchorLinks';
import { Grid, Column } from '../components/Grid/Grid';
import {
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  ul,
  ol
} from '../components/Markdown/Markdown';

export default ({ data }) => {
  const page = data.allMdx;
  let currentPage = page.fields.currentPage;
  let slug = page.fields.slug;

  return (
    <Layout>
      {/*<h1>{post.frontmatter.title}</h1>*/}
      <main className="page-content" id="maincontent">
        {page.html}
      </main>
      <BackToTop />
    </Layout>
  );
};

export const query = graphql`
query($id: String!) {
    allMdx {
      edges {
        node {
          html
          fields {
            
            slug
            
          }
          rawBody
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
