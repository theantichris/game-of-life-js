const dead = 0;
const alive = 1;

// Any live cell with fewer than two live neighbors dies (underpopulated)
function isUnderpopulated(liveNeighborCount) {
	return liveNeighborCount < 2;
}

// Any live cell with more than three live neighbors dies (overpopulation)
function isOverpopulated(liveNeighborCount) {
	return liveNeighborCount > 3;
}

// Any live cell with two or three live neighbors lives on to the next generation
function canLiveOn(liveNeighborCount) {
	return liveNeighborCount === 2 || liveNeighborCount === 3;
}

// Any dead cell with exactly three live neighbors becomes a live cell (reproduction)
function canReproduce(liveNeighborCount) {
	return liveNeighborCount === 3;
}

function initNextGeneration(currentGeneration) {
	let rowCount = currentGeneration.length;
	let colCount = currentGeneration[0].length;

	let nextGeneration = [];
	for (let i = 0; i < rowCount; i++) {
		nextGeneration[i] = [];

		for (let j = 0; j < colCount; j++) {
			nextGeneration[i][j] = dead;
		}
	}

	return nextGeneration;
}

function checkTopNeighbor(row, col, currentGeneration) {
  let x = row - 1;
  let y = col;

	if (x >= 0) {
		return currentGeneration[x][y];
  }
  
  return 0;
}

function checkUpperLeftNeighbor(row, col, currentGeneration){
  let x = row - 1;
  let y = col - 1;
  
	if (x >= 0 && y >= 0) {
		return currentGeneration[x][y];
  }
  
  return 0
}

function checkUpperRightNeighbor(row, col, colCount, currentGeneration){
  let x = row - 1;
  let y = col + 1;
  
	if (x >= 0 && y < colCount) {
		return currentGeneration[x][y];
  }
  
  return 0;
}

function checkLeftNeighbor(row, col, currentGeneration){
  let x = row;
  let y = col - 1;
  
	if (y >= 0) {
		return currentGeneration[x][y];
  }
  
  return 0
}

function checkRightNeighbor(row, col, colCount, currentGeneration){
  let x = row;
  let y = col + 1;
  
	if (y < colCount) {
		return currentGeneration[x][y];
  }
  
  return 0
}

function checkBottomLeftNeighbor(row, col, rowCount, currentGeneration) {
  let x = row + 1;
  let y = col - 1;
  
	if (x < rowCount && y >= 0) {
		return currentGeneration[x][y];
  }
  
  return 0;
}

function checkBottomRightNeighbor(row, col, rowCount, colCount, currentGeneration){
  let x = row + 1;
  let y = col + 1;
  
	if (x < rowCount && y < colCount) {
		return currentGeneration[x][y];
  }
  
  return 0
}

function checkBottomNeighbor(row, col, rowCount, currentGeneration){
  let x = row + 1;
  let y = col;
  
	if (x + 1 < rowCount) {
		return currentGeneration[x][y];
  }
  
  return 0;
}

function countLiveNeighbors(row, col, currentGeneration) {
	let rowCount = currentGeneration.length;
	let colCount = currentGeneration[0].length;

	row = Number(row);
	col = Number(col);

	let liveNeighborCount = 0;
	liveNeighborCount += checkTopNeighbor(row, col, currentGeneration);
	liveNeighborCount += checkUpperLeftNeighbor(row, col, currentGeneration);
  liveNeighborCount += checkUpperRightNeighbor(row, col, colCount, currentGeneration);
  liveNeighborCount += checkLeftNeighbor(row, col, currentGeneration);
	liveNeighborCount += checkRightNeighbor(row, col, colCount, currentGeneration);
	liveNeighborCount += checkBottomLeftNeighbor(row, col, rowCount, currentGeneration);
	liveNeighborCount += checkBottomRightNeighbor(row, col, rowCount, colCount, currentGeneration);
	liveNeighborCount += checkBottomNeighbor(row, col, rowCount, currentGeneration);

	return liveNeighborCount;
}

export function run(currentGeneration) {
	let nextGeneration = initNextGeneration(currentGeneration);

	for (let row in currentGeneration) {
		for (let col in currentGeneration[row]) {
			let liveNeighborCount = countLiveNeighbors(row, col, currentGeneration);

			switch (currentGeneration[row][col]) {
				case alive:
					if (isUnderpopulated(liveNeighborCount)) {
						nextGeneration[row][col] = dead;
						continue;
					}
					
					if (isOverpopulated(liveNeighborCount)) {
						nextGeneration[row][col] = dead;
						continue;
					}
					
					if (canLiveOn(liveNeighborCount)) {
						nextGeneration[row][col] = alive;
						continue;
					}

					break;
				default:
					if (canReproduce(liveNeighborCount)) {
						nextGeneration[row][col] = alive;
					}
			}
		}
	}

	return nextGeneration;
}
