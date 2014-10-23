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
					$('select[name=scripts-list]').append('<option value="'+name+'">'+name+'</option>');
				});
			}
		});
	}

	function print_selectedScript(src_name, dest_code) {
		chrome.storage.local.get('user_scripts', function(user_scripts) {
			var scripts_array = user_scripts.user_scripts;

			var nom = src_name.val();
			var code = scripts_array[nom];
			dest_code.setValue(code);
		});
	}

	// ======================================================================
	// === "ADD A SCRIPT"
	// ======================================================================

	// === Ace Editor ===
	var add_script_editor = ace.edit("add-script-editor");
	add_script_editor.setTheme("ace/theme/twilight");
	add_script_editor.getSession().setMode("ace/mode/javascript");

	// === Button ===
	$('#add-script-button').click(function(e) {
		var name = $('input[name=add-script-name]').val();
		var code = add_script_editor.getValue();
		saveScript(name, code, function() {
			document.location.pathname = "options.html";
		});
	});

	// ======================================================================
	// === "MY SCRIPTS"
	// ======================================================================

	// === Ace Editor ===
	var script_editor = ace.edit("script-editor");
	script_editor.setTheme("ace/theme/twilight");
	script_editor.getSession().setMode("ace/mode/javascript");

	// === Filling the 'scripts-list' select ===
	refresh_selectListScripts();

	// === Printing the selected script in the Ace Editor ===
	print_selectedScript($('select[name=scripts-list]'), script_editor);
	$('select[name=scripts-list]').change(function() {
		print_selectedScript($('select[name=scripts-list]'), script_editor);
	});

	// === Save changes to the script ====
	$('#save-script-button').click(function(e) {
		var nom = $('select[name=scripts-list]').val();
		var code = script_editor.getValue();
		saveScript(nom, code, function() {
			document.location.pathname = "options.html";
		});
	});

	// === Delete the script ===
	$('#delete-script-button').click(function(e) {
		var nom = $('select[name=scripts-list]').val();
		deleteScript(nom, function() {
			document.location.pathname = "options.html";
		});
	});

});
