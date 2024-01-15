declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    KEYCLOAK_URL: string;
    KEYCLOAK_REALM: string;
    KEYCLOAK_CLIENT_ID: string;
    KEYCLOAK_CLIENT_SECRET: string;
    JWT_SECRET_KEY: string;
    JWT_REFRESH_KEY: string;
  }
}
