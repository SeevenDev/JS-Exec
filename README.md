JS-Exec
=======

Chrome extension that allows to inject JavaScript code into any webpage.
You also can write your own JavaScript application and make use of the JavaScript and jQuery calculus power.

How to use
==========

Installing
----------

I plan to put this extension (for free, of course) on the Chrome Web Store anytime soon. I will then post the link to easily download and install it here.

But if you want to test the extension now, you just have to download the `js-exec` folder and to load it as an *unpacked extension* on Chrome.

Running scripts
---------------

There are two ways to execute a script with JS-Exec :

* You can write a Quick Script directly from the popup window of the extension.
* Or you can write and save your script from the options page of the extension.

_**/!\** Your script will only run if your current Chrome tab is **not** a Chrome-specific page (like the Chrome Parameters or any extension options page for instance). This limitation can't be bypassed as Chrome refuses to execute any extension when on this kind of specific page._

Keywords
========

`//:load:`
----------

The `//:load:` keyword is meant to be placed at a point of your script where you expect the page to load/reload/navigate.

Basically, your script will be cut in pieces at these points and each piece of your script will b executed when the page reloads. That's why, at the moment, this keyword **cannot** be used in a function, `for` loop or `if` statement.

*I am searching for another way to manage page loadings. I am open to any suggestion.*

Examples
========

You can find some example scripts in the `examples` folder :

* An example of a **simple script** that you can write in seconds to modifiy a web page or to automate actions : 
  * `simple_autopoke.js` : This script will simply reply to every pokes you receive on your Facebook/pokes page.

* A more **advanced script** to show the possibilities of web page modification :
  * `autopoke.js` : This script will create a "POKE" button to start/stop auto-poking and a Poke Log.

* A quick, simple **application** using the JavaScript and jQuery calculus power :
  * `rot_code.js` : This application is a simple implementation of the famous ROT-n code.

To try an example, simply copy & paste the code into the Quick Script popup, or save it as a new script from the options page.
