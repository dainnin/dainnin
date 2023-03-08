
    function leer() {

        let reader = new FileReader();

        reader.addEventListener('load', function(e) {
            let texto = e.target.result;
            let lineas = texto.split("\r\n");

            addHeaderRow(lineas[0]);

            for (var i = 1; i < lineas.length; i++) {
                addRow(lineas[i]);
            }
        });

        reader.readAsText(document.querySelector('input').files[0]);
    }

    function addRow(line) {
        var tableRef = document.getElementById("tbody");
        var newRow = tableRef.insertRow(0);
        var cells = splitRow(line);

        for (var i = 0; i < cells.length; i++) {
            var newCell = newRow.insertCell(0);
            newCell.innerHTML = cells[i];
        }
    }

    function addHeaderRow(line) {
        var tableRef = document.getElementById("thead");
        var newRow = tableRef.insertRow(0);
        var cells = splitRow(line);

        for (var i = 0; i < cells.length; i++) {
            var headerCell = document.createElement("th");
            headerCell.innerHTML = cells[i];
            newRow.appendChild(headerCell);
        }
    }

    function splitRow(linea) {
        return linea.split(" ");
    }
