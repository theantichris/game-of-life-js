// Any live cell with fewer than two live neighbors dies (underpopulated)
export function isUnderpopulated(liveNeighborCount) {
	return liveNeighborCount < 2;
}

// Any live cell with more than three live neighbors dies (overpopulation)
export function isOverpopulated(liveNeighborCount) {
	return liveNeighborCount > 3;
}

// Any live cell with two or three live neighbors lives on to the next generation
export function canLiveOn(liveNeighborCount) {
	return liveNeighborCount === 2 || liveNeighborCount === 3;
}

// Any dead cell with exactly three live neighbors becomes a live cell (reproduction)
export function canReproduce(liveNeighborCount) {
	return liveNeighborCount === 3;
}