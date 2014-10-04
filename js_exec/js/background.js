
function inject(script, tabID) {

	// Isolate the user's script in an IEF :
	var wrapped_script = "(function() {"+
		"var user_data = "+JSON.stringify(window.user_data)+";"+
		"var chrome = undefined;"+ // removes access to Chrome API
		script + // the user's script
		"return user_data;"+
	"})();";

	// Inject jQuery :
	chrome.tabs.executeScript(tabID, {file: 'js/jquery-1.11.1.min.js'}, function() {
		// Inject the JS Exec custom API :
		chrome.tabs.executeScript(tabID, {file: 'js/api.js'}, function() {
			// Inject the user's script :
			chrome.tabs.executeScript(tabID, {code: wrapped_script}, function(result) {
				window.user_data = result[0];
			});
		});
	});
}

function executeScript(code_) {

	window.user_data = {jse_info: 'HEY :D'};

	// === On active tab ===
	chrome.tabs.query({active: true, lastFocusedWindow: true}, function(selectedTab) {
		// --- Splits the code at the "//:load:" keywords ---
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