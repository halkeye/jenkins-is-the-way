import {graphql} from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';
import Testimonal from '../components/Testimonal';
import {MDXProvider} from '@mdx-js/react';
import {MDXRenderer} from 'gatsby-plugin-mdx';

import {GatsbyImage, getImage} from 'gatsby-plugin-image';

import Layout from '../layout';
import Seo from '../components/Seo';


const titles = {
    organization: 'Organization',
    company: 'Company',
    company_website: 'Company Website',
    teams: 'Team',
    team_members: 'Team Members',
    project_website: 'Project Website',
    project_funding: 'Project Funding',
    funded_by: 'Funded By',
    summary: 'Summary',
    industries: 'Industries',
    programming_languages: 'Programming Languages',
    platform: 'Platform',
    version_control_systems: 'Version Control System',
    buildTools: 'Build Tools',
    plugins: 'Custom Plugins',
    community_supports: 'Community Support'
};

const fields = [
    'organization',
    'company',
    'company_website',
    'teams',
    'team_members',
    'project_website',
    'project_funding',
    'funded_by',
    'summary',
    'industries',
    'programming_languages',
    'platform',
    'version_control_systems',
    'buildTools',
    'plugins',
    'community_supports'
];

const UserStory = ({data: {mdx: {body, slug, frontmatter: {title, sub_title, submitted_by, tag_line, ...frontmatter}}}}) => {
    const shortcodes = {
        Testimonal({idx}) { // eslint-disable-line
            return (
                <Testimonal
                    from={frontmatter.quotes[idx].from}
                    image={frontmatter.quotes[idx].image}
                >
                    {frontmatter.quotes[idx].content}
                </Testimonal>
            );
        }
    };
    return (
        <Layout title={title}>
            <Seo title={title} pathname={`/user-story/${slug.replace(/\/+$/, '')}`}/>
            <div className="jenkins_is_the_way">

                <div className="row title-wrapper">
                    <div className="col title">
                        <div className="container">
                            <h2>{title}</h2>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="container pb-2">
                            <h1>{sub_title}</h1>
                        </div>

                        <div className="container pt-2 pb-2">
                            <strong>
                                Submitted By Jenkins User
                                {' '}
                                {submitted_by}
                            </strong>
                        </div>

                        <div className="container pt-2 pb-2">
                            {tag_line}
                        </div>

                        {fields.concat('image').some(field => frontmatter[field]) && (
                            <div className="container pt-2 pb-2">
                                <div className="jumbotron">
                                    <div className="media">
                                        {frontmatter.image && <GatsbyImage image={getImage(frontmatter.image)} alt="Logo" className="mr-3" height="300" width="300" />}
                                        <div className="media-body">
                                            {fields.filter(field => frontmatter[field]).map(field => (
                                                <div key={field} className="pb-2">
                                                    <strong>
                                                        {titles[field]}
                                                        :
                                                        {' '}
                                                    </strong>
                                                    {Array.isArray(frontmatter[field]) ? frontmatter[field].join(', ') : frontmatter[field]}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="container pt-2 pb-2">
                            <MDXProvider components={shortcodes} frontmatter={frontmatter}>
                                <MDXRenderer frontmatter={frontmatter}>{body}</MDXRenderer>
                            </MDXProvider>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

UserStory.displayName = 'UserStory';
UserStory.propTypes = {
    data: PropTypes.shape({
        mdx: PropTypes.shape({
            body: PropTypes.string.isRequired,
            slug: PropTypes.string.isRequired,
            frontmatter: PropTypes.shape({
                title: PropTypes.string.isRequired,
                sub_title: PropTypes.string.isRequired,
                submitted_by: PropTypes.string.isRequired,
                tag_line: PropTypes.string.isRequired,
            })
        })
    })
};

/* eslint no-undef: "off" */
export const pageQuery = graphql`
    query UserStoryBySlug($id: String!) {
        mdx(id: {eq: $id}) {
            body
            slug
            frontmatter {
                build_tools
                community_supports
                company
                company_website
                date
                image {
                  childImageSharp {
                    gatsbyImageData(layout: FIXED, width: 300)
                  }
                }
                quotes {
                    from
                    image {
                        childImageSharp {
                            gatsbyImageData(layout: FIXED, width: 60, height: 60)
                        }
                    }
                    content
                }
                industries
                latitude
                location
                longitude
                name
                organization
                platforms
                plugins
                post_name
                programming_languages
                project_funding
                project_website
                sub_title
                submitted_by
                summary
                tag_line
                team_members
                title
                version_control_systems
            }
        }
    }
`;

export default UserStory;
