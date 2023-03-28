![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)![Spotify](https://img.shields.io/badge/Spotify-1ED760?style=for-the-badge&logo=spotify&logoColor=white)

-----

# Jaming App

This project is a first my project where i use React. If you want to use it, you must have account on Spotify. If Spotify does not working in you country, i recommend you to use VPN.
The goal of this project is pratice and imporve my hard skills. I believe you will enjoy using my App.

## How I can use it?

- Go to this [link](http://starsky-jimmming.surge.sh/).
- Log in to your Spotify account.
- Enjoy!

## Features

- Search song by title, album or artist
- Listen to a sample
- Add the song to your playlist
- Remove the song from your playlist
- Change a name of your playlist
- Add a resulting playlist to your Spotify account

## Spotify API Reference

I create get and post request with using fetch JS library. So I add only field which i use in fetch request.

You need client ID and redirect URI to get access token and then work with Spotify API. You get these parameters when you sign up at Spotify for developers.

#### Get list of search results

```http
  GET EndPoint/search?type=track&q=${term}

  Authorization: Bearer ${access token} 
```

| Parameter              | Type     | Description                                        |
| :--------------------- | :------- | :------------------------------------------------- |
| `access token`, `term` | `string` | **Required**. Your access token and search`s term  |

#### Get User ID

```http
  GET EndPoint/me

  Authorization: Bearer ${access token} 
```

| Parameter      | Type     | Description                     |
| :------------- | :------- | :------------------------------ |
| `access token` | `string` | **Required**. Your access token |

#### Post playlist name

```http
  POST /Endpoint/users/${userID/playlist}

  Authorization: Bearer ${access token}

  name: ${playlistName}
```

| Parameter                                              | Type     | Description                                        |
| :----------------------------------------------------- | :------- | :------------------------------------------------- |
| `access token`, `playlist name`, `user ID` | `string` | **Required**. Your access token, playlist name and user ID |

#### Post tracks in the playlist

```http
  POST /Endpoint/users/${userID}/playlist/${playlistID}/tracks
  
  Authorization: Bearer ${access token}

  uris: ${arrayOfURIs}  
```

| Parameter                                              | Type     | Description                                        |
| :----------------------------------------------------- | :------- | :------------------------------------------------- |
| `access token`, `playlist ID`, `user ID`, `arrayOfURIs` | `string` | **Required**. Your access token, playlist ID, user ID and array of track`s URIs |

## Acknowledgements

 - [README.so](https://readme.so/ru/editor)
 - [StackOverflow](https://stackoverflow.com/)
 - [Shields.io](https://shields.io/)

