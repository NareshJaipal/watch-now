import pcloudSdk from "pcloud-sdk-js";

// Create `client` using an oAuth token:
const client = pcloudSdk.createClient("access_token");

// then list root folder's contents:
client.listfolder(0).then((fileMetadata) => {
  console.log(fileMetadata);
});
