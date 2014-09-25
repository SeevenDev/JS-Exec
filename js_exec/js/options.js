$(document).ready(function()
{
	// ======================================================================
	// === REMPLISSAGE DE #listScripts
	// ======================================================================

	if (!!localStorage['user_scripts']) {
		$.each(localStorage['user_scripts'], function(name, code) {
			$('#sidebar > ul#scripts').append('<li><a id="link-'+name+'">'+name+'</a></li>');
		});
	}

	// ======================================================================
	// === Enregistrement d'un script
	// ======================================================================

	$('#addScript #saveScript').click(function() {
		var user_scripts = !!localStorage['user_scripts'] ? localStorage['user_scripts']
		var nom = $('#addScript input[name=nom-script]').val();
		var code = $('#addScript textarea[name=script]').val();
		localStorage['user_scripts'][nom] = code;
		location.reload();
		$('#addScript #etat').html('Script enregistré.');
	});
});
