var BG_COLORS = [ // All possible background colors for panels
    "#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e",
    "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50",
    "#f1c40f", "#e67e22", "#e74c3c",
    "#f39c12", "#d35400", "#c0392b"
];
var panels = document.querySelectorAll(".panel");
var initialPanelPositions = ["center"]; // The first panel will always be centered
var currentPanel = 0;

var previousDir;
var previousColor;

for (var i = 0; i < panels.length; i++) {
    if (i !== 0) {
        // Position each subsequent panel around the first one in a random location
        var randDir;
        do {
            randDir = Math.floor(Math.random() * 4);
        } while (randDir === previousDir);
        previousDir = randDir;

        var pos;
        switch (randDir) {
            case 0:
                pos = "right";
                break;
            case 1:
                pos = "left";
                break;
            case 2:
                pos = "top";
                break;
            case 3:
                pos = "bottom";
                break;
        }
        initialPanelPositions[i] = pos;
        panels[i].className = "panel " + pos;
    } else {
        panels[i].className = "panel " + initialPanelPositions[0];
    }

    // Pick a random background color for each panel
    var randColor;
    do {
       randColor = Math.floor(Math.random() * BG_COLORS.length);
    } while (randColor === previousColor);
    previousColor = randColor;

    panels[i].style.backgroundColor = BG_COLORS[randColor];
}

document.addEventListener("wheel", (function throttle() {
    var lastCallTime = 0;
    var lastPanelChangeTime = 0;

    return function (e) {
        var currentTime = Date.now();
        // Prevent sliding more than one panel in 500ms or if continuous scrolls have occured
        if (currentTime - lastPanelChangeTime <= 500 || currentTime - lastCallTime <= 50) {
            lastCallTime = currentTime;
            return;
        }
        lastCallTime = currentTime;
        lastPanelChangeTime = currentTime;
        
        if (e.deltaY <= 0) {
            showPreviousPanel();
        } else {
            showNextPanel();
        }
    }
})());

var topBtnElements = document.querySelectorAll(".goToTop");
for (var i = 0; i < topBtnElements.length; i++) {
    topBtnElements[i].addEventListener("click", function(e) {
        goToPanel(0);
    });
}

function showNextPanel() {
    if (currentPanel < panels.length - 1) {
        currentPanel++;
        var panel = panels[currentPanel];
        panel.className = "panel center";
    }
}

function showPreviousPanel() {
    if (currentPanel > 0) {
        var panel = panels[currentPanel];
        panel.className = "panel " + initialPanelPositions[currentPanel];
        currentPanel--;
    }
}

function goToPanel(panelIndex) {
    if (panelIndex >= 0 && panelIndex < panels.length) {
        var nextPanel = panelIndex < currentPanel ? showPreviousPanel : showNextPanel;
        while (currentPanel !== panelIndex) {
            nextPanel();
        }
    }
}