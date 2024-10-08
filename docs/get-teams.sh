
# ORG="ULL-MII-SYTWS-2223"
#ORG="ULL-MII-SYTWS-2324"
ORG="ULL-MII-SYTWS-2425"

QUERY='query getInfo($organization: String!) {
  organization(login: $organization) {
    teams(first: 100) {
      totalCount
      edges {
        node {
          name
          members(first: 100) {
            totalCount
            edges {
              memberAccessUrl
              node {
                name
                url
                email
                login               
              }
            }
          }
          url
        }
      }
    }
  }
}'

TEAMS=$(gh api graphql -F organization="$ORG" -f query="$QUERY" | jq .)

TEMPLATE="
export default $TEAMS
"

echo $TEMPLATE 