/**
 * Example of a more advanced script.
 * JS-Exec : https://github.com/SeevenDev/JS-Exec
 */

// ================================================================================================
// == BOUTON MARCHE/ARRÊT DU SCRIPT
// ================================================================================================

var bouton = document.createElement('div');
bouton.setAttribute('id', 'autopoke-button');
$('body').append(bouton);
$(bouton).append('<span></span>');

// === Style ===
$(bouton).css('position', 'fixed').css('bottom', '5px').css('left', '5px')
    .css('padding', '5px').css('border-radius', '5px')
    .css('background-color', '#3B579D').css('color', 'white')
    .css('cursor', 'pointer');

$(bouton).hover(function(e) {
    $(this).children('span').css('opacity', e.type == 'mouseenter' ? '0.7' : '1');
});

$(bouton).children('span').html('POKE !');

$(bouton).click(toggleAutopoke);

// ================================================================================================
// == AUTOPOKE
// ================================================================================================

var autopoking = false;
var logExists = false;
var intervalID;

function toggleAutopoke() {

    autopoking = !autopoking;

    // === Mise à jour du texte du bouton marche/arrêt ===
    $(bouton).children('span').html(autopoking ? 'STOP !' : 'POKE !');

    // === Création du log s'il n'existe pas ===
    if (!logExists) createLog();

    // === Lancement/Arrêt de l'autopoke ===
    if (autopoking) intervalID = autopoke(5000);
    else clearInterval(intervalID);
}

function createLog() {
    // === Création du log ===
    $('#contentArea > div > div:nth-child(1)')
        .after( '<div id="autopoke-log" class="_4-u2 _xct">'
                +'<h2 class="uiHeaderTitle _50f5 _50f7">Autopokes</h2>'
                +'<ul></ul></div>');

    $('#autopoke-log').css('height', '100px')
        .css('overflow-y', 'auto').css('overflow-x', 'hidden');

    logExists = true;
}
function logPoke(name) {
    // === Heure du repoke ===
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();
    var timeString = h+'h'+m+'m'+s+'s';

    $('#autopoke-log > ul').append('<li>Poke renvoyé à '+name+' à '+timeString+'.</li>');

    // === Scrollbar en bas ===
    $('#autopoke-log').animate({ scrollTop: $('#autopoke-log').height() }, "slow");
}

function autopoke(interval) {
    // === Vérifie les nouveaux pokes toutes les 'interval' millisecondes ===
    return setInterval(function() {
        $('div[id^=poke_live]').find('a.selected').each(function(index, a) {
            // --- Nom du destinataire du poke ---
            var destinataire = $(a).parent().parent().parent().children('div:nth-child(2)').find('a').text();
            // --- Envoi du poke ---
            a.click();
            // --- Message dans le log ---
            logPoke(destinataire);
        });
    }, interval);
}