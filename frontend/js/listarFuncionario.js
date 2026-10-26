function tbody(dados){
    let tbody = `<tbody>`
    dados.array.forEach(el => {
        tbody +=`
            <tr>
                <td></td>
            </tr>
        `
    });
    tbody += `</tbody>`
    return tbody
}

function gerarThead(){

    return thead = `<thead>
        <tr>
            <th></th>
        </tr>
    </thead>
    `
}