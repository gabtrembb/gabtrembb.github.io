import d3Legend from 'd3-svg-legend'

/**
 * Draws the legend.
 *
 * @param {*} colorScale The color scale to use
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} width The width of the graph, used to place the legend
 */
export function drawLegend (colorScale, g, width) {
  const padding = 150
  d3.select('#legend').remove()
  g.append('g').attr('id', 'legend').attr('transform', 'translate('+(width-padding)+',0)')
  var legend = d3Legend.legendColor().scale(colorScale).title('Legend')
  .shape('path', d3.symbol().type(d3.symbolCircle).size(250)())
  g.select('#legend').call(legend)
}