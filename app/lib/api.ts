const fetchGraphQL = async (query: string, preview = false) => {
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

const extractPicks = (fetchResponse: {
  data: { richPicksPickCollection: { items: any } }
}) => fetchResponse?.data?.richPicksPickCollection?.items

const extractPosts = (fetchResponse: {
  data: { richPicksPostCollection: { items: any } }
}) => fetchResponse?.data?.richPicksPostCollection?.items

export const getPosts = async (preview: boolean | undefined) => {
  const entries = await fetchGraphQL(
    `query {
      richPicksPostCollection(where: { archive_not: true }, limit: 18, order: sys_firstPublishedAt_DESC, preview: ${
        preview ? 'true' : 'false'
      }) {
        items {
          sys {
            id
            firstPublishedAt
          }
          title
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
  return extractPosts(entries)
}

export const getPicks = async (preview: boolean | undefined) => {
  const fetchedData = await fetchGraphQL(
    `query {
      richPicksPickCollection(where: { game: { done: true } }, limit: 108, order: sys_firstPublishedAt_DESC, preview: false) {
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
    }`,
    preview
  )
  return extractPicks(fetchedData)
}
