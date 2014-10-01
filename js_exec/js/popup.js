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
	$('form#choose-script').submit(function(e) {
		e.preventDefault();
		// --- Nom ---
		var nom = $('#choose-script select[name=choose-script]').val();
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
	// ======================================================================

	// === Exécution du script rapide ===
	$('form#quick-script').submit(function(e) {
		e.preventDefault();
		var code = $('form#quick-script textarea[name=quick-script]').val();
		chrome.runtime.getBackgroundPage(function(wind) {
			wind.executeScript(code);
		});
	});

});
