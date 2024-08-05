
export function convertTimeStampIntoDate(dateString) {
    const date = new Date(dateString);
    
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
    };
    return date.toLocaleString('en-US', options);
}