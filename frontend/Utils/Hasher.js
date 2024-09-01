export async function hashPassword(password) {
    // Encode the password as a Uint8Array
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    // Hash the password using SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    // Convert the hash to a hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    return hashHex;
}