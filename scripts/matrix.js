// definimos los objetos del "index.html" que vamos a utilizar
const input_range = document.querySelector("#matrix_value_range");
const lbl_size = document.querySelector("#matrix_range_lbl");
const lbl_size_conexion_ramge = document.querySelector("#value_conexion");
const matrix_form = document.querySelector("#matrix_form");
const btn_random = document.querySelector("#btn_random_matrix");
const conexion_range = document.querySelector("#range_conexion");

// definimos la matriz
let matrix = [];

// función para obtener el tamaño de la matriz
function getSizeMatrix() {
  return parseInt(input_range.value);
}
function getConexionRange() {
  return parseInt(conexion_range.value);
}

// función para obtener la celda de la matriz
function getInputMatrix(i, j) {
  return matrix_form.querySelector(`input[data-row="${i}"][data-col="${j}"]`);
}

// función para actualizar la matriz
function updateMatrix() {
  const size = getSizeMatrix();
  lbl_size.innerText = `Matriz: ${size}x${size}`;
  updateConexionRange();
  generateMatrix(size);
  getMatrix(size);
}

// función para actualizar las celdas opuestas de la matriz
function updateCell(input) {
  // si el valor es menor a 0, se limpia el valor
  if (parseFloat(input.value) < 0) {
    input.value = "";
  } else {
    // se obtiene la fila y columna de la celda
    const row = parseInt(input.getAttribute("data-row"));
    const col = parseInt(input.getAttribute("data-col"));
    const correspondingCell = getInputMatrix(col, row);

    // si la celda opuesta existe, se le asigna el valor de la celda actual
    if (correspondingCell) {
      correspondingCell.value = input.value;
    }
  }
}

// función para obtener la matriz
function getMatrix(size) {
  matrix = [];
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      const input = getInputMatrix(i, j);
      row.push(input ? parseFloat(input.value) || 0 : 0);
    }
    matrix.push(row);
  }
  drawGraph();
}

function createColumnHeader(table, size){
  const headerRow = document.createElement("tr");
  headerRow.appendChild(document.createElement("th"));

  for (let j = 0; j < size; j++) {
    const th = document.createElement("th");
    th.innerText = `${j + 1}`;
    th.id = `col_${j}`;
    th.classList.add("matrix_col_header");
    headerRow.appendChild(th);
  }
  
  table.appendChild(headerRow);
}

function createRowHeader(row, i) {
  const th = document.createElement("th");
  th.innerText = `${i + 1}`;
  th.id = `row_${i}`;
  th.classList.add("matrix_row_header");

  row.appendChild(th);
}

// función para generar la matriz
function generateMatrix(size) {
  matrix_form.innerHTML = "";
  const table = document.createElement("table");

  createColumnHeader(table, size);

  for (let i = 0; i < size; i++) {
    const row = document.createElement("tr");
    
    createRowHeader(row, i);

    for (let j = 0; j < size; j++) {
      const cell = document.createElement("td");
      const input = document.createElement("input");

      input.type = "number";
      input.name = `matrix[${i}][${j}]`;
      input.value = "";

      input.setAttribute("data-row", i);
      input.setAttribute("data-col", j);

      if (i === j) {
        input.value = 0;
        input.disabled = true;
        input.classList.add("matrix_diagonal");
      } else if (j < i) {
        input.readOnly = true;
      } else {
        input.addEventListener("input", () => {
          updateCell(input);
          getMatrix(size);
        });
      }

      cell.appendChild(input);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  matrix_form.appendChild(table);
}


function randomMatrix() {
  const size = getSizeMatrix();
  const probabilidadConexion = getConexionRange()/100;

  for (let i = 0; i < size; i++) {
    for (let j = i + 1; j < size; j++) {
      const input = getInputMatrix(i, j);
      if (input) {
        if (Math.random() < probabilidadConexion) {
          input.value = Math.floor(Math.random() * 100);
          updateCell(input);
        } else {
          input.value = 0;
          updateCell(input);
        }
      }
    }
  }
  getMatrix(size);
}

function updateConexionRange() {
  const value = getConexionRange();
  lbl_size_conexion_ramge.innerText = `Conexion: ${value}%`;
}


btn_random.addEventListener("click", randomMatrix);
input_range.addEventListener("input", updateMatrix);
conexion_range.addEventListener("input", updateConexionRange);