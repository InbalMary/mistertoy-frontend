import { useEffect, useState } from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import { toyService } from '../services/toy.service.js'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

export function LabelMultiSelect({ selectedLabels = [], onUpdateLabels }) {
    const [allLabels, setAllLabels] = useState([])

    useEffect(() => {
        toyService.getToyLabels().then(setAllLabels)
    }, [])

    function handleChange(event) {
        const { value } = event.target
        const newSelected = typeof value === 'string' ? value.split(',') : value
        onUpdateLabels(newSelected)
    }

    const safeSelectedLabels = Array.isArray(selectedLabels) ? selectedLabels : []

    return (
        <FormControl sx={{ m: 1, width: 150 }}>
            <InputLabel id="label-multi-select-label">Labels</InputLabel>
            <Select
                labelId="label-multi-select-label"
                id="label-multi-select"
                multiple
                value={safeSelectedLabels}
                onChange={handleChange}
                input={<OutlinedInput label="Labels" />}
                renderValue={(selected) => Array.isArray(selected) ? selected.join(', ') : ''}
                MenuProps={MenuProps}
            >
                {allLabels.map(label => (
                    <MenuItem key={label} value={label}>
                        <Checkbox checked={safeSelectedLabels.includes(label)} />
                        <ListItemText primary={label} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}