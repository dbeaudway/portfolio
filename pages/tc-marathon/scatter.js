// set the dimensions and margins of the graph
var scatterMargin = { top: 10, right: 30, bottom: 30, left: 40 };
bodyWidth = bodyWidth - scatterMargin.left - scatterMargin.right,
    scatterHeight = 500 - scatterMargin.top - scatterMargin.bottom;

// set the ranges
var scatterX = d3.scaleLinear().range([0, bodyWidth]);
var scatterY = d3.scaleLinear().range([0, scatterHeight]);

// set colors
function cscale(c){
    if(c === "M"){
        return "#6356ff"
    } else if(c === "F"){
        return "#ff5451"
    }
}

var scatterSvg = d3.select("#scatterChart").append("svg")
    .attr('id', 'scatterPlot')
    .attr("width", bodyWidth + scatterMargin.left + scatterMargin.right)
    .attr("height", scatterHeight + scatterMargin.top + scatterMargin.bottom)
    .append("g")
    .attr("transform",
    "translate(" + scatterMargin.left + "," + scatterMargin.top + ")");

// format the data
let scatterdata = marathonResults.children;

scatterdata.forEach(function (d) {
    let adjustedTime = d.Time.split(':');
    let newTime = new Date();
    newTime.setHours(+adjustedTime[0]);
    newTime.setMinutes(adjustedTime[1]);
    newTime.setSeconds(adjustedTime[2]);
    d.newTime = newTime;
    d.totalSeconds = ((newTime.getHours() * 60 * 60) + (newTime.getMinutes() * 60) + (newTime.getSeconds()));
});

// Scale the range of the data
scatterX.domain([1, d3.max(scatterdata, function (d) { return d.Place; })]);
scatterY.domain([0, 26.2]);

// Add the X Axis
scatterSvg.append("g")
    .attr("transform", "translate(0," + scatterHeight + ")")
    .call(d3.axisBottom(scatterX))

// text label for the x axis
scatterSvg.append("text")
    .attr("transform",
    "translate(" + (bodyWidth / 2) + " ," +
    (scatterHeight + scatterMargin.top + 20) + ")")
    .style("text-anchor", "middle")
    .text("Place");

// Add the Y Axis
scatterSvg.append("g")
    .call(d3.axisLeft(scatterY));

// text label for the y axis
scatterSvg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - scatterMargin.left)
    .attr("x", 0 - (scatterHeight / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Miles");


//Draw user inputted time
let userInputTime;
function userTime() {
    let hours = document.getElementById('hours').value;
    let minutes = document.getElementById('minutes').value;
    let seconds = document.getElementById('seconds').value;
    userInputTime = parseInt((hours * 60 * 60) + (minutes * 60) + (seconds * 1));
    scatterSvg.append("line")
        .attr("x1", 0)
        .attr("x2", bodyWidth)
        .attr('y1', 0)
        .attr('y2', 0)
        .style('stroke-width', 2)
        .style('stroke', '#3D3D3D')
        .transition()
        .duration(userInputTime)
        .ease(d3.easeLinear)
        .attr("y1", scatterHeight)
        .attr("y2", scatterHeight)

    scatterSvg.append("text")
        .attr('x', bodyWidth - 200)
        .attr('y', -5)
        .text("Your Projected Time")
        .transition()
        .duration(userInputTime)
        .ease(d3.easeLinear)
        .attr('y', scatterHeight)
}

function startTimer() {
    let timer = document.getElementById('timer');
    let runners = document.getElementById('runners');
    let place = document.getElementById('place');

    runners.innerHTML = scatterdata.length;
    let placement = scatterdata.filter(people => people.totalSeconds < userInputTime);
    place.innerHTML = placement.length + 1;

    let secondsTimer = 0;
    function increment() {
        if (secondsTimer < 22891) {
            secondsTimer += 250;
            var time = new Date(null);
            time.setSeconds(secondsTimer);
            var result = time.toISOString().substr(11, 8);
            timer.innerHTML = result;
        }
    }
    setInterval(increment, 250)
    
}

function raceAll() {
    scatterdata = marathonResults.children;
    scatterSvg.selectAll(".scatterDot").remove();

    // Add the scatterplot
    scatterSvg.selectAll("dot")
        .data(scatterdata)
        .enter().append("circle")
        .attr("class", "scatterDot")
        .attr("opacity", .5)
        .attr("fill", function(d){return cscale(d.Sex)})
        .attr("r", 1.5)
        .attr("cy", 0)
        .attr("cx", function (d) { return scatterX(d.Place) })
        .transition()
        .duration(function (d) { return d.totalSeconds })
        .ease(d3.easeLinear)
        .attr("cy", scatterHeight)

    userTime();
    startTimer();
}

function raceMen() {
    scatterSvg.selectAll(".scatterDot").remove();
    scatterdata = marathonResults.children.filter((person) => {
        return person.Sex === "M"
    })

    // Add the scatterplot
    scatterSvg.selectAll("dot")
        .data(scatterdata)
        .enter().append("circle")
        .attr("class", "scatterDot")
        .attr("fill", function(d){return cscale(d.Sex)})
        .attr("r", 1.5)
        .attr("cy", 0)
        .attr("cx", function (d) { return scatterX(d.Place) })
        .transition()
        .duration(function (d) { return d.totalSeconds })
        .ease(d3.easeLinear)
        .attr("cy", scatterHeight)

    userTime();
    startTimer();
}

function raceWomen() {
    scatterSvg.selectAll(".scatterDot").remove();
    scatterdata = marathonResults.children.filter((person) => {
        return person.Sex === "F"
    })

    // Add the scatterplot
    scatterSvg.selectAll("dot")
        .data(scatterdata)
        .enter().append("circle")
        .attr("class", "scatterDot")
        .attr("fill", function(d){return cscale(d.Sex)})
        .attr("r", 1.5)
        .attr("cy", 0)
        .attr("cx", function (d) { return scatterX(d.Place) })
        .transition()
        .duration(function (d) { return d.totalSeconds })
        .ease(d3.easeLinear)
        .attr("cy", scatterHeight)

    userTime();
    startTimer();
}

function raceAge() {
    scatterSvg.selectAll(".scatterDot").remove();
    let ageInput = document.getElementById("ageInput").value;
    let ageMin = parseInt(ageInput.split('-')[0]);
    let ageMax = parseInt(ageInput.split('-')[1]);

    if (!ageInput) {
        alert("Enter an age")
    } else {
        scatterdata = marathonResults.children.filter((person) => {
            return person.Age >= ageMin && person.Age <= ageMax;
        })

        // Add the scatterplot
        scatterSvg.selectAll("dot")
            .data(scatterdata)
            .enter().append("circle")
            .attr("class", "scatterDot")
            .attr("fill", function(d){return cscale(d.Sex)})
            .attr("opacity", 1)
            .attr("r", 1.5)
            .attr("cy", 0)
            .attr("cx", function (d) { return scatterX(d.Place) })
            .transition()
            .duration(function (d) { return d.totalSeconds })
            .ease(d3.easeLinear)
            .attr("cy", scatterHeight)

        
        
        userTime();
        startTimer();
    }
}