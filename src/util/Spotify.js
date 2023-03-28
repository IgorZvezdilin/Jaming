let userToken = '';
const clientID = '';
const redirectURI = '';

const Spotify= {
    getAccessToken() {
        if(userToken) {
            return userToken;
        }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresTimeMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(accessTokenMatch && expiresTimeMatch) {
            userToken = accessTokenMatch[1];
            const expiresIn = Number(expiresTimeMatch[1]);
            setTimeout(() => userToken= '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return userToken;
        } else {
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = accessURL;
        }
    },

    search(term) {
        let accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers : { Authorization: `Bearer ${accessToken}`}
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if(!jsonResponse.tracks) {
                return [];
            }
           return jsonResponse.tracks.items.map(track => ({
                            id: track.id,
                            name: track.name,
                            artist: track.artists[0].name,
                            album: track.album.name,
                            uri: track.uri,
                            sample: track.preview_url
                       })); 
        })
    },

    savePlaylist(playlistName, arrOfURI) {
        if(!playlistName || !arrOfURI ) {
            return;
        }
        let accessToken = Spotify.getAccessToken();
        const playlistHeader = {Authorization: `Bearer ${accessToken} `};
        let userID;
        return fetch('https://api.spotify.com/v1/me', {
            headers: playlistHeader
        }).then(response =>response.json()
        ).then(jsonResponse => {
            userID = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                headers: playlistHeader,
                method: 'POST',
                body: JSON.stringify({ name: playlistName })
            }).then(response => response.json()).then(jsonResponse => {
                let playlistID = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
                    headers: playlistHeader,
                    method: 'POST',
                    body: JSON.stringify({ uris: arrOfURI })
                });

            })
        })
        

    }

}




export default Spotify;