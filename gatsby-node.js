const componentWithMDXScope = require('gatsby-mdx/component-with-mdx-scope');
const path = require('path');
const _ = require('lodash');
const fs = require('fs');
const { createFilePath } = require(`gatsby-source-filesystem`);


exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'Mdx') {
    const parent = getNode(node.parent);

    const slug = createFilePath({
      node,
      getNode,
      basePath: `pages`,
      trailingSlash: false,
    });
    const currentPage = slug.split('/').pop();

    createNodeField({
      name: 'slug',
      node,
      value: slug,
    });

    createNodeField({
      node,
      name: `currentPage`,
      value: currentPage,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            mdx(fields: { relativePath: { eq: "summary" } }) {
              html
            }
            allMdx {
              edges {
                node {
                  id
                  fields {
                    slug
                    relativePath
                  }
                  fileAbsolutePath
                  code {
                    scope
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        // Create blog posts pages.
        result.data.allMdx.edges.forEach(({ node }) => {
          const slug = node.fields.slug;
          const currentPage = node.fields.currentPage;
          let currentPath = slug.slice(0, slug.lastIndexOf(currentPage));
          createPage({
            path: currentPath,
            component: path.resolve(`./src/templates/page.js`),
            context: {
              slug,
              currentPage,
            },
          });
        });
      })
    );
  });
};


