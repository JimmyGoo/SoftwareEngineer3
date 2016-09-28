/* global cellGridInit */
/* global gameEngine */
/* global cellWidth */
/* global cellHeight */

function gameInit()
{
	cellGridInit(gameEngine.currentCellNumX, gameEngine.currentCellNumY);

	var newCanvas = document.createElement("canvas");
	newCanvas.setAttribute("id","game_canvas");
	newCanvas.width = gameEngine.currentCellNumX * cellWidth;
	newCanvas.height = gameEngine.currentCellNumY * cellHeight;
	document.body.appendChild(newCanvas);

	var colorButtonDiv = document.createElement("div")
	colorButtonDiv.setAttribute("id","cDiv");
	var colorButton = document.createElement("button");
	colorButton.setAttribute("id", "cButton");
	colorButton.innerHTML = "color:black";
	colorButton.setAttribute("type","button");
	colorButton.onclick = function(){
		if(this.innerHTML == "color:black")
		{
			this.innerHTML = "color:random";
		}
		else{
			this.innerHTML = "color:black";
		}
	};
	colorButtonDiv.appendChild(colorButton);
	document.body.appendChild(colorButtonDiv);

	var runStopButton = document.createElement("button");
	runStopButton.setAttribute("type","button");
	runStopButton.setAttribute("id","rsButton");
	runStopButton.setAttribute("value","1");
	runStopButton.innerHTML = "stop";
	runStopButton.onclick = function(){
		if(this.innerHTML == "stop")
		{
			gameEngine.stop();
			this.innerHTML = "start";
		}
		else if(this.innerHTML == "start")
		{
			gameEngine.run();
			this.innerHTML = "stop";
		}
	};
	document.body.appendChild(runStopButton);

	var restartButton = document.createElement("button");
	restartButton.setAttribute("id", "reButton");
	restartButton.innerHTML = "restart";
	restartButton.setAttribute("type","button");
	restartButton.onclick = function(){
		restart();
	};
	document.body.appendChild(restartButton);

	var cellNumXControllerLabel = document.createElement("p");
	cellNumXControllerLabel.innerHTML = "NumOfCellOnX: " + gameEngine.currentCellNumX;
	cellNumXControllerLabel.setAttribute("id","cellNumXLabel");
	document.body.appendChild(cellNumXControllerLabel);

	var cellNumXController = document.createElement("input");
	cellNumXController.setAttribute("id","cellNumX");
	cellNumXController.setAttribute("type","range");
	cellNumXController.setAttribute("min","10");
	cellNumXController.setAttribute("max", "80");
	cellNumXController.setAttribute("value",gameEngine.currentCellNumX + "");
	cellNumXController.setAttribute("step","10");
	cellNumXController.oninput = function(){
		document.getElementById("cellNumXLabel").innerHTML = "NumOfCellOnX: " + this.value + "(won't change before clicking restart)";
		gameEngine.currentCellNumX = parseInt(this.value);
	};
	document.body.appendChild(cellNumXController);

	var cellNumYControllerLabel = document.createElement("p");
	cellNumYControllerLabel.innerHTML = "NumOfCellOnY: " + gameEngine.currentCellNumY;
	cellNumYControllerLabel.setAttribute("id","cellNumYLabel");
	document.body.appendChild(cellNumYControllerLabel);

	var cellNumYController = document.createElement("input");
	cellNumYController.setAttribute("id","cellNumY");
	cellNumYController.setAttribute("type","range");
	cellNumYController.setAttribute("min","10");
	cellNumYController.setAttribute("max","80");
	cellNumYController.setAttribute("value",gameEngine.currentCellNumY + "");
	cellNumYController.setAttribute("step","10");
	cellNumYController.oninput = function(){
		document.getElementById("cellNumYLabel").innerHTML = "NumOfCellOnY: " + this.value + "(won't change before clicking restart)";
		gameEngine.currentCellNumY = parseInt(this.value);
	};
	document.body.appendChild(cellNumYController);

	var speedControllerLabel = document.createElement("p");
	speedControllerLabel.innerHTML = "speed: 100ms";
	speedControllerLabel.setAttribute("id","speedLabel");
	document.body.appendChild(speedControllerLabel);

	var speedController = document.createElement("input");
	speedController.setAttribute("id","speed");
	speedController.setAttribute("type","range");
	speedController.setAttribute("min","30");
	speedController.setAttribute("max","500");
	speedController.setAttribute("value","100");
	speedController.setAttribute("step","4.7");
	speedController.oninput = function(){
		if(document.getElementById("rsButton").innerHTML == "stop")
		{
			gameEngine.stop();
			gameEngine.run(parseInt(this.value));
		}
		document.getElementById("speedLabel").innerHTML = "speed: " + this.value + "ms";
	};
	document.body.appendChild(speedController);
}

function restart()
{
	document.body.removeChild(document.getElementById("game_canvas"));
	document.body.removeChild(document.getElementById("rsButton"));
	document.body.removeChild(document.getElementById("reButton"));
	document.body.removeChild(document.getElementById("cDiv"));
	document.body.removeChild(document.getElementById("cellNumXLabel"));
	document.body.removeChild(document.getElementById("cellNumX"));
	document.body.removeChild(document.getElementById("cellNumYLabel"));
	document.body.removeChild(document.getElementById("cellNumY"));
	document.body.removeChild(document.getElementById("speedLabel"));
	document.body.removeChild(document.getElementById("speed"));
	gameEngine.stop();
	gameInit(gameEngine.currentCellNumX,gameEngine.currentCellNumY);
	gameEngine.run();
}