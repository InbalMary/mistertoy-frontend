// const { useState, useEffect, useRef } = React

import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { LabelPicker } from "./LabelPicker.jsx"


export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function handleUpdateLabels(label, action) {
        setToyToEdit(prev => {
            let labels = prev.labels || []
            if (action === 'add') {
                if (!labels.includes(label)) labels.push(label)
            } else if (action === 'remove') {
                labels = labels.filter(lbl => lbl !== label)
            }
            return { ...prev, labels }
        })
    }
    
    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter</h2>
            <form >
                <label htmlFor="name">Toy Name:</label>
                <input type="text"
                    id="name"
                    name="txt"
                    placeholder="By name"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />

                <label htmlFor="price"> Max price:</label>
                <input type="number"
                    id="price"
                    name="price"
                    placeholder="By max price"
                    value={filterByToEdit.price || ''}
                    onChange={handleChange}
                />

                <label htmlFor="inStock"> In Stock:</label>
                <select
                    name="inStock"
                    id="inStock"
                    value={filterByToEdit.inStock === undefined ? '' : filterByToEdit.inStock}
                    onChange={handleChange}
                >
                    <option value="">All</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>

                <LabelPicker
                    selectedLabels={filterByToEdit.labels || []}
                    onUpdateLabels={handleUpdateLabels}
                />
            </form>

        </section>
    )
}