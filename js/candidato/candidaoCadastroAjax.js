function autoCompleteDocumento(form, url){
	
        $.ajax({
                type: "GET",
                url: url,
                data: $("#"+form).serialize(),
                success: function(data){

                							retornarLoginSemSecaoAjax(data);	
                	
											if(data != ""){
											
												var dados = data;
												var valores = dados.split(";");
												     
												if(valores[0] == "ERRO"){
													loadingStop();
													alertMessage(valores[1]);
													return false;
													
												}else{
												
													document.forms[0].nome.value = valores[0];
													document.forms[0].dtNascimento.value = valores[1];
													document.forms[0].sexo.value = valores[2];
													
													if( valores[3] != 'null' && valores[3] != ''){
														if(valores[3] == '1'){
															document.forms[0].maeNaoDeclarado.value = valores[3];
															checkMaeDeclarado();
														}else{
															
															if(valores[4] != '' && valores[4] != 'null'){
																document.forms[0].maeNaoDeclarado.value = 0;
																document.forms[0].mae.value = valores[4];
															}
														}
														
													}else{
														
														if(valores[4] != '' && valores[4] != 'null'){
															document.forms[0].maeNaoDeclarado.value = 0;
															document.forms[0].mae.value = valores[4];
														}
														
													}
													
													if( valores[5] != 'null' && valores[5] != ''){
														if(valores[5] == '1'){
															document.forms[0].paiNaoDeclarado.value = valores[6];
															checkPaiDeclarado();
														}else{
															
															if(valores[6] != '' && valores[6] != 'null'){
																document.forms[0].paiNaoDeclarado.value = 0;
																document.forms[0].pai.value = valores[6];
															}
														}
														
													}else{
														
														if(valores[6] != '' && valores[6] != 'null'){
															document.forms[0].paiNaoDeclarado.value = 0;
															document.forms[0].pai.value = valores[6];
														}
														
													}
													
													if(document.getElementById("tipoPerfil").value != '1'){
											    		
											    		var cpfTemp = somenteNumeros(document.getElementById("cpf").value) ;
											    		
											    		if(cpfTemp != '' && (cpfTemp == somenteNumeros(document.getElementById("cpfResponsavel").value)) ){
											    			
											    			document.getElementById("divParentesco").style.display = "none";
											    			document.forms[0].identificadorParentesco.value = 11;
											    			
											    		}
													}
													document.forms[0].serieAtual.value = valores[7];
													document.forms[0].statusAtual.value = valores[8];
													document.forms[0].acao.value = 'ajaxCarregaComboSerie';
													carregaComboSerie('candidatoForm', 'CandidatoAction.do');
													
												}    
											}else{
											
												if(document.getElementById("tipoPerfil").value != '1'){
										    		
													var cpfTemp = somenteNumeros(document.getElementById("cpf").value) ;
										    		
										    		if(cpfTemp != '' && (cpfTemp == somenteNumeros(document.getElementById("cpfResponsavel").value)) ){
										    			
										    			document.getElementById("divParentesco").style.display = "none";
										    			document.forms[0].identificadorParentesco.value = 11;
										    			document.forms[0].nome.value = document.forms[0].nomeResponsavel.value;
										    		}
												}
											}
											mostrarCamposCadastro();
											$(".jq-select-autocomplete").select2();
											loadingStop();
                                     },
                error: function(data){
                						loadingStop();
                						
                						alertMessage('Ocorreu um erro no sistema, por favor tente novamente! Caso o problema persista, favor entrar em contato com o suporte!');
                                     }
        });
}
function carregaComboSerie(form, url){
		
        $.ajax({
                type: "GET",
                url: url,
                data: $("#"+form).serialize(),
                success: function(data){

                							retornarLoginSemSecaoAjax(data);
                							
											if(data != ""){
											
												var dados = data;
												var valores = dados.split(";");
												     
												if(valores[0] == "ERRO"){
													
													var opt = document.createElement('option');
													$("#identificadorSerie").empty();
													opt.value = '';
										            opt.innerHTML = '.: Preencha a data de nascimento corretamente! :.';
										            $("#identificadorSerie").append(opt);
												   
													alertMessage(valores[1]);
													
													if(document.forms[0].tipoPerfil.value == '3'){
												    	
											    		document.getElementById("gemeos-box").style.display = "none";
											    	}
													
												}else{
												
													var options = dados.split(";");
													var opt = document.createElement('option');
													
													$("#identificadorSerie").empty();
													opt.value = '';
										            opt.innerHTML = '.: Selecione um ano escolarização :.';
										            $("#identificadorSerie").append(opt);

													
										            
						                            for(var i = 0; i < options.length; i++){
						                                $("#identificadorSerie").append(options[i]);
						                            }
						                            
						                            document.forms[0].identificadorSerie.selecteIndex =0 ;
										            
						                            mostrarCamposCadastro();
						                            
						                            if(document.forms[0].tipoPerfil.value == '3'){
						                		    	
						            		    		document.getElementById("gemeos-box").style.display = "none";
						            		    	}
													
												}    
											}
											loadingStop();
                                     },
                error: function(data){
                						loadingStop();
                						var opt = document.createElement('option');
                						$("#identificadorSerie").empty();
										opt.value = '';
							            opt.innerHTML = '.: Preencha a data de nascimento corretamente! :.';
							            $("#identificadorSerie").append(opt);
                						alertMessage('Ocorreu um erro no sistema, por favor tente novamente! Caso o problema persista, favor entrar em contato com o suporte!');
                                     }
        });
}
function carregaComboEscolaPorSerie(form, url){
		
        $.ajax({
                type: "GET",
                url: url,
                data: $("#"+form).serialize(),
                success: function(data){

                							retornarLoginSemSecaoAjax(data);	
                	
											if(data != ""){
											
												var dados = data;
												var valores = dados.split(";");
												     
												if(valores[0] == "ERRO"){
													var opt = document.createElement('option');
													$("#identificadorSerie").empty();
													opt.value = '';
										            opt.innerHTML = '.: Preencha a data de nascimento corretamente! :.';
										            $("#identificadorSerie").append(opt);
										            
													alertMessage(valores[1]);
													
												}else{
												
													var options = dados.split(";");
													$("#identificadorEscola").empty();
													addSelecioneCombo("identificadorEscola");
													
						                            for(var i = 0; i < options.length; i++){
						                                $("#identificadorEscola").append(options[i]);
						                            }

												}    
											}
											loadingStop();
                                     },
                error: function(data){
                						loadingStop();
                						var opt = document.createElement('option');
                						$("#identificadorSerie").empty();
										opt.value = '';
							            opt.innerHTML = '.: Preencha a data de nascimento corretamente! :.';
							            $("#identificadorSerie").append(opt);
                						
                						alertMessage('Ocorreu um erro no sistema, por favor tente novamente! Caso o problema persista, favor entrar em contato com o suporte!');
                                     }
        });
}
function carregaComboEscolaPorSerieBairro(form, url){
		
        $.ajax({
                type: "GET",
                url: url,
                data: $("#"+form).serialize(),
                success: function(data){

                							retornarLoginSemSecaoAjax(data);	
                	
											if(data != ""){
											
												var dados = data;
												var valores = dados.split(";");
												     
												if(valores[0] == "ERRO"){
												   
													alertMessage(valores[1]);
													
												}else{
												
													var options = dados.split(";");
													$('#identificadorEscola').empty();
													
													addSelecioneCombo("identificadorEscola");
						                            for(var i = 0; i < options.length; i++){
						                                $("#identificadorEscola").append(options[i]);
						                            }
						                            
						                            document.forms[0].identificadorEscola.selectedIndex =0;
										            //$("#identificadorEscola").change();
						                            
						                          
												}    
											}else{
												
												$('#identificadorEscola').empty();
												var opt = document.createElement('option');
												opt.value = '';
									            opt.innerHTML = '.: Selecione um bairro :.';
									            $("#identificadorEscola").append(opt);
												alertMessage("A consulta não voltou resultado!");
											}
											loadingStop();
                                     },
                error: function(data){
                						loadingStop();
                						
                						alertMessage('Ocorreu um erro no sistema, por favor tente novamente! Caso o problema persista, favor entrar em contato com o suporte!');
                                     }
        });
}
function autoCompleteDocumentoGemeo(form, url){
	
    $.ajax({
            type: "GET",
            url: url,
            data: $("#"+form).serialize(),
            success: function(data){

            							retornarLoginSemSecaoAjax(data);	
            	
										if(data != ""){
										
											var dados = data;
											var valores = dados.split(";");
											     
											if(valores[0] == "ERRO"){
											   
												alertMessage(valores[1]);
												
											}else{
											
												
												document.forms[0].nomeGemeo.value = valores[0];
												document.forms[0].sexoGemeo.value = valores[1];
												document.forms[0].identificadorCorGemeo.value = valores[2];
												
												
											}    
										}
										loadingStop();
                                 },
            error: function(data){
            						loadingStop();
            						
            						alertMessage('Ocorreu um erro no sistema, por favor tente novamente! Caso o problema persista, favor entrar em contato com o suporte!');
                                 }
    });
}
function carregaDocAndShow(form, url){
	
    $.ajax({
            type: "GET",
            url: url,
            data: $("#"+form).serialize(),
            success: function(data){

            							retornarLoginSemSecaoAjax(data);	
            	
										if(data != ""){
											
											var fiframe = document.getElementById("iframeShowDocumento");
											fiframe.src =  'servlet/exibicaoDocumento';
											$("#modalVisualizacao").modal("show");
										      
										}else{
											
											alertMessage('Não foi incluído nenhum arquivo!');
										}
										loadingStop();
                                 },
            error: function(data){
            						loadingStop();
            						
            						alertMessage('Ocorreu um erro no sistema, por favor tente novamente! Caso o problema persista, favor entrar em contato com o suporte!');
                                 }
    });
}
function carregaAjaxObterRefecenciaPorCepNumero(form, url){
	
    $.ajax({
            type: "GET",
            url: url,
            data: $("#"+form).serialize(),
            success: function(data){

            							retornarLoginSemSecaoAjax(data);	
            	
										if(data != ""){
											
											var dados = data;
											var valores = dados.split("#");
											     
											if(valores[0] == "ERRO"){
												
												if(valores[1] =='01'){
													
													limparEndereco();
													someEndEncontrado();
													$("#modalConfirmacao").modal('show');
													//alertMessage(valores[2]);
													
												}
												
												if(valores[1] =='02'){
													
													limparEndereco();
													someEndEncontrado();
													//alertMessage(valores[2]);
													$("#modalConfirmacao").modal('show');
													
												}
												
											}else if(valores[0] == "API"){
												
												var dados = valores[1].split(",");
												var extra = valores[2].split(",");
												
												document.forms[0].identificadorCep.value = dados[5];
												
												if(dados[1] != null && dados[1] != ''){
													var nRua = dados[1]; 
													document.forms[0].numeroRua.value = nRua.trim();;
												}
					    	            		document.forms[0].bairro.value = dados[2];
					    	            		document.forms[0].cidade.value = dados[3];
					    	            		document.forms[0].enderecoUf.value = dados[4];
					    	            		document.forms[0].endereco.value = dados[0];
					    	            		document.forms[0].alunoBairroIdentificador.value = extra[0];
					    	            		document.forms[0].alunoBairroMunicipioId.value = extra[1];
					    	            		document.forms[0].complemento.value = extra[2];
					    	            		document.forms[0].longitude.value = '';
					    	            		document.forms[0].latitude.value = '';
					    	            		mostraEndEncontrado();
					    	            	
												carregaAjaxPesquisarGeoApi('https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?singleLine='+valores[1]+'&maxLocations=1&f=pjson&outFields=*&searchExtent=-38.9739990234375,-13.30718994140625,-37.86163330078125,-12.35687255859375');
												
												
											}else if(valores[0] == "OK"){
												
												var dados = valores[1].split(",");
												
												document.forms[0].identificadorCep.value = dados[0];
												
												if(dados[1] != null && dados[1] != ''){
													var nRua = dados[1]; 
													document.forms[0].numeroRua.value = nRua.trim();;
												}
					    	            		document.forms[0].bairro.value = dados[4];
					    	            		document.forms[0].cidade.value = dados[5];
					    	            		document.forms[0].enderecoUf.value = dados[6];
					    	            		document.forms[0].endereco.value = dados[7];
					    	            		document.forms[0].alunoBairroIdentificador.value = dados[8];
					    	            		document.forms[0].alunoBairroMunicipioId.value = dados[9];
					    	            		document.forms[0].complemento.value = dados[10];
					    	            		document.forms[0].longitude.value = dados[2];;
					    	            		document.forms[0].latitude.value = dados[3];
					    	            		mostraEndEncontrado();
											}
										      
										}else{
											limparEndereco();
											msgCampoForm('numeroInteresse','Favor preencher o campo acima!');
											msgCampoForm('cepInteresse','Favor preencher o campo acima!');
											someEndEncontrado();
										}
										loadingStop();
                                 },
            error: function(data){
            						loadingStop();
            						limparEndereco();
            						someEndEncontrado();
            						alertMessage('Ocorreu um erro no sistema, por favor tente novamente! Caso o problema persista, favor entrar em contato com o suporte!');
                                 }
    });
}

// ajax que chama a api geo e preenche a latitude e longitude
function carregaAjaxPesquisarGeoApi(url){
	
		 $.ajax({
            type: "GET",
            url: url,
            success: function(data){
            	
            	if(data != null && data != "" && data != "null"){
            		
            		retornarLoginSemSecaoAjax(data);
            		var retorno = JSON.parse(data);
            		
            		if(retorno["candidates"][0]["score"] >= 96){
            			
            			var cepApi = retorno["candidates"][0]["attributes"].Postal.replace(" ","").substring(0,5);
            			var cepMais = document.forms[0].identificadorCep.value.replace(" ","").substring(0,5);
            			
            			if(cepApi != cepMais){
            				
            				limparEndereco();
            				someEndEncontrado();
            				$("#modalConfirmacao").modal('show');
            			}
            			
	            		document.forms[0].longitude.value = retorno["candidates"][0]["location"].x;
	            		document.forms[0].latitude.value = retorno["candidates"][0]["location"].y;
	            		
            		}else{
            			
            			limparEndereco();
        				someEndEncontrado();
        				$("#modalConfirmacao").modal('show');
            		}
	            	
            	}else{
            		
            		alertMessage("Não foi encontrado endereço pra esse CEP e número!");
            		
            	}	
            	loadingStop();
            },	  
            cache:false,
            error: function(XMLHttpRequest, textStatus, errorThrown){
            	console.log("Status: " + textStatus); 
            	console.log("Error: " + errorThrown);
            	limparEndereco();
            	loadingStop();
            	someEndEncontrado();
				$("#modalConfirmacao").modal('show');
				
            }
    	});
	    
	}
function ajaxRecusa(form, url){
	
    $.ajax({
            type: "GET",
            url: url,
            data: $("#"+form).serialize(),
            success: function(data){

            							retornarLoginSemSecaoAjax(data);	
            	
										if(data != ""){
										
											var dados = data;
											var valores = dados.split(";");
											     
											if(valores[0] == "ERRO"){
												alertMessage(valores[1]);
												
												
											}else{
											
												alertMessage('Inscrição recusada com sucesso!');												
					                            
												
											}    
										}
										
										loadingStop();
                                 },
            error: function(data){
            						loadingStop();
            						alertMessage('Ocorreu um erro no sistema, por favor tente novamente! Caso o problema persista, favor entrar em contato com o suporte!');
                                 }
    });
}


function carregaDocAndShowValidar(form, url){
	
    $.ajax({
            type: "GET",
            url: url,
            data: $("#"+form).serialize(),
            success: function(data){

            							retornarLoginSemSecaoAjax(data);	
            	
										if(data != ""){
											
											var fiframe = document.getElementById("iframeShowDocumento");
											fiframe.src =  'servlet/exibicaoDocumento';
											$("#modalValidacao").modal("show");
										      
										}else{
											
											alertMessage('Não foi incluído nenhum arquivo!');
										}
										loadingStop();
                                 },
            error: function(data){
            						loadingStop();
            						
            						alertMessage('Ocorreu um erro no sistema, por favor tente novamente! Caso o problema persista, favor entrar em contato com o suporte!');
                                 }
    });
}