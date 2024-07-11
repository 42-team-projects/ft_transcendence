const canvas = document.getElementById('radarChart');
const ctx = canvas.getContext('2d');

// Define chart data
const data = [60, 80, 70, 90, 50, 100]; // Example data
const labels = ["WIN", "LOSS", "DRAW", "TEST", "HELLO", "WORLD"]; // Labels for the axes

// Chart settings
const numAxes = data.length;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const maxRadius = 150; // Maximum radius of the chart
const angleStep = (2 * Math.PI) / numAxes;
const numLevels = 5; // Number of levels in the chart

// Draw the levels
for (let level = 0; level <= numLevels; level++) {
    const radius = (maxRadius / numLevels) * level;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 3;
    ctx.stroke();
}

// Draw the axes
for (let i = 0; i < numAxes; i++) {
    const angle = i * angleStep;
    const x = centerX + maxRadius * Math.cos(angle);
    const y = centerY + maxRadius * Math.sin(angle);
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = '#00ffff';
    ctx.stroke();

    // Draw axis labels
    ctx.fillStyle = '#fff';
    ctx.font = '16px Sansation Bold';
    ctx.fillText(labels[i], x, y);
}

// Draw the data
ctx.beginPath();
for (let i = 0; i < numAxes; i++) {
    const angle = i * angleStep;
    const radius = (data[i] / 100) * maxRadius;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    if (i === 0) {
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
    }
}
ctx.closePath();
ctx.fillStyle = 'rgba(0, 128, 255, 0.2)';
ctx.fill();
ctx.strokeStyle = '#0070e0';
ctx.stroke();

// Draw data points
for (let i = 0; i < numAxes; i++) {
    const angle = i * angleStep;
    const radius = (data[i] / 100) * maxRadius;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#0070e0';
    ctx.lineWidth = 3;
    ctx.fill();
}
