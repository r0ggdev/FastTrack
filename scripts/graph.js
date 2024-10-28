let svg, simulation;
let selectedNodes = [];

const size_node = 15;
const lbl_nodes_select = document.querySelector("#nodes_select_lbl");
const btn_deselect = document.querySelector("#deselect_btn");


function distancieNodes(y) {
  return Math.sqrt(Math.pow(y, 2) + Math.pow(y, 2)) / 2;
}

function convertMatrixToGraph(matrix) {
  const nodes = matrix.map((_, index) => ({ id: index }));
  const links = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] > 0) {
        links.push({ source: i, target: j, weight: matrix[i][j] });
      }
    }
  }
  return { nodes, links };
}

function rescaleGraph() {
  const container = document.getElementById("graph");
  const width = container.clientWidth;
  const height = container.clientHeight;

  const scale = Math.min(
    width / svg.attr("width"),
    height / svg.attr("height")
  );
  svg
    .select(".zoom-layer")
    .attr(
      "transform",
      `scale(${scale}) translate(${(width - width * scale) / 2}, ${
        (height - height * scale) / 2
      })`
    );

  if (simulation) {
    simulation.force("center", d3.forceCenter(width / 2, height / 2));
    simulation.alpha(1).restart();
  }
}

function selectNode(node) {
  const nodeId = node.id;

  // Solo se modifican los nodos seleccionados sin deseleccionar
  if (selectedNodes.includes(nodeId)) {
    // Cambia a un color normal para nodos seleccionados
    d3.select(`#node-${nodeId}`).attr("class", "node");
    selectedNodes = selectedNodes.filter((id) => id !== nodeId);
  } else {
    if (selectedNodes.length === 2) {
      const oldestNodeId = selectedNodes.pop();
      d3.select(`#node-${oldestNodeId}`).attr("class", "node");
    }
    selectedNodes.push(nodeId);
    d3.select(`#node-${nodeId}`).attr("class", "node selected");
  }

  lbl_nodes_select.innerText = selectedNodes.join(" -> ");
}

function deselectAll() {
  const nodes = d3.selectAll(".node");
  nodes.attr("class", "node");

  selectedNodes = [];
  lbl_nodes_select.innerText = "Selecciona nodos";

  const links = d3.selectAll(".link");
  links.attr("class", "link");
  const links_weight = d3.selectAll(".link-weight");
  links_weight.attr("class", "link-weight");

  clear();

  const instructionsHtml = `
    <p id="instructions">
      <strong>Instrucciones Rápidas:</strong><br />
      1. <strong>Configura la Matriz:</strong> Ajusta el tamaño (8x8 a 16x16) con el control deslizante.<br />
      2. <strong>Genera la Matriz:</strong> Haz clic en "Generar matriz" para crear conexiones aleatorias.<br />
      3. <strong>Ingresa Datos Manualmente:</strong> Haz clic en las celdas de la matriz para editar los valores.<br />
      4. <strong>Selecciona Nodos:</strong> Haz clic en el nodo de inicio y luego en el nodo de destino en el gráfico.<br />
      5. <strong>Buscar Camino Mínimo:</strong> Presiona "Buscar Camino Mínimo" para visualizar el resultado.<br />
      6. <strong>Configura el Grafo:</strong> Haz clic en ⚙️ para cambiar colores, grosores y tamaños de nodos y enlaces. Guarda los cambios.<br />
      7. <strong>Reinicia:</strong> Usa "Recargar" para restablecer la matriz y el gráfico.
    </p>
  `;
  
  const instructionsContainer = d3.select("#output"); 
  instructionsContainer.html(instructionsHtml);
}

function drawGraph() {
  const graph = convertMatrixToGraph(matrix);
  const container = document.getElementById("graph");
  const width = container.clientWidth;
  const height = container.clientHeight;

  if (!svg) {
    svg = d3
      .select(container)
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%");
    window.addEventListener("resize", rescaleGraph);
  } else {
    svg.selectAll("*").remove();
  }

  const g = svg.append("g").attr("class", "zoom-layer");

  simulation = d3
    .forceSimulation(graph.nodes)
    .force(
      "link",
      d3
        .forceLink()
        .id((d) => d.id)
        .distance(distancieNodes(height))
    )
    .force("charge", d3.forceManyBody().strength(-300))
    .force("center", d3.forceCenter(width / 2, height / 2));

  const link = g
    .append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter()
    .append("line")
    .attr("class", "link");

  const linkText = g
    .append("g")
    .attr("class", "link-text")
    .selectAll("text")
    .data(graph.links)
    .enter()
    .append("text")
    .attr("class", "link-weight")
    .text((d) => d.weight);

  const node = g
    .append("g")
    .attr("class", "node")
    .selectAll("g")
    .data(graph.nodes)
    .enter()
    .append("g")
    .attr("id", (d) => `node-${d.id}`)
    .on("click", (event, d) => selectNode(d))
    .call(
      d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

  node.append("circle").attr("r", size_node).attr("class", "node circle");

  node
    .append("text")
    .attr("text-anchor", "middle")
    .attr("dy", ".35em")
    .text((d) => d.id);

  simulation.nodes(graph.nodes).on("tick", ticked);
  simulation.force("link").links(graph.links);

  function ticked() {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    linkText
      .attr("x", (d) => (d.source.x + d.target.x) / 2)
      .attr("y", (d) => (d.source.y + d.target.y) / 2);

    node.attr("transform", (d) => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      d.x = Math.max(size_node, Math.min(width - size_node, d.x));
      d.y = Math.max(size_node, Math.min(height - size_node, d.y));

      return `translate(${d.x},${d.y})`;
    });
  }

  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event, d) {
    const width = container.clientWidth;
    const height = container.clientHeight;

    d.fx = Math.max(size_node, Math.min(width - size_node, event.x));
    d.fy = Math.max(size_node, Math.min(height - size_node, event.y));
  }

  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  deselectAll();
  lbl_nodes_select.innerText = "Selecciona nodos";
}

function updateGraph(currentNode, distancias) {
  d3.select(`#node-${currentNode}`).attr("class", "node highlighted");

  for (let i = 0; i < distancias.length; i++) {
    d3.select(`#node-${i}`).select("text").text(distancias[i]);
  }
}

function highlightPath(camino) {
  camino.forEach((node) => {
    d3.select(`#node-${node}`).attr("class", "node path-highlighted"); 
  });

  for (let i = 0; i < camino.length - 1; i++) {
    const sourceNode = camino[i];
    const targetNode = camino[i + 1];

    d3.selectAll(".link")
      .filter(
        (link) =>
          (link.source.id === sourceNode && link.target.id === targetNode) ||
          (link.source.id === targetNode && link.target.id === sourceNode)
      )
      .attr("class", "link path-highlighted");

    d3.selectAll(".link-weight")
      .filter(
        (link) =>
          (link.source.id === sourceNode && link.target.id === targetNode) ||
          (link.source.id === targetNode && link.target.id === sourceNode)
      )
      .attr("class", "link-weight highlighted");
  }
}

btn_deselect.addEventListener("click", deselectAll);
updateMatrix();
drawGraph();
