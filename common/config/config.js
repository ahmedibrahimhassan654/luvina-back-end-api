const development = {
  app: {
    port: parseInt(process.env.PORT, 0) || 3000
  },
  db: {
    mongoURI: process.env.MONGO_URI_DEV
  },
  jwt: {
    key: process.env.JWT_SECRET,
    expire: process.env.JWT_EXPIRE
  },
  facebook: {
    clientId: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALL_BACK_URL
  },
  linkedIn: {
    clientId: process.env.LINKED_IN_CLIENT_ID,
    clientSecret: process.env.LINKED_IN_CLIENT_SECRET,
    callbackURL: process.env.LINKEDIN_CALL_BACK_URL
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALL_BACK_URL
  },
  smsMisr: {
    api: process.env.SMS_MISR_API,
    userName: process.env.SMS_MISR_USERNAME,
    password: process.env.SMS_MISR_PASSWORD,
    sender: process.env.SMS_MISR_SENDER_ID,
    arabic: process.env.SMS_MISR_ARABIC_LANGUAGE,
    english: process.env.SMS_MISR_ENGLISH_LANGUAGE,
    unicode: process.env.SMS_MISR_UNICODE,
    mobile: process.env.SMS_MISR_MOBILE
  },
  manDrill: {
    apiKey: process.env.MAN_DRILL_API_KEY,
    fromName: process.env.MAN_DRILL_FROM_NAME,
    fromMail: process.env.MAN_DRILL_FROM_EMAIL
  },
  baseUrl: process.env.BASE_API_URL,
  salt: process.env.BCRYPT_SALT_ROUNDS
};
const test = {
  app: {
    port: parseInt(process.env.PORT, 0) || 3000
  },
  db: {
    mongoURI: process.env.MONGO_URI_TEST
  },
  jwt: {
    key: process.env.JWT_SECRET,
    expire: process.env.JWT_EXPIRE
  },
  facebook: {
    clientId: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALL_BACK_URL
  },
  linkedIn: {
    clientId: process.env.LINKED_IN_CLIENT_ID,
    clientSecret: process.env.LINKED_IN_CLIENT_SECRET,
    callbackURL: process.env.LINKEDIN_CALL_BACK_URL
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALL_BACK_URL
  },
  smsMisr: {
    api: process.env.SMS_MISR_API,
    userName: process.env.SMS_MISR_USERNAME,
    password: process.env.SMS_MISR_PASSWORD,
    sender: process.env.SMS_MISR_SENDER_ID,
    arabic: process.env.SMS_MISR_ARABIC_LANGUAGE,
    english: process.env.SMS_MISR_ENGLISH_LANGUAGE,
    unicode: process.env.SMS_MISR_UNICODE,
    mobile: process.env.SMS_MISR_MOBILE
  },
  manDrill: {
    apiKey: process.env.MAN_DRILL_API_KEY,
    fromName: process.env.MAN_DRILL_FROM_NAME,
    fromMail: process.env.MAN_DRILL_FROM_EMAIL
  },
  baseUrl: process.env.BASE_API_URL,
  salt: process.env.BCRYPT_SALT_ROUNDS
};

const production = {
  app: {
    port: parseInt(process.env.PORT, 0) || 3000
  },
  db: {
    mongoURI: process.env.MONGO_URI_PRODUCTION
  },
  jwt: {
    key: process.env.JWT_SECRET,
    expire: process.env.JWT_EXPIRE
  },
  facebook: {
    clientId: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALL_BACK_URL
  },
  linkedIn: {
    clientId: process.env.LINKED_IN_CLIENT_ID,
    clientSecret: process.env.LINKED_IN_CLIENT_SECRET,
    callbackURL: process.env.LINKEDIN_CALL_BACK_URL
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALL_BACK_URL
  },
  smsMisr: {
    api: process.env.SMS_MISR_API,
    userName: process.env.SMS_MISR_USERNAME,
    password: process.env.SMS_MISR_PASSWORD,
    sender: process.env.SMS_MISR_SENDER_ID,
    arabic: process.env.SMS_MISR_ARABIC_LANGUAGE,
    english: process.env.SMS_MISR_ENGLISH_LANGUAGE,
    unicode: process.env.SMS_MISR_UNICODE,
    mobile: process.env.SMS_MISR_MOBILE
  },
  manDrill: {
    apiKey: process.env.MAN_DRILL_API_KEY,
    fromName: process.env.MAN_DRILL_FROM_NAME,
    fromMail: process.env.MAN_DRILL_FROM_EMAIL
  },
  baseUrl: process.env.BASE_API_URL,
  salt: process.env.BCRYPT_SALT_ROUNDS
};

const config = {
  development,
  test,
  production
};

module.exports = config[process.env.NODE_ENV];
