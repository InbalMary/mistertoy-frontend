// const { useState, useEffect, useRef } = React

import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { LabelPicker } from "./LabelPicker.jsx"
import { useEffectUpdate } from "../hooks/useEffectUpdate.js"
import { LabelMultiSelect } from "./LabelMultiSelect.jsx"

import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField';


export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffectUpdate(() => {
        const processedFilter = { ...filterByToEdit }
        if (processedFilter.labels && Array.isArray(processedFilter.labels)) {
            processedFilter.labels = processedFilter.labels.join(',')
        }
        onSetFilter.current(processedFilter)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function handleUpdateLabels(label, action) {
        setFilterByToEdit(prev => {
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
                <div className="filter-bar">
                    {/* <label htmlFor="name">Toy Name:</label> */}
                    {/* <input type="text" */}
                    <TextField
                        id="name"
                        name="txt"
                        label="Search Toy Name.."
                        variant="outlined"
                        // placeholder="By name"
                        value={filterByToEdit.txt}
                        onChange={handleChange}
                    />

                    {/* <label htmlFor="price"> Max price:</label> */}
                    {/* <input type="number" */}
                    <TextField
                        id="price"
                        name="price"
                        label="Enter Max Price.."
                        type="number"
                        variant="outlined"
                        // placeholder="By max price"
                        value={filterByToEdit.price || ''}
                        onChange={handleChange}
                    />

                    <Box sx={{ width: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="inStock-label">In Stock</InputLabel>
                            <Select
                                labelId="inStock-label"
                                id="inStock"
                                name="inStock"
                                value={filterByToEdit.inStock === undefined ? '' : filterByToEdit.inStock}
                                label="In Stock"
                                onChange={handleChange}
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    {/* <label htmlFor="inStock"> In Stock:</label>
                <select
                    name="inStock"
                    id="inStock"
                    value={filterByToEdit.inStock === undefined ? '' : filterByToEdit.inStock}
                    onChange={handleChange}
                >
                    <option value="">All</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select> */}

                    <LabelMultiSelect
                        selectedLabels={filterByToEdit.labels || []}
                        onUpdateLabels={(labels) => {
                            setFilterByToEdit(prev => ({ ...prev, labels }))
                        }}
                    />
                    {/* <LabelPicker
                    selectedLabels={filterByToEdit.labels || []}
                    onUpdateLabels={handleUpdateLabels}
                /> */}

                    <Box sx={{ width: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="sort-label">Sort by</InputLabel>
                            <Select
                                labelId="sort-label"
                                id="sort"
                                name="sort"
                                value={filterByToEdit.sort || ''}
                                label="Sort by"
                                onChange={handleChange}
                            >
                                <MenuItem value="">None</MenuItem>
                                <MenuItem value="name">Name</MenuItem>
                                <MenuItem value="price">Price</MenuItem>
                                <MenuItem value="createdAt">Created</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                </div>
            </form>

            {/* <section className="toy-sort">
                <label htmlFor="sort">Sort by:</label>
                <select
                    name="sort"
                    id="sort"
                    value={filterByToEdit.sort || ''}
                    onChange={handleChange}
                >
                    <option value="">None</option>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="createdAt">Created</option>
                </select>
            </section> */}

        </section>
    )
}