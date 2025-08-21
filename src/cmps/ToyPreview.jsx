import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {
    const createdAt = new Date(toy.createdAt).toLocaleDateString('he')
    
    return (
        <article>
            <h4>{toy.name}</h4>
            <img src={toy.imgUrl} alt="" />
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <h5>Created At: {createdAt}</h5>
            {/* <p>Speed: <span>{toy.speed.toLocaleString()} km/h</span></p> */}
            {toy.owner && <p>Owner: <Link to={`/user/${toy.owner._id}`}>{toy.owner.fullname}</Link></p>}
            <hr />
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp; | &nbsp;
            <Link to={`/toy/${toy._id}`}>Details</Link>

        </article>
    )
}