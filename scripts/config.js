const modal = document.getElementById("configModal");
const btnConfig = document.getElementById("btn_config");
const spanClose = document.getElementsByClassName("close")[0];

btnConfig.onclick = function () {
  modal.style.display = "block";
};

spanClose.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

document.getElementById("saveChanges").onclick = function () {
  const nodeColor = document.getElementById("nodeColorPicker").value;
  const nodeBorderColor = document.getElementById(
    "nodeBorderColorPicker"
  ).value;
  const nodeSize = document.getElementById("nodeSizeInput").value;
  const linkColor = document.getElementById("linkColorPicker").value;
  const linkWidth = document.getElementById("linkWidthInput").value;
  const highlightColor = document.getElementById("highlightColorPicker").value;
  const finalPathColor = document.getElementById("finalPathColorPicker").value;
  const animationColor = document.getElementById("animationColorPicker").value;

  d3.selectAll(".node circle")
    .style("fill", nodeColor)
    .style("stroke", nodeBorderColor)
    .attr("r", nodeSize); 

  d3.selectAll(".link")
    .style("stroke", linkColor)
    .style("stroke-width", linkWidth); 

  d3.selectAll(".node.highlighted circle").style("fill", highlightColor);


  d3.selectAll(".link.path-highlighted").style("stroke", finalPathColor);

  d3.selectAll(".node.path-highlighted circle")
    .style("fill", finalPathColor)
    .style("stroke", "none"); 

  d3.selectAll(".link.highlighted").style("stroke", animationColor);

  console.log(
    `Color de nodos: ${nodeColor}, Borde de nodos: ${nodeBorderColor}, Tamaño de nodos: ${nodeSize}, Color de enlaces: ${linkColor}, Ancho de enlaces: ${linkWidth}, Color de resaltado: ${highlightColor}, Color del camino final: ${finalPathColor}, Color de animación: ${animationColor}`
  );

  modal.style.display = "none"; 
};
