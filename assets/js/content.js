$(document).ready(function() {
  generateRandomContent();
});

function generateRandomContent() {
  // Random generator;
  var rand = randInt(4);
  if (rand == 0) {
    getHymn();
  } else if (rand == 1) {
    getVerse();
  } else if (rand == 2) {
    getRadio();
  } else {
    getActivity();
  }
}

function getHymn() {
  $("#title")
    .after($("<h3></h3>")
    .text("Enjoy a hymn!"));
}

function getVerse() {
  $("#title")
    .after($("<h3></h3>")
    .text("Try praying and reading over this verse."));
}

function getRadio() {
  $("#title")
    .after($("<h3></h3>")
    .text("Listen to a radio broadcast of a message instead.")
    .attr("id", "instructions"));
  books = JSON.parse(localStorage["bible_books"]);
  book = books[randInt(books.length)];
  radio_query = "http://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20html%20WHERE%20url%3D%22http%3A%2F%2Fwww.lsmradio.com%2Faudio%2Fgenesis.html%22%20and%20xpath%3D%22%2F%2Fa%22&format=json&diagnostics=true"
  mp3s = [];
  $.getJSON(radio_query, function(data) {
    for (var i = 0; i < data.query.results.a.length; i++) {
      if (endsWith(data.query.results.a[i].href, '.mp3')) {
        mp3s.push(data.query.results.a[i].href);
      }
    }
    mp3 = mp3s[randInt(mp3s.length)];
    $("#instructions")
      .after($("<audio controls></audio>")
      .attr("id", "audio"));
    $("#audio")
      .append($("<source></source>")
      .attr({src: mp3, id: "radio"}));
    $("audio")
      .after($("<p></p>")
      .text("Radio Broadcast on " + formatBook(book) + " from ")
      .attr({style: "font-style:italic; float: right", id: "credit"}));
    $("#credit")
      .append($("<a></a>")
      .text("LSM")
      .attr("href", localStorage["radio"]));
  });
}

function getActivity() {
  $("#title")
    .after($("<h3></h3>")
    .text("How about calling on the name of the Lord?"));
  $("h3")
    .after($("<p></p>")
    .text("In my distress I called upon the Lord, and cried unto my God: he heard my voice out of his temple, and my cry came before him, even into his ears.")
    .attr({style: "font-style:italic", id: "verse"}));
  $("#verse")
    .after($("<p></p>")
    .text("Psalm 18:6, KJV")
    .attr("style", "float: right"));
}

function randInt(max) {
  return Math.floor(Math.random() * max);
}

function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function formatBook(string) {
  if (string.indexOf("samuel") > 0) {
    return string.charAt(0) + " Samuel";
  } else if (string.indexOf("minor") > 0) {
    return "Minor Prophets";
  } else if (string.indexOf("corinthians") > 0) {
    return string.charAt(0) + " Corinthians";
  } else if (string.indexOf("kings") > 0) {
    return string.charAt(0) + " Kings";
  } else if (string.indexOf("thesselonians") > 0) {
    return "1 and 2 Thesselonians";
  } else if (string.indexOf("timothy") > 0) {
    return "1 and 2 Timothy";
  } else if (string.indexOf("peter") > 0) {
    return "1 and 2 Peter";
  } else if (string.indexOf("john") > 0) {
    return "1, 2 and 3 John";
  }
  return capitalizeFirstLetter(removeNumbers(string));
}

function capitalizeFirstLetter(string)
{
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function removeNumbers(string) {
  return string.replace(/[0-9]/g, '');
}