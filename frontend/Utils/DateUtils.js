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

    // if (hours == 0 && minutes < 22)
        // alert("the tournament will start soon.");
    return `${hours}h ${minutes}m ${seconds}s`;
}

export function DateFormater(date) {
    const srcDate = new Date(date);
    const now = new Date();

    const day = new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(srcDate);
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(srcDate).toUpperCase();

    const diffInHours = Math.abs(now - srcDate) / 36e5;
    const hoursAgo = Math.round(diffInHours);

    return {'day': day, 'month': month, 'time': hoursAgo};
}