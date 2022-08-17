import { gql } from "@apollo/client";

const GET_PROPOSAL = gql`
    query Proposals($name: String) {
        proposals(
            first: 20
            skip: 0
            where: { space_in: ["balancer", $name], state: "active" }
            orderBy: "created"
            orderDirection: desc
        ) {
            id
            title
            body
            choices
            start
            end
            snapshot
            state
            author
            space {
                id
                name
            }
        }
    }
`;

const GET_SPACES = gql`
    query Spaces {
        spaces(first: 20, skip: 0, orderBy: "created", orderDirection: desc) {
            id
            name
            about
            network
            symbol
            strategies {
                name
                network
                params
            }
            admins
            members
            filters {
                minScore
                onlyMembers
            }
            plugins
        }
    }
`;

const GET_Follows = gql`
    query Follows {
        follows(
            where: { follower: "0xeF8305E140ac520225DAf050e2f71d5fBcC543e7" }
        ) {
            id
            follower
            space {
                id
            }
            created
        }
    }
`;

const GET_VOTE = gql`
    query Votes {
        votes(
            first: 1000
            where: {
                proposal: "QmPvbwguLfcVryzBRrbY4Pb9bCtxURagdv1XjhtFLf3wHj"
            }
        ) {
            id
            voter
            created
            choice
            space {
                id
            }
        }
    }
`;

export { GET_PROPOSAL, GET_Follows, GET_SPACES, GET_VOTE };
