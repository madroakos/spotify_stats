import React, { useEffect, useState } from "react";
import axios from "axios";

interface Track {
    id: string;
    name: string;
    external_urls: {
        spotify: string;
    }
    album: {
        name: string;
        images: Image[];
    }
    artists: Artist[];
}

interface Image {
    height: number;
    url: string;
    width: number;
}

interface Artist {
    name: string;
}

function Tracks() {
    const token = window.localStorage.getItem("token")
    const [tracks, setTracks] = useState<Track[]>([])

    const fetchTracks = async () => {
        try {
            const {data} = await axios.get("https://api.spotify.com/v1/me/top/tracks?limit=5", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            console.log(data)
            setTracks(data.items)
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                window.localStorage.removeItem("token")
                window.location.reload()
            }
        }
    }

    useEffect(() => {
        fetchTracks().then(r => r);
    }, []);

    return (
            <div className="bg-zinc-900 p-12 rounded-2xl w-full m-6">
                <h1 className="text-4xl mb-4">Top Songs</h1>
                {tracks.map(track => (
                    <div className="mb-2" key={track.id}>
                        <a className="flex items-center hover:text-gray-500"
                            href={track.external_urls.spotify}>
                            <img className="object-cover h-24 w-24 rounded-full"
                                 src={track.album.images.sort((a, b) => a.height - b.height)[0].url} alt={track.name}/>
                            <h2 className="text-2xl ml-4">{track.name}</h2>
                        </a>
                    </div>
                ))}
            </div>
    )
}

export default Tracks;