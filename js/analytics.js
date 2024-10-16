// JavaScript for D3.js Donut Chart Visualization
window.addEventListener('DOMContentLoaded', function() {
    let storedData = localStorage.getItem('dataList');
    if (!storedData) {
        alert('Add Data In Manage Date Page To View Chart');
        return;
    }

    storedData = JSON.parse(storedData);
    const labels = storedData.map(d => d.item1 + ' ' + d.item2 + ' ' + d.item3);
    const items1 = storedData.map(d => d.item1);
    const items2 = storedData.map(d => d.item2);
    const items3 = storedData.map(d => d.item3);
    const values = storedData.map(d => d.item4);

    // Set dimensions and radius for the chart
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    // Create SVG container
    const svg = d3.select('#chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Set color scale (shades of blue)
    const color = d3.scaleOrdinal()
        .domain(values)
        .range(d3.schemeBlues[values.length > 3 ? 9 : 3]);

    // Create pie generator
    const pie = d3.pie()
        .value(d => d);

    // Create arc generator
    const arc = d3.arc()
        .innerRadius(radius * 0.5)  // Inner radius for donut shape
        .outerRadius(radius);

    // Join data to path elements and append arcs
    const arcs = svg.selectAll('arc')
        .data(pie(values))
        .enter()
        .append('g')
        .attr('class', 'arc');

    arcs.append('path')
        .attr('d', arc)
        .attr('fill', (d, i) => color(values[i]))
        .on('mouseover', function(event, d) {
            tooltip.style('display', 'block')
                .html(`Item 1: ${items1[d.index]}<br>Item 2: ${items2[d.index]}<br>Item 3: ${items3[d.index]}<br>Value: ${d.value}`)
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY - 25) + 'px');
            d3.select(this).attr('opacity', 0.7);
        })
        .on('mouseout', function() {
            tooltip.style('display', 'none');
            d3.select(this).attr('opacity', 1);
        });

    // Tooltip for displaying value on hover
    const tooltip = d3.select('body').append('div')
        .attr('class', 'tooltip')
        .style('position', 'absolute')
        .style('background', 'rgba(0, 0, 0, 0.7)')
        .style('color', 'white')
        .style('padding', '5px')
        .style('border-radius', '5px')
        .style('display', 'none');
});