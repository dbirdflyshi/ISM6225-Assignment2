/* JavaScript (analytics.js) for data visualization */
window.onload = function() {
    const data = [10, 15, 20, 25, 30];
    const width = 50 * data.length;
    const height = 30 * Math.max(...data);

    const svg = d3.select('#chart')
        .append('svg')
        .attr('width', width + 'vw')
        .attr('height', height + 'vh');

    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d, i) => i * 5 + 'vw')
        .attr('y', d => (height - d * 3) + 'vh')
        .attr('width', '4vw')
        .attr('height', d => d * 3 + 'vh')
        .attr('fill', 'teal');
}