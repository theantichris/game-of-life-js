import * as rules from './rules.js'

const dead = 0;
const alive = 1;

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

function checkTopLeftNeighbor(row, col, currentGeneration){
  let x = row - 1;
  let y = col - 1;
  
	if (x >= 0 && y >= 0) {
		return currentGeneration[x][y];
  }
  
  return dead
}

function checkTopNeighbor(row, col, currentGeneration) {
  let x = row - 1;
  let y = col;

	if (x >= 0) {
		return currentGeneration[x][y];
  }
  
  return dead;
}

function checkTopRightNeighbor(row, col, colCount, currentGeneration){
  let x = row - 1;
  let y = col + 1;
  
	if (x >= 0 && y < colCount) {
		return currentGeneration[x][y];
  }
  
  return dead;
}

function checkLeftNeighbor(row, col, currentGeneration){
  let x = row;
  let y = col - 1;
  
	if (y >= 0) {
		return currentGeneration[x][y];
  }
  
  return dead
}

function checkRightNeighbor(row, col, colCount, currentGeneration){
  let x = row;
  let y = col + 1;
  
	if (y < colCount) {
		return currentGeneration[x][y];
  }
  
  return dead
}

function checkBottomLeftNeighbor(row, col, rowCount, currentGeneration) {
  let x = row + 1;
  let y = col - 1;
  
	if (x < rowCount && y >= 0) {
		return currentGeneration[x][y];
  }
  
  return dead;
}

function checkBottomNeighbor(row, col, rowCount, currentGeneration){
  let x = row + 1;
  let y = col;
  
	if (x + 1 < rowCount) {
		return currentGeneration[x][y];
  }
  
  return dead;
}

function checkBottomRightNeighbor(row, col, rowCount, colCount, currentGeneration){
  let x = row + 1;
  let y = col + 1;
  
	if (x < rowCount && y < colCount) {
		return currentGeneration[x][y];
  }
  
  return dead
}

function countLiveNeighbors(row, col, currentGeneration) {
	let rowCount = currentGeneration.length;
	let colCount = currentGeneration[0].length;

	row = Number(row);
	col = Number(col);

	let liveNeighborCount = 0;
	liveNeighborCount += checkTopLeftNeighbor(row, col, currentGeneration);
	liveNeighborCount += checkTopNeighbor(row, col, currentGeneration);
  liveNeighborCount += checkTopRightNeighbor(row, col, colCount, currentGeneration);
  liveNeighborCount += checkLeftNeighbor(row, col, currentGeneration);
	liveNeighborCount += checkRightNeighbor(row, col, colCount, currentGeneration);
	liveNeighborCount += checkBottomLeftNeighbor(row, col, rowCount, currentGeneration);
	liveNeighborCount += checkBottomNeighbor(row, col, rowCount, currentGeneration);
	liveNeighborCount += checkBottomRightNeighbor(row, col, rowCount, colCount, currentGeneration);

	return liveNeighborCount;
}

export function run(currentGeneration) {
	let nextGeneration = initNextGeneration(currentGeneration);

	for (let row in currentGeneration) {
		for (let col in currentGeneration[row]) {
			let liveNeighborCount = countLiveNeighbors(row, col, currentGeneration);

			switch (currentGeneration[row][col]) {
				case alive:
					if (rules.isUnderpopulated(liveNeighborCount)) {
						nextGeneration[row][col] = dead;
						continue;
					}
					
					if (rules.isOverpopulated(liveNeighborCount)) {
						nextGeneration[row][col] = dead;
						continue;
					}
					
					if (rules.canLiveOn(liveNeighborCount)) {
						nextGeneration[row][col] = alive;
						continue;
					}

					break;
				default:
					if (rules.canReproduce(liveNeighborCount)) {
						nextGeneration[row][col] = alive;
					}
			}
		}
	}

	return nextGeneration;
}
