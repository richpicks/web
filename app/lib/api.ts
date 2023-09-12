async function fetchGraphQL(query: string, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      next: { revalidate: 3600 },
      body: JSON.stringify({ query }),
    }
  ).then((response) => response.json())
}

function extractMyEntries(fetchResponse: { data: { richPicksPostCollection: { items: any } } }) {
  return fetchResponse?.data?.richPicksPostCollection?.items
}

export async function getItGirl(preview: boolean | undefined) {
  const entries = await fetchGraphQL(
    `query {
      richPicksPostCollection(where: { archive_not: true }, limit: 18, order: date_DESC, preview: ${preview ? 'true' : 'false'}) {
        items {
          sys {
            id
            firstPublishedAt
          }
          title
          date
          picksCollection(limit: 18, preview: ${preview ? 'true' : 'false'}) {
            items {
              sys {
                id
              }
              title
              bet
              team {
                name
                location
              }
              game {
                title
                awayTeam {
                  name
                  location
                }
                awayScore
                awaySpread
                homeTeam {
                  name
                  location
                }
                homeScore
                homeSpread
                points
                done
              }
            }
          }
        }
      }
    }`,
    preview
  )
  return extractMyEntries(entries)
}
