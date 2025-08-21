
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'toyDB'
const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
const toyNames = [
    'Talking Doll', 'Racing Car', 'Magic Puzzle', 'Play-Doh Set',
    'Teddy Bear', 'Building Blocks', 'Bubble Machine', 'Soccer Ball',
    'Remote Helicopter', 'Train Set', 'Drawing Kit', 'Drum Set',
    'Action Figure', 'Board Game', 'Lego Classic'
]

_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getRandomToy,
    getDefaultFilter
}

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (!filterBy.txt) filterBy.txt = ''
            if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
            if (filterBy.inStock === undefined) filterBy.inStock = undefined
            const regExp = new RegExp(filterBy.txt, 'i')
            return toys.filter(toy =>
                regExp.test(toy.name) &&
                toy.price <= filterBy.maxPrice &&
                (filterBy.inStock === undefined || toy.inStock === filterBy.inStock)
            )
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}


function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        toy.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        imgUrl: '',
        price: '',
        labels: [],
        createdAt: Date.now(),
        inStock: true,
    }
}

function getRandomToy() {
    const name = toyNames[utilService.getRandomIntInclusive(0, toyNames.length - 1)]
    return {
        _id: utilService.makeId(),
        name,
        imgUrl: 'https://robohash.org/' + utilService.makeId(),
        price: utilService.getRandomIntInclusive(50, 300),
        labels: _getRandomLabels(),
        createdAt: Date.now(),
        inStock: Math.random() > 0.3,
    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: '', inStock: undefined }
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = []
        for (let i = 0; i < 15; i++) {
            toys.push(getRandomToy())
        }
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}

function _getRandomLabels() {
    const count = utilService.getRandomIntInclusive(3, 4)
    const chosenLabels = []

    while (chosenLabels.length < count) {
        const label = labels[utilService.getRandomIntInclusive(0, labels.length - 1)]
        if (!chosenLabels.includes(label)) {
            chosenLabels.push(label)
        }
    }
    return chosenLabels
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


