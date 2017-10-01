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
    var randColor = Math.floor(Math.random() * BG_COLORS.length);
    panels[i].style.backgroundColor = BG_COLORS[randColor];
    BG_COLORS.splice(randColor, 1); // Remove the color so it isn't used anymore
}

updateProgressBar(); // Update the progress bar initially

document.addEventListener("keydown",function(e){  
      switch(e.key){
        case "ArrowUp":
            showPreviousPanel();
            break;
        case "ArrowDown":
            showNextPanel();
            break;
        case "ArrowLeft": 
            showPreviousPanel();
            break;
        case "ArrowRight":
            showNextPanel();
            break;
    }
})

document.addEventListener("wheel", (
    function throttle(e) {
        handleMoveEvent(e.deltaY);
    }
));

var yDown = null;                                                        
document.addEventListener('touchstart', (
    function handleTouchStart(e) {  
        yDown = e.touches[0].clientY;
    }
));       

document.addEventListener('touchmove', (
    function handleTouchMove(e) {
        if (! yDown ) {
            return;
        }
        handleMoveEvent(yDown-e.touches[0].clientY);
        yDown = null;                                                                                      
    }
));        

var lastCallTime = 0;
var lastPanelChangeTime = 0;
function handleMoveEvent(deltaY)
{
    var currentTime = Date.now();
    // Prevent sliding more than one panel in 500ms or if continuous scrolls have occured
    if (currentTime - lastPanelChangeTime <= 500 || currentTime - lastCallTime <= 50) {
        lastCallTime = currentTime;
        return;
    }
    lastCallTime = currentTime;
    lastPanelChangeTime = currentTime;
    
    if (deltaY <= 0) {
        showPreviousPanel();
    } else {
        showNextPanel();
    }
}

function showNextPanel() {
    if (currentPanel < panels.length - 1) {
        currentPanel++;
        var panel = panels[currentPanel];
        panel.className = "panel center";
        updateProgressBar();
    }
}

function showPreviousPanel() {
    if (currentPanel > 0) {
        var panel = panels[currentPanel];
        panel.className = "panel " + initialPanelPositions[currentPanel];
        currentPanel--;
        updateProgressBar();
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

function updateProgressBar() {
    var progressBar = document.querySelector("#progress-bar");
    progressBar.style.width = ((currentPanel + 1) / panels.length * 100) + "%";
}