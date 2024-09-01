// Player == Profile Page
import { fetchWithToken } from "../root/Router.js"
import { PROFILE_API_URL } from "./APIUrls.js";

export async function getApiData(APIUrl) {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        console.error("Access token is missing.");
        return;
    }
    const response = await fetchWithToken(APIUrl,
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const apiData = await response.json();
    console.log("getApiData => apiData: ", apiData);
    return apiData;
}



export async function createApiData(APIUrl, body) {
    
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetchWithToken(APIUrl,
    {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        body: body,
    });
    return await response.json();

}

export async function updateApiData(APIUrl, body) {
    
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetchWithToken(APIUrl,
    {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        body: body,
    });
    return await response.json();

}

export async function deleteApiData(APIUrl) {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetchWithToken(APIUrl,
    {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        }
    });
    return await response.json();
}