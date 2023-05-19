const config = {
  SENTRY_DSN:
    "https://4d83a0e66c084fb8a0d2f8eca80369ed@o4505212850012160.ingest.sentry.io/4505212852043776",
  MAX_ATTACHMENT_SIZE: 5000000,
  STRIPE_KEY:
    "pk_test_51N9D6aKMMfEwj9vJNsKuAjUimUCwiMnpGoZj5sKhWIItXBJjU51YZY6Fr3EIqdU1ucF5fREadOtkldsB0fu3WWxo00Ds3uGHpE",
  s3: {
    REGION: process.env.REACT_APP_REGION,
    BUCKET: process.env.REACT_APP_BUCKET,
  },
  apiGateway: {
    REGION: process.env.REACT_APP_REGION,
    URL: process.env.REACT_APP_API_URL,
  },
  cognito: {
    REGION: process.env.REACT_APP_REGION,
    USER_POOL_ID: process.env.REACT_APP_USER_POOL_ID,
    APP_CLIENT_ID: process.env.REACT_APP_USER_POOL_CLIENT_ID,
    IDENTITY_POOL_ID: process.env.REACT_APP_IDENTITY_POOL_ID,
  },
};

export default config;
