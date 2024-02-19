const { Magic } = require("@magic-sdk/admin");

export const magicAdmin = await Magic.init(
  process.env.NEXT_PUBLIC_MAGIC_SERVER_KEY
);
