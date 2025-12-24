export const config = {
  apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL,
  fileBaseUrl: process.env.EXPO_PUBLIC_API_FILE_URL,
  dataLimit: process.env.EXPO_PUBLIC_DATA_LIMIT,
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  liveSupportApiBaseUrl: process.env.EXPO_PUBLIC_LIVE_SUPPORT_API_BASE_URL,
  socketUrl: process.env.EXPO_PUBLIC_SOCKET_URL,
  liveSupportServerUrl: process.env.EXPO_PUBLIC_SUPPORT_SERVER_URL,
  geolocationApiKey: process.env.EXPO_PUBLIC_GEOLOCATION_API_KEY,
  siteUrl: process.env.EXPO_PUBLIC_SITE_URL,
  paymentPageUrl: process.env.NEXT_PUBLIC_SITE_URL + "/payment",
};
