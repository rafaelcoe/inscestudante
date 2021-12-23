	var ie = (navigator.appName == "Microsoft Internet Explorer");

	var MSG_DATA_INVALIDA = "Data Inv·lida \nFormato v·lido DD/MM/AAAA";
    var MSG_DIAMES_INVALIDA = "Data Inv·lida \nFormato v·lido DD/MM";
	var CONS_CHARS_NUMBERS = "0123456789"; 
	var CONS_CHARS_TELEFONE = "0123456789()-/"; 
	var CONS_CHARS_LOWER = "abcdefghijklmnopqrstuvwxyz,- "; 
	var CONS_CHARS_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ,- "; 
    var CONS_CHARS_LOWER_NOME = "abcdefghijklmnopqrstuvwxyz "; 
	var CONS_CHARS_UPPER_NOME = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";
	var CONS_CHARS_NOME = CONS_CHARS_LOWER_NOME + CONS_CHARS_UPPER_NOME;
    var CONS_CHARS_LOWER_ESP = ""; 
	var CONS_CHARS_UPPER_ESP = ""; 
	//var CONS_CHARS_LOWER_ESP = "Á·ÈÌÛ˙„ı‚ÍÙ‡ËÏÚ˘‰ÎÔˆ¸"; 
	//var CONS_CHARS_UPPER_ESP = "«¡…Õ”⁄√’¬ ‘¿»Ã“ŸƒÀœ÷‹"; 
	var CONS_CHARS_ESP = "%*,._-+/()@'"; 
	var CONS_TP_SANGUINEO = "ABOabo+-";
	var CONS_CHARS_LETTERS = CONS_CHARS_LOWER + CONS_CHARS_UPPER + CONS_CHARS_LOWER_ESP + CONS_CHARS_UPPER_ESP; 
	var CONS_CHARS_ALPHA_UPPER = CONS_CHARS_UPPER + CONS_CHARS_NUMBERS + CONS_CHARS_UPPER_ESP; 
	var CONS_CHARS_ALPHA = CONS_CHARS_LOWER + CONS_CHARS_LOWER_ESP + CONS_CHARS_ALPHA_UPPER; 
	var CONS_CHARS_TEXT = CONS_CHARS_LETTERS + CONS_CHARS_ESP; 
    var CONS_CHARS_ALPHA_NOME = CONS_CHARS_LOWER_NOME +  CONS_CHARS_UPPER_NOME; 
    var CONS_CHARS_ALPHA_TURMA_CENSO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ-™∫ ";
    var CONS_CHARS_TURMA_CENSO = CONS_CHARS_ALPHA_TURMA_CENSO + CONS_CHARS_NUMBERS;
    
function gerarAlert(mensagem, divInsert){
	var codigo = "";
	
    codigo += "<div class='modal fade modalpadrao' id='modalAlertaMapa' tabindex='-1' role='dialog' aria-labelledby='modalPadrao' aria-hidden='true'>";
    codigo += "    <div class='modal-dialog modal-dialog-centered' role='document' id='alertMaster'>";
    codigo += "        <div class='modal-content sombra'>";
    codigo += "            <div class='modal-body'>";
    codigo += "                <h3>Aviso</h3>";
    codigo += "                <article>";
    codigo += "                    <div id='alertTexto'></div>";
    codigo += "                </article>";
    codigo += "            </div>";
    codigo += "            <div class='modal-footer'>";
    codigo += "                <button type='button' class='btn btn-danger' onclick='hideModalGerarAlerta();'>Ok</button>";
    codigo += "            </div>";
    codigo += "        </div>";
    codigo += "    </div>";
    codigo += "</div>"; 
	$(codigo).appendTo("#"+divInsert);
	$('#modalAlertaMapa').modal('show');
	$('#alertTexto').html(mensagem);
}
function replaceAll(p_valor, p_char, p_charNew){
	p_valor_old = '';
    while(p_valor_old != p_valor){
		p_valor_old = p_valor;
		p_valor = p_valor.replace(p_char, p_charNew);
	}
	return p_valor;
}

function validaCPF(strCPF) {
	    
   var cpf = replaceAll(replaceAll(strCPF, ".", ""), "-", "");
   var nonNumbers = /\D/;
   
   
   if ((cpf.length < 11)&&(cpf.length != 0)){
	   return false; 
   }
   
   if (nonNumbers.test(cpf)){
	   return false;
   }
   
   if (cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" || cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999"|| cpf == "00000000191"){
       return false;
   }
   var a = [];
   var b = new Number;
   var c = 11;
   for (var i=0; i<11; i++){
         a[i] = cpf.charAt(i);
         if (i < 9) b += (a[i] * --c);
   }
   if ((x = b % 11) < 2) { a[9] = 0; } else { a[9] = 11-x; }
   b = 0;
   c = 11;
   for (var y=0; y<10; y++) b += (a[y] * c--); 
   if ((x = b % 11) < 2) { a[10] = 0; } else { a[10] = 11-x; }
   if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10])){
	   return false;
   }
   
   return true;
}


function alertMessage(texto){
	 modalAlerta(texto);
}

function modalAlerta(texto){
	$('#modalAlertaTexto').html(texto);
	$('#modalAlerta').modal('show');
}

function modalConfirmacao(){
	$('#modalConfirmacao').modal('show');
}

function modalPadrao(){
	$('#modalPadrao').modal('show');
}

function modalLoading(){
	$('#modalLoading').modal('show');
}

function modalLoadingExit(){
	$('#modalLoading').modal('hide');
}

function modalVisualizacao(){
	$('#modalVisualizacao').modal('show');
}

//var tempoRelogio = 30000;

function loadingStar(){
	$.LoadingOverlay("show");

}
function loadingStop(){
	$.LoadingOverlay("hide");
}

function hideModalGerarAlerta(){
	$('#modalAlertaMapa').modal('hide');
}

function maskSomenteLetrasNumeros(campo){
	$("#"+campo).keyup(function() {
		var valor = $("#"+campo).val().replace(/[^A-Z a-z 0-9]+/g,'');
		$("#"+campo).val(valor.toUpperCase());
	});
}

function normalizaNome(campo){
	if(ie){
		var pField = document.getElementById(campo);
	    var pValor = "";
	    var pValorAux = "";
	    if ((pField)&&(pField.value != "")){
	        pValor = pField.value.toUpperCase();
	    
	        for (var j = 0; j < CONS_CHARS_UPPER_ESP.length; j++){
	            for (var i = 0; i < pValor.length; i++){
	                pValor = pValor.replace(CONS_CHARS_UPPER_ESP.substr(j,1),CONS_CHARS_UPPER_ESP_NONE.substr(j,1));
	            }
	        }
	        
	        for(var i = 0; i < pValor.length; i++){
	            if(!(pValor.substring(i,i+1)==" " && pValor.substring(i,i+1)==pValor.substring(i+1,i+2))){
	                pValorAux = pValorAux + pValor.substring(i,i+1);
	            }
	        }
	    }

	    pField.value = pValorAux.replace(/^\s+|\s+$/g,"");
	    
	}else{
		var pField = document.getElementById(campo);
		var pValor = pField.value;
		var pValorAux = "";
		
		if ((pField)&&(pField.value != "")){
			pField.value = pField.value.toUpperCase();
		}
		
		for(var i = 0; i < pValor.length; i++){
            if(!(pValor.substring(i,i+1)==" " && pValor.substring(i,i+1)==pValor.substring(i+1,i+2))){
                pValorAux = pValorAux + pValor.substring(i,i+1);
            }
        }
	  
		pField.value = pValorAux.replace(/^\s+|\s+$/g,"");
	}
	
}

function somenteNumeros(valor){
	
	return valor.replace(/[^0-9]+/g,'');
}


function validadadosNovaCertidao(numeroCeridao, dataNascimento) {
	   
    var certidao = numeroCeridao;
    var nascimento = dataNascimento;
    var dataAtual = new Date();
    var anoCorrente = dataAtual.getFullYear();
    
    if (certidao == ''){
    	
    	return '';
    }
    
	if (nascimento == ''){
    	
    	return 'data de nascimento vazia!';
    }
    
    var tipoCertidao = certidao.split(".")[4];
    var anoNascimento = nascimento.split("/")[2];
    var anoRegistroCertidao = certidao.split(".")[3];
    
	
	if (tipoCertidao == ''){
    	
    	return 'Erro na certid„o de nascimento nova!';
    }
	
	if (anoRegistroCertidao == ''){
    	
    	return 'Erro na certid„o de nascimento nova!';
    }
    
	if (anoNascimento == ''){
    	
    	return 'Erro na  data de nascimento vazia!';
    }
	
	if(tipoCertidao != 1){
		
		return 'No campo nova certid„o de nascimento, sÛ È possÌvel informar a certid„o de nascimento !';
	}
   
	if(anoCorrente < anoRegistroCertidao){
		
		return 'No campo nova certid„o de nascimento, sÛ pode ter o ano de registro da certid„o de nascimento menor ou igual ao ano corrente !';
	}
	
	if(anoNascimento > anoRegistroCertidao){
		
		return 'No campo nova certid„o de nascimento, sÛ pode ter o ano de nascimento igual ou inferior ao ano de registro da certid„o de nascimento !';
	}
	
	return '';
}

function validaNovaCertidao(valor) {
	
    var total = valor;
    var totalSoma1 = 0;
    var totalSoma2 = 0;
    var mutiplicador1 = 31;
    var mutiplicador2 = 32;
    var resultado1 = 0;
    var resultado2 = 0;

    if (total == '') {
        return true;
    }

    total = total.replace(/[^\d]/g, '');

    if (total.length != 32) {
        return false;
    }

    if (total == "00000000000000000000000000000000") {
        return false;
    }

    for (var i = 0; i < 30; i++) {
        totalSoma1 = totalSoma1 + (parseInt(total.substr(i, 1)) * mutiplicador1);
        mutiplicador1--;
    }

    resultado1 = (totalSoma1 * 10) % 11;

    if (resultado1 == 10) {
        resultado1 = 1;
    }

    for (var i = 0; i < 30; i++) {
        totalSoma2 = totalSoma2 + (parseInt(total.substr(i, 1)) * mutiplicador2);
        mutiplicador2--;
    }

    totalSoma2 = totalSoma2 + (resultado1 * mutiplicador2);

    resultado2 = (totalSoma2 * 10) % 11;

    if (resultado2 == 10) {
        resultado2 = 1;
    }

    if (resultado1 == total.substr(30, 1) && resultado2 == total.substr(31, 1)) {
        return true;
    } else {
        return false;
    }
}

function msgCampoForm(campo, mensagem){
	if(mensagem == ''){
		$("label[for="+campo+"]").siblings("small").removeClass("alert alert-danger");
		$("label[for="+campo+"]").siblings("small").text('');
	}else{
		$("label[for="+campo+"]").siblings("small").addClass("alert alert-danger");
		$("label[for="+campo+"]").siblings("small").text(mensagem);
	}
	
}

function retornaTextoSemSecao(){
	
	return '<form name="loginForm" method="post" action="login.do" class="form-signin" onsubmit="return false;" id="loginForm">';
}

function validaNomeCenso(nome){
	if(nome != ''){
		var array = nome.split(" ");
		var palavra = "";
		var letra = "";
		var letraAnterior = "";
		var cont = 0;
		var RegExp = /^[A-Z\s]+$/;
		
		if(array.length == 1)
			return false;
		
        if(!RegExp.test(nome)){
        	return false;
        }  
		for (var i = 0; i < array.length; i++){
			palavra = array[i];
			cont = 0;
			for (var y = 0; y < palavra.length; y++){
				letra = palavra.substr(y, 1);
				if(letra == letraAnterior)
					cont++;
				else
					cont = 1;
				letraAnterior = letra;
				if(cont > 3)
					return false;
			}
		}
	 }
	 return true;
}

function copiarColecao(original, copia){
    //inicializando a colecao
    copia.options.length = 0;
    var tam = original.length;
    for (var x = 0; x < tam; x++){
        copia.options[x] = new Option(original.options[x].text, original.options[x].value);
    }
    copia.value = original.value;
    copia.selectedIndex = 0;
}

function novaJanela(width, height, url) {

	var w = window.open(url, "Relatorio",
		"toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, " +
		"copyhistory=yes, width=" + width + ", height=" + height);
	return w;
}

function setMascaraTelefone( numeroTelefone){
    
    var mascara ="";
    
    if(numeroTelefone.value != null && numeroTelefone.value != '' && numeroTelefone.value.length == 10){
    	numeroTelefone.value = "("+ numeroTelefone.value.substring(0,2)+")"+
                  numeroTelefone.value.substring(2,6)+"-"+ 
                  numeroTelefone.value.substring(6,10);
                  
    }
}

function setMascaraCelular( numeroTelefone){
    
    var mascara ="";
    
    if(numeroTelefone.value != null && numeroTelefone.value != '' && numeroTelefone.value.length == 11){
    	numeroTelefone.value = "("+ numeroTelefone.value.substring(0,2)+")"+
                  numeroTelefone.value.substring(2,7)+"-"+ 
                  numeroTelefone.value.substring(7,11);
                  
    }
}
function retornarLoginSemSecaoAjax(data){
	
	var retornoErro = '<form name="homeForm" method="post" action="/inscestudante/home.do" class="form-horizontal" id="homeForm">';
	
	if(data.indexOf(retornoErro) > -1){
		
		window.location.href='/inscestudante/preparaHome.do?msg=ativarMensagemErro';
	}
	 
}
function setMascaracertidao( valor){
	
    if(valor.trim().length == 32){
    	return valor.replace(/^(\d{6})(\d{2})(\d{2})(\d{4})(\d{1})(\d{5})(\d{3})(\d{7})(\d{2}).*/, '$1.$2.$3.$4.$5.$6.$7.$8.$9');
    }else{
    	return valor;
    }
}

function setMascaraCep(valor){
	
	if(valor.length == 5){
		return  valor + '000';
	}
	return valor;
	
}

function abrirAjuda(){
	window.open('http://educacao2.salvador.ba.gov.br/AJUDA%20-%20CADASTRO%20ESCOLAR.pdf');
}

function controleFocus(nome){
	try {
		
			if(primeiroFocus){
				
				document.getElementById(nome).focus();
			}
			
			primeiroFocus = false;
		
		}catch (e) {
			console.log("Error de focus");
		}
}