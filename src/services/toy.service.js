
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

// import Axios from "axios"
// const axios = Axios.create({
//     withCredentials: true
// })

const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getRandomToy
}

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
        .then(toy => _setNextPrevToyId(toy))
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL + toy._id, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}


function getEmptyToy() {
    return {
        name: '',
        imgUrl: 'https://robohash.org/' + utilService.makeId(),
        price: '',
        labels: [],
        createdAt: Date.now(),
        inStock: true,
    }
}

function getRandomToy() {
    const toyNames = [
        'Talking Doll', 'Racing Car', 'Magic Puzzle', 'Play-Doh Set',
        'Teddy Bear', 'Building Blocks', 'Bubble Machine', 'Soccer Ball',
        'Remote Helicopter', 'Train Set', 'Drawing Kit', 'Drum Set',
        'Action Figure', 'Board Game', 'Lego Classic'
    ]
    const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

    const name = toyNames[utilService.getRandomIntInclusive(0, toyNames.length - 1)]
    const randomLabels = _getRandomLabels(labels)

    return {
        name,
        imgUrl: 'https://robohash.org/' + utilService.makeId(),
        price: utilService.getRandomIntInclusive(50, 300),
        labels: randomLabels,
        createdAt: Date.now(),
        inStock: Math.random() > 0.3,
    }
}

function _getRandomLabels(allLabels) {
    const count = utilService.getRandomIntInclusive(3, 4)
    const chosenLabels = []

    while (chosenLabels.length < count) {
        const label = allLabels[utilService.getRandomIntInclusive(0, allLabels.length - 1)]
        if (!chosenLabels.includes(label)) {
            chosenLabels.push(label)
        }
    }

    return chosenLabels
}

function getDefaultFilter() {
    return { txt: '', price: '', inStock: undefined }
}

function _setNextPrevToyId(toy) {
    return httpService.get(BASE_URL)
        .then((toys) => {
            const toyIdx = toys.findIndex((currToy) => currToy._id === toy._id)
            const nextToy = toys[toyIdx + 1] ? toys[toyIdx + 1] : toys[0]
            const prevToy = toys[toyIdx - 1] ? toys[toyIdx - 1] : toys[toys.length - 1]
            toy.nextToyId = nextToy._id
            toy.prevToyId = prevToy._id
            return toy
        })
}