$(document).ready(function()
{
	// ======================================================================
	// === LIBRARY (TODO: refactor with options.js)
	// ======================================================================

	function refresh_chooseScript() {
		chrome.storage.local.get('user_scripts', function(user_scripts) {
			var scripts_array = user_scripts.user_scripts;
			if (!!scripts_array) {
				$.each(scripts_array, function(name, code) {
					$('select[name=choose-script]').append('<option value="'+name+'">'+name+'.js</option>');
				});
			}
		});
	}

	// ======================================================================
	// === "CHOISIR UN SCRIPT"
	// ======================================================================

	// === Remplissage du select 'choose-script' ===
	refresh_chooseScript();

	// === Exécution du script choisi ===
	$('#choose-script-button').click(function(e) {
		// --- Nom ---
		var nom = $('select[name=choose-script]').val();
		// --- Code ---
		chrome.storage.local.get('user_scripts', function(user_scripts) {
			var scripts_array = user_scripts.user_scripts;
			var code = scripts_array[nom];
			chrome.runtime.getBackgroundPage(function(wind) {
				wind.executeScript(code);
			});
		});
	});

	// ======================================================================
	// === "SCRIPT RAPIDE"
	// === (TODO : sauvegarder le script rapide automatiquement (quelles conditions ?))
	// ======================================================================

	// === Ace Editor ===
	var ace_editor = ace.edit("quick-script-editor");
	ace_editor.setTheme("ace/theme/twilight");
	ace_editor.getSession().setMode("ace/mode/javascript");

	// === Chargement de l'éventuel dernier script rapide utilisé ===
	chrome.storage.local.get('user_quick_script', function(code) {
		if (code.user_quick_script) {
			ace_editor.setValue(code.user_quick_script);
		}
	});

	// === Exécution du script rapide ===
	$('#quick-script-button').click(function(e) {
		// --- Sauvegarde du code ---
		var code = ace_editor.getValue();
		chrome.storage.local.set({'user_quick_script': code}, function() {
			console.log(code);
		});

		// --- Execution du script ---
		chrome.runtime.getBackgroundPage(function(wind) {
			wind.executeScript(code);
		});
	});

});
