import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { PopUp } from "../cmps/PopUp.jsx"
import { Chat } from "../cmps/Chat.jsx"

// const { useEffect, useState } = React
// const { Link, useParams } = ReactRouterDOM


export function ToyDetails() {
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
    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <h1>Toy: {toy.name}</h1>
            <h5>Price: ${toy.price}</h5>
            <h5>In Stock: {toy.inStock === undefined ? 'All' : toy.inStock ? 'Yes' : 'No'}</h5>
            <h5>Labels: {toy.labels.join(', ')}</h5>

            <img src={toy.imgUrl} alt={toy.name} />
            <h5>Our toys are crafted with the highest standards of safety and durability.
                Each product is carefully tested to ensure long-lasting fun for children of all ages.
                We take pride in offering toys that inspire creativity, learning, and joyful play.</h5>

            {!isChatOpen && <button className="chat-icon" onClick={() => setIsChatOpen(true)}>Chat 🗨️</button>}
            {isChatOpen && (
                <PopUp
                    heading='Welcome to Chat Support! 💁🏻‍♀️'
                    footing={<button onClick={() => setIsChatOpen(false)}>Close ✖️</button>}
                    onClose={() => setIsChatOpen(false)}
                >
                    <Chat />
                </PopUp>
            )}
            <Link to={`/toy/edit/${toy._id}`}>Edit </Link>
            <Link to={`/toy`}>Back</Link>
            <div>
                <Link to={`/toy/${toy.prevToyId}`}>Previous Toy</Link> |
                <Link to={`/toy/${toy.nextToyId}`}> Next Toy</Link>
            </div>
        </section>
    )
}