export default function drawAllBugs(canvas,bugs) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bugs.forEach(bug => {
        ctx.beginPath();
        ctx.arc(bug.x, bug.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = bug.color
        ctx.fill();
    })
}