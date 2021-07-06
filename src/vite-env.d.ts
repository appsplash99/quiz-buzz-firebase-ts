/// <reference types="vite/client" />

/**
 * To let Vite know and avail .env variables via TypeScript IntelliSense
 */
interface ImportMetaEnv {
  VITE_API_KEY: string;
  VITE_AUTH_DOMAIN: string;
  VITE_DATABASE_URL: string;
  VITE_PROJECT_ID: string;
  VITE_STORAGE_BUCKET: string;
  VITE_MESSAGING_SENDER_ID: string;
  VITE_APP_ID: string;
}
