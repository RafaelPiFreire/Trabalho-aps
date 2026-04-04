$(document).ready(function() {

    // Máscaras
    $('#telefone').mask('(00) 00000-0000');
    $('#cpf').mask('000.000.000-00');

    // Validação customizada de CPF
    $.validator.addMethod("cpfValido", function(value, element) {
        value = value.replace(/[^\d]+/g, '');
        if (value.length !== 11 || /^(\d)\1{10}$/.test(value)) return false;
        
        let soma = 0;
        for (let i = 0; i < 9; i++) soma += parseInt(value.charAt(i)) * (10 - i);
        let resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(value.charAt(9))) return false;

        soma = 0;
        for (let i = 0; i < 10; i++) soma += parseInt(value.charAt(i)) * (11 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(value.charAt(10))) return false;

        return true;
    }, "CPF inválido");

    // Validação do formulário
    $("#formCurriculo").validate({
        rules: {
            nome: {
                required: true,
                minlength: 5
            },
            email: {
                required: true,
                email: true
            },
            idade: {
                required: true,
                number: true,
                min: 18,
                max: 65
            },
            telefone: {
                required: true,
                number: true
            },
            cpf: {
                required: true,
                cpfValido: true,
                minlength: 11,
                maxlength: 11,
                number: true
            },
            area: {
                required: true
            },
            experiencia: {
                required: true,
                minlength: 20
            },
            senha: {
                required: true,
                minlength: 6
            },
            confirmar: {
                required: true,
                equalTo: "#senha"
            }
        },
        messages: {
            nome: "Nome completo é obrigatório (mín. 5 caracteres)",
            email: "Informe um email válido",
            idade: "Idade deve estar entre 18 e 65 anos",
            telefone: "Telefone é obrigatório",
            cpf: "Informe um CPF válido",
            area: "Selecione uma área de interesse",
            experiencia: "Descreva sua experiência (mín. 20 caracteres)",
            senha: "Senha deve ter no mínimo 6 caracteres",
            confirmar: "As senhas não coincidem"
        },
        errorElement: "span",
        errorClass: "error",
        highlight: function(element) {
            $(element).addClass("is-invalid");
        },
        unhighlight: function(element) {
            $(element).removeClass("is-invalid");
        }
    });

    // Submissão do formulário
    $("#formCurriculo").submit(function(e) {
        if ($(this).valid()) {
            alert("✅ Currículo enviado com sucesso!\n\n(Obrigado pela candidatura)");
            // Aqui você pode fazer fetch ou enviar para backend depois
        }
    });

});