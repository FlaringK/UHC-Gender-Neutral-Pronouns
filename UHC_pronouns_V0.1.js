// == FlaringK's Universal Replacer == V0.1

// This module will replace all instances of a word with another, no matter the quirk.
// The wordList controls the replacements, the key is the word to be replaced, and the value is the word replacing
// i.e: "John":"Zoosmell", will replace all instances of "John" with "Zoosmell"

// Important notes:
// This module is a little slow, depending on how many replacements are in the word list
// This will only detect full words, and not parts of words.
// This will only effect Homestuck
// Words higher on the word list will be replaced before the others
// For those of you who know RegExp, The key is taken as a regex expression with \b tags around it (and thus can be made much more efficent if terms are replaced with the same string)

const wordList = {
  "he is":"they are",
  "he was":"they were",
  "he has":"they have",
  
  "his":"their",
  "he's":`They'<div style="display: inline-block; position: relative;"><div style=" position: absolute;">v</div>r</div>e`,
  "hes":`They<div style="display: inline-block; position: relative;"><div style=" position: absolute;">v</div>r</div>e`,
  "him":"them",
  "he":"they",

  "she is":"they are",
  "she was":"they were",
  "she has":"they have",
  
  "her's":"their",
  "hers":"their",
  "she's":`They'<div style="display: inline-block; position: relative;"><div style=" position: absolute;">v</div>r</div>e`,
  "shes":`They<div style="display: inline-block; position: relative;"><div style=" position: absolute;">v</div>r</div>e`,
  "her":"them",
  "she":"they",

  // Regex efficency
  "man\\b|\\bwoman\\b|\\blady\\b|\\bboy\\b|\\bgirl":"person",
  "men\\b|\\bwomen\\b|\\bladys\\b|\\bladies\\b|\\bboys\\b|\\bgirls":"people"
}


module.exports = {
  title: "Gender Neutral Pronouns", 
  author: "FlaringK (<a href='https://flaringk.github.io/Portfolio/'>Here's my uber cool site</a>)",
  modVersion: 0.1,

  summary: "Replace every pronoun with it's geneder neutral conterpart! (Warning! Slow to load)",
  description: "Replace every pronoun with it's geneder neutral conterpart! This will make some of the grammer incorrect, but this is just a bit of fun anyway. <b>This is pretty slow when loading the UHC, but it will return to normal speed once this has loaded</b> <br /><br /> Using FlaringK's Universal Replacer (V0.1)",

  

  // Replace text
  // Based of Seymour's "i have an erection." code, so this might be really inefficient, like, even more so
  edit(archive) {

    // For every page
    for (let i = 1901; i < 9999; i++) {
      const pageString = `00${i}`;

      // if the page exists (prevents certain errors)
      if (archive.mspa.story[pageString]) {

        let quirks = normalQuirks
        if (i > 1901 + 858) { quirks = quirks.concat(trollQuirks) }
        if (i > 1901 + 4143) { quirks = quirks.concat(otherQuirks) }
        if (i > 1901 + 4750) { quirks = quirks.concat(otherTrollQuirks) }

        // For each name with each qurik
        for (const [key, value] of Object.entries(wordList)) {

          quirks.forEach(qurikFunc => {

            const regExp = "\\b" + qurikFunc(key, true) + "\\b"
            const qurikedOgName = new RegExp(regExp, "g")
            const qurikedNewName = qurikFunc(value, false)

            archive.mspa.story[pageString].content = archive.mspa.story[pageString].content.replace(qurikedOgName, qurikedNewName)
            archive.mspa.story[pageString].title = archive.mspa.story[pageString].title.replace(qurikedOgName, qurikedNewName)

          })
        }

      }
    }
  }

}

const normalQuirks = [
  // Normals
  string => string.toUpperCase(),
  string => string.toLowerCase(),
  string => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase(),
]
const trollQuirks = [
  // == Trolls ==
  // Aradia
  string => string.toLowerCase().replace(/o/g, "0"),
  // Tavros
  string => string.charAt(0).toLowerCase() + string.slice(1).toUpperCase(),
  // Sollux
  string => string.toLowerCase().replace(/s/gi, "2").replace(/i/gi, "ii"),
  string => string.toUpperCase().replace(/s/gi, "2").replace(/i/gi, "ii"),
  // Nepeta
  string => string.toLowerCase().replace(/ee/g, "33"),
  // Kanaya
  string => string.toLowerCase().replace(/(^\w|\s\w)/g, m => m.toUpperCase()),
  // Terezi
  string => string.toUpperCase().replace(/A/gi, "4").replace(/I/gi, "1").replace(/E/gi, "3"),
  // Vriska (TODO: add random vowels -> 8)
  string => string.toLowerCase().replace(/b/gi, "8").replace(/ate/gi, "8").replace(/ait/gi, "8"),
  string => string.toUpperCase().replace(/b/gi, "8").replace(/ate/gi, "8").replace(/ait/gi, "8"),
  string => (string.charAt(0).toLowerCase() + string.slice(1).toUpperCase()).replace(/b/gi, "8").replace(/ate/gi, "8").replace(/ait/gi, "8"),
  // Equius
  string => string.toUpperCase().replace(/x/gi, "%").replace(/loo/gi, "100").replace(/ool/gi, "001"),
  string => string.toLowerCase().replace(/x/gi, "%").replace(/loo/gi, "100").replace(/ool/gi, "001"),
  string => (string.charAt(0).toLowerCase() + string.slice(1).toUpperCase()).replace(/x/gi, "%").replace(/loo/gi, "100").replace(/ool/gi, "001"),
  // Gamzee
  string => {
    var chars = string.toLowerCase().split("");
    for (var i = 0; i < chars.length; i += 2) {
      chars[i] = chars[i].toUpperCase();
    }
    return chars.join("");
  },
  string => {
    var chars = string.toUpperCase().split("");
    for (var i = 0; i < chars.length; i += 2) {
      chars[i] = chars[i].toLowerCase();
    }
    return chars.join("");
  },
  // Eridan
  string => string.toLowerCase().replace(/w/g, "ww").replace(/v/g, "vv").replace(/ing/gi, "in"),
  string => string.toUpperCase().replace(/W/g, "WW").replace(/V/g, "VV").replace(/ING/gi, "IN"),
  string => (string.charAt(0).toLowerCase() + string.slice(1).toUpperCase()).replace(/b/gi, "8").replace(/W/g, "WW").replace(/V/g, "VV").replace(/w/g, "ww").replace(/v/g, "vv").replace(/ing/gi, "in"),
  // Feferi
  (string, islook) => string.toLowerCase().replace(/h/gi, islook ? "\\)\\(" : ")("),
  (string, islook) => string.toUpperCase().replace(/h/gi, islook ? "\\)\\(" : ")(").replace(/E/g, islook ? "-+E" : "-E"),
  (string, islook) => (string.charAt(0).toLowerCase() + string.slice(1).toUpperCase()).replace(/h/gi,  islook ? "\\)\\(" : ")(").replace(/E/g, islook ? "-+E" : "-E"),
]
const otherTrollQuirks = [
  // == Other Trolls ==
  // Rufioh
  string => string.toLowerCase().replace(/i/gi, "1"),
  string => string.toUpperCase().replace(/i/gi, "1"),
  // Mituna
  string => string.toUpperCase().replace(/A/g, "4").replace(/B/g, "8").replace(/E/g, "3").replace(/I/g, "1").replace(/O/g, "0").replace(/S/g, "5").replace(/T/g, "7"),
  // Kankri
  string => string.toLowerCase().replace(/b/gi, "6").replace(/o/gi, "9"),
  string => string.toUpperCase().replace(/b/gi, "6").replace(/o/gi, "9"),
  string => (string.charAt(0).toLowerCase() + string.slice(1).toUpperCase()).replace(/b/gi, "6").replace(/o/gi, "9"),
  // Meulin
  string => string.toUpperCase().replace(/EE/g, "33"),
  // Porrim
  (string, islook) => string.toLowerCase().replace(/o/g, islook ? "o\\+" : "o+"),
  (string, islook) => (string.charAt(0).toLowerCase() + string.slice(1).toUpperCase()).replace(/o/g,  islook ? "o\\+" : "o+").replace(/O/g,  islook ? "O\\+" : "O+"),
  // Latula
  string => string.toLowerCase().replace(/A/gi, "4").replace(/I/gi, "1").replace(/E/gi, "3"),
  string => string.toUpperCase().replace(/A/gi, "4").replace(/I/gi, "1").replace(/E/gi, "3"),
  string => string.toLowerCase().replace(/A/gi, "4").replace(/I/gi, "1").replace(/E/gi, "3").replace(/s\b/g, "z"),
  string => string.toUpperCase().replace(/A/gi, "4").replace(/I/gi, "1").replace(/E/gi, "3").replace(/s\b/g, "z"),
  // Aranea
  string => string.toLowerCase().replace(/b/gi, "8"),
  string => string.toUpperCase().replace(/b/gi, "8"),
  string => (string.charAt(0).toLowerCase() + string.slice(1).toUpperCase()).replace(/b/gi, "8"),
  // Cronus
  string => string.toUpperCase().replace(/w/g, "vw").replace(/v/g, "wv"),
  string => string.toLowerCase().replace(/w/g, "vw").replace(/v/g, "wv").replace(/B/g, "8"),
  // Meenah
  string => string.toLowerCase().replace(/ing/gi, "in"),
  (string, islook) => string.toUpperCase().replace(/h/gi, islook ? "\\)\\(" : ")(").replace(/E/g, islook ? "-+E" : "-E").replace(/ing/gi, "IN"),
]
const otherQuirks = [
  // == Cherubs ==
  // Calliope
  string => string.toLowerCase().replace(/u/g, "U"),
  // Caliborn
  string => string.toUpperCase().replace(/U/g, "u"),

  // == Other entities ==
  // Tavrisprite
  string => string.toUpperCase().replace(/b/gi, "8").replace(/ate/gi, "8"),
  string => (string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()).replace(/b/gi, "8").replace(/ate/gi, "8"),
  // Erisolsprite
  string => string.toLowerCase().replace(/i/gi, "ii").replace(/v/gi, "vv").replace(/w/gi, "ww").replace(/s/gi, "2"),
  string => string.toUpperCase().replace(/i/gi, "II").replace(/v/gi, "VV").replace(/w/gi, "WW").replace(/s/gi, "2"),

]