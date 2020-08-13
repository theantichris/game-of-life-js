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
	let rows = currentGeneration.length;
	let cols = currentGeneration[0].length;

	let nextGeneration = [];
	for (let i = 0; i < rows; i++) {
		nextGeneration[i] = [];

		for (let j = 0; j < cols; j++) {
			nextGeneration[i][j] = dead;
		}
	}

	return nextGeneration;
}

function countLiveNeighbors(row, col, currentGeneration) {
	let rows = currentGeneration.length;
	let cols = currentGeneration[0].length;

	row = Number(row);
	col = Number(col);

	let liveNeighborCount = 0;
	let x = 0;
	let y = 0;

	// top neighbor
	x = row - 1;
	y = col;
	if (x >= 0) {
		liveNeighborCount += currentGeneration[x][y];
	}

	// upper left neighbor
	x = row - 1;
	y = col - 1;
	if (x >= 0 && y >= 0) {
		liveNeighborCount += currentGeneration[x][y];
	}

	// upper right
	x = row - 1;
	y = col + 1;
	if (x >= 0 && y < cols) {
		liveNeighborCount += currentGeneration[x][y];
	}

	// left neighbor
	x = row;
	y = col - 1;
	if (y >= 0) {
		liveNeighborCount += currentGeneration[x][y];
	}

	// right neighbor
	x = row;
	y = col + 1;
	if (y < cols) {
		liveNeighborCount += currentGeneration[x][y];
	}

	// bottom left neighbor
	x = row + 1;
	y = col - 1;
	if (x < rows && y >= 0) {
		liveNeighborCount += currentGeneration[x][y];
	}

	// bottom right neighbor
	x = row + 1;
	y = col + 1;
	if (x < rows && y < cols) {
		liveNeighborCount += currentGeneration[x][y];
	}

	// bottom neighbor
	x = row + 1;
	y = col;
	if (x + 1 < rows) {
		liveNeighborCount += currentGeneration[x][y];
	}

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
					} else if (isOverpopulated(liveNeighborCount)) {
						nextGeneration[row][col] = dead;
					} else if (canLiveOn(liveNeighborCount)) {
						nextGeneration[row][col] = alive;
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

let nextGeneration = run([
	[0, 1, 0, 0],
	[1, 1, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
]);

console.log(nextGeneration);
