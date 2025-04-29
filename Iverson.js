// Tamaño del gráfico
const width = 500;
const height = 470;

// Crear SVG
const svg = div.append("svg")
  .attr("width", width)
  .attr("height", height);

// Escalas
const xScale = d3.scaleLinear()
  .domain(d3.extent(data, d => d.LOC_X))
  .range([50, width - 50]);

const yScale = d3.scaleLinear()
  .domain(d3.extent(data, d => d.LOC_Y))
  .range([height - 50, 50]);

// Colores para anotado o fallado
const colorScale = d3.scaleOrdinal()
  .domain(["TRUE", "FALSE"])
  .range(["green", "red"]);

// Dibujar puntos
svg.selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", d => xScale(d.LOC_X))
  .attr("cy", d => yScale(d.LOC_Y))
  .attr("r", 3)
  .attr("fill", d => colorScale(d.SHOT_MADE));

// Título
svg.append("text")
  .attr("x", width / 2)
  .attr("y", 20)
  .attr("text-anchor", "middle")
  .style("font-size", "16px")
  .text("Tiros temporada 2003-04 Allen Iverson");

// Leyenda
const legend = svg.append("g")
  .attr("transform", "translate(30, 40)");

const legendData = [
  { label: "Tiro anotado", color: "green" },
  { label: "Tiro fallado", color: "red" }
];

legend.selectAll("rect")
  .data(legendData)
  .enter()
  .append("rect")
  .attr("x", 0)
  .attr("y", (d, i) => i * 20)
  .attr("width", 10)
  .attr("height", 10)
  .attr("fill", d => d.color);

legend.selectAll("text")
  .data(legendData)
  .enter()
  .append("text")
  .attr("x", 15)
  .attr("y", (d, i) => i * 20 + 9)
  .text(d => d.label)
  .style("font-size", "12px");
