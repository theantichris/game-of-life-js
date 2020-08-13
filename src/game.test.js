import { run } from './game.js'

describe('game of life', () => {
    it('reproduces on a dead cell with 3 live neighbors', () => {
        let currentGeneration = [
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
        ]

        let expected = [
            [ 0, 0, 0, 0 ],
            [ 0, 1, 1, 0 ],
            [ 0, 1, 1, 0 ],
            [ 0, 0, 0, 0 ]
        ]

        let actual = run(currentGeneration)

        expect(actual).toEqual(expected)
    })

    it('kills a live cell that is underpopulated', () => {
        let currentGeneration = [
            [0, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0],
        ]

        let expected = [
            [ 0, 0, 0, 0 ],
            [ 0, 0, 0, 0 ],
            [ 0, 0, 0, 0 ],
            [ 0, 0, 0, 0 ]
        ]

        let actual = run(currentGeneration)

        expect(actual).toEqual(expected)
    })

    it('kills a live cell that is overpopulated', () => {
        let currentGeneration = [
            [0, 1, 0, 0],
            [1, 1, 1, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0],
        ]

        let expected = [
            [ 1, 1, 1, 0 ],
            [ 1, 0, 1, 0 ],
            [ 1, 1, 1, 0 ],
            [ 0, 0, 0, 0 ]
        ]

        let actual = run(currentGeneration)

        expect(actual).toEqual(expected)
    })
})