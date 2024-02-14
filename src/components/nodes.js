import * as d3 from "d3";
import React, { useEffect, useState, useContext } from 'react';
import configData from '../config.json';
import { blue } from "@mui/material/colors";
import styles from '../styles/Home.module.css';
import GlobalContext from '../context/globalcontext.js';
import { myFluid } from './fluidsim.js';

const createGraph = (nodesData, linksData, showFridge, showScrambler, showMonopobobility, showStoreChat) => {
    const GRAPH_WIDTH = configData.GRAPH_WIDTH;
    const GRAPH_HEIGHT = configData.GRAPH_HEIGHT;

    
    const handleClick = (d) => {
      if (d.id === 0) {
        showFridge();
      } else if (d.id === 1) {
        showScrambler();
      } else if (d.id === 2) {
        showMonopobobility();
      } else {
        showStoreChat();
      }
    }
    // detect whether exists svg and tooltip
    const existingSvg = d3.select("#graph-svg");
  
    const svg = d3.select("#chart")
      .append("svg")
      .attr("id", "graph-svg")
      .attr("width", 2 * GRAPH_WIDTH)
      .attr("height", GRAPH_HEIGHT)
      .attr("viewbox", [0, 0, GRAPH_WIDTH, GRAPH_HEIGHT])
      .style("scroll-snap-type", "none")
      .attr("position", "absolute")
      .on("mousemove", function(event, d) {
        console.log(event);
        myFluid.canvas.dispatchEvent(new MouseEvent('mousemove', event))
      })
      
  
    const g = svg.append('g')
      .attr("id", "graph-g")
      .attr('transform', 'translate(-1850, -1900) scale(5.6)');
  
    const simulation = d3
      .forceSimulation(nodesData)
      .force("link", 
        d3.forceLink(linksData)                // This force provides links between nodes
          .id(function(d) { return d.id; })    // provide the id of a node
          .links(linksData)
          .distance(configData.LINK_DISTANCE_FORCE)    // the list of links
        )
      .force("charge", d3.forceManyBody().strength(configData.DRAG__STRENGTH_FORCE))
      .force("center", d3.forceCenter(GRAPH_WIDTH / 2, GRAPH_HEIGHT / 2))
      .force("x", d3.forceX())
      .force("y", d3.forceY())
      .force('collide', d3.forceCollide(configData.DRAG_COLLIDE_FORCE));
  
    // marker with arrowhead

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
      myFluid.canvas.dispatchEvent(new MouseEvent('customDrag', event.sourceEvent));
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      setTimeout(() => {
        d.fx = null;
        d.fy = null;
      }, 20)
      
      
    }
  
    var links = g.append("g")
      .attr("class", "links")
      .selectAll(".link")
      .data(linksData)
      .enter()
      .append("line")
      .attr("id", function(d, i) {
        return "linkId_" + i;
      })
      .attr("stroke", "#ffffff")
      .attr("stroke-width", configData.LINK_WIDTH);
  
    var nodes = g.append("g")
      .attr("class", "nodes")
      .selectAll(".node")
      .data(nodesData)
      .enter()
      .append("image")
      .attr("class", "node")
      .attr("href", function(d) {
        if (d.name === "Fridge") {
          return "https://i.ibb.co/64Y5M4P/fridgevector.png";
        } else if (d.id === 1) {
          return "https://i.ibb.co/2nv7nfw/scrambler.png";
        } else if (d.id === 2) {
          return "https://i.ibb.co/gZrxTQp/monopobobilit.png";
        } else {
          return "https://i.ibb.co/D4YqgPZ/storechat.png";
        }
        
      }) // https://i.ibb.co/64Y5M4P/fridgevector.png
      .attr("cursor", "pointer")
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));
      
    
    var label = g.append("g")
      .attr("class", "labels")
      .selectAll("text")
      .data(nodesData)
      .enter().append("text")
      .text(function(d) { 
          return d.name;
      })
      .attr('font-size', configData.LABEL_FONT_SIZE)
      .attr('dx', 1)
      .attr('dy', 1);

  
    var infoPanel = d3.select("#chart")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
  
    nodes
      .on("mouseover", function(event, d) {
        d3.select(this)
          .transition()
          .duration('100')
          .attr("filter", "drop-shadow(4px 6px 3px rgb(0 0 0 / 0.4))")
        
        infoPanel.transition()
          .duration(100)
          .style("opacity", 1)

        myFluid.canvas.dispatchEvent(new MouseEvent('mousemove', event));
      })
      .on("mouseout", function(event, d) {
        d3.select(this)
          .transition()
          .duration('200')
          .attr("filter", "drop-shadow(0px 0px 0px rgb(0 0 0 / 0.4))")
        
        infoPanel.transition()
          .duration('200')
          .style("opacity", 0);
        myFluid.canvas.dispatchEvent(new MouseEvent('mousemove', event));
      })
      .on("click", function(event, d) {
        handleClick(d);
      });
  
    simulation.on("tick", () => {
      nodes
        .attr("x", function(d){
          if (d.id === 2) {
            return d.x - 10;
          } else if (d.id === 1) {
            return d.x - 15;
          }
          return d.x - 10;
        })
        .attr("y", function(d){
          if (d.id === 2) {
            return d.y - 15;
          } else if (d.id === 1) {
            return d.y - 20;
          } else if (d.id === 3) {
            return d.y - 15;
          }
          return d.y;
        })
        .attr("height", function(d) {
          if (d.id === 2) {
            if (100 + ((d.y - 400)/5) < 0) {
              return 1;
            } else {
              return 100 + ((d.y - 400)/5);
            }
          } else if (d.id === 1) {
            if (100 + ((d.y - 400)/5) < 0) {
              return 1;
            } else {
              return 100 + ((d.y - 400)/5);
            }
          } else {
            if (80 + ((d.y - 400)/5) < 0) {
              return 1;
            } else {
              return 80 + ((d.y - 400)/5);
            }
          }
        })
        .attr("width", function(d) {
          if (d.id === 2) {
            return 23 + ((d.y - 400)/5);
          } else if (d.id === 1) {
            return 23 + ((d.y - 400)/5);
          } else {
            return 18 + ((d.y - 400)/5);
          }
        })

      
      links
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);
      });
      label
      .attr("x", function(d) { return d.x; })
      .attr("y", function (d) { return d.y; });

    svg.attr("height", 1500)
};

const Nodes = () => {

    const context = useContext(GlobalContext);

    var projOne = {
        id: 0,
        name: "Fridge",
    }
    var projTwo = {
        id: 1,
        name: "test2",
    }

    var projThree = {
        id: 2,
        name: "test3",
    }

    var projFour = {
        id: 3,
        name: "test4",
    }

    var staticCenter = {
        vx: -0.07880756139716755,
        vy: -0.06320159140203532,
        x: 500,
        y: 400
    }

    var linksData = [{
        id : 4,
        source: staticCenter,
        target: projOne,
    }, {
        id : 4,
        source: staticCenter,
        target: projTwo,
    }, {
        id : 4,
        source: staticCenter,
        target: projThree,
    }, {
        id : 4,
        source: staticCenter,
        target: projFour,
    }]

    var nodesData = [
        projOne, projTwo, projThree, projFour
    ]
    
    useEffect(() => {
        createGraph(nodesData, linksData, context.showFridge, context.showScrambler, context.showMonopobobility, context.showStoreChat);
      }, []);

    return (
      <>
        <div id = "chart"></div>
      </>
        
    )
}

export default Nodes;