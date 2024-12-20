
export async function fetchData(APIURL) {
    try {
        const response = await fetch(APIURL);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        return await response.json();  // Return the result
    } catch (error) {
        console.error(error.message);
        return null;  // Return null in case of an error
    }
}