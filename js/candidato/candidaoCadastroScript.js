var nomeFilePorGemeo1= '';
var nomeFilePorGemeo2= '';
var nomeFilePorGemeo3= '';
var nomeFileBolGemeo3= '';	
var primeiroFocus = false;

function ajaxObterCadPorCpfOuCertidao(){
	
	if(document.forms[0].tipoPerfil.value == '1' ){
		
		if(document.forms[0].certidaoNascimento.value != null && document.forms[0].certidaoNascimento.value != ''){
			var validaCertidao = false;
			
			validaCertidao = validaNovaCertidao(document.forms[0].certidaoNascimento.value);
			
			
			if(validaCertidao){
				
	        	loadingStar();
	        	msgCampoForm('certidaoNascimento','');
	        	autoCompleteDocumento('candidatoForm', 'CandidatoAction.do?acao=ajaxObterCadPorCpfOuCertidao');
	        	
			}else{
				
				msgCampoForm('certidaoNascimento','Certidão inválida!');
			}
			
        }else{
        	if(document.forms[0].semDocumento.value == 'S'){
        		
        		mostrarCamposCadastro();
        		
        	}else{
        		
        		msgCampoForm('certidaoNascimento','Favor preencher o campo acima!');
        	}	
        }	
	}
	if(document.forms[0].tipoPerfil.value != '1' ){
		
		if(document.forms[0].cpf.value != null && document.forms[0].cpf.value != ''){
			var validaCpf = false;
			
			validaCpf = validaCPF(document.forms[0].cpf.value);
			
			if(validaCpf){
				
		    	loadingStar();
		    	msgCampoForm('cpf','');
		    	autoCompleteDocumento('candidatoForm', 'CandidatoAction.do?acao=ajaxObterCadPorCpfOuCertidao');
		    	
			}else{
				
				msgCampoForm('cpf','CPF inválido!');
			}	
            
        }else{
        	if(document.forms[0].semDocumento.value == 'S'){
        		
        		mostrarCamposCadastro();
        		
        	}else{
        		msgCampoForm('cpf','Favor preencher o campo acima!');
        	}	
        }	
	}
	
	
}

function ajaxObterCarregaComboEscolaPorSerie(){
	
	
	if(document.forms[0].identificadorSerieEscola.value != null && document.forms[0].identificadorSerieEscola.value != ''&& document.forms[0].identificadorSerieEscola.value != '0'){
		
    	loadingStar();
    	msgCampoForm('identificadorEscola','');
    	carregaComboEscolaPorSerie('candidatoForm', 'CandidatoAction.do?acao=ajaxCarregaComboEscolaPorSerie');
        
    }else{
    	
    	msgCampoForm('identificadorEscola','Escolha um ano escolarização!');
    	
    }	
	

}

function ajaxObterCarregaComboEscolaPorSeriebairro(){
	
	
	if(document.forms[0].identificadorSerieEscola.value != null && document.forms[0].identificadorSerieEscola.value != ''&& document.forms[0].identificadorSerieEscola.value != '0' &&
		document.forms[0].identificadorBairro.value != null && document.forms[0].identificadorBairro.value != ''&& document.forms[0].identificadorBairro.value != '0'		
	   ){
		
    	loadingStar();
    	carregaComboEscolaPorSerieBairro('candidatoForm', 'CandidatoAction.do?acao=ajaxCarregaComboEscolaPorSerieBairro');
        
    }	
	

}


function ajaxObterSeriesPorDtNascimento(){
	if(document.forms[0].dtNascimento.length = 11 && document.forms[0].dtNascimento.value != ''){
	//	if(document.forms[0].identificadorSerie.length <= 1){
			if(document.forms[0].dtNascimento.value != ''){
				msgCampoForm('dtNascimento','');
				carregaComboSerie('candidatoForm', 'CandidatoAction.do?acao=ajaxCarregaComboSerie');
				loadingStar();
			}else{
		    	
				msgCampoForm('dtNascimento','Preencha a data de nascimento!');
		    	
		    }
		//}
	}
}

function ajaxObterRefecenciaPorCepNumero(){
	var contMsgErro = 0; 
	var form = document.forms[0];
	
	
	if(form.cepInteresse.value  == ''){
		msgCampoForm('cepInteresse','Favor preencher o campo acima!');
		contMsgErro++;
	}else{
		msgCampoForm('cepInteresse','');		
	}
	
	if(form.numeroInteresse.value == ''){
		msgCampoForm('numeroInteresse','Favor preencher o campo acima!');
		contMsgErro++;
	}else{
		msgCampoForm('numeroInteresse','');		
	}
	
	if(contMsgErro > 0){
		return false;
	}
	
	carregaAjaxObterRefecenciaPorCepNumero('candidatoForm', 'CandidatoAction.do?acao=ajaxObterRefecenciaPorCepNumero');
	loadingStar();
}

function mudarSerieEscola(){
	
	if(document.forms[0].identificadorSerie.selectedIndex > 0){
		
		var select = document.getElementById("identificadorSerieEscola");
		var option = document.createElement("option");
		$("#identificadorSerieEscola").empty();
		addSelecioneCombo("identificadorSerieEscola");
		option.text = document.forms[0].identificadorSerie.options[document.forms[0].identificadorSerie.selectedIndex ].text;
		option.value = document.forms[0].identificadorSerie.options[document.forms[0].identificadorSerie.selectedIndex ].value; 
		select.add(option);
		
	}else{
		
		$("#identificadorSerieEscola").empty();
		var select = document.getElementById("identificadorSerieEscola");
		var option = document.createElement("option");
		
		option.text = ".: Selecione um ano de escolarização:. ";
		option.value = ""; 
		select.add(option);
	}
}

function addSelecioneCombo(campoDestino){
	
	var select = document.getElementById(campoDestino);
	var option = document.createElement("option");
	
	option.text = ".: Selecione :. ";
	option.value = ""; 
	select.add(option);
}

function limparEndereco(){
	
	document.forms[0].identificadorCep.value = '';
	document.forms[0].numeroRua.value = '';
	document.forms[0].longitude.value = '';
	document.forms[0].latitude.value = '';
	document.forms[0].bairro.value = '';
	document.forms[0].cidade.value = '';
	document.forms[0].enderecoUf.value = '';
	document.forms[0].endereco.value = '';
	document.forms[0].alunoBairroIdentificador.value = '';
	document.forms[0].alunoBairroMunicipioId.value = '';
	document.forms[0].longitude.value = '';
	document.forms[0].latitude.value = '';
	
	document.forms[0].cepInteresse.value = '';
	document.forms[0].numeroInteresse.value = '';
	document.forms[0].usouMapa.value = '0';

	
}

function carregaDadosDaApi(){
	

	var logradouroGeoTemp = document.getElementById("logradouroGeo").value;
	var municipioGeoTemp = document.getElementById("municipioGeo").value;
	var ufGeoTemp = document.getElementById("ufGeo").value ;
	var cepGeoTemp = document.getElementById("cepGeo").value ;
	var longitudeGeoTemp = document.getElementById("longitudeGeo").value ;
	var latitudeGeoTemp = document.getElementById("latitudeGeo").value ;
	var numeroGeoTemp = document.getElementById("numeroGeo").value ;
	var bairroGeoTemp = document.getElementById("bairroGeo").value ;
	var scoreTemp = document.getElementById("scoreGeo").value ;
	
	if (latitudeGeoTemp == null || latitudeGeoTemp == '' || longitudeGeoTemp == null || longitudeGeoTemp == '' ){
		
		gerarAlert('Favor selecionar um endereço no mapa!','popup-mapa-geo');
		
	}else if(scoreTemp == '0'){
		
		alertMessage('Favor clicar no mapa o lugar desejado!');
		
	}else if(!verificaLatLon(latitudeGeoTemp, longitudeGeoTemp)){
		
		alertMessage('Favor escolher um endereço preferencial dentro de salvador e região metropolitana!');
		
	}else{	
		
		
		limparEndereco();
		document.forms[0].identificadorCep.value = setMascaraCep((cepGeoTemp == "undefined"?'':cepGeoTemp));
		document.forms[0].numeroRua.value = (numeroGeoTemp == "undefined"?'':numeroGeoTemp);
		document.forms[0].longitude.value = (longitudeGeoTemp  == "undefined"?'':longitudeGeoTemp);
		document.forms[0].latitude.value = (latitudeGeoTemp  == "undefined"?'':latitudeGeoTemp);
		document.forms[0].bairro.value = (bairroGeoTemp == "undefined"?'':bairroGeoTemp);
		document.forms[0].cidade.value = (municipioGeoTemp == "undefined"?'':municipioGeoTemp);
		document.forms[0].enderecoUf.value = (ufGeoTemp == "undefined"?'':ufGeoTemp);
		document.forms[0].endereco.value = (logradouroGeoTemp == "undefined"?'':logradouroGeoTemp);
		document.forms[0].alunoBairroIdentificador.value = '';
		document.forms[0].alunoBairroMunicipioId.value = '';
		document.forms[0].usouMapa.value = '1';
		
	    $('#popup-mapa-geo').modal('hide');
	    mostraEndEncontrado();
	}
	
}

function verificaLatLon(latitude, longitude){
	
	if(latitude < -13.30718994140625 || latitude > -12.35687255859375){
		
		return false;
	} 
		   
	if(longitude > -37.86163330078125 || longitude < -38.9739990234375 ){
		
		return false;
	}
	
	return true;
}

function checkMaeDeclarado() {
    if (document.forms[0].maeNaoDeclarado.value == 1) {
    	document.forms[0].mae.value = 'NAO INFORMADO';
    	document.forms[0].mae.readOnly = true;
    }else{
    	if(document.forms[0].mae.value =='NAO INFORMADO'){
    		document.forms[0].mae.value = '';	
    	}
    	
    	document.forms[0].mae.readOnly = false;
    }	
}

function checkPaiDeclarado() {
    if (document.forms[0].paiNaoDeclarado.value == 1) {
    	document.forms[0].pai.value = '';
    	document.forms[0].pai.readOnly = true;
    }else{ 
    	document.forms[0].pai.readOnly = false;
    }	
}

function checkBolsaFamilia() {
	
    if (document.forms[0].bolsaFamilia.value == 1) {
    	
        document.getElementById('campoNIS').style.display = 'block';
    }else{ 
    	document.getElementById('campoNIS').style.display = 'none';
    }	
    
    $('#documentoBolsa').val(null);
    $('#filelabelBol').val('');
    $('#nomeArquivoBol').val('');
    $('#alterouArquivoBol').val('N');
    
}      

function checkDeficiente() {
    if (document.forms[0].portador.value == 1) {
        document.getElementById('simDeficiente').style.display = 'block';
    }else{
    	document.getElementById('simDeficiente').style.display = 'none';
    }	
    
    $('#documentoPortador1').val(null);
    $('#documentoPortador2').val(null);
    $('#documentoPortador3').val(null);
    $('#filelabelPor1').val('');
    $('#filelabelPor2').val('');
    $('#filelabelPor3').val('');
    $('#nomeArquivoPort1').val('');
    $('#nomeArquivoPort2').val('');
    $('#nomeArquivoPort3').val('');
    $('#alterouArquivoPort1').val('N');
    $('#alterouArquivoPort2').val('N');
    $('#alterouArquivoPort3').val('N');
    
}                       
  
function limparCadastroGemeo(){
	document.forms[0].certidaoNascimentoGemeo.value = '';
	document.forms[0].nomeGemeo.value = '';
	document.forms[0].sexoGemeo.value = '';
	document.forms[0].portadorGemeo.value = '';
	document.forms[0].bolsaFamiliaGemeo.value = '';
	document.forms[0].primeiroPassoGemeo.value = '';
	document.forms[0].peEscolaGemeo.value = '';
	document.forms[0].identificadorCorGemeo.value = '';
	document.forms[0].identificadorCorGemeo.selectedIndex = 0;
	document.getElementById('camponisgemeo').style.display = 'none';
	document.getElementById('simDeficiente').style.display = 'none';
	document.forms[0].cpfGemeo.readOnly = false;
	document.forms[0].certidaoNascimentoGemeo.readOnly = false;
	uncheckedRadio("sexoGemeo");
	document.forms[0].bolsaFamiliaGemeo.value = ''; 
	uncheckedRadio("bolsaFamiliaGemeo");
	document.forms[0].primeiroPassoGemeo.value =  '';
	uncheckedRadio("primeiroPassoGemeo");
	document.forms[0].peEscolaGemeo.value =  '';
	uncheckedRadio("peEscolaGemeo");
	document.forms[0].portadorGemeo.value =  '';
	uncheckedRadio("portadorGemeo");
}	

function checkBolsaFamiliaGemeo() {
	
    if (document.forms[0].bolsaFamiliaGemeo.value == 1) {
    	
        document.getElementById('camponisgemeo').style.display = 'block';
    }else{ 
    	document.getElementById('camponisgemeo').style.display = 'none';
    }	
    
    limparDocGemeoBol();
}      

function checkDeficienteGemeo() {
    if (document.forms[0].portadorGemeo.value == 1) {
        document.getElementById('simDeficientegemeo').style.display = 'block';
    }else{
    	document.getElementById('simDeficientegemeo').style.display = 'none';
    }	
    
    limparDocGemeoPort();
} 
  
    function addActionFile(fileName, hefName, spanName, hefClear, nomeArquivo, alterouArquivo){
    	var hefSelect = document.getElementById(hefName);
    	var hefClean = document.getElementById(hefClear);
    	var fileElem = document.getElementById(fileName);
    	var obNomeArquivo = document.getElementById(nomeArquivo);
    	var obAlterouArquivo = document.getElementById(alterouArquivo);
    	var spanLabel = document.getElementById(spanName);
    	var maxSize = 3024 * 3024;//1Mb
	
    // pegar o click do html:file e jogar em outro botao	
	hefSelect.addEventListener("click", function (e) {
	  if (fileElem) {
	    fileElem.click();
	  }
	  e.preventDefault(); // prevent navigation to "#"
	}, false);
	
	//limpar o campo do nome do arquivo e o html:file
	hefClean.addEventListener("click", function (e) {	  
  	  $("#" + fileName).val('');
  	  spanLabel.value='';
  	  spanLabel.placeholder ='Nome do arquivo';
  	  
  	  obNomeArquivo.value = '';
  	  obAlterouArquivo.value = 'S';
	  e.preventDefault(); // prevent navigation to "#"
  	}, false);
	
	
	// adiciona a funcao de vericar o documento antes de inserir
	fileElem.addEventListener("change", handleFiles, false);
	
    // verifica o que foi incluido 
	function handleFiles() {
		
	  var fileList = this.files;

      if (fileList.length) {
          var fileSize = fileList[0].size; // in bytes
          if (fileSize > maxSize) {
        	  alertMessage('Arquivo muito grande, só é permitido arquivos de no máximo 3 megas!');
        	  obAlterouArquivo.value ='N';
              return false;
          }
          
          var tipo =  fileList[0].type;
          if(tipo.split("/")[1]== 'pdf' || tipo.split("/")[0]=='image'){
        	  spanLabel.value = fileList[0].name;
        	  obNomeArquivo.value = fileList[0].name;
        	  obAlterouArquivo.value ='S';
        	  return true;
          }else{
        	  alertMessage('Não é permitido esse tipo de arquivo, só é permitido imagem ou arquivo Pdf!');
        	  obAlterouArquivo.value ='N';
        	  return false;
          }
      }
      
     return true;
	}
	
	if(obNomeArquivo.value != '' && (nomeArquivo == 'nomeArquivoPort1' || nomeArquivo == 'nomeArquivoPort2' || nomeArquivo == 'nomeArquivoPort3') ){
	  document.getElementById('simDeficiente').style.display = 'block';
	  spanLabel.value = obNomeArquivo.value;
	}
	if(obNomeArquivo.value != '' && (nomeArquivo == 'nomeArquivoBol') ){
	  document.getElementById('campoNIS').style.display = 'block';
	  spanLabel.value = obNomeArquivo.value;
	}
	if(obNomeArquivo.value != '' && nomeArquivo.indexOf("Gemeo") > 0){
	  spanLabel.value = obNomeArquivo.value;
	}
	
	
}
function abrirArquivo(fileName){
	
	var fileElem = document.getElementById(fileName);
	var fReader = new FileReader();
	var fiframe = document.getElementById("iframeShowDocumento");
	
	if(fileElem.files[0] == undefined && document.getElementById('identificador').value == '' && document.getElementById('identificador').value == '0'){
		
		alertMessage('Não foi incluído nenhum arquivo!');
		return false;
		
	}else if(fileElem.files[0] != undefined){
		
		fReader.readAsDataURL(fileElem.files[0]);
		fReader.onloadend = function(event){
			
			fiframe.src =  event.target.result;
		}
		$("#modalVisualizacao").modal("show");
	}
	else{
		
		document.forms[0].nomeObjetoShowAjax.value = fileName;
		loadingStar();
		carregaDocAndShow('candidatoForm', 'CandidatoAction.do?acao=ajaxShowDocumento');
			
		return false;
	}
	
	
    
}

function addGemeo(){
	
	// adiciona o gemeo na podicao que esta apontando o html:file na tela
	var contMsgErro = 0; 
	var form = document.forms[0];
	var achou = false;
	
	normalizaNome('nomeGemeo');
	
	if(form.tipoPerfil.value == '1' &&  form.certidaoNascimentoGemeo.value != ''&& comparaDados('certidaoNascimentoGemeo', form.certidaoNascimentoGemeo.value)){
		msgCampoForm('certidaoNascimentoGemeo','Certidão de nascimento duplicada!');
		form.certidaoNascimentoGemeo.focus();
		return false;
	}
	
	if(form.tipoPerfil.value == '1' &&  form.cpfGemeo.value != ''&& comparaDados('cpfGemeo', form.cpfGemeo.value)){
		msgCampoForm('cpfGemeo','CPF duplicada!');
		form.cpfGemeo.focus();
		return false;
	}
	
	if(form.nomeGemeo.value != ''&& comparaDados('nomeGemeo', form.nomeGemeo.value)){
		msgCampoForm('nomeGemeo','Nome duplicado!');
		form.nomeGemeo.focus();
		return false;
	}
	
	if(form.tipoPerfil.value == '1' &&  form.certidaoNascimentoGemeo.value == '' && semDocumento.value =='N'){
		msgCampoForm('certidaoNascimentoGemeo','Favor preencher o campo acima!');
		contMsgErro++;
	}else{
		msgCampoForm('certidaoNascimentoGemeo','');		
	}
	
	if(form.tipoPerfil.value == '1' &&  form.certidaoNascimentoGemeo.value != ''){
		var erroCertidao = validadadosNovaCertidao(form.certidaoNascimentoGemeo.value, form.dtNascimento.value);
		var certidaoValida = validaNovaCertidao(form.certidaoNascimentoGemeo.value);
		if( erroCertidao != '' || !certidaoValida){
			if(erroCertidao != ''){
				msgCampoForm('certidaoNascimentoGemeo',erroCertidao);
			}else{
				msgCampoForm('certidaoNascimentoGemeo',erroCertidao);
			}
			contMsgErro++;
		}else{
			msgCampoForm('certidaoNascimentoGemeo','');		
		}
	}
	
	if(form.tipoPerfil.value != '1' &&  form.cpfGemeo.value == '' && semDocumento.value =='N'){
		msgCampoForm('cpfGemeo','Favor preencher o campo acima!');
		contMsgErro++;
	}else{
		msgCampoForm('cpfGemeo','');
	}
	
	if(form.tipoPerfil.value != '1' &&  form.cpfGemeo.value != '' ){
		if( !validaCPF(form.cpfGemeo.value)){
			msgCampoForm('cpfGemeo','CPF inválido!');
			contMsgErro++;
		}else{
			msgCampoForm('cpfGemeo','');
		}
	}
	if(form.nomeGemeo.value == ''){
		msgCampoForm('nomeGemeo','Favor preencher o campo acima!');
		contMsgErro++;
	}else{
		msgCampoForm('nomeGemeo','');
	}
	if(form.sexoGemeo.value == ''){
		msgCampoForm('sexoGemeo','Favor escolher uma opção acima!');
		contMsgErro++;
	}else{
		msgCampoForm('sexoGemeo','');
	}
	if(form.identificadorCorGemeo.value == ''){
		msgCampoForm('identificadorCorGemeo','Favor escolher uma opção acima!');
		contMsgErro++;
	}else{
		msgCampoForm('identificadorCorGemeo','');
	}
	if(form.bolsaFamiliaGemeo.value == ''){
		msgCampoForm('bolsaFamiliaGemeo','Favor escolher uma opção acima!');
		contMsgErro++;
	}else{
		msgCampoForm('bolsaFamiliaGemeo','');
	}
	if(form.tipoPerfil.value == '1'){
		if(form.primeiroPassoGemeo.value == ''){
			msgCampoForm('primeiroPassoGemeo','Favor escolher uma opção acima!');
			contMsgErro++;
		}else{
			msgCampoForm('primeiroPassoGemeo','');
		}
	}else{
		form.primeiroPassoGemeo.value == '0';		
	}
	if(form.tipoPerfil.value == '1'){
		if(form.peEscolaGemeo.value == ''){
			msgCampoForm('peEscolaGemeo','Favor escolher uma opção acima!');
			contMsgErro++;
		}else{
			msgCampoForm('peEscolaGemeo','');
		}
	}else{
		form.peEscolaGemeo.value = '0';
	}
	if(form.portadorGemeo.value == ''){
		msgCampoForm('portadorGemeo','Favor escolher uma opção acima!');
		contMsgErro++;
	}else{
		msgCampoForm('portadorGemeo','');
	}
	if(contMsgErro > 0){
		form.nomeGemeo.focus();
		return false;
	}
	   
	for ( var int = 1; int < 5; int++) {
		
		if(document.getElementById("divDocPort"+int).style.display == "block"){
			
		   document.getElementById("nomeGemeo"+int).value = document.getElementById("nomeGemeo").value;	
		   if(document.getElementById("certidaoNascimentoGemeo").value != undefined){
			   document.getElementById("certidaoNascimentoGemeo"+int).value = document.getElementById("certidaoNascimentoGemeo").value;	
		   }
		   
		   if(document.getElementById("cpfGemeo").value != undefined){
			   document.getElementById("cpfGemeo"+int).value = document.getElementById("cpfGemeo").value;
		   }
		   
		   document.getElementById("sexoGemeo"+int).value = form.sexoGemeo.value;
		   document.getElementById("identificadorCorGemeo"+int).value = form.identificadorCorGemeo.value;
		   document.getElementById("bolsaFamiliaGemeo"+int).value = form.bolsaFamiliaGemeo.value; 
		   
		   if(form.tipoPerfil.value == '1'){
			   document.getElementById("primeiroPassoGemeo"+int).value = form.primeiroPassoGemeo.value;
		   }else{
			   document.getElementById("primeiroPassoGemeo"+int).value = '0';
		   }
		   
		   if(form.tipoPerfil.value == '1'){
			   document.getElementById("peEscolaGemeo"+int).value = form.peEscolaGemeo.value;
		   }else{
			   document.getElementById("peEscolaGemeo"+int).value = '0';
		   }

		   document.getElementById("portadorGemeo"+int).value = form.portadorGemeo.value;
		   
		   document.forms[0].cpfGemeo.readOnly = false;
		   document.forms[0].certidaoNascimentoGemeo.readOnly = false;
		   
		   clearGemeoTela();
		   addGemeoTela();
		   achou = true;
		   break;
		}
	}
	
	if(!achou){
		clearGemeoTela();
		addGemeoTela();
		alertMessage('Erro ao adicionar um gêmeo!');
	}
		
}

function clearGemeo(posicao){
   document.getElementById("identificadorGemeo"+ posicao).value = '';	
   document.getElementById("nomeGemeo"+ posicao).value = '';
   document.getElementById("certidaoNascimentoGemeo"+posicao).value =  ''; 
   document.getElementById("cpfGemeo"+posicao).value  = ''; 
   document.getElementById("sexoGemeo"+posicao).value = ''; 
   document.getElementById("identificadorCorGemeo"+posicao).value = '';
   document.getElementById("bolsaFamiliaGemeo"+posicao).value = ''; 
   document.getElementById("primeiroPassoGemeo"+posicao).value =  '';	
   document.getElementById("peEscolaGemeo"+posicao).value =  '';
   document.getElementById("portadorGemeo"+posicao).value =  '';
   $('#documentoGemeo'+posicao+'Portador1').val('');
   $('#documentoGemeo'+posicao+'Portador2').val('');
   $('#documentoGemeo'+posicao+'Portador3').val('');
   $('#documentoGemeo'+posicao+'Bolsa').val('');
   
}

function clearGemeoTela(){
	
	var form = document.forms[0];
	
	form.nomeGemeo.value = '';
	form.certidaoNascimentoGemeo.value =  ''; 
	form.cpfGemeo.value  = ''; 
	form.sexoGemeo.value = ''; 
	form.identificadorCorGemeo.value = '';
	uncheckedRadio("sexoGemeo");
	form.bolsaFamiliaGemeo.value = ''; 
	uncheckedRadio("bolsaFamiliaGemeo");
	form.primeiroPassoGemeo.value =  '';
	uncheckedRadio("primeiroPassoGemeo");
	form.peEscolaGemeo.value =  '';
	uncheckedRadio("peEscolaGemeo");
	form.portadorGemeo.value =  '';
	uncheckedRadio("portadorGemeo");
	
	document.getElementById('simDeficientegemeo').style.display = 'none';
	document.getElementById('camponisgemeo').style.display = 'none';
	document.getElementById("divDocPort"+1).style.display = "none";
    document.getElementById("divDocBolsa"+1).style.display = "none";
    document.getElementById("divDocPort"+2).style.display = "none";
    document.getElementById("divDocBolsa"+2).style.display = "none";
    document.getElementById("divDocPort"+3).style.display = "none";
    document.getElementById("divDocBolsa"+3).style.display = "none";
    document.getElementById("divDocPort"+4).style.display = "none";
    document.getElementById("divDocBolsa"+4).style.display = "none";
   
}

function editarGemeo(nome , idGemeo){
	
	var form = document.forms[0];
	var posicao = 0;
	
	clearGemeoTela();
	
	for ( var int = 1; int < 5; int++) {
		if(document.getElementById("nomeGemeo"+int).value == nome){
			posicao = int;
			break;
		}
	}
	
	if(posicao == 0){
		alertMessage('Erro ao editar o gêmeo!');
		return false;
	}
	
	form.nomeGemeo.value = document.getElementById("nomeGemeo"+posicao).value;	
	form.certidaoNascimentoGemeo.value = document.getElementById("certidaoNascimentoGemeo"+posicao).value; 
	form.cpfGemeo.value = document.getElementById("cpfGemeo"+posicao).value; 
	form.sexoGemeo.value = document.getElementsByName("sexoGemeo"+posicao)[0].value; 
	form.identificadorCorGemeo.value = document.getElementById("identificadorCorGemeo"+posicao).value;
	form.bolsaFamiliaGemeo.value = document.getElementsByName("bolsaFamiliaGemeo"+posicao)[0].value; 
	form.primeiroPassoGemeo.value = document.getElementsByName("primeiroPassoGemeo"+posicao)[0].value;	
	form.peEscolaGemeo.value = document.getElementsByName("peEscolaGemeo"+posicao)[0].value;
	form.portadorGemeo.value = document.getElementsByName("portadorGemeo"+posicao)[0].value;
	
	form.cpfGemeo.readOnly = true;
	form.certidaoNascimentoGemeo.readOnly = true;
	
	if(document.getElementById("certidaoNascimentoGemeo") != null){
		
		document.getElementById("certidaoNascimentoGemeo").value = setMascaracertidao(document.getElementById("certidaoNascimentoGemeo"+posicao).value);
    }
   
   if(form.portadorGemeo.value == '1'){
	   checkDeficienteGemeo();
   }
   
   if(form.bolsaFamiliaGemeo.value == '1'){
	   checkBolsaFamiliaGemeo();
   }
   document.getElementById("gemeos-campos-cadastrar").style.display = "block";
   document.getElementById("gemeos-botao-cadastrar").style.display = "none";
   
   document.getElementById("divDocPort"+1).style.display = "none";
   document.getElementById("divDocBolsa"+1).style.display = "none";
   document.getElementById("divDocPort"+2).style.display = "none";
   document.getElementById("divDocBolsa"+2).style.display = "none";
   document.getElementById("divDocPort"+3).style.display = "none";
   document.getElementById("divDocBolsa"+3).style.display = "none";
   document.getElementById("divDocPort"+4).style.display = "none";
   document.getElementById("divDocBolsa"+4).style.display = "none";
   document.getElementById("divDocPort"+posicao).style.display = "block";
   document.getElementById("divDocBolsa"+posicao).style.display = "block";
}	
function addGemeoTela(){
	
	document.getElementById("gemeos-box").style.display = "block";
	document.getElementById("gemeos-botao-cadastrar").style.display = "block";
	document.getElementById("gemeos-campos-cadastrar").style.display = "none";
	document.getElementById("lista-gemeos").style.display = "block";
	
	carregaGridGemeo();
	
}
function mostrarCamposCadastro(){
	
	document.getElementById("cadastro-campos").style.display = "block";
	document.getElementById("filiacao-box").style.display = "block";
	document.getElementById("btnSalvar").disabled = false;
	
	document.getElementById("gemeos-box").style.display = "block";
	document.getElementById("gemeos-botao-cadastrar").style.display = "block";
	document.getElementById("gemeos-campos-cadastrar").style.display = "none";
	
	if(existeGemeo()){
		document.getElementById("lista-gemeos").style.display = "block";
		document.getElementById("gemeos-box").style.display = "block";
		document.getElementById("gemeos-botao-cadastrar").style.display = "block";
		document.getElementById("gemeos-campos-cadastrar").style.display = "none";
		carregaGridGemeo();
	}
		
	document.getElementById("endereco-box").style.display = "block";
	document.getElementById("unidadereferencia-box").style.display = "block";
	document.getElementById("botao-salvar").style.display = "block";
	document.getElementById("divBotaoBuscar").style.display = "none";
	
}
function mostrarCamposCadastroGemeo(){
	
	var form = document.forms[0];
	
	if(form.nome.value == '' || form.dtNascimento.value == '' || form.mae.value == ''){
		alertMessage('Favor preencher primeiro o nome e data de nascimento!');
		return false;
	}
	
	document.getElementById("gemeos-box").style.display = "block";
	document.getElementById("gemeos-botao-cadastrar").style.display = "none";
	document.getElementById("gemeos-campos-cadastrar").style.display = "block";
	
	if(existeGemeo()){
		document.getElementById("lista-gemeos").style.display = "block";
		carregaGridGemeo();
	}
	
	msgCampoForm('certidaoNascimentoGemeo','');		
	msgCampoForm('cpfGemeo','');
	msgCampoForm('nomeGemeo','');
	msgCampoForm('sexoGemeo','');
	msgCampoForm('identificadorCorGemeo','');
	msgCampoForm('bolsaFamiliaGemeo','');
	msgCampoForm('primeiroPassoGemeo','');
	msgCampoForm('portadorGemeo','');
	msgCampoForm('peEscolaGemeo','');
	
	escolherGemeoAbrir();
    
    
	
}

function existeGemeo(){
	for ( var int = 1; int < 5; int++) {
		if(document.getElementById("nomeGemeo"+int).value != ''){
			return true;
		}
	}	
	return false;
}

function escolherGemeoAbrir(){
	var achou = false;
	
	for ( var int = 1; int < 5; int++) {
		
		if(document.getElementById("nomeGemeo"+int).value == '' && !achou){
			
			document.getElementById("divDocPort"+int).style.display = "block";
			document.getElementById("divDocBolsa"+int).style.display = "block";
			achou = true;
			
		}else{
			document.getElementById("divDocPort"+int).style.display = "none";
			document.getElementById("divDocBolsa"+int).style.display = "none";
		}
	}
	
	if(!achou){
		
		document.getElementById("gemeos-box").style.display = "block";
		document.getElementById("gemeos-botao-cadastrar").style.display = "block";
		document.getElementById("gemeos-campos-cadastrar").style.display = "none";
		alertMessage('Só é póssivel adicionar até 4 gêmeos');
		
	}else{
		
		var form = document.forms[0];
		
		form.nomeGemeo.value = '';
		form.certidaoNascimentoGemeo.value =  ''; 
		form.cpfGemeo.value  = ''; 
		form.sexoGemeo.value = ''; 
		form.identificadorCorGemeo.value = '';
		uncheckedRadio("sexoGemeo");
		form.bolsaFamiliaGemeo.value = ''; 
		uncheckedRadio("bolsaFamiliaGemeo");
		form.primeiroPassoGemeo.value =  '';
		uncheckedRadio("primeiroPassoGemeo");
		form.peEscolaGemeo.value =  '';
		uncheckedRadio("peEscolaGemeo");
		form.portadorGemeo.value =  '';
		uncheckedRadio("portadorGemeo");
		document.getElementById('simDeficientegemeo').style.display = 'none';
		document.getElementById('camponisgemeo').style.display = 'none';
	}
	
}

function limparDocGemeoPort(){
	for ( var int = 1; int < 5; int++) {
		if(document.getElementById("divDocPort"+int).style.display == "block"){
			$('#documentoGemeo'+ int +'Portador1').val(null);
			$('#documentoGemeo'+ int +'Portador2').val(null);
			$('#documentoGemeo'+ int +'Portador3').val(null);
			$('#filelabelGemeo'+ int +'Por1').val('');
			$('#filelabelGemeo'+ int +'Por2').val('');
			$('#filelabelGemeo'+ int +'Por3').val('');
			$('#nomeArquivoGemeo'+ int +'Port1').val('');
			$('#nomeArquivoGemeo'+ int +'Port2').val('');
			$('#nomeArquivoGemeo'+ int +'Port3').val('');
			$('#alterouArquivoGemeo'+ int +'Port1').val('N');
			$('#alterouArquivoGemeo'+ int +'Port2').val('N');
			$('#alterouArquivoGemeo'+ int +'Port3').val('N');
			break;
		}
	}
}

function limparDocGemeoBol(){
	for ( var int = 1; int < 5; int++) {
		if(document.getElementById("divDocPort"+int).style.display == "block"){
			$('#documentoGemeo'+ int +'Bolsa').val(null);
			$('#filelabelGemeo'+ int +'Bol').val('');
			$('#nomeArquivoGemeo'+ int +'Bol').val('');
			$('#alterouArquivoGemeo'+ int +'Bol').val('N');
			break;
		}
	}
}

function carregaGridGemeo(){
	
	var contGemeo = 0;
	$('#ulGemeo').empty();
	
	var idGemeo = '';
	var nomeLoop = '';
	
	for ( var cont = 1; cont < 5; cont++) {
		
		if(document.getElementById("nomeGemeo"+cont).value != ''){
			
			idGemeo = document.getElementById("identificadorGemeo"+cont).value;
			nomeLoop = document.getElementById("nomeGemeo"+cont).value;
			
			if(idGemeo == '' || idGemeo == null){
				idGemeo = '0';
			}
			
			$("#ulGemeo").append('<li class="list-group-item d-flex justify-content-between">'+nomeLoop+
				     			 '<span>'+
					     			 '<a href="javaScript:editarGemeo(\''+nomeLoop+'\','+idGemeo+');" id="iGemeoAlt'+cont+'"><i class="far fa-edit mx-4" aria-hidden="true"></i></a>'+
					     			 '<a href="javaScript:apagarGemeo(\''+nomeLoop+'\','+idGemeo+');" id="iGemeoApa'+cont+'"><i class="far fa-trash-alt" aria-hidden="true"></i></a>'+
				     			 '</span>');
			contGemeo++;
		}
	}
	
	if(contGemeo == 0){
		
		document.getElementById("lista-gemeos").style.display = "none";
		
	}else{
		
		document.getElementById("lista-gemeos").style.display = "block";
		
	}
	
}

function sumirCamposCadastroGemeo(){
	
	document.getElementById("gemeos-box").style.display = "block";
	document.getElementById("gemeos-botao-cadastrar").style.display = "block";
	document.getElementById("gemeos-campos-cadastrar").style.display = "none";
	
	if(existeGemeo()){
		document.getElementById("lista-gemeos").style.display = "block";
		carregaGridGemeo();
	}
	
	msgCampoForm('certidaoNascimentoGemeo','');		
	msgCampoForm('cpfGemeo','');
	msgCampoForm('cpfGemeo','');
	msgCampoForm('nomeGemeo','');
	msgCampoForm('sexoGemeo','');
	msgCampoForm('identificadorCorGemeo','');
	msgCampoForm('bolsaFamiliaGemeo','');
	msgCampoForm('primeiroPassoGemeo','');
	msgCampoForm('portadorGemeo','');
	msgCampoForm('peEscolaGemeo','');
	
    document.getElementById("divDocPort"+1).style.display = "none";
    document.getElementById("divDocBolsa"+1).style.display = "none";
    document.getElementById("divDocPort"+2).style.display = "none";
    document.getElementById("divDocBolsa"+2).style.display = "none";
    document.getElementById("divDocPort"+3).style.display = "none";
    document.getElementById("divDocBolsa"+3).style.display = "none";
    document.getElementById("divDocPort"+4).style.display = "none";
    document.getElementById("divDocBolsa"+4).style.display = "none";
    
    if(document.forms[0].cpfGemeo.value != ''){
    	document.forms[0].cpfGemeo.readOnly = false;
    }
    if(document.forms[0].certidaoNascimentoGemeo.value != ''){
    	document.forms[0].certidaoNascimentoGemeo.readOnly = false;
    }
}

function onLoadTela(){
	
	addActionFile("documentoPortador1", "fileSelectPor1", "filelabelPor1","fileClearPor1", "nomeArquivoPort1", "alterouArquivoPort1");
	addActionFile("documentoPortador2", "fileSelectPor2", "filelabelPor2","fileClearPor2", "nomeArquivoPort2", "alterouArquivoPort2");
	addActionFile("documentoPortador3", "fileSelectPor3", "filelabelPor3","fileClearPor3", "nomeArquivoPort3", "alterouArquivoPort3");
	addActionFile("documentoBolsa", "fileSelectBol", "filelabelBol","fileClearBol", "nomeArquivoBol", "alterouArquivoBol");
	
	addActionFile("documentoGemeo1Portador1", "fileSelectGemeo1Por1", "filelabelGemeo1Por1","fileClearGemeo1Por1", "nomeArquivoGemeo1Port1", "alterouArquivoGemeo1Port1");
	addActionFile("documentoGemeo1Portador2", "fileSelectGemeo1Por2", "filelabelGemeo1Por2","fileClearGemeo1Por2", "nomeArquivoGemeo1Port2", "alterouArquivoGemeo1Port2");
	addActionFile("documentoGemeo1Portador3", "fileSelectGemeo1Por3", "filelabelGemeo1Por3","fileClearGemeo1Por3", "nomeArquivoGemeo1Port3", "alterouArquivoGemeo1Port3");
	
	addActionFile("documentoGemeo2Portador1", "fileSelectGemeo2Por1", "filelabelGemeo2Por1","fileClearGemeo2Por1", "nomeArquivoGemeo2Port1", "alterouArquivoGemeo2Port1");
	addActionFile("documentoGemeo2Portador2", "fileSelectGemeo2Por2", "filelabelGemeo2Por2","fileClearGemeo2Por2", "nomeArquivoGemeo2Port2", "alterouArquivoGemeo2Port2");
	addActionFile("documentoGemeo2Portador3", "fileSelectGemeo2Por3", "filelabelGemeo2Por3","fileClearGemeo2Por3", "nomeArquivoGemeo2Port3", "alterouArquivoGemeo2Port3");
	
	addActionFile("documentoGemeo3Portador1", "fileSelectGemeo3Por1", "filelabelGemeo3Por1","fileClearGemeo3Por1", "nomeArquivoGemeo3Port1", "alterouArquivoGemeo3Port1");
	addActionFile("documentoGemeo3Portador2", "fileSelectGemeo3Por2", "filelabelGemeo3Por2","fileClearGemeo3Por2", "nomeArquivoGemeo3Port2", "alterouArquivoGemeo3Port2");
	addActionFile("documentoGemeo3Portador3", "fileSelectGemeo3Por3", "filelabelGemeo3Por3","fileClearGemeo3Por3", "nomeArquivoGemeo3Port3", "alterouArquivoGemeo3Port3");
	
	addActionFile("documentoGemeo4Portador1", "fileSelectGemeo4Por1", "filelabelGemeo4Por1","fileClearGemeo4Por1", "nomeArquivoGemeo4Port1", "alterouArquivoGemeo4Port1");
	addActionFile("documentoGemeo4Portador2", "fileSelectGemeo4Por2", "filelabelGemeo4Por2","fileClearGemeo4Por2", "nomeArquivoGemeo4Port2", "alterouArquivoGemeo4Port2");
	addActionFile("documentoGemeo4Portador3", "fileSelectGemeo4Por3", "filelabelGemeo4Por3","fileClearGemeo4Por3", "nomeArquivoGemeo4Port3", "alterouArquivoGemeo4Port3");
	
	addActionFile("documentoGemeo1Bolsa", "fileSelectGemeo1Bol", "filelabelGemeo1Bol","fileClearGemeo1Bol", "nomeArquivoGemeo1Bol", "alterouArquivoGemeo1Bol");
	addActionFile("documentoGemeo2Bolsa", "fileSelectGemeo2Bol", "filelabelGemeo2Bol","fileClearGemeo2Bol", "nomeArquivoGemeo2Bol", "alterouArquivoGemeo2Bol");
	addActionFile("documentoGemeo3Bolsa", "fileSelectGemeo3Bol", "filelabelGemeo3Bol","fileClearGemeo3Bol", "nomeArquivoGemeo3Bol", "alterouArquivoGemeo3Bol");
	addActionFile("documentoGemeo4Bolsa", "fileSelectGemeo4Bol", "filelabelGemeo4Bol","fileClearGemeo4Bol", "nomeArquivoGemeo4Bol", "alterouArquivoGemeo4Bol");
	
	maskSomenteLetrasNumeros('nome');
	maskSomenteLetrasNumeros('pai');
	maskSomenteLetrasNumeros('mae');
	maskSomenteLetrasNumeros('nomeGemeo');
	maskSomenteLetrasNumeros('endereco');
	
	$('#modalConfirmacaoTexto').html('Não encontramos seu endereço no sistema, deseja procurar no mapa?');
	
	$('#dtNascimento').mask("00/00/0000", {placeholder: "__/__/____"});
	
	if(document.getElementById("cpf") != null){
		$("#cpf").mask("000.000.000-00", {reverse: true});
	}
	if(document.getElementById("cpfGemeo") != null){
		$("#cpfGemeo").mask("000.000.000-00", {reverse: true});
	}
	
    if(document.getElementById("certidaoNascimentoGemeo") != null){
    	$("#certidaoNascimentoGemeo").mask("000000.00.00.0000.0.00000.000.0000000.00", {reverse: true});
    }
    if(document.getElementById("certidaoNascimento") != null){
    	$("#certidaoNascimento").mask("000000.00.00.0000.0.00000.000.0000000.00", {reverse: true});
    }
    $('#identificadorCep').mask("00.000-000", {reverse: true});
    $('#cepInteresse').mask("00.000-000", {reverse: true});
    $('#numeroRua').mask("99999999");
    
    $('#dtNascimento').datepicker({onSelect: function (date) {ajaxObterSeriesPorDtNascimento();}});
	
    if(document.getElementById("nome").value == ''){
    	
    	clearGemeoTela();
    	document.getElementById("divBotaoBuscar").style.display = "block";
    	
    }else{
    	
    	if(document.getElementById("tipoPerfil").value == '1'){
    		if(document.getElementById("certidaoNascimento").value != ''){
    			document.getElementById("certidaoNascimento").readOnly  = true;
    		}
    	}
    	
    	if(document.getElementById("tipoPerfil").value != '1'){
    		
    		if(document.getElementById("cpf").value != ''){
    			document.getElementById("cpf").readOnly  = true;
    		}
    	}
    	
    	mostrarCamposCadastro();
    	mostraEndEncontrado();
    	checkMaeDeclarado();
    	checkPaiDeclarado();
    	
    }
    
	if(document.forms[0].tipoPerfil.value == '1' ){
		document.getElementById('divCertidaoNascimentoGemeo').style.display = 'block';
		document.getElementById('divCpfGemeo').style.display = 'none';
		document.getElementById('divGemeoPeEscola').style.display = 'block';
		document.getElementById('divPeEscola').style.display = 'block';
		document.getElementById('divGemeoPrimeiroPasso').style.display = 'block';
		document.getElementById('divPrimeiroPasso').style.display = 'block';
		document.forms[0].primeiroPasso.value = null;
		document.forms[0].peEscola.value = null;
	}
	if(document.forms[0].tipoPerfil.value == '2' ){
		document.getElementById('divCertidaoNascimentoGemeo').style.display = 'none';
		document.getElementById('divCpfGemeo').style.display = 'block';
		document.getElementById('divGemeoPeEscola').style.display = 'none';
		document.getElementById('divPeEscola').style.display = 'none';
		document.getElementById('divGemeoPrimeiroPasso').style.display = 'none';
		document.getElementById('divPrimeiroPasso').style.display = 'none';
		document.forms[0].primeiroPasso.value = 0;
		document.forms[0].peEscola.value = 0;
		document.forms[0].primeiroPassoGemeo.value = 0;
		document.forms[0].peEscolaGemeo.value = 0;
	}
	if(document.forms[0].tipoPerfil.value == '3' && document.getElementById("nome").value == ''){
		ajaxObterCadPorCpfOuCertidao();
		document.getElementById('divGemeoPeEscola').style.display = 'none';
		document.getElementById('divPeEscola').style.display = 'none';
		document.getElementById('divGemeoPrimeiroPasso').style.display = 'none';
		document.getElementById('divPrimeiroPasso').style.display = 'none';
		document.forms[0].primeiroPasso.value = 0;
		document.forms[0].peEscola.value = 0;
		document.getElementById("gemeos-box").style.display = "none";
		document.getElementById("divDadosResponsavelCampos").style.display = "none";
		document.getElementById("divDadosResponsavelTitulo").style.display = "none";
		document.getElementById("divParentesco").style.display = "none";
		document.forms[0].identificadorParentesco.value = 11;
	}
	
	copiarColecao(document.getElementById("identificadorCor"), document.getElementById("identificadorCorGemeo"));
}

function apagarGemeo(nome, id){
	for ( var int = 1; int < 5; int++) {
		if(document.getElementById("nomeGemeo"+int).value == nome){
			if(id != null && id != "" && id != "0"){
				alertMessage('Esse estudante está inscrito! favor usar a tela principal que mostra todos os inscritos do responsável para recusar a inscrição!');
				break;
			}else{
				clearGemeo(int);
				break;
			}
		}
	}
    clearGemeoTela();
    addGemeoTela();
}

function ajaxObterCadPorCpfOuCertidaoGemeo(){
	
	if(document.forms[0].tipoPerfil.value == '1' ){
		if(document.forms[0].certidaoNascimentoGemeo.value != null && document.forms[0].certidaoNascimentoGemeo.value != '' && !document.forms[0].certidaoNascimentoGemeo.readOnly){
        	loadingStar();
        	autoCompleteDocumentoGemeo('candidatoForm', 'CandidatoAction.do?acao=ajaxObterCadPorCpfOuCertidaoGemeo');
            
        }
	
	}
	if(document.forms[0].tipoPerfil.value != '1' ){
		if(document.forms[0].cpfGemeo.value != null && document.forms[0].cpfGemeo.value != '' && !document.forms[0].cpfGemeo.readOnly){
        	loadingStar();
        	autoCompleteDocumentoGemeo('candidatoForm', 'CandidatoAction.do?acao=ajaxObterCadPorCpfOuCertidaoGemeo');
            
        }	
	}
	
}

function uncheckedRadio(objRadio){
	document.getElementsByName(objRadio)[0].checked= false;
	document.getElementsByName(objRadio)[1].checked= false;
	
}

function checkedRadio(objeto){
	if (objeto.value == 1) {
		objeto[1].checked= true;
    }else if(objeto.value == 0){
    	objeto[0].checked= true;
    }	
}

function salvar(){
	
	var contMsgErro = 0; 
	var form = document.forms[0];
	primeiroFocus = true;
	
	normalizaNome('nome');
	normalizaNome('pai');
	normalizaNome('mae');
	
	if(form.tipoPerfil.value == '1'){
		if(form.tipoPerfil.value == '1' &&  form.certidaoNascimento.value == '' && semDocumento.value =='N'){
			msgCampoForm('certidaoNascimento','Favor preencher o campo acima!');
			controleFocus('certidaoNascimento');
			contMsgErro++;
		}else{
			msgCampoForm('certidaoNascimento','');		
		}
		if(form.certidaoNascimento.value != ''){
			
			var erroCertidao = validadadosNovaCertidao(form.certidaoNascimento.value, form.dtNascimento.value);
			if((erroCertidao != '' && form.dtNascimento.value != '') || !validaNovaCertidao(form.certidaoNascimento.value)){
				
				if(erroCertidao != ''){
					msgCampoForm('certidaoNascimento',erroCertidao);
				}else{
					msgCampoForm('certidaoNascimento','Certidao de nascimento inválida!');
				}	
				controleFocus('certidaoNascimento');
				contMsgErro++;
			}else{
				msgCampoForm('certidaoNascimento','');		
			}
			
		}
	}
	if(form.tipoPerfil.value != '1'){
		if(form.tipoPerfil.value != '1' &&  form.cpf.value == '' && semDocumento.value =='N'){
			msgCampoForm('cpf','Favor preencher o campo acima!');
			controleFocus('cpf');
			contMsgErro++;
		}else{
			msgCampoForm('cpf','');
		}
		if(form.cpf.value != ''){
			if(form.tipoPerfil.value != '1' &&  form.cpf.value != '' && !validaCPF(form.cpf.value)){
				msgCampoForm('cpf','CPF inválido!');
				controleFocus('cpf');
				contMsgErro++;
			}else{
				msgCampoForm('cpf','');
			}
		}
	}
	if(form.nome.value == ''){
		msgCampoForm('nome','Favor preencher o campo acima!');
		controleFocus('nome');
		contMsgErro++;
	}else{
		msgCampoForm('nome','');
	}
	if(form.nome.value != ''){
		if(!validaNomeCenso(form.nome.value)){
			msgCampoForm('nome','O nome deverá ter mais de uma palavra, ter no máximo a repetição de 3 caracteres iguais e não ter números!');
			controleFocus('nome');
			contMsgErro++;
		}else{
			msgCampoForm('nome','');
		}
	}
	if(form.sexo.value == ''){
		msgCampoForm('sexo','Favor escolher uma opção acima!');
		controleFocus('sexo');
		contMsgErro++;
	}else{
		msgCampoForm('sexo','');
	}
	if(form.bolsaFamilia.value == ''){
		msgCampoForm('bolsaFamilia','Favor escolher uma opção acima!');
		controleFocus('bolsaFamilia');
		contMsgErro++;
	}else{
		msgCampoForm('bolsaFamilia','');
	}
	if(form.primeiroPasso.value == ''){
		msgCampoForm('primeiroPasso','Favor escolher uma opção acima!');
		controleFocus('primeiroPasso');
		contMsgErro++;
	}else{
		msgCampoForm('primeiroPasso','');
	}
	if(form.peEscola.value == ''){
		msgCampoForm('peEscola','Favor escolher uma opção acima!');
		controleFocus('peEscola');
		contMsgErro++;
	}else{
		msgCampoForm('peEscola','');
	}
	if(form.portador.value == ''){
		msgCampoForm('portador','Favor escolher uma opção acima!');
		controleFocus('portador');
		contMsgErro++;
	}else{
		msgCampoForm('portador','');
	}
	if(form.maeNaoDeclarado.value == '0' && form.mae.value == ''){
		msgCampoForm('mae','Favor preencher o campo acima!!');
		controleFocus('mae');
		contMsgErro++;
	}else{
		msgCampoForm('mae','');
	}
	if(form.mae.value != '' && form.maeNaoDeclarado.value == '0'){
		if(!validaNomeCenso(form.mae.value)){
			msgCampoForm('mae','O nome deverá ter mais de uma palavra, ter no máximo a repetição de 3 caracteres iguais e não ter números!');
			controleFocus('mae');
			contMsgErro++;
		}else{
			msgCampoForm('mae','');
		}
	}
	if(form.maeNaoDeclarado.value == ''){
		msgCampoForm('maeNaoDeclarado','Favor escolher uma opção acima!');
		controleFocus('maeNaoDeclarado');
		contMsgErro++;
	}else{
		msgCampoForm('maeNaoDeclarado','');
	}
	if(form.paiNaoDeclarado.value == '0' && form.pai.value == ''){
		msgCampoForm('pai','Favor preencher o campo acima!');
		controleFocus('pai');
		contMsgErro++;
	}else{
		msgCampoForm('pai','');
	}
	if(form.paiNaoDeclarado.value == ''){
		msgCampoForm('paiNaoDeclarado','Favor escolher uma opção acima!');
		controleFocus('paiNaoDeclarado');
		contMsgErro++;
	}else{
		msgCampoForm('paiNaoDeclarado','');
	}
	if(form.pai.value != ''){
		if(!validaNomeCenso(form.pai.value)){
			msgCampoForm('pai','O nome deverá ter mais de uma palavra, ter no máximo a repetição de 3 caracteres iguais e não ter números!');
			controleFocus('pai');
			contMsgErro++;
		}else{
			msgCampoForm('pai','');
		}
	}
	if(form.identificadorSerie.value == '' || form.identificadorSerie.value == 0){
		msgCampoForm('identificadorSerie','Favor escolher uma opção acima!');
		controleFocus('identificadorSerie');
		contMsgErro++;
	}else{
		msgCampoForm('identificadorSerie','');
	}
	if(form.identificadorParentesco.value == '' || form.identificadorParentesco.value == 0){
		msgCampoForm('identificadorParentesco','Favor escolher uma opção acima!');
		controleFocus('identificadorParentesco');
		contMsgErro++;
	}else{
		
		if((form.identificadorParentesco.value == '1' && form.mae.value.toUpperCase().trim() != form.nomeResponsavel.value.toUpperCase().trim()) ||
		   (form.identificadorParentesco.value == '2' && form.pai.value.toUpperCase().trim() != form.nomeResponsavel.value.toUpperCase().trim())){
			if(form.identificadorParentesco.value == '1'){
				msgCampoForm('identificadorParentesco','O responsável não pode ser a mãe, pois não tem o nome igual!');
				controleFocus('identificadorParentesco');
				contMsgErro++;
			}else{
				msgCampoForm('identificadorParentesco','O responsável não pode ser o pai, pois não tem o nome igual!');
				controleFocus('identificadorParentesco');
				contMsgErro++;
			}
								
		}else if((form.identificadorParentesco.value != '1'&& form.mae.value.toUpperCase().trim() != '' && form.mae.value.toUpperCase().trim() == form.nomeResponsavel.value.toUpperCase().trim()) ||
				(form.identificadorParentesco.value != '2' && form.pai.value.toUpperCase().trim() != '' && form.pai.value.toUpperCase().trim() == form.nomeResponsavel.value.toUpperCase().trim())){
			if(form.mae.value.toUpperCase().trim() == form.nomeResponsavel.value.toUpperCase().trim()){
				msgCampoForm('identificadorParentesco','O responsável não pode ser diferente de mãe, pois tem o nome igual!');
				controleFocus('identificadorParentesco');
				contMsgErro++;
			}else{
				msgCampoForm('identificadorParentesco','O responsável não pode ser diferente de pai, pois tem o nome igual!');
				controleFocus('identificadorParentesco');
				contMsgErro++;
			}
				
		}else{
			msgCampoForm('identificadorParentesco','');
		}
	}
	
	if(form.dtNascimento.value == ''){
		msgCampoForm('dtNascimento','Favor preencher o campo acima!');
		controleFocus('dtNascimento');
		contMsgErro++;
	}else{
		msgCampoForm('dtNascimento','');
	}
	if(form.identificadorCor.value == ''){
		msgCampoForm('identificadorCor','Favor escolher uma opção acima!');
		controleFocus('identificadorCor');
		contMsgErro++;
	}else{
		msgCampoForm('identificadorCor','');
	}
	/* exclusao do campo
	if(form.tipoMotivoEscola.value == '' && form.identificadorEscola.value != ''){
		msgCampoForm('tipoMotivoEscola','Favor escolher uma opção acima!');
		controleFocus('tipoMotivoEscola');
		contMsgErro++;
	}else{
		msgCampoForm('tipoMotivoEscola','');
	}
	
	if(  form.tipoMotivoEscola.value != '' && form.identificadorEscola.value == ''){
		msgCampoForm('identificadorEscola','Favor escolher uma opção acima!');
		controleFocus('identificadorEscola');
		contMsgErro++;
	}else{
		msgCampoForm('identificadorEscola','');
	}
	*/
	if(form.latitude.value == '' || form.latitude.value == null || form.longitude.value == ''|| form.longitude.value == null){
		msgCampoForm('numeroInteresse','Favor preencher o campo acima!');
		msgCampoForm('cepInteresse','Favor preencher o campo acima!');
		controleFocus('cepInteresse');
		contMsgErro++;
	}else{
		msgCampoForm('numeroInteresse','');
		msgCampoForm('cepInteresse','');
	}
	
	if(form.indEstudou.value == '0' || form.indEstudou.value == ''){
		msgCampoForm('indEstudou','Favor preencher o campo acima!');
		controleFocus('indEstudou');
		contMsgErro++;
	}else{
		msgCampoForm('indEstudou','');
	}
	
	if(contMsgErro > 0){
		//form.nome.focus();
		return false;
	}
	
	if(document.getElementById("gemeos-campos-cadastrar").style.display == "block"){
		alertMessage('favor confirmar o gêmeo!');
		return false;
	}
	
	form.acao.value ="salvar";
	form.submit();
}

function mostraEndEncontrado(){
	document.getElementById('divEndEncontradoTit').style.display = 'block';
	document.getElementById('divEndEncontrado').style.display = 'block';
}

function someEndEncontrado(){
	document.getElementById('divEndEncontradoTit').style.display = 'none';
	document.getElementById('divEndEncontrado').style.display = 'none';
}

function modalConfirmacaoSim(){
	$("#popup-mapa-geo").modal('show');
	limparEndereco();
	someEndEncontrado();
}
function modalConfirmacaoNao(){
	$("#modalConfirmacao").modal('hide');
	limparEndereco();
	someEndEncontrado();
	document.forms[0].numeroInteresse.value ='';
	document.forms[0].cepInteresse.value ='';
	document.forms[0].cepInteresse.focus();
}

function comparaDados(objeto, varievel){
	
	var tempObjeto = objeto.replace('Gemeo','');
	var posicaoEdicao = 0;
	
	for ( var int = 1; int < 5; int++) {
			
		if(document.getElementById("divDocPort"+int).style.display == "block"){
			posicaoEdicao = int;
			break;
		}
	}		
	
	if(document.getElementById(tempObjeto).value == varievel){
		return true;
	}
	
	for ( var int = 1; int < 5; int++) {
			
		if(document.getElementById(objeto+int).value == varievel && posicaoEdicao != int){
			return true;
		}
	}
	return false;
}
function limpatipoMotivoEscola(){
	if(document.forms[0].identificadorEscola.value == ''){
		document.forms[0].tipoMotivoEscola.value = '';
	}
}
