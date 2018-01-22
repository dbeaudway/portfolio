// using d3 for convenience
var container = d3.select('#scroll');
var graphic = container.select('.scroll__graphic');
var chart = graphic.select('.chart');
var text = container.select('.scroll__text');
var step = text.selectAll('.step');
var bodyWidth;
// initialize the scrollama
var scroller = scrollama();
// generic window resize listener event
function handleResize() {
    // 1. update height of step elements
    var stepHeight = Math.floor(window.innerHeight * 0.75);
    step.style('height', stepHeight + 'px');
    // 2. update width/height of graphic element
    bodyWidth = d3.select('.container').node().offsetWidth;
    graphic
        .style('width', bodyWidth + 'px')
        .style('height', window.innerHeight + 'px');
    var chartMargin = 32;
    var textWidth = text.node().offsetWidth;
    var chartWidth = graphic.node().offsetWidth - textWidth - chartMargin;
    chart
        .style('width', chartWidth + 'px')
        .style('height', Math.floor(window.innerHeight / 2) + 'px');
    // 3. tell scrollama to update new element dimensions
    scroller.resize();
}
// scrollama event handlers
function handleStepEnter(response) {
    // response = { element, direction, index }
    // add color to current step only
    step.classed('is-active', function (d, i) {
        return i === response.index;
    })

    if (response.index === 1) {
        svg.selectAll("rect")
            .data(bins)
            .transition()
            .duration(1000)
            .attr("fill", "black")
            .attr("opacity", ".3")
            .attr("transform", function (d) {
                return "translate(" + x(d.x0) + "," + y(d.length) + ")";
            })
            .attr("width", function (d) { return x(d.x1) - x(d.x0) - 1; })
            .attr("height", function (d) { return height - y(d.length); });

        // line for average time
        if (!document.getElementById('avg')) {
            svg.append("line")
                .attr("id", "avg")
                .attr("x1", 235)
                .attr("x2", 235)
                .attr('y1', 0)
                .attr('y2', height)
                .style('stroke-width', 2)
                .style('stroke', 'red')

            // text for average time
            svg.append("text")
                .attr("id", "avgText")
                .attr("x", 235)
                .style("fill", "red")
                .text("Average Time: 4:24:06")
        } else {
            svg.select("#avg")
                .transition()
                .duration(1000)
                .attr("x1", 235)
                .attr("x2", 235)
                .attr('y1', 0)
                .attr('y2', height)
                .style('stroke-width', 2)
                .style('stroke', 'red')

            // text for average time
            svg.select("#avgText")
                .transition()
                .duration(1000)
                .attr("x", 235)
                .style("fill", "red")
                .text("Avg Time: 4:24:06")
        }


    } else if (response.index === 2) {
        svg.selectAll("rect")
            .data(femalebins)
            .transition()
            .duration(1000)
            .attr("fill", "red")
            .attr("opacity", ".3")
            .attr("transform", function (d) {
                return "translate(" + x(d.x0) + "," + y(d.length) + ")";
            })
            .attr("width", function (d) { return x(d.x1) - x(d.x0) - 1; })
            .attr("height", function (d) { return height - y(d.length); });

        // line for average time
        svg.selectAll("#avg")
            .transition()
            .duration(1000)
            .attr("x1", 265)
            .attr("x2", 265)
            .attr('y1', 0)
            .attr('y2', height)
            .style('stroke-width', 2)
            .style('stroke', 'red')

        // text for average time
        svg.selectAll("#avgText")
            .transition()
            .duration(1000)
            .attr("x", 265)
            .style("fill", "red")
            .text("Avg Female Time: 4:35:28")

    } else if (response.index === 3) {
        svg.selectAll("rect")
            .data(malebins)
            .transition()
            .duration(1000)
            .attr("fill", "blue")
            .attr("opacity", ".3")
            .attr("transform", function (d) {
                return "translate(" + x(d.x0) + "," + y(d.length) + ")";
            })
            .attr("width", function (d) { return x(d.x1) - x(d.x0) - 1; })
            .attr("height", function (d) { return height - y(d.length); });

        // line for average time
        svg.selectAll("#avg")
            .transition()
            .duration(1000)
            .attr("x1", 205)
            .attr("x2", 205)
            .attr('y1', 0)
            .attr('y2', height)
            .style('stroke-width', 2)
            .style('stroke', 'red')

        // text for average time
        svg.selectAll("#avgText")
            .transition()
            .duration(1000)
            .attr("x", 205)
            .style("fill", "red")
            .text("Avg Male Time: 4:14:40")

        if (!document.getElementById('scatterPlot')) {
            scatterPlot();
        }
    }

}
function handleContainerEnter(response) {
    // response = { direction }
    // sticky the graphic (old school)
    graphic.classed('is-fixed', true);
    graphic.classed('is-bottom', false);
}
function handleContainerExit(response) {
    // response = { direction }
    // un-sticky the graphic, and pin to top/bottom of container
    graphic.classed('is-fixed', false);
    graphic.classed('is-bottom', response.direction === 'down');
}
function init() {
    // 1. force a resize on load to ensure proper dimensions are sent to scrollama
    handleResize();
    // 2. setup the scroller passing options
    // this will also initialize trigger observations
    // 3. bind scrollama event handlers (this can be chained like below)
    scroller.setup({
        container: '#scroll',
        graphic: '.scroll__graphic',
        text: '.scroll__text',
        step: '.scroll__text .step',
        debug: false,
    })
        .onStepEnter(handleStepEnter)
        .onContainerEnter(handleContainerEnter)
        .onContainerExit(handleContainerExit);
    // setup resize event
    window.addEventListener('resize', handleResize);
}

// kick things off
init();