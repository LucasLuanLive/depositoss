document.getElementById('depositForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const caixa = document.getElementById('caixa').value;
    const idFuncionario = document.getElementById('idFuncionario').value;
    const nomeFuncionario = document.getElementById('nomeFuncionario').value;
    const cedulas = document.getElementById('cedulas').value;
    const moedas = document.getElementById('moedas').value;

    if (!/^\d+(\,\d{1,2})?$/.test(moedas)) {
        alert("Por favor, insira um valor válido para Moedas (ex: 12,34).");
        return;
    }

    const table = document.getElementById('depositTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.insertCell(0).innerText = caixa;
    newRow.insertCell(1).innerText = idFuncionario;
    newRow.insertCell(2).innerText = nomeFuncionario;
    newRow.insertCell(3).innerText = cedulas;
    newRow.insertCell(4).innerText = moedas;

    // Adicionar botões de edição e exclusão para a nova linha
    const cell = newRow.insertCell(5);
    cell.innerHTML = `
        <button onclick="editRow(this)">Editar</button>
        <button onclick="deleteRow(this)">Excluir</button>
    `;

    document.getElementById('depositForm').reset();

    sortTable(0);
});

// Função para ordenar a tabela
function sortTable(columnIndex) {
    const table = document.getElementById('depositTable');
    let rows = Array.from(table.rows).slice(1); // Excluir cabeçalho
    rows.sort((a, b) => {
        const cellA = a.cells[columnIndex].innerText;
        const cellB = b.cells[columnIndex].innerText;
        return cellA.localeCompare(cellB, undefined, {numeric: true});
    });
    rows.forEach(row => table.getElementsByTagName('tbody')[0].appendChild(row));
}

// Função para editar uma linha da tabela
function editRow(button) {
    const row = button.parentNode.parentNode;
    const cells = row.getElementsByTagName('td');

    for (let i = 0; i < cells.length - 1; i++) { // Exclui a última célula que contém os botões
        let originalContent = cells[i].innerText;
        cells[i].innerHTML = `<input type="text" value="${originalContent}">`;
    }

    button.innerText = "Salvar";
    button.onclick = function() { saveRow(this); };
}

// Função para salvar as edições feitas em uma linha da tabela
function saveRow(button) {
    const row = button.parentNode.parentNode;
    const cells = row.getElementsByTagName('td');

    for (let i = 0; i < cells.length - 1; i++) { // Exclui a última célula que contém os botões
        const input = cells[i].getElementsByTagName('input')[0];
        cells[i].innerText = input.value;
    }

    button.innerText = "Editar";
    button.onclick = function() { editRow(this); };
}

// Função para excluir uma linha da tabela
function deleteRow(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}
