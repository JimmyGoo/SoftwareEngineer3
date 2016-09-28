describe("cellGrid",function(){
	it("it should be an array", function(){
		assert.isArray(cellGrid);
	});

	describe("cellGridInit", function(){
		it("it should be a function",function(){
			assert.isFunction(cellGridInit);
		});
		it("should have 2 arguments", function(){
			assert.equal(cellGridInit.length, 2);
		});
		it("should create the grid with size corresponding to the input", function(){
			cellGridInit(2,2);		
			assert.equal(cellGrid.length, 2);
			if(cellGrid.length > 0)
			{
				assert.equal(cellGrid[0].length, 2);
			}
		});
	});

	describe("draw", function(){
		it("it should be a function",function(){
			assert.isFunction(cellGrid.draw);
		});
		it("it should have no arguments",function(){
			assert.equal(cellGrid.draw.length, 0);
		});
	});
});

describe("lastCellGrid",function(){
	it("it should be an array", function(){
		assert.isArray(lastCellGrid);
	});

	it("should be same as cellGrid after init", function(){
		cellGridInit(2,2);
		for(var i = 0; i < 2; i++)
		{
			for(var j = 0; j < 2; j++)
			{
				assert.equal(cellGrid[i][j], lastCellGrid[i][j]);
			}
		}
	});

	it("should record the previous value of cellGrid after being updated", function(){
		cellGridInit(5,5);
		var storeValue = new Array(5);
		var i, j;
		for(i = 0; i < 5; i++)
		{
			storeValue[i] = new Array(5);
			for(j = 0; j < 5; j++)
			{
				storeValue[i][j] = cellGrid[i][j];
			}
		}
		gameEngine.determineStateForBlock(1,1);

		for(i = 0; i < 5; i++)
		{
			for(j = 0; j < 5; j++)
			{
				assert.equal(storeValue[i][j],lastCellGrid[i][j]);
			}
		}
	});
});

describe("gameInit",function(){
	it("it should be a function",function(){
		assert.isFunction(gameInit);
	});
	it("should not have arguments", function(){
		assert.equal(gameInit.length, 0);
	});
});

describe("restart",function(){
	it("it should be a function",function(){
		assert.isFunction(restart);
	});
	it("should not have arguments", function(){
		assert.equal(restart.length, 0);
	});
});

describe("gameEngine",function(){
	it("it should be an object", function(){
		assert.isObject(gameEngine);
	});

	describe("renderAll",function(){
		it("should be a function", function(){
			assert.isFunction(gameEngine.renderAll);
		});

		it("it should have no arguments",function(){
			assert.equal(gameEngine.renderAll.length, 0);
		});
	});

	describe("determineStateForBlock",function(){
		it("should be a function", function(){
			assert.isFunction(gameEngine.determineStateForBlock);
		});

		it("it should have 2 arguments",function(){
			assert.equal(gameEngine.determineStateForBlock.length, 2);
		});

		it("work well when given a 3*3 example",function(){
			var i,j;

			cellGridInit(3,3);
			cellGrid = [[1,1,0],[0,1,0],[0,0,1]];

			var expectGrid = new Array(3);
			for(i = 0; i < 3; i++)
			{
				expectGrid[i] = new Array(3);
			}
			expectGrid = cellGrid;

			for(i = 0; i < 3; i++)
			{
				for(j = 0; j < 3; j++)
				{
					gameEngine.determineStateForBlock(i,j);
				}
			}

			for(i = 0; i < 3; i++)
			{
				for(j = 0; j < 3; j++)
				{
					assert.equal(cellGrid[i][j], expectGrid[i][j]);
				}
			}
		})
	});

	describe("run",function(){
		it("should be a function", function(){
			assert.isFunction(gameEngine.run);
		});

		it("it should have no arguments",function(){
			assert.equal(gameEngine.run.length, 0);
		});

		it("should not have an existing interval", function(){
			assert.isTrue(gameEngine.interval == 0 || gameEngine.interval == undefined);
		});

		it("should start the interval",function(){
			cellGridInit(2,2);
			gameEngine.run();
			assert.isFalse(gameEngine.interval == 0);
		})
	});
	
	describe("stop",function(){
		it("should be a function", function(){
			assert.isFunction(gameEngine.stop);
		});

		it("it should have no arguments",function(){
			assert.equal(gameEngine.stop.length, 0);
		});
	});

	describe("tick",function(){
		it("should be a function", function(){
			assert.isFunction(gameEngine.tick);
		});

		it("it should have 1 argument",function(){
			assert.equal(gameEngine.tick.length, 1);
		});
	});
});