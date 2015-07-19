/* Extension using the JavaScript Speech API for text to speech */
/* Sayamindu Dasgupta <sayamindu@media.mit.edu>, April 2014 */

new(function() {
   var ext = this;

   /*function _get_voices() {
       var ret = [];
       var voices = speechSynthesis.getVoices();
       
       for(var i = 0; i < voices.length; i++ ) {
           ret.push(voices[i].name);
           console.log(voices.toString());
       }

       return ret;
   }

   ext.set_voice = function() {
   };*/

   ext.speak_text = function(text, callback) {
      var u = new SpeechSynthesisUtterance(text.toString());
      u.onend = function(event) {
         if (typeof callback == "function") callback();
      };

      speechSynthesis.speak(u);
   };

   ext.speak_text_in = function(text, lang, callback) {
      var u = new SpeechSynthesisUtterance(text.toString());
      u.lang = lang;
      u.onend = function(event) {
         if (typeof callback == "function") callback();
      };

      speechSynthesis.speak(u);
   };

   ext.translate_and_speak = function(text, lang, callback) {
      var u = new SpeechSynthesisUtterance(text.toString());
      u.lang = lang;
      u.onend = function(event) {
         if (typeof callback == "function") callback();
      };

      speechSynthesis.speak(u);
   };

   ext._shutdown = function() {};

   ext._getStatus = function() {
      if (window.SpeechSynthesisUtterance === undefined) {
         return {
            status: 1,
            msg: 'Your browser does not support text to speech. Try using Google Chrome or Safari.'
         };
      }
      return {
         status: 2,
         msg: 'Ready'
      };
   };

   var descriptor = {
      blocks: [
         //['', 'set voice to %m.voices', 'set_voice', ''],
         ['w', 'speak %s', 'speak_text', 'Hello!'],
         ['w', 'say %s in %m.lang', 'speak_text_in', 'Hello!'],
         ['w', 'translate %s from %m.lang to %m.lang', 'translate_and_speak', 'Hello!']
      ],
      menus: {
         lang: ['en-US', 'es-ES', 'fr-FR']
      }
   };

   ScratchExtensions.register('Text to Speech', descriptor, ext);
})();
