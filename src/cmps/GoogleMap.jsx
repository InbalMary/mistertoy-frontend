import { AdvancedMarker, APIProvider, InfoWindow, Map, Pin, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { useRef, useState } from 'react';
const API_KEY = 'AIzaSyA5YAKbctMWmj2etXv-KY7MSXDMGaWr0qs'

export function GoogleMap({ branches }) {
    const [coords, setCoords] = useState({ lat: 32.0853, lng: 34.7818 })
    const [isInfoOpen, setIsInfoOpen] = useState(false)
    const [infoContent, setInfoContent] = useState(null)
    const mapRef = useRef()

    function handleMapClick(ev) {
        const { latLng } = ev.detail
        ev.map.panTo(latLng)
        setCoords({ lat: latLng.lat, lng: latLng.lng })
        setIsInfoOpen(false)
    }

    function centerMapOnLocation(location) {
        setCoords({ lat: location.lat, lng: location.lng })
        if (mapRef.current) {
            mapRef.current.panTo({ lat: location.lat, lng: location.lng })
        }
        setIsInfoOpen(false)
    }

    return (
        <section className="google-map">
            <h1>Find Our Branches on Map!</h1>
            <div style={{ marginBottom: '1em' }}>
                {branches.map((loc, idx) => (
                    <button
                        key={idx}
                        onClick={() => centerMapOnLocation(loc)}
                        style={{ marginRight: '0.5em', padding: '0.5em 1em' }}
                    >
                        {loc.name}
                    </button>
                ))}
            </div>
            <APIProvider apiKey={API_KEY}>
                <Map
                    ref={mapRef}
                    defaultCenter={coords}
                    center={coords}
                    defaultZoom={10}
                    mapId="DEMO_MAP_ID"
                    onClick={handleMapClick}
                >
                    {branches.map((loc, idx) => (
                        <AdvancedMarker
                            key={idx}
                            position={{ lat: loc.lat, lng: loc.lng }}
                            onClick={() => {
                                if (infoContent?.name === loc.name && isInfoOpen) {
                                    setIsInfoOpen(false)
                                    setInfoContent(null)
                                } else {
                                    setInfoContent(loc)
                                    setIsInfoOpen(true)
                                    setCoords({ lat: loc.lat, lng: loc.lng })
                                    if (mapRef.current) mapRef.current.panTo({ lat: loc.lat, lng: loc.lng })
                                }
                            }}
                        >
                        </AdvancedMarker>
                    ))}
                    {isInfoOpen && infoContent && (
                        <InfoWindow
                            position={{ lat: infoContent.lat + 0.03, lng: infoContent.lng }}
                            maxWidth={200}
                            onCloseClick={() => setIsInfoOpen(false)}
                        >
                            <div>
                                <h4>{infoContent.name}</h4>
                                <p>Welcome to our {infoContent.name} location!</p>
                                <pre>{JSON.stringify(infoContent, null, 4)}</pre>
                            </div>
                        </InfoWindow>
                    )}
                </Map>
            </APIProvider>
        </section>
    )
}
