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

const GET_PROPOSAL = gql`
    query GetProposal($id:String){
        proposal(id:$id){
            id
            ipfs
            title
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

export { GET_PROPOSALS, GET_PROPOSAL };
