const EnderecoApi = "/notas"
let notas = []
let ordemCrescente = true;

$(document).ready(function () {
    GetNotas();
    $("#cadastroNota").submit(function (e) {
        e.preventDefault();

        let notaFiscal = {
            numeroNota: $("#numeroNota").val(),
            nomeCliente: $("#nomeCliente").val(),
            valor: $("#valor").val(),
            dataEmissao: $("#dataEmissao").val()
        }

        $.ajax({
            url: EnderecoApi,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(notaFiscal),
            success: function () {
                $("#cadastroNota")[0].reset();
                GetNotas();
            },
            error: function (response) {
                alert(response.responseText);
            }
        })

    })

    $("#filtroCliente").keyup(function () {
        PreencherTabela();
    })

    $("#ordenarValor").click(function (){
        if (ordemCrescente) {
            notas.sort((a, b) => a.valor - b.valor);
            ordemCrescente = false;
        }
        else {
            notas.sort((a, b) => b.valor - a.valor);
            ordemCrescente = true;
        }
        PreencherTabela();
    })
    $("#limparFiltros").click(function () {
        $("#filtroCliente").val("");
        GetNotas();
    })
    
});

function GetNotas() {
    $.get(EnderecoApi, function (response) {
        notas = response;
        PreencherTabela();
    });
}

function PreencherTabela() {
    const filtroCliente = $("#filtroCliente").val().toLowerCase();
    let html = "";

    for (const n of notas) {
        if (!filtroCliente || n.nomeCliente.toLowerCase().includes(filtroCliente)) {
        html += "<tr>"
        html += `<td>${n.numeroNota}</td>`
        html += `<td>${n.nomeCliente}</td>`
        html += `<td>R$ ${(n.valor).toFixed(2)}</td>`
        html += `<td>${(new Date(n.dataEmissao).toLocaleDateString("pt-br"))}</td>`
        html += `<td>${(new Date(n.dataCadastro).toLocaleString("pt-br"))}</td>`
        html += "</tr>"
        }
    }
    $("#listaNotas").html(html);
}