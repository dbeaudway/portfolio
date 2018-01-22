//draw histogram
let femaleData = marathonResults.children.filter((person) => person.Sex != "M");
let maleData = marathonResults.children.filter((person) => person.Sex == "M");
let data = marathonResults.children;
var margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 514 - margin.left - margin.right,
    height = 372 - margin.top - margin.bottom;

// parse the date / time
var parseTime = d3.timeParse("%H:%M:%S");

data.forEach(function (d) {
    let adjustedTime = d.Time.split(':');
    let newTime = new Date();
    newTime.setHours(+adjustedTime[0]);
    newTime.setMinutes(adjustedTime[1]);
    newTime.setSeconds(adjustedTime[2]);
    d.newTime = newTime;
});

femaleData.forEach(function (d) {
    let adjustedTime = d.Time.split(':');
    let newTime = new Date();
    newTime.setHours(+adjustedTime[0]);
    newTime.setMinutes(adjustedTime[1]);
    newTime.setSeconds(adjustedTime[2]);
    d.newTime = newTime;
});

maleData.forEach(function (d) {
    let adjustedTime = d.Time.split(':');
    let newTime = new Date();
    newTime.setHours(+adjustedTime[0]);
    newTime.setMinutes(adjustedTime[1]);
    newTime.setSeconds(adjustedTime[2]);
    d.newTime = newTime;
});

// set the ranges
var x = d3.scaleTime()
    .domain(d3.extent(data, function (d) { return d.newTime }))
    .rangeRound([0, width]);
var y = d3.scaleLinear()
    .range([height, 0]);

// set the parameters for the histogram
var histogram = d3.histogram()
    .value(function (d) { return d.newTime; })
    .domain(x.domain())
    .thresholds(x.ticks(d3.newTime));

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

// group the data for the bars
var bins = histogram(data);
var femalebins = histogram(femaleData);
var malebins = histogram(maleData);

// Scale the range of the data in the y domain
y.domain([0, d3.max(bins, function (d) { return d.length; })]);

// append the bar rectangles to the svg element
svg.selectAll("rect")
    .data(bins)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("fill", "black")
    .attr("opacity", ".3")
    .attr("x", 1)
    .attr("transform", function (d) {
        return "translate(" + x(d.x0) + "," + y(d.length) + ")";
    })
    .attr("width", function (d) { return x(d.x1) - x(d.x0) - 1; })
    .attr("height", function (d) { return height - y(d.length); });

// add the x Axis
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x)
        .tickFormat(d3.timeFormat("%H:%M:%S")));

// add the y Axis
svg.append("g")
    .call(d3.axisLeft(y));

// text label for the x axis
svg.append("text")
    .attr("transform",
    "translate(" + (width / 2) + " ," +
    (height + margin.top + 20) + ")")
    .style("text-anchor", "middle")
    .text("Time");


// text label for the y axis
svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Finishers");