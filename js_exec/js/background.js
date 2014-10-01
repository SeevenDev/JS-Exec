
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