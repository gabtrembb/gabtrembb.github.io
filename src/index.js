'use strict'

import * as helper from './scripts/helper.js'
import * as preproc from './scripts/preprocess.js'
import * as viz1 from './scripts/viz1.js'
import * as viz2 from './scripts/viz2.js'
import * as viz3 from './scripts/viz3.js'
import * as viz4 from './scripts/viz4.js'
import * as legend from './scripts/legend.js'
import * as hover from './scripts/hover.js'
import * as util from './scripts/util.js'

import * as d3Chromatic from 'd3-scale-chromatic'

/**
 * @file This file is the entry-point for the the code for our Project for the course INF8808.
 * @author Gabrielle Tremblay, Guillaume Nadeau, Alexis Thibeault, Jean-Sébastien Dulong-Grégoire.
 * @version v1.0.0
 */

(function (d3) {
  let bounds
  let svgSize
  let graphSize

  const margin = { top: 35, right: 200, bottom: 35, left: 200 }
  const padding = 200
  const SEASONS = {Winter: "Hiver", Spring: "Printemps", Summer: "Été", Autumn: "Automne"}
  const MONTH_NAMES = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]

  var chosenSeasons = {Hiver: true, Printemps: true, Été: false, Automne: true} //todo: put false on all

  const xBandScale = d3.scaleBand().padding(0.25).paddingInner(0.25)
  const xTimeScale = d3.scaleTime()
  const yBandScale = d3.scaleBand().padding(0.2)
  //const xSubgroupScale = d3.scaleBand().padding(0.05) sert a rien?
  const yLinearScale = d3.scaleLinear()
  const colorScaleOrdinal = d3.scaleOrdinal()
  const colorScaleSequential = d3.scaleSequential(d3Chromatic.interpolateYlGnBu)

  d3.csv('./interventionscitoyendo.csv', d3.autoType).then(function (data) {
    const timePeriods = preproc.getTimePeriods(data);
    const types = preproc.getTypes(data);

    //viz1 preprocess
    var yearlyData = preproc.filterYears(data);
    var viz1Data = preproc.filterYearlyDataByCrimeType(yearlyData);
    

    //viz2 preprocess
    var crimeTypeData = preproc.filterCrimeType(data);
    var viz2Data = preproc.filterSeasons(crimeTypeData, SEASONS);

    //viz3 preprocess
    var viz3Data = preproc.filterTimePeriod(crimeTypeData);
    preproc.fillMissingData(viz3Data, types, timePeriods);

    //viz4 preprocess
    var viz4Data = preproc.filterYearlyDataByDate(yearlyData);
    preproc.sortViz4Data(viz4Data)

    // legend.initGradient(colorScale)
    // legend.initLegendBar()
    // legend.initLegendAxis()

    // viz.appendRects(data)

    setSizing()
    setClickHandlerViz1()
    setClickHandlerViz2()
    setClickHandlerViz3()
    setClickHandlerViz4()
    setClickHandlerViz5()

    /**
     *   This function handles the buttons click.
     */
    function setClickHandlerViz1 () {
      d3.select('#viz-button1').on('click', () => { buildViz1() } )
    }

    /**
     *   This function handles the buttons click.
     */
     function setClickHandlerViz2 () {
      d3.select('#viz-button2').on('click', () => { buildViz2() } )
    }

    /**
     *   This function handles the buttons click.
     */
     function setClickHandlerViz3 () {
      d3.select('#viz-button3').on('click', () => { buildViz3() } )
    }

    /**
     *   This function handles the buttons click.
     */
     function setClickHandlerViz4 () {
      d3.select('#viz-button4').on('click', () => { buildViz4() } )
    }

    /**
     *   This function handles the buttons click.
     */
     function setClickHandlerViz5 () {
      d3.select('#viz-button5').on('click', () => { buildViz5() } )
    }

    /**
     *   This function handles the graph's sizing.
     */
    function setSizing () {
      bounds = d3.select('.graph').node().getBoundingClientRect()

      svgSize = {
        width: bounds.width,
        height: 550
      }

      graphSize = {
        width: svgSize.width - margin.right - margin.left,
        height: svgSize.height - margin.bottom - margin.top
      }

      helper.setCanvasSize(svgSize.width, svgSize.height)
    }

    /**
     *   This function builds the graph.
     */
    function buildViz1 () {
      helper.removeG()
      const g = helper.generateG(margin)
      helper.appendAxes(g)

      viz1.updateXScale(xBandScale, viz1Data, graphSize.width - padding, util.range)
      viz1.updateYScale(yLinearScale, viz1Data, graphSize.height)

      viz1.drawXAxis(xBandScale, graphSize.height)
      viz1.drawYAxis(yLinearScale, graphSize.width)

      viz1.setColorScaleDomain(colorScaleOrdinal, types)

      viz1.createGroups(viz1Data)
      viz1.drawBars(yLinearScale, xBandScale, colorScaleOrdinal)

      // viz.rotateXTicks()

      // viz.updateRects(xBandScale, yScale, colorScale)

      // hover.setRectHandler(xBandScale, yScale, hover.rectSelected, hover.rectUnselected, hover.selectTicks, hover.unselectTicks)

      //legend.draw(margin.left / 2, margin.top + 5, graphSize.height - 10, 15, 'url(#gradient)', colorScale)
      legend.drawLegend(colorScaleOrdinal, g, graphSize.width)
    }
    /**
    *   This function builds the graph.
    */
   function buildViz2 () {
      helper.removeG()
      const g = helper.generateG(margin)
      helper.appendAxes(g)

      //todo: append buttons and keep selected the ones from choosen seasons.

      var filteredData = preproc.keepChosenSeasons(viz2Data, chosenSeasons, SEASONS)

      viz2.updateXScale(xBandScale, filteredData, graphSize.width - padding, util.range)
      viz2.updateYScale(yLinearScale, viz2Data, graphSize.height, SEASONS)

      viz1.drawXAxis(xBandScale, graphSize.height)
      viz1.drawYAxis(yLinearScale, graphSize.width)

      viz1.setColorScaleDomain(colorScaleOrdinal, [SEASONS.Winter, SEASONS.Spring, SEASONS.Summer, SEASONS.Autumn])

      viz1.createGroups(filteredData)
      viz2.drawBars(yLinearScale, xBandScale, colorScaleOrdinal, filteredData, SEASONS)
   }
   /**
    *   This function builds the graph.
    */
    function buildViz3 () {
      helper.removeG()
      const g = helper.generateG(margin)
      helper.appendAxes(g)

      viz3.updateXScale(xBandScale, timePeriods, graphSize.width, util.range)
      viz3.updateYScale(yBandScale, types, graphSize.height)

      viz3.drawXAxis(xBandScale, graphSize.height)
      viz3.drawYAxis(yBandScale, graphSize.width)

      viz3.setColorScaleDomain(colorScaleSequential, viz3Data)

      viz3.updateRects(xBandScale, yBandScale, colorScaleSequential, viz3Data)
   }

   /**
    *   This function builds the graph.
    */
    function buildViz4 () {
      helper.removeG()
      const g = helper.generateG(margin)
      helper.appendAxes(g)

      viz4.updateXScale(xTimeScale, viz4Data, graphSize.width)
      viz4.updateYScale(yLinearScale, viz4Data, graphSize.height)

      viz4.drawXAxis(xTimeScale, graphSize.height, MONTH_NAMES)
      viz1.drawYAxis(yLinearScale, graphSize.width)

      viz1.setColorScaleDomain(colorScaleOrdinal, viz4Data.map(x => x.year))

      viz4.drawLines(xTimeScale, yLinearScale, colorScaleOrdinal, viz4Data)
   }

   /**
    *   This function builds the graph.
    */
    function buildViz5 () {
      helper.removeG()
      const g = helper.generateG(margin)
      helper.appendAxes(g)

      var viz5Data = preproc.getViz5Data(data);
   }

    window.addEventListener('resize', () => {
      setSizing()
      //build() //todo: recall le build de la current viz.
    })
  })
})(d3)
