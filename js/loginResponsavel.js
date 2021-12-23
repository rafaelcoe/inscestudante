$(document).ready(function(){
    $("#cpf").mask("000.000.000-00", {reverse: true});

    $("#dtNascimento").mask("00/00/0000");

    $("#responsavelForm").validate({
        rules:{
           cpf: {
                required: function(element) {
                	var cpfTemp = validaCPF($("#cpf").val());
                	if( $("#cpf").val()=='' || !cpfTemp){
                		
                		return true;
                	}else{
                		
                		return false;
                	}
                },
                minlength: 14
            },

            dtNascimento: {
                required:  function(element) {
                	if( $("#dtNascimento").val()=='' && !logado){
                		return true;
                	}else{
                		
                		return false;
                	}
                }
            }
            
        },

        messages: {
            cpf: "Número de CPF inválido,  preencha o cpf e data de nascimento por favor!",
            dtNascimento: "Escolha uma data de nascimento válida,  preencha o cpf e data de nascimento por favor!"
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