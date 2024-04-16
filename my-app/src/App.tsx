import React, {useEffect, useState} from 'react';
import Artists from "./Artists";
import User from "./User";
import Tracks from "./Tracks";

function App() {
    const REDIRECT_URI = "http://localhost:3000";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";

    const [token, setToken] = useState("");
    const [client_id, setClient_id] = useState(process.env.REACT_APP_CLIENT_IDa);

    useEffect(() => {
        const hash = window.location.hash;

        if (hash) {
            const found = hash.substring(1).split("&").find(elem => elem.startsWith("access_token"));
            if (found) {
                const token = found.split("=")[1];
                window.location.hash = "";
                window.localStorage.setItem("token", token);
                setToken(token);
            }
        } else {
            const token = window.localStorage.getItem("token");
            if (token) {
                setToken(token);
            }
        }
    }, []);

    function logout() {
        window.localStorage.removeItem("token");
        setToken("");
    }

    function inputApiKey() {
        let text;
        let api_key = prompt("Please enter your API key:", "");
        if (api_key !== null && api_key !== "") {
            setClient_id(api_key);
        }
    }

    return (
        <div className="App bg-black text-white min-h-screen max-h-max">
            <header className={token ? "flex justify-between items-center p-12" : "flex flex-col items-center justify-center min-h-screen"}>
                <div>
                    <h1 className="font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6">Spotify Stats</h1>
                </div>
                <div className="flex">
                    {!client_id && !token ? <button onClick={inputApiKey}>Enter API Key</button> :
                        !token ?
                            <a className="text-4xl sm:text-5xl md:text-6xl text-green-900"
                               href={`${AUTH_ENDPOINT}?client_id=${client_id}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-top-read`}>Login</a>
                            :
                            <button className="text-xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 text-green-900"
                                    id="authButton" onClick={logout}>logout</button>
                    }
                </div>
            </header>
            {token ?
                <>
                <User/>
                <div className="flex flex-col md:flex-row items-center md:justify-around">
                    <Tracks/>
                    <Artists/>
                </div>

                </>
                :
                <></>
            }
        </div>
    );
}

export default App;