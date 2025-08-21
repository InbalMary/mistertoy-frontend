
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
            if (!filterBy.price) filterBy.price = Infinity
            const inStockFilter = filterBy.inStock === 'true' ? true
                : filterBy.inStock === 'false' ? false
                : undefined
            const regExp = new RegExp(filterBy.txt, 'i')
            let filteredToys = toys.filter(toy =>
                regExp.test(toy.name) &&
                toy.price <= filterBy.price &&
                (inStockFilter === undefined || toy.inStock === inStockFilter) &&
                (!filterBy.labels || filterBy.labels.length === 0 ||
                    filterBy.labels.every(label => toy.labels.includes(label)))
            )

            if (filterBy.sort) {
                if (filterBy.sort === 'name') {
                    filteredToys = filteredToys.sort((a, b) => a.name.localeCompare(b.name))
                } else if (filterBy.sort === 'price') {
                    filteredToys = filteredToys.sort((a, b) => a.price - b.price)
                } else if (filterBy.sort === 'createdAt') {
                    filteredToys = filteredToys.sort((a, b) => a.createdAt - b.createdAt)
                }
            }

            return filteredToys
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
        .then(toy => {
            toy = _setNextPrevToyId(toy)
            return toy
        })
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
        name,
        imgUrl: 'https://robohash.org/' + utilService.makeId(),
        price: utilService.getRandomIntInclusive(50, 300),
        labels: _getRandomLabels(),
        createdAt: Date.now(),
        inStock: Math.random() > 0.3,
    }
}

function getDefaultFilter() {
    return { txt: '', price: '', inStock: undefined }
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = []
        for (let i = 0; i < 15; i++) {
            toys.push(_getRandomToyForInitialToys())
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

function _getRandomToyForInitialToys() {
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

function _setNextPrevToyId(toy) {
    return storageService.query(STORAGE_KEY).then((toys) => {
        const toyIdx = toys.findIndex((currToy) => currToy._id === toy._id)
        const nextToy = toys[toyIdx + 1] ? toys[toyIdx + 1] : toys[0]
        const prevToy = toys[toyIdx - 1] ? toys[toyIdx - 1] : toys[toys.length - 1]
        toy.nextToyId = nextToy._id
        toy.prevToyId = prevToy._id
        return toy
    })
}
// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


