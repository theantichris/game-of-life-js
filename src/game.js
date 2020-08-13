import * as rules from './rules.js'
import * as check from './checks.js'

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

function countLiveNeighbors(row, col, currentGeneration) {
	let rowCount = currentGeneration.length;
	let colCount = currentGeneration[0].length;

	row = Number(row);
	col = Number(col);

	let liveNeighborCount = 0;
	liveNeighborCount += check.topLeftNeighbor(row, col, currentGeneration);
	liveNeighborCount += check.topNeighbor(row, col, currentGeneration);
  liveNeighborCount += check.topRightNeighbor(row, col, colCount, currentGeneration);
  liveNeighborCount += check.leftNeighbor(row, col, currentGeneration);
	liveNeighborCount += check.rightNeighbor(row, col, colCount, currentGeneration);
	liveNeighborCount += check.bottomLeftNeighbor(row, col, rowCount, currentGeneration);
	liveNeighborCount += check.bottomNeighbor(row, col, rowCount, currentGeneration);
	liveNeighborCount += check.bottomRightNeighbor(row, col, rowCount, colCount, currentGeneration);

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
