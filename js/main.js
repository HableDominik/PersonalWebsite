var old = document.getElementById("old");
var terminal = document.getElementById("terminal");
var textarea = document.getElementById("text-area");
var current = document.getElementById("current");
var inputtext = document.getElementById("input-text");

var git = 0;
var inputtexts = [];

setTimeout(function() {
  textarea.focus();
}, 100);

window.addEventListener("keyup", enterKey);

//init
textarea.value = "";
inputtext.innerHTML = textarea.value;

function enterKey(e) {
    if (e.keyCode == 13) {
        inputtexts.push(inputtext.innerHTML);
        git = inputtexts.length;
        addLine("visitor@dominikhable.com:~$ " + inputtext.innerHTML, "no-animation", 0);
        inputtexter(inputtext.innerHTML.toLowerCase());
        inputtext.innerHTML = "";
        textarea.value = "";
    }
    if (e.keyCode == 38 && git != 0) {
        git -= 1;
        textarea.value = inputtexts[git];
        inputtext.innerHTML = textarea.value;
    }
    if (e.keyCode == 40 && git != inputtexts.length) {
        git += 1;
        if (inputtexts[git] === undefined) {
        textarea.value = "";
        } else {
        textarea.value = inputtexts[git];
        }
        inputtext.innerHTML = textarea.value;
    }
  
}

function inputtexter(cmd) {
  switch (cmd.toLowerCase()) {
    case "help":
      loopLines(help, "color2 margin", 80);
      break;
    case "clear":
      setTimeout(function() {
        terminal.innerHTML = '<a id="old"></a>';
        old = document.getElementById("old");
      }, 1);
      break;
    default:

      addLine("'" + cmd + "' is not recognized as an internal or external command.", "error", 100);
      addLine("For a list of commands, type 'help'", "error", 100);
      addLine("<br/>", "error", 100);
      break;
  }
}

function newTab(link) {
  setTimeout(function() {
    window.open(link, "_blank");
  }, 500);
}

function addLine(text, style, time) {
  var t = "";
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
      t += "&nbsp;&nbsp;";
      i++;
    } else {
      t += text.charAt(i);
    }
  }
  setTimeout(function() {
    var next = document.createElement("p");
    next.innerHTML = t;
    next.className = style;

    old.parentNode.insertBefore(next, old);

    window.scrollTo(0, document.body.offsetHeight);
  }, time);
}

function loopLines(name, style, time) {
  name.forEach(function(item, index) {
    addLine(item, style, index * time);
  });
}
