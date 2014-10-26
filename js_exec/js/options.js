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
		if (! confirm("Delete \""+ name +"\" ?"))
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
	// === MENU
	// ======================================================================

    $("#sidebar ul li a").click(function() {
        $(".active").removeClass("active");
        $("#"+$(this).attr("data-js-nav")).addClass("active");
    });

	// ======================================================================
	// === "ADD A SCRIPT"
	// ======================================================================

	// === Ace Editor ===
	var add_script_editor = ace.edit("add-script-editor");
	init_ace_editor("add-script-editor");

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

	var ace_changeEvent_lastAction = "";

	// === Ace Editor ===
	var script_editor = ace.edit("script-editor");
	init_ace_editor("script-editor");

	// === Filling the 'scripts-list' select ===
	refresh_selectListScripts();

	// === Printing the selected script in the Ace Editor ===
	print_selectedScript($('select[name=scripts-list]'), script_editor);
	$('select[name=scripts-list]').change(function() {
		print_selectedScript($('select[name=scripts-list]'), script_editor);
	});

	// === Detect change to the script (not ready) ===
	// script_editor.getSession().on('change', function(e) {
	// 	if (e.action === "insertText" && ace_changeEvent_lastAction != "removeLines") {
	// 		$('#scripts-info').html("Unsaved changes...");
	// 	}
	// 	ace_changeEvent_lastAction = e.action;
	// });

	// === Save changes to the script ====
	$('#save-script-button').click(function(e) {
		var nom = $('select[name=scripts-list]').val();
		var code = script_editor.getValue();
		saveScript(nom, code, function() {
			// $('#scripts-info').html("Script saved!");
		});
	});

	// === Delete the script ===
	$('#delete-script-button').click(function(e) {
		var nom = $('select[name=scripts-list]').val();
		deleteScript(nom, function() {
			document.location.pathname = "options.html";
			$('.active').removeClass('active');
			$('#scripts').addClass('active');
		});
	});

    // ======================================================================
	// === "OPTIONS" (TODO : refresh page to see changes ?)
	// ======================================================================

    function pref_init(name, input_type) {
    	// Just get the defined settings :
        chrome.storage.local.get('ace-settings', function(ace_settings) {
            var param = ace_settings['ace-settings'][name];
            // And apply it to the input :
            if (param) {
            	input_type = input_type || 'input';
            	if (input_type === "radio")
            		$("input[name="+name+"][value="+param+"]")[0].checked = true;
            	else
                	$(input_type+"[name="+name+"]").val(param);
            }
        });
    }
    function setPref_onChange(name, element_value) {
    	// === Get the ace-settings object ===
        $(element_value).change(function(e) {
        	var $elem = $(this);
    		chrome.storage.local.get('ace-settings', function(ace_settings) {
    			var settings = ace_settings['ace-settings'] || {};
    			// --- Set the setting ---
            	settings[name] = $elem.val();
            	chrome.storage.local.set({'ace-settings': settings}, function() {});
    			console.log(settings);
        	});
        });
    }

    // === Ace Editors (http://ace.c9.io/#nav=howto) ===

    // --- Theme ---
    pref_init('ace-theme', "select");
    setPref_onChange('ace-theme', $("select[name=ace-theme]"));

    // --- Font size ---
    pref_init('ace-font-size');
    setPref_onChange('ace-font-size', $("input[name=ace-font-size]"));

    // --- Tab size ---
    pref_init('ace-tab-size');
    setPref_onChange('ace-tab-size', $("input[name=ace-tab-size]"));

    // --- Use soft tabs ---
    pref_init('ace-soft-tabs', "radio");
    setPref_onChange('ace-soft-tabs', $("input[name=ace-soft-tabs]"));

    // --- Word wrapping ---
    pref_init('ace-word-wrapping', "radio");
    setPref_onChange('ace-word-wrapping', $("input[name=ace-word-wrapping]"));

    // --- Current line highlighting ---
    pref_init('ace-line-highlighting', "radio");
    setPref_onChange('ace-line-highlighting', $("input[name=ace-line-highlighting]"));

    // --- Display print margin ---
    pref_init('ace-print-margin', "radio");
    setPref_onChange('ace-print-margin', $("input[name=ace-print-margin]"));
});
