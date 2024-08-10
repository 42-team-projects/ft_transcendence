export function calculateTimeDifferents(date) {
    const startDate = new Date(date);
    const endDate = new Date(startDate.getTime() + (60 * 60 * 24 * 1000)); // Add 24 hours in milliseconds
    const currentDate = new Date();
    
    // Calculate time difference in milliseconds
    let timeDifference = endDate - currentDate;
    
    // If the timeDifference is less than 0, set it to 0
    if (timeDifference < 0)
        return "finished";
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    timeDifference -= hours * 1000 * 60 * 60;
    
    const minutes = Math.floor(timeDifference / (1000 * 60));
    timeDifference -= minutes * 1000 * 60;
    
    const seconds = Math.floor(timeDifference / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
}