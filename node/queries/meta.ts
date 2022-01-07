import { graphql } from 'gatsby';

export const avatarQuery = graphql`#graphql
	query Avatar() {
		fileName: file(relativePath: { eq: "../content/images/mm.jpg" }) {
			childImageSharp {
				fluid(maxWidth: 400, maxHeight: 250) {
					...GatsbyImageSharpFluid
				}
			}
		}
	}
`;
