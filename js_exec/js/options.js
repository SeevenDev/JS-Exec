$(document).ready(function()
{
	// ======================================================================
	// === LIBRARY (TODO: refactor with popup.js)
	// ======================================================================

	function doSomethingWithScripts(doSomething, callback) {
		chrome.storage.local.get('user_scripts', function(user_scripts) {
			var scripts = user_scripts.user_scripts;

			// === Si aucun script déjà enregistré : création de l'objet JavaScript ===
			if (!scripts) {
				scripts = {};
			}

			// === Do something ===
			doSomething(scripts);

			// === Sauvegarde l'objet user_scripts ===
			chrome.storage.local.set({'user_scripts': scripts}, callback);
		});
	}

	function saveScript(name, code, callback) {
		doSomethingWithScripts(function(scripts) {
			scripts[name] = code;
		}, callback);
	}

	function deleteScript(name, callback) {
		if (! confirm("Supprimer le script " + name + " ?"))
			return;

		doSomethingWithScripts(function(scripts) {
			delete scripts[name];
		}, callback);
	}

	function refresh_selectListScripts() {
		chrome.storage.local.get('user_scripts', function(user_scripts) {
			var scripts_array = user_scripts.user_scripts;
			if (!!scripts_array) {
				$.each(scripts_array, function(name, code) {
					$('select[name=listScripts]').append('<option value="'+name+'">'+name+'</option>');
				});
			}
		});
	}

	function print_selectedScript(src_name, dest_code) {
		chrome.storage.local.get('user_scripts', function(user_scripts) {
			var scripts_array = user_scripts.user_scripts;

			var nom = src_name.val();
			var code = scripts_array[nom];
			dest_code.val(code);
		});
	}

	// ======================================================================
	// === "AJOUTER UN SCRIPT"
	// ======================================================================

	$('form#addScript').submit(function(e) {
		var nom = $('#addScript input[name=nom-script]').val();
		var code = $('#addScript textarea[name=script]').val();
		saveScript(nom, code);
	});

	// ======================================================================
	// === "SCRIPTS ENREGISTRÉS"
	// ======================================================================

	// === Remplissage du select 'listScripts' ===
	refresh_selectListScripts();

	// === Affichage dans 'viewScript' du code du script sélectionné dans le select ===
	print_selectedScript($('select[name=listScripts]'), $('textarea[name=viewScript]'));

	$('select[name=listScripts]').change(function() {
		print_selectedScript($('select[name=listScripts]'), $('textarea[name=viewScript]'));
	});

	// === Enregistrer les modifications du script ===

	$('form#listScripts').submit(function(e) {
		e.preventDefault();
	});

	$('#saveScript-button').click(function(e) {
		var nom = $('#listScripts select[name=listScripts]').val();
		var code = $('#listScripts textarea[name=viewScript]').val();
		saveScript(nom, code, function() {
			document.location.pathname = "options.html";
		});
	});

	// === Supprimer un script ===

	$('#deleteScript-button').click(function(e) {
		var nom = $('#listScripts select[name=listScripts]').val();
		deleteScript(nom, function() {
			document.location.pathname = "options.html";
		});
	});

});
