//core data
let gridDimension = { // draw surface in pixels
    x: document.getElementById("draw").getBoundingClientRect().width,
    y: document.getElementById("draw").getBoundingClientRect().height
};
let mouseCoord = {
    x: 0,
    y: 0
};
let gridSize = { // map dimension in tiles
    x: 56,
    y: 30
};
let multiplier = { // pixel per tile
    x: gridDimension.x / gridSize.x,
    y: gridDimension.y / gridSize.y
};

//assets folder
let assetSource = "./resources/";

//svg include
let xmlns = "http://www.w3.org/2000/svg";


//next building id to be placed
let buildingIDCounter = 0;
//placed buildings position by ID
let mapGrid = makeArray(gridSize.x, gridSize.y, null);
for (let i = 0; i < 8; i++) {
    mapGrid[i + 24][0] = -1;
}
//placed buildings list
let buildingList = [];
//selecting mode (default) - 0 | placing mode - 1
let mode = 0;
//currently selected buildings group and name
let currentGroupName = null;
let currentBuildingName = null;

//data for hovering while in build mode
let lastDrawmID = null;
let lastHoverCell = null;
let mouseDown = false;
let lastPlacedCoord = null;
let lastPlacedDirection = 0;
let isRotate = false;
//init operation calls
drawGrid();
drawFeatures();

document.onkeydown = function buttonPressed(e) {
    if (e.key == "r") {
        if (lastDrawmID != null) {
            let building = game_data["buildings"][currentGroupName][currentBuildingName];

            if (building.wallmounted) {
                return;
            }   

            isRotate = !isRotate;
            let object = document.getElementById('b-' + lastDrawmID);

            if (isRotate) {
                object.setAttributeNS(null, 'transform', 'rotate(90),scale(1, -1)');
            } else {
                object.setAttributeNS(null, 'transform', 'rotate(0),scale(1, 1)');
            }
        }
    }
}

document.getElementById("draw").onmousemove = function gridSelector(e) {
    let coord = getCoord(e);
    if (lastHoverCell == null || lastHoverCell.x != coord.x || lastHoverCell.y != coord.y) {
        lastHoverCell = coord;
        if (currentBuildingName != null) {
            let building = game_data["buildings"][currentGroupName][currentBuildingName];
            if (lastDrawmID != null) {
                if (isStillInGrid(building, coord)) {
                    let object = document.getElementById('b-' + lastDrawmID);
                    object.setAttributeNS(null, "x", coord.x * multiplier.x);
                    object.setAttributeNS(null, "y", coord.y * multiplier.y);
                } else {
                    despawnHoover();
                }
            } else {
                if (isStillInGrid(building, coord)) {
                    drawImage(coord.x * multiplier.x, coord.y * multiplier.y, building.x * multiplier.x, building.y * multiplier.y, assetSource + building.asset, buildingIDCounter);
                    lastDrawmID = buildingIDCounter;
                }
            }

        }
        if (mouseDown && e.ctrlKey) {
            if (e.shiftKey && lastPlacedCoord != null) {
                let building = game_data["buildings"][currentGroupName][currentBuildingName];
                if (lastPlacedDirection != 0) {
                    if (lastPlacedDirection == 1) {
                        if (coord.x == lastPlacedCoord.x && (coord.y == lastPlacedCoord.y + building.y || coord.y == lastPlacedCoord.y - building.y)) {
                            placeBuilding(e);
                        }
                    } else {
                        if (coord.y == lastPlacedCoord.y && (coord.x == lastPlacedCoord.x + building.x || coord.x == lastPlacedCoord.x - building.x)) {
                            placeBuilding(e);
                        }
                    }
                } else {
                    if (coord.x == lastPlacedCoord.x && (coord.y == lastPlacedCoord.y + building.y || coord.y == lastPlacedCoord.y - building.y)) {
                        placeBuilding(e);
                        lastPlacedDirection = 1;
                    } else if (coord.y == lastPlacedCoord.y && (coord.x == lastPlacedCoord.x + building.x || coord.x == lastPlacedCoord.x - building.x)) {
                        placeBuilding(e);
                        lastPlacedDirection = 2;
                    }
                }

            } else {
                placeBuilding(e);
            }
        } else {
            mouseDown = false;
            lastPlacedDirection = 0;
            lastPlacedCoord = null;
        }
    }

}
document.getElementById("draw").onmousedown = placeBuilding;



function placeBuilding(e) {
    if (mode == 1) {
        mouseDown = true;
        let building = game_data["buildings"][currentGroupName][currentBuildingName];
        let coord = getCoord(e);
        if (isStillInGrid(building, coord)) {
            let isClear = false;
            if (isRotate) {
                isClear = checkIfAreaClear(coord, building.y, building.x);
            } else {
                isClear = checkIfAreaClear(coord, building.x, building.y);
            }
            if (isClear) {
                addBuilding(coord, building, buildingIDCounter);
                lastPlacedCoord = coord;
                buildingIDCounter++;
                lastDrawmID = null;
                if (!e.ctrlKey) {
                    lastPlacedCoord = null;
                    currentBuildingName = null;
                    lastPlacedDirection = 0;
                    mode = 0;
                }
            }
        }
    }
}

document.getElementById("draw").onmouseup = function () {
    mouseDown = false;
}

document.getElementById("draw").onmouseleave = despawnHoover;



function getCoord(e) {
    let draw = document.getElementById("draw");
    let rect = draw.getBoundingClientRect();
    let mouseX = e.clientX - rect.left; //x position within the element.
    let mouseY = e.clientY - rect.top; //y position within the element.
    let coordX = Math.floor(mouseX / multiplier.x);
    let coordY = Math.floor(mouseY / multiplier.y);
    if (coordX > gridSize.x - 1) {
        coordX = gridSize.x - 1;
    }
    if (coordX < 0) {
        coordX = 0;
    }
    if (coordY >= gridSize.y - 1) {
        coordY = gridSize.y - 1;
    }
    if (coordY < 0) {
        coordY = 0;
    }
    return ({
        x: coordX,
        y: coordY
    });
}

function drawGrid() {
    let draw = document.getElementById("draw");
    for (let i = 1; i < gridSize.x; i++) {
        let line = document.createElementNS(xmlns, "line");
        line.setAttributeNS(null, "x1", i * multiplier.x);
        line.setAttributeNS(null, "y1", 0);
        line.setAttributeNS(null, "x2", i * multiplier.x);
        line.setAttributeNS(null, "y2", gridDimension.y);
        line.setAttributeNS(null, "style", "stroke:rgb(220,220,220);stroke-width:1");
        draw.appendChild(line);
    }
    for (let i = 1; i < gridSize.y; i++) {
        let line = document.createElementNS(xmlns, "line");
        line.setAttributeNS(null, "x1", 0);
        line.setAttributeNS(null, "y1", i * multiplier.y);
        line.setAttributeNS(null, "x2", gridDimension.x);
        line.setAttributeNS(null, "y2", i * multiplier.y);
        line.setAttributeNS(null, "style", "stroke:rgb(220,220,220);stroke-width:1");
        draw.appendChild(line);
    }
}

function drawFeatures() {
    //doors
    let style = "fill:rgb(255,233,0);";
    drawRect(0, 4 * multiplier.y, 1 * multiplier.x, 1 * multiplier.y, style);
    drawRect(0, 13 * multiplier.y, 1 * multiplier.x, 1 * multiplier.y, style);
    drawRect(0, 16 * multiplier.y, 1 * multiplier.x, 1 * multiplier.y, style);
    drawRect(0, 25 * multiplier.y, 1 * multiplier.x, 1 * multiplier.y, style);
    drawRect(55 * multiplier.x, 4 * multiplier.y, 1 * multiplier.x, 1 * multiplier.y, style);
    drawRect(55 * multiplier.x, 13 * multiplier.y, 1 * multiplier.x, 1 * multiplier.y, style);
    drawRect(55 * multiplier.x, 16 * multiplier.y, 1 * multiplier.x, 1 * multiplier.y, style);
    drawRect(55 * multiplier.x, 25 * multiplier.y, 1 * multiplier.x, 1 * multiplier.y, style);

    //draw no wall zone
    style = "fill:rgb(178,34,34);";
    for (let i = 24; i < 24 + 8; i++) {
        drawRect(i * multiplier.x, 0, 1 * multiplier.x, 1 * multiplier.y, style);
    }
}

function drawRect(x, y, width, height, style) {
    let draw = document.getElementById("draw");
    let rect = document.createElementNS(xmlns, "rect");
    rect.setAttributeNS(null, "x", x);
    rect.setAttributeNS(null, "y", y);
    rect.setAttributeNS(null, "width", width);
    rect.setAttributeNS(null, "height", height);
    rect.setAttributeNS(null, "style", style);
    draw.appendChild(rect);
}

function drawImage(x, y, width, height, source=assetSource+"placeholder.png", id) {
    let draw = document.getElementById("draw");
    let img = document.createElementNS(xmlns, "image");
    img.setAttributeNS(null, "id", "b-" + id);
    img.setAttributeNS(null, "x", x);
    img.setAttributeNS(null, "y", y);
    img.setAttributeNS(null, "width", width);
    img.setAttributeNS(null, "height", height);
    img.setAttributeNS(null, "href", source);
    img.setAttributeNS(null, "preserveAspectRatio", "none");
    img.setAttributeNS(null, 'transform-origin', 'left, top');
    if (isRotate) {
        img.setAttributeNS(null, 'transform', 'rotate(90),scale(1, -1)');
    } else {
        img.setAttributeNS(null, 'transform', 'rotate(0),scale(1, 1)');
    }
    draw.appendChild(img);
}

function startPlacingBuilding(buildingID) {
    currentBuildingName = buildingID;
}

function buildingSelectorClick(group_id, id) {
    currentGroupName = group_id;
    currentBuildingName = id;
    mode = 1;
    isRotate = false;
}

function makeArray(h, w, val) {
    var arr = [];
    for (let i = 0; i < h; i++) {
        arr[i] = [];
        for (let j = 0; j < w; j++) {
            arr[i][j] = val;
        }
    }
    return arr;
}

function isStillInGrid(building, coord) {
    if (coord.x >= 0 && coord.y >= 0) {
        if (isRotate) {
            if ((building.y + coord.x) <= gridSize.x) {
                if ((building.x + coord.y) <= gridSize.y) {
                    return true;
                }
            }
        } else {
            if ((building.x + coord.x) <= gridSize.x) {
                if ((building.y + coord.y) <= gridSize.y) {
                    return true;
                }
            }
        }

    }
    return false;
}

function despawnHoover(e) {
    if (lastDrawmID != null) {
        let object = document.getElementById('b-' + lastDrawmID);
        object.remove();
        lastDrawmID = null;
    }
    lastHoverCell = null;
}

function addBuilding(coord, building, buildingID) {
    for (let i = 0; i < building.x; i++) {
        for (let j = 0; j < building.y; j++) {
            if (isRotate) {
                mapGrid[coord.x + j][coord.y + i] = buildingID;
            } else {
                mapGrid[coord.x + i][coord.y + j] = buildingID;
            }

        }
    }
    buildingList.push({
        "id": buildingID,
        "data": building
    });
}

function removeBuilding(buildingID) {
    for (let i = 0; i < building.x; i++) {
        for (let j = 0; j < building.y; j++) {
            if (mapGrid[i][j] == buildingID) {
                if (i >= 24 && i <= 31 && j == 0) {
                    mapGrid[i][j] = -1;
                } else {
                    mapGrid[i][j] = null;
                }

            }

        }
    }
    const pos = myArray.map(e => e.id).indexOf(buildingID);
    buildingList.splice(pos, 1);
}

function checkIfAreaClear(coord, x, y) {
    let building = game_data["buildings"][currentGroupName][currentBuildingName];
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            if (building.wallmounted) {
                if (mapGrid[coord.x + i][coord.y + j] != null) {
                    return false;
                }
            } else {
                if (mapGrid[coord.x + i][coord.y + j] != null && mapGrid[coord.x + i][coord.y + j] != -1) {
                    return false;
                }
            }

        }
    }
    return true;
}

function clearSelection() {
    despawnHoover();
    lastPlacedCoord = null;
    currentBuildingName = null;
    lastPlacedDirection = 0;
    mode = 0;
}