import { fetchWithToken, isTokenValid } from "/root/fetchWithToken.js"

export async function getApiData(APIUrl) {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken || !isTokenValid(accessToken)) {
        console.log("Access token is missing.");
        return null;
    }
    const response = await fetchWithToken(APIUrl,
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });
    console.log("GET response: ", response);
    if (!response.ok)
        return null;
    const apiData = await response.json();
    // console.log("getApiData => apiData: ", apiData);
    return apiData;
}



export async function createApiData(APIUrl, body) {
    
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken || !isTokenValid(accessToken)) {
        console.log("Access token is missing.");
        return null;
    }
    const response = await fetchWithToken(APIUrl,
    {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: body,
    });
    console.log("POST response: ", response);
    if (!response.ok)
        return null;
    return await response.json();

}

export async function updateApiData(APIUrl, body) {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken || !isTokenValid(accessToken)) {
        console.log("Access token is missing.");
        return null;
    }
    const response = await fetchWithToken(APIUrl,
    {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        body: body,
    });
    console.log("PUT response: ", response);
    if (!response.ok)
        return null;
    return await response.json();

}

export async function deleteApiData(APIUrl) {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken || !isTokenValid(accessToken)) {
        console.log("Access token is missing.");
        return null;
    }
    const response = await fetchWithToken(APIUrl,
    {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        }
    });
    console.log("DELETE response: ", response);
    if (!response.ok)
        return null;
    return await response.json();
}