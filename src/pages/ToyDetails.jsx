import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { PopUp } from "../cmps/PopUp.jsx"
import { Chat } from "../cmps/Chat.jsx"
import { useTranslation } from 'react-i18next'
import { ToyImg } from "../cmps/ToyImg.jsx"

// const { useEffect, useState } = React
// const { Link, useParams } = ReactRouterDOM


export function ToyDetails() {
    const { t } = useTranslation()
    const [toy, setToy] = useState(null)
    const [isChatOpen, setIsChatOpen] = useState(false)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }

    if (!toy) return <div>{t('Loading...')}</div>

    return (
        <section className="toy-details">
            <h1>{t('Toy')}: {toy.name}</h1>
            <h5>{t('Price')}: ${toy.price}</h5>
            <h5 className={toy.inStock ? 'green' : 'red'}>
                {t('In Stock')}: {toy.inStock === undefined ? t('All') : toy.inStock ? t('Yes') : t('No')}
            </h5>
            <h5>{t('Labels')}: {toy.labels.join(', ')}</h5>

            <ToyImg title={toy.name} src={toy.imgUrl}>
                <div className="skeleton-loader"></div>
            </ToyImg>
            <h5>{t('Our toys are crafted with the highest standards of safety and durability. Each product is carefully tested to ensure long-lasting fun for children of all ages. We take pride in offering toys that inspire creativity, learning, and joyful play.')}</h5>

            <div className="action-btns">
                {!isChatOpen && <button className="chat-icon" onClick={() => setIsChatOpen(true)}>{t('Chat')} 🗨️</button>}
                {isChatOpen && (
                    <PopUp
                        heading={t('Welcome to Chat Support! 💁🏻‍♀️')}
                        footing={<button onClick={() => setIsChatOpen(false)}>{t('Close')} ✖️</button>}
                        onClose={() => setIsChatOpen(false)}
                    >
                        <Chat />
                    </PopUp>
                )}
                <Link to={`/toy/edit/${toy._id}`}>{t('Edit')} </Link>
                <Link className='back-btn' to={`/toy`}>{t('Back')}</Link>
            </div>
            <div>
                <Link to={`/toy/${toy.prevToyId}`}>{t('Previous Toy')}</Link> |
                <Link to={`/toy/${toy.nextToyId}`}> {t('Next Toy')}</Link>
            </div>
        </section>
    )
}