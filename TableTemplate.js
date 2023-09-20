class TableTemplate {
  static fillIn(tableId, dict, columnName = null) {
    const table = document.getElementById(tableId);
    if (!table) {
      console.error(`Table with id '${tableId}' not found.`);
      return;
    }

    const rows = table.getElementsByTagName('tr');
    if (rows.length === 0) {
      console.error(`Table '${tableId}' has no rows.`);
      return;
    }

    const headerRow = rows[0];
    const headerCells = headerRow.getElementsByTagName('th');
    const colIndices = {};

    // Populate colIndices with the column indices for the given column names
    for (let i = 0; i < headerCells.length; i++) {
      const cell = headerCells[i];
      const columnNameInCell = cell.textContent.trim();
      colIndices[columnNameInCell] = i;
    }

    // Process the header row to replace template strings
    for (const prop in dict) {
      const template = new RegExp(`{{${prop}}}`, 'g');
      headerRow.innerHTML = headerRow.innerHTML.replace(template, dict[prop]);
    }

    // If columnName is specified, process only that column
    if (columnName && colIndices.hasOwnProperty(columnName)) {
      const columnIndex = colIndices[columnName];

      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const cell = row.cells[columnIndex];
        const cellText = cell.textContent.trim();

        // Replace template strings in the specified column
        for (const prop in dict) {
          const template = new RegExp(`{{${prop}}}`, 'g');
          cell.textContent = cellText.replace(template, dict[prop]);
        }
      }
    }
  }
}
