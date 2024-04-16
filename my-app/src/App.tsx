import React, {useEffect, useState} from 'react';
import Artists from "./Artists";
import User from "./User";

function App() {
    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    const REDIRECT_URI = "http://localhost:3000";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";

    const [token, setToken] = useState("");

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

    return (
        <div className="App bg-black text-white min-h-screen max-h-max">
            <header className={token ? "flex justify-between items-center p-12" : "flex flex-col items-center justify-center min-h-screen"}>
                <div>
                    <h1 className="font-bold text-6xl mb-6">Spotify Stats</h1>
                </div>
                <div className="flex">
                {!token ?
                    <a className="text-6xl text-green-900"
                       href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-top-read`}>Login</a>
                    :
                    <button className="text-6xl lg:text-5xl text-green-900"
                            id="authButton" onClick={logout}>logout</button>
                }
                </div>
            </header>
            {token ?
                <>
                <User/>
                <Artists/>
                </>
                :
                <></>
            }
        </div>
    );
}

export default App;