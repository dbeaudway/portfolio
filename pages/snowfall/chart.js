// Global vars
let start, end;
let total;
let snowDays;

// Assign input values to variables
function assignVars() {
    start = document.getElementById('start').value;
    end = document.getElementById('end').value;

}

// set the dimensions and margins of the graph
var margin = { top: 20, right: 20, bottom: 80, left: 60 },
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);

var x1 = d3.scaleBand()
    .padding(0.05)

var y = d3.scaleLinear()
    .range([height, 0]);


function drawChart(start, end) {
    if(document.getElementById('yearlySnowChart') !== null){
        document.getElementById('yearlySnowChart').remove();
    }

    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select('#chart').append("svg")
    .attr('id', 'yearlySnowChart')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

    // reset data
    total = 0;
    snowDays = 0;

    // get the data
    d3.csv("snowfall.csv", function (error, csv_data) {
        if (error) throw error;
        var data = d3.nest()
            .key(function (d) { return d.date; })
            .rollup(function (d) {
                return d3.sum(d, function (g) { return g.snow; });
            }).entries(csv_data);

        var dataYearly = d3.nest()
            .key(function (d) { return d.date.split('-')[0]; })
            .rollup(function (d) {
                return d3.sum(d, function (g) { return g.snow; });
            }).entries(csv_data);

        // format the data
        data.forEach(function (d) {
            d.date = d.key;
            d.dateYear = d.key.split('-')[0];
            d.snow = +d.value;
        });

        // format the data
        dataYearly.forEach(function (d) {
            d.date = d.key;
            d.snow = +d.value;
        });

        // format data for user inputs
        var dateRangeYearly = dataYearly.filter(value => value.date >= start && value.date <= end);
        var dateRangeDaily = data.filter(value => value.dateYear >= start && value.dateYear <= end);
        dateRangeYearly.forEach(item => total += item.snow);
        dateRangeDaily.forEach(item => item.snow >= 1 ? snowDays += 1 : snowDays += 0);
        rangeChart();
        var text = `<h2>Snowfall in Minneapolis from ${start} to ${end}</h2>
        <p>During this period of time there were there were <strong>${Math.floor(snowDays)}</strong> days when it snowed.
         This amounted to a total of <strong>${Math.floor(total)}</strong> inches of snow. 
         Let's take a closer look, use the slider to inspect the monthly snowfall for individual years.</p>`;
        document.getElementById('stats').innerHTML = text;

        // Scale the range of the data in the domains
        x.domain(dateRangeYearly.map(function (d) { return d.date; }));
        y.domain([0, d3.max(dateRangeYearly, function (d) { return d.snow; })]);

        // append the rectangles for the bar chart
        svg.selectAll(".bar")
            .data(dateRangeYearly)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("fill", "white")
            .attr("opacity", ".9")
            .attr("x", function (d) { return x(d.date); })
            .attr("width", x.bandwidth())
            .attr("y", function (d) { return y(d.snow); })
            .transition()
            .duration(1000)
            .ease(d3.easeLinear)
            .attr("height", function (d) { return height - y(d.snow); });

        // add the x Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr('fill', '#fff')	
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.55em")
            .attr("transform", "rotate(-90)");

        // add the y Axis
        svg.append("g")
            .call(d3.axisLeft(y))
            selectAll("text")
            .attr('fill',"#fff");
    })
}

function callCharts() {
    assignVars();
    drawChart(start, end);
}