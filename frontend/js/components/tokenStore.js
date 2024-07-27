// tokenStore.js
let accessToken = null;

export const setAccessToken = (newAccessToken) => {
  accessToken = newAccessToken;
};

export const getAccessToken = () => {
  return accessToken;
};