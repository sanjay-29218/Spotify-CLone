import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Login from './Components/Login/Login'
import { getTokenFromUrl } from './spotify'
import Player from './Components/player/Player'
import SpotifyWebApi from 'spotify-web-api-js'
import { useDataLayerValue } from './DataLayer'
const spotify = new SpotifyWebApi();
function App() {
  const [{user },dispatch] = useDataLayerValue();
  // const [token,setToken] = useState("BQB6kXmx1922SU6VJDqkMD1Jk-f0rcBn-sRLN2PNLsDErDYnddHTVKyTGmv4HarViJ-WFchHNnt_QgL8CAMU90Hn3ojMJRAiB2VcuJ_HXIHIOR9jji9bLDlsxrHxPGHho1pre_GQMpdMjVVdhL6tqUoa2D8Xu2Z_HdHrUjaTtgDXMufkMItSH6irenEXW9OJmU_qDFHvcpWJgoWOnQka");
  const [token,setToken] = useState(null);
  

  useEffect(()=>{
    const hash = getTokenFromUrl();
    window.location.hash = "";    
    const _token = hash.access_token;
    console.log(_token);
    if(_token){
      setToken(_token);
      spotify.setAccessToken(_token);
      spotify.getMe().then(user => {
        console.log('user', user);
        dispatch({
          type: 'SET_USER',
          user: user
        })})
        spotify.getUserPlaylists().then((playlists) => {
          dispatch({
            type: 'SET_PLAYLISTS',
            playlists: playlists
          })
            })
        spotify.getPlaylist('37i9dQZEVXcGxzxMBRXXeR').then(response => {
          dispatch({
            type: 'SET_DISCOVER_WEEKLY',
            discover_weekly: response
          })
         })
    }},
    [])
  

  return (
    <div className="App">
      {token?(<Player spotify={spotify}/>):(<Login/>)}
      
    </div>
  )
}

export default App
