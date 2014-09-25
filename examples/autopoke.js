// === Boucle à l'infini (vérifie toutes les 5 secondes) ===
setInterval(function() {

    // === Poke tous les poke reçus ===
    $('div[id^=poke_live]').find('a.selected').each(function(index, a) {
        a.click();
    });

}, 5000);