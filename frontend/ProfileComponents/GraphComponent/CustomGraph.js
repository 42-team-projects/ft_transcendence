const maxRadius = 150; // Maximum radius of the chart
const numLevels = 3; // Number of levels in the chart

const fakeData = [
    { key: "WIN", value: 50 },
    { key: "SCORE", value: 20 },
    { key: "DRAW", value: 100 },
    { key: "LOSS", value: 30 },
    { key: "FRIENDS", value: 0 }
];

export class CustomGraph extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
    }

    drawLevels(ctx, centerX, centerY) {
        // Draw the levels
        for (let level = 0; level <= numLevels; level++) {
            const radius = (maxRadius / numLevels) * level;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.strokeStyle = '#00ffff';
            ctx.lineWidth = 3;
            ctx.stroke();
        }
    }

    drawAxes(ctx, labels, centerX, centerY, angleStep) {
        const numAxes = labels.length;
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
    }

    drawData(ctx, values, centerX, centerY, angleStep) {
        const numAxes = values.length;
        for (let i = 0; i < numAxes; i++) {
            const angle = i * angleStep;
            const radius = (values[i] / 100) * maxRadius;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
        
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
    }

    drawPoints(ctx, values, centerX, centerY, angleStep) {
        const numAxes = values.length;
        for (let i = 0; i < numAxes; i++) {
            const angle = i * angleStep;
            const radius = (values[i] / 100) * maxRadius;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
        
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = '#EB9A45';
            ctx.lineWidth = 3;
            ctx.fill();
        }
    }

    stylingGraph(ctx, _fillStyle, _strokeStyle) {

        ctx.closePath();
        ctx.fillStyle = _fillStyle;
        ctx.fill();
        ctx.strokeStyle = _strokeStyle;
        ctx.stroke();
    }

    drawRadarChart(canvas, data) {
        let ctx = canvas.getContext('2d');
        
        const values = [];
        const labels = [];
        data.forEach(element => {
            labels.push(element.key);
            values.push(element.value);
        });

        // Chart settings
        const numAxes = values.length;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const angleStep = (2 * Math.PI) / numAxes;
        
        this.drawLevels(ctx, centerX, centerY);
        
        this.drawAxes(ctx, labels, centerX, centerY, angleStep);

        ctx.beginPath();
        for (let i = 0; i < numAxes; i++) {
            const angle = i * angleStep;
            const radius = (values[i] / 100) * maxRadius;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
        
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        this.stylingGraph(ctx, '#EB9A4550', '#EB9A45');
        
        this.drawPoints(ctx, values, centerX, centerY, angleStep);
        
    }

    connectedCallback() {
        const radarChart = document.createElement("canvas");
        radarChart.width = 400;
        radarChart.height = 400;
        this.drawRadarChart(radarChart, fakeData);
        this.shadowRoot.appendChild(radarChart);
    }

    disconnectedCallback() {

    }
}
