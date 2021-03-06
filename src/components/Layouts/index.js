import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import classnames from 'classnames';
import { StaticQuery, graphql } from 'gatsby';

import favicon32 from '../../content/global/images/favicon-32.png';
import SiteHeader from '../SiteHeader';
import { WebsiteFooter } from '@carbon/addons-website';
import timestamp from 'raw-loader!../../../build-timestamp';

import '../../styles/index.scss';

class Layout extends React.Component {
  state = {
    isNavExpanded: false,
    isSwitcherExpanded: false,
  };

  toggleClick = () => {
    this.setState(state => ({ isNavExpanded: !state.isNavExpanded }));
    if (this.state.isSwitcherExpanded) {
      this.setState({ isSwitcherExpanded: false });
    }
  };

  toggleSwitcher = () => {
    this.setState(state => ({ isSwitcherExpanded: !state.isSwitcherExpanded }));
    if (this.state.isNavExpanded) {
      this.setState({ isNavExpanded: false });
    }
  };

  closeClick = () => {
    if (this.state.isNavExpanded) {
      this.setState({ isNavExpanded: false });
    }
  };

  static propTypes = {
    children: PropTypes.any,
  };

  render() {
    const { children } = this.props;
    const currentYear = new Date().getFullYear();
    const lastUpdated = new Intl.DateTimeFormat(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(Number(timestamp)));
    const { isNavExpanded, isSwitcherExpanded } = this.state;

    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <>
            <Helmet
              title={data.site.siteMetadata.title}
              meta={[
                {
                  name: 'description',
                  content:
                    'At IBM, our design philosophy is to help guide people so they can do their best work. Our human-centered design practices help us deliver on that goal.',
                },
                {
                  name: 'keywords',
                  content:
                    'IBM, design, design thinking, design system, human-centered design, user-centered design, design services',
                },
              ]}
              link={[
                {
                  rel: 'shortcut icon',
                  type: 'image/png',
                  href: `${favicon32}`,
                },
              ]}>
              <html lang="en" />
            </Helmet>
            <SiteHeader
              isNavExpanded={isNavExpanded}
              isSwitcherExpanded={isSwitcherExpanded}
              onToggleNav={this.toggleClick}
              onToggleSwitcher={this.toggleSwitcher}
            />
            <div
              className="container"
              role="main"
              aria-label="Main content area"
              onClick={this.closeClick}>
              {children}
              <WebsiteFooter
                logoOffset={false}
                linksCol1={[
                  { href: 'https://www.ibm.com/privacy', linkText: 'Privacy' },
                  {
                    href: 'https://www.ibm.com/legal',
                    linkText: 'Terms of Use',
                  },
                  { href: 'https://www.ibm.com', linkText: 'IBM.com' },
                ]}
                linksCol2={[
                  {
                    href: 'https://twitter.com/ibmdesign',
                    linkText: 'Twitter',
                  },
                  {
                    href: 'https://facebook.com/ibmdesign',
                    linkText: 'Facebook',
                  },
                ]}>
                <p>
                  Have questions? Email us or open <br /> an issue in{' '}
                  <a
                    href="https://github.com/IBM-Design/design-website/issues/new"
                    target="_blank"
                    rel="noopener"
                    rel="noreferrer">
                    GitHub.
                  </a>
                </p>
                <p>
                  Last updated {lastUpdated}
                  <br />
                  Copyright © {currentYear} IBM
                </p>
              </WebsiteFooter>
            </div>
          </>
        )}
      />
    );
  }
}

export default Layout;
