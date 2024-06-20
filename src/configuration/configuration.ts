export const configuration = () => ({
  server: {
    port: Number(process.env.PORT),
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET,
    accessTokenValidityDurationInSec: Number(
      process.env.ACCESS_TOKEN_VALIDITY_DURATION_IN_SEC,
    ),
    hashSalt: Number(process.env.HASH_SALT),
  },
});
