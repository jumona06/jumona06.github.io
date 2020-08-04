// https://observablehq.com/d/d98ae5659b00ffb5@608
export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["colombia.png",new URL("./files/a5ba7bbe36a6c0564ce8f5b3ec23ae268ee3ff4700060a9845a84fa0ac2d3221abe9b020c2b69bced6635886307300755499a870ec6253faf0da35eab4c5842a",import.meta.url)],["ne_110m_admin_0_countries_lakes-2.json",new URL("./files/d272af005d0d0882f98e3b7bfb882b960b6140fdf5315e35ac1def557a1b9734a9fe63722acca2ba50cbb9ff62e04a290c3e104b708921c70e4330b29bbe3690",import.meta.url)],["Estructura Datos Boom Latinoamericano@4.csv",new URL("./files/068798e099200d9e63e45e234994c8084c9252ca0a6bf915f8a1b5dda3a6d3e6ef938686ab237fdfb3d22755c6ceea3668f344bd01f217790c1b079fa82198c0",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Boom Latinoamericano
##References:
1. https://observablehq.com/@harrystevens/latin-america-projection
2. https://observablehq.com/@enadol/coronavirus-map-latin-america`
)});
  main.variable(observer()).define(["html"], function(html){return(
html`
  <style>

      div.tooltip {	
          position: absolute;		
          max-width:  500px;					
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
  main.variable(observer("chart_1")).define("chart_1", ["d3","width","height","path","worldGeojsonOuter","FileAttachment","laGeojson","color_country","worldGeojsonInner","scaleBar","latinamerica_boom","tooltip_html"], async function(d3,width,height,path,worldGeojsonOuter,FileAttachment,laGeojson,color_country,worldGeojsonInner,scaleBar,latinamerica_boom,tooltip_html)
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
  
  //-----------------------
  
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
  
  defs.append("pattern")
        .attr("id","ARG")
        .attr("height","100%")
        .attr("width","100%")
        .attr("patternContentUnits","objectBoundingBox")
        .append("image")
        .attr("height",1)
        .attr("width",1)
        .attr("preserveAspectRatio","none")
        .attr("xmlns:xlink","https://www.w3.org/1999/xlink")
.attr("xlink:href","https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/1280px-Flag_of_Argentina.svg.png");
  //.attr("xlink:href",await FileAttachment("colombia.png").url());
  
  defs.append("pattern")
        .attr("id","PAN")
        .attr("height","100%")
        .attr("width","100%")
        .attr("patternContentUnits","objectBoundingBox")
        .append("image")
        .attr("height",1)
        .attr("width",1)
        .attr("preserveAspectRatio","none")
        .attr("xmlns:xlink","https://www.w3.org/1999/xlink")
.attr("xlink:href","https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Flag_of_Panama.svg/900px-Flag_of_Panama.svg.png");
  //.attr("xlink:href",await FileAttachment("colombia.png").url());
  
  defs.append("pattern")
        .attr("id","PER")
        .attr("height","100%")
        .attr("width","100%")
        .attr("patternContentUnits","objectBoundingBox")
        .append("image")
        .attr("height",1)
        .attr("width",1)
        .attr("preserveAspectRatio","none")
        .attr("xmlns:xlink","https://www.w3.org/1999/xlink")
.attr("xlink:href","https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Flag_of_Peru_%28war%29.svg/1280px-Flag_of_Peru_%28war%29.svg.png");
  //.attr("xlink:href",await FileAttachment("colombia.png").url());
  
  defs.append("pattern")
        .attr("id","MEX")
        .attr("height","100%")
        .attr("width","100%")
        .attr("patternContentUnits","objectBoundingBox")
        .append("image")
        .attr("height",1)
        .attr("width",1)
        .attr("preserveAspectRatio","none")
        .attr("xmlns:xlink","https://www.w3.org/1999/xlink")
        .attr("xlink:href","https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg");
  //.attr("xlink:href",await FileAttachment("colombia.png").url());
  
  defs.append("pattern")
        .attr("id","BOL")
        .attr("height","100%")
        .attr("width","100%")
        .attr("patternContentUnits","objectBoundingBox")
        .append("image")
        .attr("height",1)
        .attr("width",1)
        .attr("preserveAspectRatio","none")
        .attr("xmlns:xlink","https://www.w3.org/1999/xlink")
.attr("xlink:href","https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_Bolivia_%28state%29.svg/1100px-Flag_of_Bolivia_%28state%29.svg.png");
  //.attr("xlink:href",await FileAttachment("colombia.png").url());
  
  defs.append("pattern")
        .attr("id","BRA")
        .attr("height","100%")
        .attr("width","100%")
        .attr("patternContentUnits","objectBoundingBox")
        .append("image")
        .attr("height",1)
        .attr("width",1)
        .attr("preserveAspectRatio","none")
        .attr("xmlns:xlink","https://www.w3.org/1999/xlink")
        .attr("xlink:href","https://image.freepik.com/vector-gratis/ilustracion-bandera-brasil_53876-27017.jpg");
  //.attr("xlink:href",await FileAttachment("colombia.png").url());
  
  defs.append("pattern")
        .attr("id","CHL")
        .attr("height","100%")
        .attr("width","100%")
        .attr("patternContentUnits","objectBoundingBox")
        .append("image")
        .attr("height",1)
        .attr("width",1)
        .attr("preserveAspectRatio","none")
        .attr("xmlns:xlink","https://www.w3.org/1999/xlink")
        .attr("xlink:href","https://upload.wikimedia.org/wikipedia/commons/7/78/Flag_of_Chile.svg");
  //.attr("xlink:href",await FileAttachment("colombia.png").url());
  
  //-----------------------
  
  svg.selectAll(".country")
      .data(laGeojson.features)
    .enter().append("path")
      .attr("class", "country")
      //.attr("fill", "#ddd")
      //.attr("opacity", "70%")
      //.attr('fill', d => d.properties.ISO_A3 == "COL" ? 'red': 'steelblue')
      //.attr('fill', 'steelblue')
      .attr('fill', d => color_country(d.properties.ISO_A3))
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
  //.attr("x", "10px")
  //.attr("y", "10px");
  
  svg
    .selectAll(".country")
    .on("mouseover", function(d) {
      if(latinamerica_boom.includes(d.properties.ISO_A3)){
      d3.select(this)
        //.attr("stroke", "red")
        .attr("stroke", "black")
        //.attr('fill', d => d.properties.ISO_A3 == "COL" ?  "url(#COL)": 'steelblue')
        .attr('fill', function(d){
        let col = 'steelblue'
        if (d.properties.ISO_A3 == "COL"){
          col = "url(#COL)"
        }
        else if(d.properties.ISO_A3 == "ARG"){
          col = "url(#ARG)"
        }
        else if(d.properties.ISO_A3 == "PAN"){
          col = "url(#PAN)"
        }
        else if(d.properties.ISO_A3 == "PER"){
          col = "url(#PER)"
        }
        else if(d.properties.ISO_A3 == "MEX"){
          col = "url(#MEX)"
        }
        else if(d.properties.ISO_A3 == "BOL"){
          col = "url(#BOL)"
        }
        else if(d.properties.ISO_A3 == "BRA"){
          col = "url(#BRA)"
        }
        else if(d.properties.ISO_A3 == "CHL"){
          col = "url(#CHL)"
        }
      return col
      })
        .raise();
    
    div_tool.transition()		
        .duration(200)		
        .style("opacity", .9);		
    // div_tool.html(`${data_col_group.get(d.properties.NOMBRE_DPT)} <br>
    //              ${d.properties.NOMBRE_DPT}`)
    //div_tool.html(`${d.properties.ISO_A3}`)
    //div_tool.html(d => d.properties.ISO_A3 == "COL" ? tooltip_html(d) : `A`)
    div_tool.html(tooltip_html(d))
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY) + "px")
      }
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
    //.attr('fill', 'steelblue');
    .attr('fill', d => color_country(d.properties.ISO_A3));

      div_tool.transition()		
        .duration(500)		
        .style("opacity", 0);
    });
  
  return svg.node();
}
);
  main.variable(observer("countries_list")).define("countries_list", ["laGeojson"], function(laGeojson)
{
  let countries = []
  var i;
  
  for (i in laGeojson.features){
  countries.push(laGeojson.features[i].properties.ISO_A3)
  }
  return countries
}
);
  main.variable(observer("latinamerica_boom")).define("latinamerica_boom", function(){return(
["COL","ARG","PAN","PER","MEX","CHL","BOL","BRA"]
)});
  main.variable(observer("countries_list_colores")).define("countries_list_colores", ["countries_list","latinamerica_boom"], function(countries_list,latinamerica_boom)
{
  let countries_color = []
  var i;
  
  for (i in countries_list){
    //console.log(countries_list[i]);
    //if (countries_list[i]=="COL"){
    if (latinamerica_boom.includes(countries_list[i])){
  countries_color.push("steelblue")
    }
    else{
      countries_color.push("lightsteelblue")
    }
  }
  return countries_color
}
);
  main.variable(observer("color_country")).define("color_country", ["d3","countries_list","countries_list_colores"], function(d3,countries_list,countries_list_colores){return(
d3.scaleOrdinal()
.domain(countries_list)
.range(countries_list_colores)
)});
  main.variable(observer("tooltip_html")).define("tooltip_html", ["d3","autores","autores_description"], function(d3,autores,autores_description){return(
function (d){
  //d3.select("#autores").call(autores(d.properties.ISO_A3))
  //<svg>${autores(d.properties.ISO_A3)}</svg>
  /*<svg width="128" height="128" fill="none" stroke="black">${
  d3.range(8, 128, 8).map(radius => `<circle r="${radius}"></circle>`)
}</svg>*/
  /*
  <svg width="128" height="128" fill="none" stroke="black">${
  d3.range(8, 128, 8).map(r => `<circle r="${r}" fill="${fill(r)}"></circle>`)
}</svg>*/
  /*<svg width="128" height="128">${
  d3.range(128, 0, -8).map(radius => `<circle r="${radius}" fill="${fill(radius)}"></circle>`)
}</svg>*/
  const fill = d3.scaleSequential(d3.interpolateViridis).domain([0, 5]);
  //color("Italy")
  //${d.properties.ADMIN}
  const html = `<div class="container">    
                    <div class="autores" id="autores">${autores(d.properties.ISO_A3)}</div>
                <div class="row justify-content-end" id="description">${autores_description(d.properties.ISO_A3)}
                </div>


</div>`
//return d.properties.ISO_A3 == "COL" ?  html : `No cuenta con ningún representante en el Boom Latinoamericano`
  return html
}
)});
  main.variable(observer("autores_description")).define("autores_description", ["data_autores"], function(data_autores){return(
function(country_){
 
  let html_ = ``
  
  let i = 0;
  let countries = data_autores.filter(d => d.country === country_);
  
  for (i in countries){
    html_ += `<p><span style="font-weight: bold; color:${countries[i].color_id}">- ${countries[i].name}:</span> ${countries[i].description}</p>`
  }
  
  return html_
}
)});
  main.variable(observer()).define(["html","autores"], function(html,autores){return(
html `${autores("COL")}`
)});
  main.variable(observer()).define(["html","autores"], function(html,autores){return(
html `${autores("ARG")}`
)});
  main.variable(observer()).define(["autores"], function(autores){return(
autores("COL")
)});
  main.variable(observer("autores")).define("autores", ["d3","data_autores"], function(d3,data_autores){return(
function(country_){
  //console.log(country_);
  const svg = d3.create("svg")
      .attr("width", 300)
      .attr("height", 100);
  
  const circles = svg.selectAll("circle")
      .data(data_autores.filter(d => d.country === country_))
  
  const circleGroups = circles
      .enter()
      .append('g')
      //.style('transform', (d, i) => `translate(${d + d*(i+0.5)}px,${100/2}px)`);
      .style('transform', (d, i) => `translate(${60+(i)*(120)}px,${100/2}px)`);
  
  const sequentialScale = d3.scaleSequential()
    .domain([0, 100])
    .interpolator(d3.interpolateRainbow);

  circleGroups
      .append("circle")
      //.attr("r", d => d)
      .attr("r", "50px")
      //.attr("stroke", "red")
      .attr("stroke", d => d.color_id)
      .style("stroke-width", "3px")
      //.attr('fill', d => sequentialScale(d))
      //.attr('fill', "url(#Woman_1)");
      .attr('fill', d => "url(#"+d.id+")");
      //.attr('stroke','#blue');
      //.style('border',"1 px solid red");
  
  const defs = svg.append("defs");
  
  //console.log(data_autores.filter(d => d.country === country_));
  
  let i = 0;
  let countries = data_autores.filter(d => d.country === country_);
  
  for (i in countries){
   //console.log(countries[i]);
    defs.append("pattern")
        //.data(data_autores.filter(d => d.country === country_))
        //.attr("id","Woman_1")
        .attr("id",countries[i].id)
        .attr("height","100%")
        .attr("width","100%")
        .attr("patternContentUnits","objectBoundingBox")
        .append("image")
        .attr("height",1)
        .attr("width",1)
        //.attr("preserveAspectRatio","none")
        .attr("xmlns:xlink","https://www.w3.org/1999/xlink")
        //.attr("xlink:href","https://i.pinimg.com/originals/c9/b5/79/c9b579b70725ebd3407f84bca5119d03.jpg");
        .attr("xlink:href",countries[i].bio_link);
        //.attr("xlink:href",await FileAttachment("colombia.png").url());
  }
  
  /*circleGroups
      .append('text')
      .style('font-size', '12px')
      .style('transform', () => `translate(-7px, 5px)`)
      .text(d => d);*/
  
  return svg.node().outerHTML;
  
  // Attach element to DOM.
 //d3.select("#autores")
 //  .append(() => svg.node());
  
}
)});
  main.variable(observer("data_autores")).define("data_autores", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
d3.csvParse(await FileAttachment("Estructura Datos Boom Latinoamericano@4.csv").text())
)});
  main.variable(observer("topojson")).define("topojson", ["require"], function(require){return(
require("topojson-client@3")
)});
  main.variable(observer("path")).define("path", ["d3","projection"], function(d3,projection){return(
d3.geoPath(projection)
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
