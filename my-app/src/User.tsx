import React, { useEffect, useState } from "react";
import axios from "axios";
import UserPicturePlaceholder from "./UserPicturePlaceholder";

interface User {
    display_name: string;
    images: Image[];
    external_urls: {
        spotify: string;
    }
}

interface Image {
    url: string;
}

function User() {
    const token = window.localStorage.getItem("token")
    const [user, setUser] = useState<User>()

    const fetchUser = async () => {
        try {
            const {data} = await axios.get("https://api.spotify.com/v1/me", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            console.log(data)
            setUser(data)
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                window.localStorage.removeItem("token")
                window.location.reload()
            }
        }
    }

    useEffect(() => {
        fetchUser().then(r => r);
    }, []);

    return (
        <div className="flex justify-center items-center mb-12">
            <div className="bg-zinc-900 rounded-2xl p-6">
                <a href={user?.external_urls.spotify} className="text-2xl hover:text-gray-500 flex flex-col justify-center items-center ">
                    {user?.images?.length === 0 ?
                        <UserPicturePlaceholder/>
                        :
                    <img className="object-cover h-32 w-32 rounded-full"
                         src={user?.images?.at(user?.images.length - 1)?.url} alt={user?.display_name}/>
                    }
                    <h1 className="text-4xl mt-6">{user?.display_name}</h1>
                </a>
            </div>
        </div>
    );
}

export default User;