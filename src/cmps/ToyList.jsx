import { ToyPreview } from "./ToyPreview.jsx"

import { useTranslation } from 'react-i18next'

export function ToyList({ toys, onRemoveToy, onEditToy, addToCart }) {
    const { t } = useTranslation()

    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />

                    <div>
                        <button onClick={() => onRemoveToy(toy._id)}>x</button>
                        {/* <button onClick={() => onEditToy(toy)}>Edit</button> */}
                    </div>

                    <button className="buy" onClick={() => addToCart(toy)}>
                        {t("Add to Cart")}
                    </button>
                </li>)}
        </ul>
    )
}