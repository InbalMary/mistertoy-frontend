import { useState } from 'react'

export function ToyImg({ src, title, children, ...props }) {
    const [isImgLoading, setImgLoading] = useState(true)

    function handleImageLoaded() {
        setImgLoading(false)
    }

    return (
        <div className="img-container">
            {isImgLoading && children}
            <img
                src={src}
                alt={title}
                title={title}
                onLoad={handleImageLoaded}
                className={isImgLoading ? '' : 'loaded'}
                {...props}
            />
        </div>
    )
}