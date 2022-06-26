
/**
 * Generates the SVG element g which will contain the data visualisation.
 *
 * @param {object} margin The desired margins around the graph
 * @returns {*} The d3 Selection for the created g element
 */
export function generateG (margin) {
  return d3.select('.graph')
    .select('svg')
    .append('g')
    .attr('id', 'graph-g')
    .attr('transform',
      'translate(' + margin.left + ',' + margin.top + ')')
}

/**
 * Generates the SVG element g which will contain the data visualisation.
 *
 * @param {object} margin The desired margins around the graph
 * @returns {*} The d3 Selection for the created g element
 */
 export function removeG () {
  return d3.select('.graph')
    .select('svg')
    .selectAll('g')
    .remove()
}

/**
 * Sets the size of the SVG canvas containing the graph.
 *
 * @param {number} width The desired width
 * @param {number} height The desired height
 */
export function setCanvasSize (width, height) {
  d3.select('#graph').select('svg')
    .attr('width', width)
    .attr('height', height)
}

/**
 * Appends an SVG g element which will contain the axes.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function appendAxes (g) {
  g.append('g')
    .attr('class', 'x axis')

  g.append('g')
    .attr('class', 'y axis')
}

/**
 * Appends an SVG g element which will contain the axes.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {string} title The graph's title
 */
 export function appendTitle (g, posX, posY, title) {
  g.append('text')
    .attr('class', 'graph-title')
    .attr('text-anchor', 'middle')
    .style('dominant-baseline', 'central')
    .attr('x', posX)
    .attr('y', posY)
    .text(title)
}
