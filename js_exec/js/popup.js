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

	function inject(script, tabID) {
		// Inject jQuery :
		chrome.tabs.executeScript(tabID, {file: 'js/jquery-1.11.1.min.js'});
		// Inject the script after 0.5 sec :
		setTimeout(function() {
			chrome.tabs.executeScript(tabID, {code: script});
		}, 500);
	}

	function executeScript(code_) {
		// === On active tab ===
		chrome.tabs.query({active: true, lastFocusedWindow: true}, function(selectedTab) {
			// --- Splits the code at the ":load:" keywords ---
			var blocks = code_.split('//:load:\n');
			console.log(blocks);

			// --- For the first block of code (no page change expected) ---
			inject(blocks[0], selectedTab[0].id);

			// --- For each page load ---
			var block_index = 1;
			chrome.tabs.onUpdated.addListener(function(tabID, changeInfo, tab) {
				if (changeInfo.status === 'complete' // load is complete
					&& tabID == selectedTab[0].id) // it's the same page the script was started from
				{
					// Inject the next block of code :
					inject(blocks[block_index], selectedTab[0].id);
					block_index++;
				}
			});

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
			executeScript(code);
		});
	});

	// ======================================================================
	// === "SCRIPT RAPIDE"
	// ======================================================================

	// === Exécution du script rapide ===
	$('form#quick-script').submit(function(e) {
		e.preventDefault();
		var code = $('form#quick-script textarea[name=quick-script]').val();
		executeScript(code);
	});

});
