const outputElement = document.querySelector("#output");

function updateOutput(message) {
  outputElement.innerHTML += `<p>${message}</p>`;
}

function processPriorityQueue(pq) {
  pq.sort((a, b) => a[0] - b[0]);
  return pq.shift();
}

async function dijkstra(adjacencyMatrix, start, end) {
  const n = adjacencyMatrix.length;
  const distances = new Array(n).fill(Infinity);
  const visited = new Array(n).fill(false);
  const predecessors = new Array(n).fill(-1);
  const pq = [];

  updateOutput("Inicio del algoritmo Dijkstra");
  distances[start] = 0;
  pq.push([0, start]);

  while (pq.length > 0) {
    const [currentDistance, u] = processPriorityQueue(pq);
    updateOutput(
      `Procesando nodo: ${u} con distancia actual: ${currentDistance}`
    );

    if (visited[u]) continue;

    visited[u] = true;
    highlightNode(u);

    for (let v = 0; v < n; v++) {
      if (adjacencyMatrix[u][v] > 0 && !visited[v]) {
        const newDistance = currentDistance + adjacencyMatrix[u][v];
        if (newDistance < distances[v]) {
          distances[v] = newDistance;
          predecessors[v] = u;
          pq.push([newDistance, v]);
          updateOutput(
            `Actualizando distancia de nodo ${v}: ${newDistance} (predecesor: ${u})`
          );
          highlightEdge(u, v);
        }
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  const path = [];
  let node = end;
  while (node !== -1) {
    path.push(node);
    node = predecessors[node];
  }
  path.reverse();
  
  updateOutput(
    `Distancia mínima desde ${start} hasta ${end}: ${distances[end]}`
  );
  updateOutput(`Camino encontrado: ${path.join(" -> ")}`);

  return [distances[end], path];
}

function highlightNode(node) {
  d3.select(`#node-${node}`).classed("node highlighted", true);
}

function highlightEdge(source, target) {
  d3.selectAll(".link")
    .filter(
      (link) =>
        (link.source.id === source && link.target.id === target) ||
        (link.source.id === target && link.target.id === source)
    )
    .classed("highlighted", true); 
}

function clear() {
  outputElement.innerHTML = "";
}

async function findShortestPath(matriz, start, end) {
  const [distancia, camino] = await dijkstra(matriz, start, end);
  lbl_nodes_select.innerText = selectedNodes.join(" -> ") + " = " + distancia;
  highlightPath(camino);
}

btn_short_path.addEventListener("click", async () => {
  const start_node = selectedNodes[0];
  const end_node = selectedNodes[1];

  clear();
  await findShortestPath(matrix, start_node, end_node);
});