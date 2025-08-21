import { useState } from "react"

export function LabelPicker({ selectedLabels, onUpdateLabels }) {
    const categories = [
        { cat: 'On wheels', color: '#f39f76' },
        { cat: 'Box game', color: '#faafa8' },
        { cat: 'Art', color: '#c7bf76ff' },
        { cat: 'Baby', color: '#c1d4b3ff' },
        { cat: 'Doll', color: '#b4ddd3' },
        { cat: 'Puzzle', color: '#aeccdc' },
        { cat: 'Outdoor', color: '#dfb8efff' },
        { cat: 'Battery Powered', color: '#cbaba1ff' },
    ]

    const [open, setOpen] = useState(false)

    const toggleCategory = (catName, ev) => {
        ev.stopPropagation()
        const isSelected = selectedLabels.includes(catName)
        onUpdateLabels(catName, isSelected ? 'remove' : 'add')
    }

    const handlePickerClick = (ev) => {
        ev.stopPropagation()
        setOpen(prev => !prev)
    }

    return (
        <div className="label-picker-container">
            <button
                type="button"
                className="label-picker-button"
                onClick={handlePickerClick}
            >
                Labels {open ? ' ▲' : ' ▼'}
            </button>

            {open && (
                <div className="label-picker-dropdown" onClick={ev => ev.stopPropagation()}>
                    {categories.map(category => (
                        <label
                            key={category.cat}
                            className="label-picker-option"
                            style={{ backgroundColor: category.color, color: 'white' }}
                        >
                            <input
                                type="checkbox"
                                checked={selectedLabels.includes(category.cat)}
                                onChange={(ev) => toggleCategory(category.cat, ev)}
                            />
                            <span>{category.cat}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    )
}