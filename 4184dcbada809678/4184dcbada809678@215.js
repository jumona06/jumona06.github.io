// https://observablehq.com/d/4184dcbada809678@215
export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["colombia.png",new URL("./files/a5ba7bbe36a6c0564ce8f5b3ec23ae268ee3ff4700060a9845a84fa0ac2d3221abe9b020c2b69bced6635886307300755499a870ec6253faf0da35eab4c5842a",import.meta.url)],["ne_110m_admin_0_countries_lakes-2.json",new URL("./files/d272af005d0d0882f98e3b7bfb882b960b6140fdf5315e35ac1def557a1b9734a9fe63722acca2ba50cbb9ff62e04a290c3e104b708921c70e4330b29bbe3690",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Boom Latinoamericano
##References:
1. https://observablehq.com/@harrystevens/latin-america-projection
2. https://observablehq.com/@enadol/coronavirus-map-latin-america`
)});
  main.variable(observer()).define(["md","FileAttachment"], async function(md,FileAttachment){return(
md `<figure>
  <img src="${await FileAttachment("colombia.png").url()}">
</figure>`
)});
  main.variable(observer()).define(["html"], function(html){return(
html`
  <style>

      div.tooltip {	
          position: absolute;			
          text-align: center;			
          max-width:  500px;					
          max-height: 500px;					
          padding: 0.5em;				
          font: 0.4em;		
          background: rgb(77, 73, 73);	
          border: 0px;		
          border-radius: 0.5em;			
          pointer-events: none;	
          color: white;		
      }
  </style>
`
)});
  main.variable(observer("chart_1")).define("chart_1", ["d3","width","height","path","worldGeojsonOuter","FileAttachment","laGeojson","worldGeojsonInner","scaleBar"], async function(d3,width,height,path,worldGeojsonOuter,FileAttachment,laGeojson,worldGeojsonInner,scaleBar)
{
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height);
  
  svg.append("path")
      .datum(d3.geoGraticule())
      .attr("d", path)
      .attr("fill", "none")
      .attr("stroke", "#f0f0f0");
  
  svg.append("path")
      .datum(worldGeojsonOuter)
      .attr("fill", "white")
      //.attr("stroke", "#aaa")
      .attr("stroke", "#eee")
      .attr("d", path);
  
  /*svg.append("defs")
   .append("pattern")
   .attr("patternUnits", "objectBoundingBox")
   .attr("id", "COL")
   .append("image")
   //.attr("xlink:href", "http://hernamvel.github.io/images/colombia.png");
   .attr("xlink:href", "https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-128.png");
   //.attr("xlink:href",await FileAttachment("colombia.png").url());
   //.attr("xlink:href",FileAttachment("colombia.png").url());*/
  
  const defs = svg.append("defs");
  
  defs.append("pattern")
        .attr("id","COL")
        .attr("height","100%")
        .attr("width","100%")
        .attr("patternContentUnits","objectBoundingBox")
        .append("image")
        .attr("height",1)
        .attr("width",1)
        .attr("preserveAspectRatio","none")
        .attr("xmlns:xlink","https://www.w3.org/1999/xlink")
        // .attr("xlink:href","https://scontent-bog1-1.xx.fbcdn.net/v/t1.0-9/67793663_10218526127639802_3061337501860888576_n.jpg?_nc_cat=111&_nc_sid=730e14&_nc_eui2=AeFffz-gBt7v3mkR73TDNi_gh7wc18G7guqHvBzXwbuC6rl52wTwb-yANsA7ScdIyyw&_nc_ohc=HmvWoOHOg6UAX8pyeGD&_nc_ht=scontent-bog1-1.xx&oh=b92ac7d14e2cb35b4ca9650af6a79136&oe=5EBA3F56");
  .attr("xlink:href",await FileAttachment("colombia.png").url());
  
  svg.selectAll(".country")
      .data(laGeojson.features)
    .enter().append("path")
      .attr("class", "country")
      //.attr("fill", "#ddd")
      .attr("opacity", "70%")
      //.attr('fill', d => d.properties.ISO_A3 == "COL" ? 'red': 'steelblue')
      .attr('fill', 'steelblue')
      //.attr('fill', d => d.properties.ISO_A3 == "COL" ?  "url(#COL)": 'steelblue')
      .attr("d", path);
  
  svg.append("path")
      .datum(worldGeojsonInner)
      .attr("fill", "none")
      .attr("stroke", "#eee")
      .attr("d", path);
    
  svg.append("g")
      .call(scaleBar);
  
  const div_tool = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);
  
  svg
    .selectAll(".country")
    .on("mouseover", function(d) {
//       tooltip.call(
//         callout,
//         `${data_col_group.get(d.properties.NOMBRE_DPT)}
// ${d.properties.NOMBRE_DPT}`
//       );
//       d3.select(this)
//         .attr("stroke", "red")
//         .raise();
      d3.select(this)
        //.attr("stroke", "red")
        .attr("stroke", "black")
        .attr('fill', d => d.properties.ISO_A3 == "COL" ?  "url(#COL)": 'steelblue')
        .raise();
    
    div_tool.transition()		
        .duration(200)		
        .style("opacity", .9);		
    // div_tool.html(`${data_col_group.get(d.properties.NOMBRE_DPT)} <br>
    //              ${d.properties.NOMBRE_DPT}`)
    div_tool.html(`${d.properties.ISO_A3}`)
        .style("left", (d3.event.pageX) + "px")		
        .style("top", (d3.event.pageY) + "px")
    })
    .on("mousemove", function() {
      // tooltip.attr(
      //   "transform",
      //   `translate(${d3.mouse(this)[0]},${d3.mouse(this)[1]})`
      // );
    div_tool.attr(
        "transform",
        `translate(${d3.mouse(this)[0]},${d3.mouse(this)[1]})`
      );
    })
    .on("mouseout", function() {
      // tooltip.call(callout, null);
      // d3.select(this)
      //   .attr("stroke", "#333")
      //   .lower();
      d3.select(this)
        .attr("stroke", "#eee")
    .attr('fill', 'steelblue');

      div_tool.transition()		
        .duration(500)		
        .style("opacity", 0);
    });
  
  return svg.node();
}
);
  main.variable(observer("chart")).define("chart", ["d3","DOM","width","height","countries","pathGenerator"], function(d3,DOM,width,height,countries,pathGenerator)
{
  // create SVG element
  var svg = d3.select(DOM.svg(width, height));

  svg.append("defs")
   .append("pattern")
   .attr("id", "bg")
   .append("image")
   .attr("xlink:href", "http://hernamvel.github.io/images/colombia.png");
  
  // construct the element
  svg
    .append('path')
    .datum(countries)
    //.data(countries.features)
    .attr('d', pathGenerator)
    .attr('class', 'country')
    .attr('fill', 'steelblue')
    //.attr('fill', d => d.features.id == "ARG" ? 'red': 'steelblue')  
    //.attr('fill', "url(#bg)")
    //.attr('fill', d => d.id == "COL" ? 'red': 'steelblue')
    /*.attr('fill', function(d) {
     console.log(d.id)
    //return 'steelblue'
    return (d.id == 'COL') ? 'gray' : 'steelblue';
  })*/
    .attr('opacity', 0.5)
    .attr('stroke', 'black')
    .attr('stroke-width', '0.5');
  
  /*svg
    .selectAll("country")
    .on("mouseover", function(d) {
      d3.select(this)
      console.log(d)
        .attr("stroke", "red")
        .raise();
  });/*
  
  /*var circles = svg
    .selectAll('path')
    .data(LatLngs)
    .enter()
    .append('circle');/*

  /*
  circles
    .attr("cx", d => d[2][0])
    .attr("cy", d => d[2][1])
    .attr('r', d => Math.cbrt(d[3]) / 3)
    .attr('class', 'circle')
    .attr("fill", "#d60f23")
    .attr('opacity', 0.3)
    .on("click", function(d) {
      div
        .transition()
        .duration(200)
        .style("opacity", .9);
      div
        .html(
          "<b>COUNTRY: </b>" +
            d[0] +
            "<br/><b>REGION: </b>" +
            d[1] +
            "</br><b>CONFIRMED CASES: </b>" +
            d[3] +
            "</br>AS OF " +
            llave
        )
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 28 + "px");
    })
    .on("mouseout", function(d) {
      div
        .transition()
        .duration(500)
        .style("opacity", 0);
    });
    */

  // pass to Observable to draw this block
  return svg.node();
}
);
  main.variable(observer("countries")).define("countries", ["d3"], function(d3){return(
d3.json(
  "https://gist.githubusercontent.com/phil-pedruco/10447085/raw/426fb47f0a6793776a044f17e66d17cbbf8061ad/countries.geo.json"
)
)});
  main.variable(observer("topojson")).define("topojson", ["require"], function(require){return(
require("topojson-client@3")
)});
  main.variable(observer("path")).define("path", ["d3","projection"], function(d3,projection){return(
d3.geoPath(projection)
)});
  main.variable(observer("pathGenerator")).define("pathGenerator", ["d3","projection"], function(d3,projection){return(
d3.geoPath().projection(projection)
)});
  main.variable(observer("height")).define("height", function(){return(
720
)});
  main.variable(observer("projection")).define("projection", ["d3","width","height"], function(d3,width,height){return(
d3
  .geoMercator()
  .scale(385)
  .translate([width + 100, height / 3])
)});
  main.variable(observer("width")).define("width", function(){return(
980
)});
  main.variable(observer("laGeojson")).define("laGeojson", ["worldGeojson"], function(worldGeojson)
{
  const features = worldGeojson.features.filter(d => d.properties.CONTINENT.includes("America") && !["Canada", "Greenland", "United States of America"].includes(d.properties.ADMIN));
  return {
    type: "FeatureCollection",
    features
  }
}
);
  main.variable(observer("worldGeojson")).define("worldGeojson", ["topojson","worldTopojson"], function(topojson,worldTopojson){return(
topojson.feature(worldTopojson, worldTopojson.objects.ne_110m_admin_0_countries_lakes)
)});
  main.variable(observer("worldTopojson")).define("worldTopojson", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("ne_110m_admin_0_countries_lakes-2.json").json()
)});
  main.variable(observer("worldGeojsonOuter")).define("worldGeojsonOuter", ["topojson","worldTopojson"], function(topojson,worldTopojson){return(
topojson.mesh(worldTopojson, worldTopojson.objects.ne_110m_admin_0_countries_lakes, (a, b) => a === b)
)});
  main.variable(observer("worldGeojsonInner")).define("worldGeojsonInner", ["topojson","worldTopojson"], function(topojson,worldTopojson){return(
topojson.mesh(worldTopojson, worldTopojson.objects.ne_110m_admin_0_countries_lakes, (a, b) => a !== b)
)});
  main.variable(observer("scaleBar")).define("scaleBar", ["d3","width","height","projection"], function(d3,width,height,projection){return(
d3.geoScaleBar()
    .size([width, height])
    .projection(projection)
    .left(.1)
    .top(.9)
    .units(d3.geoScaleMiles)
    .distance(1000)
    .label("1,000 MILES")
    .labelAnchor("middle")
    .tickValues(null)
    .tickSize(null)
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@^5.15.0","d3-geo-scale-bar@1")
)});
  return main;
}
