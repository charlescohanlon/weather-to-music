import { getSession } from "next-auth/react"
import { useState, useEffect } from 'react'
import './components/weather';
import Weather from "./components/weather";

export default function Recommendations(props) {
    const [tracks, updateTracks] = useState(new Array({ id: -1, name: "fetching song recs..." }));

    useEffect(() => {
        fetchSongRecs(props.accessToken).then(tracks => updateTracks(tracks));
    }, []);
    return (<>
        <Weather></Weather>
        <ol>{tracks.map(track => <li key={track.id}>{track.name}</li>)}</ol>
    </>);
}

const fetchSongRecs = async (token, genres) => {
    const quantity = 3;
    genres = 'edm'
    const response = await fetch('https://api.spotify.com/v1/recommendations?limit=' + quantity + '&seed_genres=' + genres, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    }); // opens TCP stream and reads headers from response

    const data = await response.json(); // reads TCP stream and parses JSON
    return data.tracks;
}

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req })
    return {
        props: {
            accessToken: session.accessToken,
        }
    }
}