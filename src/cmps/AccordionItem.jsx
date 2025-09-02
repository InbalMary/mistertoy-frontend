import { useTranslation } from 'react-i18next';

export function AccordionItem({ title, children, isActive, onToggle }) {
    const { t } = useTranslation()

    function handleToggle(ev) {
        ev.preventDefault()
        onToggle()
    }

    return (
        <article className="accordion-item">
            <details onClick={handleToggle} open={isActive}>
                <summary>{t(title)}</summary>
                <div className="content">
                    {children}
                </div>
            </details>
        </article>
    )
}