// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_KEY: 'M9oudt0Y.CslR5xOFQkmPPzi3oBbNNcih8MwPLL5h',
  apiUrl: 'http://localhost:9123/saas_api',
  WEBSOCKET_PROTOCOL: "ws",
  WEBSOCKET_URL: 'localhost:9123/saas_ws',
  LOCALSTORAGE_TOKEN_INFO_KEY: 'TOKEN_INFO',
  FEEDBACK_USER_ID: 1,
  PUBLIC_ORIGIN: 'http://localhost:9127',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
