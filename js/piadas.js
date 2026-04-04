

$(document).ready(function() {

    pegarPiada();   // carrega uma piada ao abrir

    $("#btn-nova-piadas").click(function() {
        pegarPiada();
    });

});

function pegarPiada() {
    const loading   = $("#loading");
    const jokeArea  = $("#joke-area");
    const setup     = $("#setup");
    const punchline = $("#punchline");
    const btn       = $("#btn-nova-piadas");

    // Mostra loading
    loading.show();
    jokeArea.addClass("d-none");
    btn.prop("disabled", true).text("Carregando...");

    $.ajax({
        url: "https://icanhazdadjoke.com/",
        method: "GET",
        headers: { "Accept": "application/json" },
        success: function(data) {
            console.log("Piada recebida:", data.joke);

            setup.text("");
            punchline.text(data.joke);

            // Mostra a área da piada
            loading.hide();
            jokeArea.removeClass("d-none");
        },
        error: function() {
            console.error("Erro ao buscar piada");
            alert("Não consegui carregar a piada. Tente novamente.");
        },
        complete: function() {
            btn.prop("disabled", false)
               .html('<i class="bi bi-arrow-repeat"></i> Nova Piada');
        }
    });
}