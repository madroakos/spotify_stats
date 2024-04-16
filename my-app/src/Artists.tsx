import React, { useEffect, useState } from "react";
import axios from "axios";

interface Artist {
    id: string;
    name: string;
    img: string;
    external_urls: {
        spotify: string;
    };
    images: Image[];
}

interface Image {
    height: number;
    url: string;
    width: number;
}

function Artists() {
    const token = window.localStorage.getItem("token")
    const [artists, setArtists] = useState<Artist[]>([])

    const fetchArtists = async () => {
        try {
            const {data} = await axios.get("https://api.spotify.com/v1/me/top/artists?limit=5", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            console.log(data)
            setArtists(data.items)
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                window.localStorage.removeItem("token")
                window.location.reload()
            }
        }
    }

    useEffect(() => {
        fetchArtists().then(r => r);
    }, []);

    return (
            <div className="bg-zinc-900 p-12 rounded-2xl w-4/5 md:w-full m-6">
                <h1 className="text-4xl mb-4">Top Artists</h1>
                {artists.map(artist => (
                    <div className="mb-2" key={artist.id}>
                        <a className="flex items-center hover:text-gray-500"
                            href={artist.external_urls.spotify}>
                            <img className="object-cover lg:h-24 lg:w-24 md:h-16 w-16 rounded-full"
                                 src={artist.images.sort((a, b) => a.height - b.height)[0].url} alt={artist.name}/>
                            <h2 className="lg:text-2xl md:text-xl ml-4">{artist.name}</h2>
                        </a>
                    </div>
                ))}
            </div>
    )
}

export default Artists;