// JavaScript for D3.js Donut Chart Visualization
window.addEventListener('DOMContentLoaded', function() {
    let storedData = localStorage.getItem('dataList');
    if (!storedData) {
        alert('Add Data In Manage Date Page To View Chart');
        return;
    }

    storedData = JSON.parse(storedData);
    const labels = storedData.map(d => d.title + ' ' + d.author + ' ' + d.date_completed);
    const titles = storedData.map(d => d.title);
    const authors = storedData.map(d => d.author);
    const dates_completed = storedData.map(d => d.date_completed);
    const num_of_pages = storedData.map(d => d.number_pages);

    // Set dimensions and radius for the chart
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    // Calculate the sum of num_of_pages
    const totalNumOfPages = num_of_pages.reduce((sum, pages) => sum + parseInt(pages), 0);
    const h2Element = document.querySelector('main h2');
    const totalPagesElement = document.createElement('h3');
    totalPagesElement.textContent = `${totalNumOfPages}`;
    h2Element.insertAdjacentElement('afterend', totalPagesElement);

    // Create SVG container
    const svg = d3.select('#chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Set color scale (shades of blue)
    const color = d3.scaleOrdinal()
        .domain(num_of_pages)
        .range(d3.schemeBlues[num_of_pages.length > 3 ? 9 : 3]);

    // Create pie generator
    const pie = d3.pie()
        .value(d => d);

    // Create arc generator
    const arc = d3.arc()
        .innerRadius(radius * 0.5)  // Inner radius for donut shape
        .outerRadius(radius);

    // Join data to path elements and append arcs
    const arcs = svg.selectAll('arc')
        .data(pie(num_of_pages))
        .enter()
        .append('g')
        .attr('class', 'arc');

    arcs.append('path')
        .attr('d', arc)
        .attr('fill', (d, i) => color(num_of_pages[i]))
        .on('mouseover', function(event, d) {
            tooltip.style('display', 'block')
                .html(`Book Title: ${titles[d.index]}<br>Book Author: ${authors[d.index]}<br>Date Completed: ${dates_completed[d.index]}<br>Pages: ${d.value}`)
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