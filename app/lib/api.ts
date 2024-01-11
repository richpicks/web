const fetchGraphQL = async (query: string, preview = false, variables = {}) => {
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
      body: JSON.stringify({ query, variables }),
    }
  ).then((response) => response.json())
}

const extractPicks = (fetchResponse: {
  data: { richPicksPickCollection: { items: any } }
}) => fetchResponse?.data?.richPicksPickCollection?.items

const extractPosts = (fetchResponse: {
  data: { richPicksPostCollection: { items: any } }
}) => fetchResponse?.data?.richPicksPostCollection?.items

const extractSeasonPicks = (fetchResponse: {
  data: {
    richPicksSeason: { linkedFrom: { richPicksPickCollection: { items: any } } }
  }
}) => {
  return fetchResponse?.data?.richPicksSeason?.linkedFrom
    ?.richPicksPickCollection?.items
}

const extractSeasonPosts = (fetchResponse: {
  data: {
    richPicksSeason: { linkedFrom: { richPicksPostCollection: { items: any } } }
  }
}) => {
  return fetchResponse?.data?.richPicksSeason?.linkedFrom
    ?.richPicksPostCollection?.items
}

const pickFields = `
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
`

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
              ${pickFields}
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
          ${pickFields}
        }
      }
    }`,
    preview
  )
  return extractPicks(fetchedData)
}

export const getSeasonPosts = async (id: string) => {
  const entries = await fetchGraphQL(
    `query ($id: String!) {
      richPicksSeason(id: $id) {
        linkedFrom {
          richPicksPostCollection(
            limit: 18
            order: sys_firstPublishedAt_DESC
            preview: false
          ) {
            total
            items {
              sys {
                id
                firstPublishedAt
              }
              title
              picksCollection(limit: 18) {
                items {
                  ${pickFields}
                }
              }
            }
          }
        }
      }
    }`,
    false, // preview
    { id }
  )
  return extractSeasonPosts(entries)
}

export const getSeasonPicks = async (id: string) => {
  const fetchedData = await fetchGraphQL(
    `query ($id: String!) {
      richPicksSeason(id: $id) {
        linkedFrom {
          richPicksPickCollection(
            limit: 108
            order: sys_firstPublishedAt_DESC
            preview: false
          ) {
            items {
              ${pickFields}
            }
          }
        }
      }
    }`,
    false, // preview
    { id }
  )
  return extractSeasonPicks(fetchedData)
}
