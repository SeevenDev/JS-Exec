$(document).ready(function()
{
	// ======================================================================
	// === LIBRARY (TODO: refactor with options.js)
	// ======================================================================

	function refresh_chooseScript() {
		chrome.storage.local.get('user_scripts', function(user_scripts) {
			var scripts = user_scripts.user_scripts;
			if (!!scripts) {
				$.each(scripts, function(name, code) {
					$('select[name=choose-script]').append('<option value="'+name+'">'+name+'</option>');
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
			var scripts = user_scripts.user_scripts;
			var code = scripts[nom];
			chrome.runtime.getBackgroundPage(function(wind) {
				wind.executeScript(code);
			});
		});
	});

	// ======================================================================
	// === "SCRIPT RAPIDE"
	// === (TODO : sauvegarder le script rapide automatiquement (quelles conditions ?))
	// ======================================================================

	function saveQuickScript() {
		var code = ace_editor.getValue();
		chrome.storage.local.set({'user_quick_script': code}, function() {
			console.log(code);
		});
		return code;
	}

	// === Ace Editor ===
	var ace_editor = ace.edit("quick-script-editor");
	init_ace_editor("quick-script-editor");

	// === Chargement de l'éventuel dernier script rapide utilisé ===
	chrome.storage.local.get('user_quick_script', function(code) {
		if (code.user_quick_script) {
			ace_editor.setValue(code.user_quick_script);
		}
	});

	// === Exécution du script rapide ===
	$('#quick-script-button').click(function(e) {
		// --- Sauvegarde du code ---
		var code = saveQuickScript();

		// --- Execution du script ---
		chrome.runtime.getBackgroundPage(function(wind) {
			wind.executeScript(code);
		});
	});

});
