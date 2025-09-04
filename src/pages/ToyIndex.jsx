// const { useState, useEffect } = React
// const { Link } = ReactRouterDOM
// const { useSelector, useDispatch } = ReactRedux

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, removeToyOptimistic, saveToy, setFilterBy } from '../store/actions/toy.actions.js'
import { ADD_TOY_TO_CART } from '../store/reducers/toy.reducer.js'
import { useTranslation } from 'react-i18next'

export function ToyIndex() {

    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const { t } = useTranslation()

    useEffect(() => {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toys!')
            })
    }, [filterBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    async function onRemoveToy(toyId) {
        try {
            await removeToyOptimistic(toyId)
            showSuccessMsg('Toy removed')
        } catch (err) {
            console.log('err', err)
            showErrorMsg('Cannot remove toy')
        }
    }

    async function onAddToy() {
        try {
            const cartoSave = toyService.getRandomToy()
            const savedToy = await saveToy(cartoSave)
            showSuccessMsg(`Toy added (id: ${savedToy._id})`)
        } catch (err) {
            console.log('err', err)
            showErrorMsg('Cannot add toy')
        }
    }

    async function onEditToy(toy) {
        const price = +prompt('New price?')
        const cartoSave = { ...toy, price }

        try {
            const savedToy = await saveToy(cartoSave)
            showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
        } catch (err) {
            console.log('err', err)
            showErrorMsg('Cannot updated toy')
        }
    }

    function addToCart(toy) {
        console.log(`Adding ${toy.vendor} to Cart`)
        dispatch({ type: ADD_TOY_TO_CART, toy })
        showSuccessMsg('Added to Cart')
    }
    console.log('Index Render')

    return (
        <div>
            <h3>{t('toyIndex.title')}</h3>
            <main>
                <Link to="/toy/edit">{t('toyIndex.addToy')}</Link>
                <button className='add-btn' onClick={onAddToy}>
                    {t('toyIndex.addRandom')} 🧩
                </button>

                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />

                {!isLoading
                    ? <ToyList
                        toys={toys}
                        onRemoveToy={onRemoveToy}
                        onEditToy={onEditToy}
                        addToCart={addToCart}
                    />
                    : <div>{t('loading')}</div>
                }
                <hr />
            </main>
        </div>
    )
}

