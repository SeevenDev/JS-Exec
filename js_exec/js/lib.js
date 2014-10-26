
// ======================================================================
// === Ace Editors (http://ace.c9.io/#nav=howto)
// ======================================================================

function init_ace_editor(editor_id) {
	var editor = ace.edit(editor_id);
	editor.getSession().setMode("ace/mode/javascript");

	// === Get Ace Editors settings ===
	chrome.storage.local.get('ace-settings', function(ace_settings) {
		var settings = ace_settings["ace-settings"] || {};
		console.log(settings);

		// === Create new editor with these settings ===
		var theme = settings["ace-theme"] ? "ace/theme/"+settings["ace-theme"] : "ace/theme/twilight"
		editor.setTheme(theme);
		$(".ace-editor").css("font-size", settings["ace-font-size"]+"px" || "12px");
		editor.getSession().setTabSize(parseInt(settings["ace-tab-size"]) || 4);
		editor.getSession().setUseSoftTabs(settings["ace-soft-tabs"] === "true" || true);
		editor.getSession().setUseWrapMode(settings["ace-word-wrapping"] === "true" || true);
		editor.setHighlightActiveLine(settings["ace-line-highlighting"] === "true" || true);
		editor.setShowPrintMargin(settings["ace-print-margin"] === "true" || false);
	});

	// === Add custom commands (TODO) ===
	// ...
}
