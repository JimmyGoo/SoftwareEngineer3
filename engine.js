/* global cellGrid */
/* global lastCellGrid */
/* global cellWidth */
/* global cellHeight */

var gameEngine = new Object;
var realThis;
gameEngine.renderAll = function(){
	//draw line 
	var i = 0, j = 0;
	var ctx = document.getElementById("game_canvas").getContext("2d");
	for(i = 0; i < cellGrid.cellNumX; i++)
	{
		for(j = 0; j < cellGrid.cellNumY; j++)
		{
			if(cellGrid[i][j] == 1)
			{
				if(document.getElementById("cButton").innerHTML == "color:black")
				{
					ctx.fillStyle = "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6);
					if(ctx.fillStyle == "#FFFFFF")
					{
						ctx.fillStyle = "#0F0F0F";
					}
				}
				else
				{
					ctx.fillStyle = "#0F0F0F";
				}
			}
			else
			{
				ctx.fillStyle = "#FFFFFF";
			}
			ctx.fillRect(i * cellWidth, j * cellHeight, (i + 1) * cellWidth, (j + 1) * cellHeight);
		}
	}
};

gameEngine.determineStateForBlock = function(gridIndexX, gridIndexY){
	var count = 0;
	var offsetXIndex = -1;
	var offsetYIndex = -1;
	var tempIndexX, tempIndexY;
	for(offsetXIndex = -1; offsetXIndex < 2; offsetXIndex++)
	{
		for(offsetYIndex = -1; offsetYIndex < 2; offsetYIndex++)
		{
			if(offsetXIndex == 0 && offsetYIndex == 0)
			{
				continue;
			}

			tempIndexX = gridIndexX + offsetXIndex;
			if(tempIndexX < 0)
			{
				tempIndexX = lastCellGrid.cellNumX - 1;
			}
			else if(tempIndexX >= lastCellGrid.cellNumX)
			{
				tempIndexX -= lastCellGrid.cellNumX;
			}

			tempIndexY = gridIndexY + offsetYIndex;
			if(tempIndexY < 0)
			{
				tempIndexY = lastCellGrid.cellNumY - 1;
			}
			else if(tempIndexY >= lastCellGrid.cellNumY)
			{
				tempIndexY -= lastCellGrid.cellNumY;
			}

			if(lastCellGrid[tempIndexX][tempIndexY] == 1)
			{
				count++;
			}
		}		
	}


	if(count == 3)
	{
		cellGrid[gridIndexX][gridIndexY] = 1;		
	}
	else if(count != 2)
	{
		cellGrid[gridIndexX][gridIndexY] = 0;
	}
};

gameEngine.run = function(){
	realThis = this;
	var rate = 100;
	if(parseInt(document.getElementById("speed").value))
	{
		rate = parseInt(document.getElementById("speed").value);
	}

	realThis.runInterval = setInterval(function(){
		realThis.tick(realThis);
	}, rate);
};

gameEngine.stop = function(){
	clearInterval(this.runInterval);
};

gameEngine.tick = function(realThis){
	var i = 0, j = 0;
	for(i = 0; i < cellGrid.cellNumX; i++)
	{
		for(j = 0; j < cellGrid.cellNumY; j++)
		{
			realThis.determineStateForBlock(i,j);
		}
	}
	realThis.renderAll();
	cellGrid.draw();
	for(i = 0; i < lastCellGrid.cellNumX; i++)
	{
		for(j = 0; j < lastCellGrid.cellNumY; j++)
		{
			lastCellGrid[i][j] = cellGrid[i][j];
		}		
	}
};