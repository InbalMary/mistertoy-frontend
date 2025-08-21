import { useEffect } from "react"

export function PopUp({ heading, footing, children, onClose }) {

    useEffect(() => {
        const esc = (ev) => ev.key === "Escape" && onClose && onClose()
        document.body.addEventListener("keydown", esc)
        return () => document.body.removeEventListener("keydown", esc)
    }, [onClose])

    return (
        <section className="popup-backdrop"
            onClick={(ev) => ev.target === ev.currentTarget && onClose && onClose()}>
            <div className="popup">
                <header>{heading}</header>
                <main>{children}</main>
                <footer>{footing}</footer>
            </div>
        </section>
    )
}