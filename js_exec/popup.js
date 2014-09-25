$(document).ready(function() 
{
	// ======================================================================
	// === INFOS POPUP
	// ======================================================================
	
	

	// ======================================================================
	// === BOUTONS POPUP
	// ======================================================================
	
	// --- Bouton "Run" ---
	$('#runScript').click(function() {
		localStorage['script'] = $('textarea[name=script]').val();
		chrome.tabs.query({active: true, lastFocusedWindow: true}, function(selectedTab) {
			chrome.tabs.executeScript(selectedTab[0].id, {file: 'jquery-1.11.1.min.js'});
			chrome.tabs.executeScript(selectedTab[0].id, {code: localStorage['script']});
		});
	});

});
