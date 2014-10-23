/**
 * You can also write quick applications like this ROT-n script.
 * Such applications can use all the JavaScript and jQuery calculus power and you can run them wherever and whenever you want. They are also very easy to modify.
 * JS-Exec : https://github.com/SeevenDev/JS-Exec
 */

var str = prompt("Entrez la phrase à crypter"),
    rot = parseInt(prompt("Rotation de combien de caractère ?")),
    str_rot = "",
    len = str.length;

var str_charCode, str_rot_newChar;

for (var i = 0 ; i < len ; i++) {
	str_charCode = str.charCodeAt(i)
	// --- Majuscules ---
	if (65 <= str_charCode && str_charCode <= 90) {
		str_rot_newChar = String.fromCharCode( ((str_charCode - 65 + rot) % 26) + 65 );
	}

	// --- Minuscules ---
	else if (97 <= str_charCode && str_charCode <= 122) {
		str_rot_newChar = String.fromCharCode( ((str_charCode - 97 + rot) % 26) + 97 );
	}

	// --- Autre : pas de rotation ---
	else {
		str_rot_newChar = str.charAt(i);
	}

	str_rot += str_rot_newChar;
}

console.log(str +" (ROT"+ rot +") = "+ str_rot);
prompt("ROT"+ rot +" de \""+ str +"\" :", str_rot);