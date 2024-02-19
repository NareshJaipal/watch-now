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
  console.log({ response, issuer });
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

  console.log({ response, issuer });

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

// export async function startFetchMyQuery() {
//   const { errors, data } = await fetchMyQuery();

//   if (errors) {
//     // handle those errors like a pro
//     console.error(errors);
//   }

//   // do something great with this precious data
//   console.log(data);
// }
