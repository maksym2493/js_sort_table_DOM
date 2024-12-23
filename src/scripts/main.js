'use strict';

function sortTableBody(tBody, column) {
  const rows = [...tBody.rows];

  const data = extractData(rows).sort((rowA, rowB) => {
    return typeof rowA[column] === 'string'
      ? rowA[column].localeCompare(rowB[column])
      : rowA[column] - rowB[column];
  });

  for (let i = data.length - 1; i >= 0; i--) {
    tBody.prepend(rows.find((r) => r.cells[0].textContent === data[i][0]));
  }
}

function extractData(body) {
  return body.map((row) => [
    row.cells[0].textContent,
    row.cells[1].textContent,
    row.cells[2].textContent,
    +row.cells[3].textContent.slice(1).replaceAll(',', '') || 0,
  ]);
}

const table = document.querySelector('table');

[...table.tHead.rows[0].cells].forEach((cell, i) => {
  cell.addEventListener('click', () => {
    sortTableBody(table.tBodies[0], i);
  });
});
