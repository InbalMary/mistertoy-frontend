import { GoogleMap } from "../cmps/GoogleMap";

export function AboutUs() {

    const branches = [
        { name: 'Tel Aviv', lat: 32.0853, lng: 34.7818 },
        { name: 'Haifa', lat: 32.7940, lng: 34.9896 },
        { name: 'Jerusalem', lat: 31.7683, lng: 35.2137 }
    ]

    return (
        <section>
            <h2>About Us</h2>
            <p>At our toy store, quality and safety always come first- every product is carefully tested and approved for all ages.</p>
            <p>We believe in sparking creativity and imagination with toys that are both fun and educational.</p>
            <p>Our team is passionate about bringing joy to children and peace of mind to parents through trusted, reliable products.</p>

            <GoogleMap branches={branches}/>
        </section>
    )
}
