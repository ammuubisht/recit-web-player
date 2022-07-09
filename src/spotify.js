import axios from "axios";

const authEndPoint = "https://accounts.spotify.com/authorize?";
const clientId = "5c937f8cc3464b71987ab21db811f2a7";
const redirectUri = "http://localhost:3000/";
const scopes = ["user-library-read", "playlist-read-private", "user-top-read", "user-read-recently-played"];

export const loginEndPoint = `${authEndPoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialogue=true`;

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

export const setClientToken = (token) => {
  apiClient.interceptors.request.use(async function (config) {
    config.headers.Authorization = "Bearer " + token;
    return config;
  });
};

export default apiClient;
