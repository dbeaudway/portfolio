let rangeYear;
function rangeChart(){
    rangeYear = start;
    drawMonthChart(rangeYear);
}

function rangeSliderChange(value) {
    rangeYear = document.getElementById('rangeslider').value;
    document.getElementById('monthlySnowfallYear').innerHTML = rangeYear;
    drawMonthChart(rangeYear);
}

function drawMonthChart(year) {
    if(document.getElementById('monthlySnowChart') !== null){
        document.getElementById('monthlySnowChart').remove();
    }
    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select('#rangechart').append("svg")
        .attr("id", "monthlySnowChart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // get the data
    d3.csv("snowfall.csv", function (error, csv_data) {
        if (error) throw error;
        var data = d3.nest()
            .key(function (d) { return d.date.substring(0,7); })
            .rollup(function (d) {
                return d3.sum(d, function (g) { return g.snow; });
            }).entries(csv_data);

        // format the data
        data.forEach(function (d) {
            d.date = d.key;
            d.dateYear = d.key.split('-')[0];
            d.snow = +d.value;
        });

        // format data for user inputs
        var dateRange = data.filter(value => value.dateYear === year);
        var total = 0;
        dateRange.forEach(item => total += item.snow);

        var text = `
        <h2>Monthly Snowfall for <span id="monthlySnowfallYear">${rangeYear}</span></h2>
        Move the slider to change the year
        <input id="rangeslider" type="range" min="${start}" max="${end}" value="${rangeYear}" onchange="rangeSliderChange()">
        <p>In ${rangeYear} there was a total of <strong>${Math.floor(total)}</strong> inches of snow.</p>`;
        
        document.getElementById('monthlystats').innerHTML = text;

        // Scale the range of the data in the domains
        x.domain(dateRange.map(function (d) { return d.date.substring(5,7); }));
        y.domain([0, d3.max(dateRange, function (d) { return d.snow; })]);

        // append the rectangles for the bar chart
        svg.selectAll(".bar")
            .data(dateRange)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("fill", "white")
            .attr("opacity", ".9")
            .attr("x", function (d) { return x(d.date.substring(5,7)); })
            .attr("width", x.bandwidth())
            .attr("y", function (d) { return y(d.snow); })
            .attr("height", function (d) { return height - y(d.snow); });

        // add the x Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr('fill',"#fff")	
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.55em")
            .attr("transform", "rotate(-90)");

        // add the y Axis
        svg.append("g")
            .call(d3.axisLeft(y))
            .selectAll("text")
            .attr('fill',"#fff")
            .selectAll("path")
            .attr('stroke', '#fff');

    })
}
