export async function getFavoritedVideos(userId, token) {
  const operationsDoc = `
  query getFavoritedVideos($userId: String!) {
    stats(where: {favorited: {_eq: 1}, userId: {_eq: $userId}}) {
      videoId
    }
  }
`;

  const response = await queryHasuraGQL(
    operationsDoc,
    "getFavoritedVideos",
    { userId },
    token
  );

  return response?.data?.stats;
}

export async function getWatchedVideos(userId, token) {
  const operationsDoc = `
  query getVideos($userId: String!) {
    stats(
      where: {userId: {_eq: $userId}, 
      watched: {_eq: true}
    }) {
      videoId
    }
  }
`;

  const response = await queryHasuraGQL(
    operationsDoc,
    "getVideos",
    { userId },
    token
  );
  return response?.data?.stats;
}

export async function updateStats(
  token,
  { userId, videoId, favorited, watched }
) {
  const operationsDoc = `
  mutation updateStats($userId: String!, $videoId: String!, $favorited: Int!, $watched: Boolean!) {
    update_stats(
      _set: {watched: $watched, favorited: $favorited}, 
      where: {
        userId: {_eq: $userId}, 
        videoId: {_eq: $videoId}
      }){
        returning {
          favorited
          id
          userId
          videoId
          watched
        }
    }
  }
`;

  const response = await queryHasuraGQL(
    operationsDoc,
    "updateStats",
    { userId, videoId, favorited, watched },
    token
  );
  return response;
}

export async function createNewStats(token, { userId, videoId, favorited }) {
  const operationsDoc = `
  mutation createNewStats($userId: String!, $videoId: String!, $favorited: Int!) {
    insert_stats(objects: {userId: $userId, videoId: $videoId, favorited: $favorited}) {
      returning {
        favorited
        id
        userId
        videoId
        watched
      }
    }
  }
`;

  const response = await queryHasuraGQL(
    operationsDoc,
    "createNewStats",
    { userId, videoId, favorited },
    token
  );
  return response;
}

export async function findVideoIdByUser(token, userId, videoId) {
  const operationsDoc = `
  query findVideoIdByUser($userId: String!, $videoId: String!) {
    stats(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}) {
      id
      favorited
      userId
      videoId
      watched
    }
  }
`;

  const response = await queryHasuraGQL(
    operationsDoc,
    "findVideoIdByUser",
    { userId, videoId },
    token
  );
  return response?.data?.stats;
}

export async function createNewUser(token, metaData) {
  const { issuer, publicAddress, email } = metaData;
  const operationsDoc = `
  mutation createNewUser($issuer: String!, $publicAddress: String!, $email: String!) {
    insert_users(objects: {
      email: $email, 
      issuer: $issuer, 
      publicAddress: $publicAddress
    }) {
      affected_rows
    }
  }
`;

  const response = await queryHasuraGQL(
    operationsDoc,
    "createNewUser",
    { issuer, publicAddress, email },
    token
  );
  return response;
}

export async function isNewUser(token, issuer) {
  const operationsDoc = `
  query isNewUser($issuer: String!) {
    users(where: {issuer: {_eq: $issuer}}) {
      email
      id
      issuer
      publicAddress
    }
  }
`;

  const response = await queryHasuraGQL(
    operationsDoc,
    "isNewUser",
    { issuer },
    token
  );

  return response?.data?.users?.length === 0;
}

async function queryHasuraGQL(operationsDoc, operationName, variables, token) {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  return await result.json();
}
