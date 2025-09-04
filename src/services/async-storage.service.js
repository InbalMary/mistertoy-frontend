export const storageService = {
    query,
    get,
    post,
    put,
    remove,

    getLabels,
    getLabelStats,
}

function query(entityType, delay = 500) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return new Promise(resolve => setTimeout(() => resolve(entities), delay))
}

function get(entityType, entityId) {
    return query(entityType).then(entities => {
        const entity = entities.find(entity => entity._id === entityId)
        if (!entity) throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        return entity
    })
}

function post(entityType, newEntity) {
    newEntity = {...newEntity}
    newEntity._id = _makeId()
    return query(entityType).then(entities => {
        entities.push(newEntity)
        _save(entityType, entities)
        return newEntity
    })
}

function put(entityType, updatedEntity) {
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
        if (idx < 0) throw new Error(`Update failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        entities.splice(idx, 1, updatedEntity)
        _save(entityType, entities)
        return updatedEntity
    })
}

function remove(entityType, entityId) {
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity._id === entityId)
        if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        entities.splice(idx, 1)
        _save(entityType, entities)
    })
}

// Private functions

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}


//////////////////////////

async function getLabels() {
    const toys = await query('toys')
    const uniqueLabels = []

    toys.forEach(toy => {
        if (Array.isArray(toy.labels)) {
            toy.labels.forEach(label => {
                if (!uniqueLabels.includes(label)) {
                    uniqueLabels.push(label)
                }
            })
        }
    })

    return uniqueLabels
}

async function getLabelStats() {
    const toys = await query('toys')
    const labelStats = toys.reduce((acc, toy) => {
        if (!Array.isArray(toy.labels)) return acc
        
        toy.labels.forEach(label => {
            if (!acc[label]) {
                acc[label] = {
                    prices: [],
                    avgPrice: 0,
                    total: 0,
                    inStock: 0,
                    percent: 0
                }
            }
            acc[label].prices.push(toy.price)
            
            acc[label].total++
            if (toy.inStock === true || toy.inStock === 'true') {
                acc[label].inStock++
            }
        })
        
        return acc
    }, {})
    
    for (const label in labelStats) {
        const stat = labelStats[label]
        
        const avg = stat.prices.reduce((sum, p) => sum + p, 0) / stat.prices.length
        stat.avgPrice = +avg.toFixed(2)
        
        stat.percent = +((stat.inStock / stat.total) * 100).toFixed(2)
    }
    
    return labelStats
} 