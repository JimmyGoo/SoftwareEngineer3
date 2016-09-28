/*exported cellGridInit*/
var cellGrid = new Array;
var lastCellGrid = new Array;
var cellWidth = 10;
var cellHeight = 10;

function cellGridInit(numX, numY)
{
	cellGrid = new Array(numX);
	/*randomize grid*/
	var i = 0, j = 0;
	for(i = 0; i < numX; i++)
	{
		cellGrid[i] = new Array(numY);
		for(j = 0; j < numY; j++)
		{
			if(Math.random() < 0.5)
			{
				cellGrid[i][j] = 0;//dead
			}			
			else
			{
				cellGrid[i][j] = 1;//alive
			}
		}
	}

	cellGrid.cellGridWidth = numX * cellWidth;
	cellGrid.cellGridHeight = numY * cellHeight;

	cellGrid.cellNumX = numX;
	cellGrid.cellNumY = numY;

	cellGrid.draw = function(){
		var currentX = 0, currentY = 0;
		var ctx_render = document.getElementById("game_canvas").getContext("2d");

		for(currentX = 0; currentX <= this.cellGridWidth; currentX += cellWidth)
		{
			ctx_render.beginPath();  
			ctx_render.moveTo(currentX, 0);  
			ctx_render.lineTo(currentX, this.cellGridHeight);  
			// 将这条线绘制到 canvas 上  
			ctx_render.stroke();
		} 

		for(currentY = 0; currentY <= this.cellGridHeight; currentY += cellHeight)
		{
			ctx_render.beginPath();  
			ctx_render.moveTo(0, currentY);  
			ctx_render.lineTo(this.cellGridWidth, currentY);  
			// 将这条线绘制到 canvas 上  
			ctx_render.stroke();
		}
	};

	lastCellGrid = new Array(numX);
	for(i = 0; i < numX; i++)
	{ 
		lastCellGrid[i] = new Array(numY);
		for(j = 0; j < numY; j++)
		{
			lastCellGrid[i][j] = cellGrid[i][j];
		}
	}

	lastCellGrid.cellNumX = numX;
	lastCellGrid.cellNumY = numY;
}
