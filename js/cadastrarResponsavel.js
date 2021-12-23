$(document).ready(function(){
    $("#cpf").mask("000.000.000-00", {reverse: true});
    
    $("#dtNascimento").mask("00/00/0000");

    $("#celular").mask("(00) 00000-0000");

    $("#telefone").mask("(00) 0000-0000");

    $("#email").mask("A", {
    	translation: {
    		"A": { pattern: /[\w@\-.+]/, recursive: true }
    	}
    });

    $("#responsavelForm").validate({
        rules:{
            nome: {
                required: true,
                minWords: 2
            },

            cpf: {
                required: function(element) {
                	var cpfTemp = $("#cpf").val();
                	if( $("#cpf").val()==''|| !validaCPF(cpfTemp)){
                		return true;
                	}else{
                		return false;
                	}
                },
                minlength: 14
            },

            dtNascimento: {
                required: true
            },

            celular: {
            	required: function(element) {
                    return ($("#telefone").val()=='' && $("#celular").val()=='');
                },
                minlength: 12
            },

            telefone: {
                required: function(element) {
                    return ($("#telefone").val()=='' && $("#celular").val()=='');
                },
                minlength: 11
            },

            email: {
                required: false,
                email: true
            },
        },

        messages: {
            nome: "Digite o nome completo por favor!",
            cpf: "Número de CPF inválido ou inexistente!",
            dtNascimento: "Escolha a sua data de nascimento válida!",
            celular: "Digite número do celular!",
            telefone: "Digite número do telefone!",
            email: "Endereço de e-mail inválido!"
        },

        errorElement: "p",
        errorPlacement: function(error, element) {
            element.siblings("small").append(error);
        },
        highlight: function(element) {
            $(element).siblings("small").addClass("alert alert-danger");
        },
        unhighlight: function(element) {
            $(element).siblings("small").removeClass("alert alert-danger");
        },
        submitHandler: function() {
        	 prosseguir();
        }
    });
});