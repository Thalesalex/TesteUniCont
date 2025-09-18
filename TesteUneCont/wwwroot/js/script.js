const EnderecoApi = "/notas"
let notas = []

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
});

function GetNotas() {
    $.get(EnderecoApi, function (response) {
        notas = response;
        PreencherTabela();
    });

}

function PreencherTabela() {
    const filtroCliente = $("#filtroCliente").val().toLowerCase();
    let html = ""

    for (const n of notas) {
        //parei aqui por conta do tempo
        //if (!filtroCliente || n.nomeCliente.includes) {
        html += "<td>";
        html += `<tr>${n.numeroNota}</tr>`;
        html += `<tr>${n.nomeCliente}</tr>`;
        html += `<tr>${(n.valor).toFixed(2)}</tr>`;
        html += `<tr>${(new Date(n.dataEmissao).toLocaleDateString("pt-br"))}</tr>`;
        html += `<tr>${(new Date(n.dataCadastro).toLocaleString("pt-br"))}</tr>`;
        html += "</td>";
        //}
    };
    $("#listaNotas").html(html);
}
