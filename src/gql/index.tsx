import { gql } from "@apollo/client";

const GET_PROPOSALS = gql`
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
    query Follows($address:String) {
        follows(
            first:10000
            skip:0
            where: { follower: $address }
        ) {
            id
        }
    }
`;

const GET_VOTE = gql`
    query Votes($id:String) {
        votes(
            id:$id,
        ) {
            id
            voter
            vp
            vp_by_strategy
            vp_state
            created
            proposal {
            id
            }
            choice
            space {
            id
            }
        }
    }
`;
const GET_PROPOSAL = gql`
    query GetProposal($id:String){
        proposal(id:$id){
            id
            ipfs
            title
            body
            discussion
            choices
            start
            end
            snapshot
            state
            author
            created
            plugins
            network
            type
            quorum
            symbol
            strategies{
                name
                network
                params
            }
            space{
                id
                name
            }
            scores_state
            scores
            scores_by_strategy
            scores_total
            votes
        }
    }
`

export { GET_PROPOSALS, GET_Follows, GET_SPACES, GET_VOTE, GET_PROPOSAL };
