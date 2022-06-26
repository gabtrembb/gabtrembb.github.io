'use strict'

import * as helper from './scripts/helper.js'
import * as preproc from './scripts/preprocess.js'
import * as viz1 from './scripts/viz1.js'
import * as viz2 from './scripts/viz2.js'
import * as viz3 from './scripts/viz3.js'
import * as viz4 from './scripts/viz4.js'
import * as viz5 from './scripts/viz5.js'
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

  var chosenSeasons = {Winter: true, Spring: true, Summer: true, Autumn: true}
  var currentViz = 0;

  const xBandScale = d3.scaleBand().padding(0.25).paddingInner(0.25)
  const xTimeScale = d3.scaleTime()
  const yBandScale = d3.scaleBand().padding(0.2)
  const yLinearScale = d3.scaleLinear()
  const colorScaleOrdinal = d3.scaleOrdinal()
  const colorScaleSequential = d3.scaleSequential(d3Chromatic.interpolateYlGnBu)

  d3.csv('./interventionscitoyendo.csv', d3.autoType).then(function (data) {
    preproc.filterCrimeTypeName(data);
    data = preproc.filterDataByDateAndCrimeType(data);
    const TYPES = preproc.getTypes(data);  
    const TIME_PERIODS = preproc.getTimePeriods(data);

    setSizing()
    setClickHandlerViz1()
    setClickHandlerViz2()
    setClickHandlerViz3()
    setClickHandlerViz4()
    setClickHandlerViz5()

    setClickHandlerSummer()
    setClickHandlerSpring()
    setClickHandlerWinter()
    setClickHandlerFall()

    /**
     *   This function handles the buttons click.
     */
    function setClickHandlerSummer () {
      d3.select('#summer-button').on('click', () => { chosenSeasons.Summer = !chosenSeasons.Summer; buildViz2() } )
      setHoverHandlerSummer()
    }

    function setHoverHandlerSummer() {
      d3.select('#summer-button').on('mouseover', () => { 
        if (chosenSeasons.Summer) document.getElementById('summer-button').style.backgroundColor = 'rgba(44, 160, 44, .25)'
        else document.getElementById('summer-button').style.backgroundColor = '#2ca02c'
      } )
      d3.select('#summer-button').on('mouseleave', () => { 
        if (!chosenSeasons.Summer) document.getElementById('summer-button').style.backgroundColor = 'rgba(44, 160, 44, .25)'
        else document.getElementById('summer-button').style.backgroundColor = '#2ca02c' } )
    }

    /**
     *   This function handles the buttons click.
     */
    function setClickHandlerSpring () {
      d3.select('#spring-button').on('click', () => { chosenSeasons.Spring = !chosenSeasons.Spring; buildViz2() } )
      setHoverHandlerSpring()
    }

    function setHoverHandlerSpring() {
      d3.select('#spring-button').on('mouseover', () => { 
        if (chosenSeasons.Spring) document.getElementById('spring-button').style.backgroundColor = 'rgba(255, 127, 14, .25)'
        else document.getElementById('spring-button').style.backgroundColor = '#ff7f0e'
      } )
      d3.select('#spring-button').on('mouseleave', () => { 
        if (!chosenSeasons.Spring) document.getElementById('spring-button').style.backgroundColor = 'rgba(255, 127, 14, .25)'
        else document.getElementById('spring-button').style.backgroundColor = '#ff7f0e' } )
    }

    /**
     *   This function handles the buttons click.
     */
    function setClickHandlerWinter () {
      d3.select('#winter-button').on('click', () => { chosenSeasons.Winter = !chosenSeasons.Winter; buildViz2() } )
      setHoverHandlerWinter()
    }

    function setHoverHandlerWinter() {
      d3.select('#winter-button').on('mouseover', () => { 
        if (chosenSeasons.Winter) document.getElementById('winter-button').style.backgroundColor = 'rgba(31, 119, 180, .25)'
        else document.getElementById('winter-button').style.backgroundColor = '#1f77b4'
      } )
      d3.select('#winter-button').on('mouseleave', () => { 
        if (!chosenSeasons.Winter) document.getElementById('winter-button').style.backgroundColor = 'rgba(31, 119, 180, .25)'
        else document.getElementById('winter-button').style.backgroundColor = '#1f77b4' } )
    }

    /**
     *   This function handles the buttons click.
     */
    function setClickHandlerFall () {
      d3.select('#fall-button').on('click', () => { chosenSeasons.Autumn = !chosenSeasons.Autumn; buildViz2() } )
      setHoverHandlerFall()
    }

    function setHoverHandlerFall() {
      d3.select('#fall-button').on('mouseover', () => { 
        if (chosenSeasons.Autumn) document.getElementById('fall-button').style.backgroundColor = 'rgba(214, 39, 40, .25)'
        else document.getElementById('fall-button').style.backgroundColor = '#d62728'
      } )
      d3.select('#fall-button').on('mouseleave', () => { 
        if (!chosenSeasons.Autumn) document.getElementById('fall-button').style.backgroundColor = 'rgba(214, 39, 40, .25)'
        else document.getElementById('fall-button').style.backgroundColor = '#d62728' } )
    }
    
    /**
     *   This function handles the viz1 button click.
     */
    function setClickHandlerViz1 () {
      d3.select('#viz-button1').on('click', () => { buildViz1() } )
    }

    /**
     *   This function handles the viz2 button click.
     */
     function setClickHandlerViz2 () {
      d3.select('#viz-button2').on('click', () => { buildViz2() } )
    }

    /**
     *   This function handles the viz3 button click.
     */
     function setClickHandlerViz3 () {
      d3.select('#viz-button3').on('click', () => { buildViz3() } )
    }

    /**
     *   This function handles the viz4 button click.
     */
     function setClickHandlerViz4 () {
      d3.select('#viz-button4').on('click', () => { buildViz4() } )
    }

    /**
     *   This function handles the viz5 button click.
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
     *   This function builds the viz1 graph.
     */
    function buildViz1 () {
      currentViz = 1
      helper.removeG()
      const g = helper.generateG(margin)
      helper.appendAxes(g)
      helper.appendTitle(g, (graphSize.width-padding)/2, -20, 'Tendances du taux de criminalité par année')

      const viz1Data = preproc.getViz1Data(data)

      viz1.updateXScale(xBandScale, viz1Data, graphSize.width - padding)
      viz1.updateYScale(yLinearScale, viz1Data, graphSize.height)

      viz1.drawXAxis(xBandScale, graphSize.height)
      viz1.drawYAxis(yLinearScale, graphSize.width)

      viz1.setColorScaleDomain(colorScaleOrdinal, TYPES)

      viz1.drawBars(yLinearScale, xBandScale, colorScaleOrdinal, viz1Data)

      legend.drawLegend(colorScaleOrdinal, g, graphSize.width)

      document.getElementById('season-buttons-container').style.display = 'none'
    }
    /**
    *   This function builds the viz2 graph.
    */
   function buildViz2 () {
      currentViz = 2
      helper.removeG()
      const g = helper.generateG(margin)
      helper.appendAxes(g)
      helper.appendTitle(g, (graphSize.width-padding)/2, -20, "Tendances du taux de criminalité par catégorie selon la période de l'année")

      var viz2Data = preproc.getViz2Data(data, SEASONS)

      viz2.updateXScale(xBandScale, viz2Data, graphSize.width - padding, util.range)
      viz2.updateYScale(yLinearScale, viz2Data, graphSize.height, SEASONS)

      viz1.drawXAxis(xBandScale, graphSize.height)
      viz1.drawYAxis(yLinearScale, graphSize.width)

      viz1.setColorScaleDomain(colorScaleOrdinal, [SEASONS.Winter, SEASONS.Spring, SEASONS.Summer, SEASONS.Autumn])

      viz2.createGroups(viz2Data)

      viz2Data = preproc.keepChosenSeasons(viz2Data, chosenSeasons, SEASONS)
      viz2.drawBars(yLinearScale, xBandScale, colorScaleOrdinal, viz2Data, SEASONS)

      document.getElementById('season-buttons-container').style.display = 'inline'
   }
   /**
    *   This function builds the viz3 graph.
    */
    function buildViz3 () {
      currentViz = 3
      helper.removeG()
      const g = helper.generateG({top: margin.top + 30, right: margin.right, left: margin.left, bottom: margin.bottom})
      helper.appendAxes(g)
      helper.appendTitle(g, (graphSize.width)/2, -50, "Taux et types de crimes par période")

      var viz3Data = preproc.getViz3Data(data, TYPES, TIME_PERIODS)

      viz3.updateXScale(xBandScale, TIME_PERIODS, graphSize.width, util.range)
      viz3.updateYScale(yBandScale, TYPES, graphSize.height)

      viz3.drawXAxis(xBandScale, graphSize.height)
      viz3.drawYAxis(yBandScale, graphSize.width)

      viz3.setColorScaleDomain(colorScaleSequential, viz3Data)

      viz3.updateRects(xBandScale, yBandScale, colorScaleSequential, viz3Data)

      document.getElementById('season-buttons-container').style.display = 'none'
   }

   /**
    *   This function builds the viz4 graph.
    */
    function buildViz4 () {
      currentViz = 4
      helper.removeG()
      const g = helper.generateG(margin)
      helper.appendAxes(g)
      helper.appendTitle(g, graphSize.width/2, -20, "Taux de criminalité annuel")

      var viz4Data = preproc.getViz4Data(data)

      viz4.updateXScale(xTimeScale, viz4Data, graphSize.width)
      viz4.updateYScale(yLinearScale, viz4Data, graphSize.height)

      viz4.drawXAxis(xTimeScale, graphSize.height, MONTH_NAMES)
      viz1.drawYAxis(yLinearScale, graphSize.width)

      viz1.setColorScaleDomain(colorScaleOrdinal, viz4Data.map(x => x.year))

      viz4.drawLines(xTimeScale, yLinearScale, colorScaleOrdinal, viz4Data)

      document.getElementById('season-buttons-container').style.display = 'none'
   }

   /**
    *   This function builds the viz5 graph.
    */
    function buildViz5 () {
      currentViz = 5
      helper.removeG()
      const g = helper.generateG(margin)
      helper.appendAxes(g)
      helper.appendTitle(g, (graphSize.width-padding)/2, -20, "Tendances du taux de criminalité par catégorie")

      var viz5Data = preproc.getViz5Data(data)

      viz2.updateXScale(xBandScale, viz5Data, graphSize.width - padding, util.range)
      viz5.updateYScale(yLinearScale, viz5Data, graphSize.height)

      viz1.drawXAxis(xBandScale, graphSize.height)
      viz1.drawYAxis(yLinearScale, graphSize.width)

      viz1.setColorScaleDomain(colorScaleOrdinal, [2015, 2016, 2017, 2018, 2019, 2020, 2021])

      viz5.drawBars(yLinearScale, xBandScale, colorScaleOrdinal, viz5Data)    
      
      document.getElementById('season-buttons-container').style.display = 'none'
   }

    window.addEventListener('resize', () => {
      setSizing()
      
      switch(currentViz) {
        case 1:
          buildViz1();
          break;

        case 2:
          buildViz2();
          break;

        case 3:
          buildViz3();
          break;

        case 4:
          buildViz4();
          break;

        case 5:
          buildViz5();
          break;
      }
    })
  })
})(d3)
