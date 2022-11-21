import React from 'react'
import './body.css'
import Header from './Header'
import { useDataLayerValue } from '../../DataLayer'
import  PlayCircleFilledOutlined from '@mui/icons-material/PlayCircleFilledOutlined'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SongRow from './SongRow'
// import MoreHorizIcon from '@mui/icons-material/MoreHorizIcon';
export default function Body({spotify}) {
  const [{discover_weekly},dispatch] = useDataLayerValue();
  const playPlaylist = (id) => {
    spotify
      .play({
        context_uri: `spotify:playlist:37i9dQZEVXcJZyENOWUFo7`,
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };

  const playSong = (id) => {
    spotify
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      });
  };
  
  return (
   
    <div className='body'>
      <Header spotify={spotify}/>
      <div className="body-info">
        <img src={discover_weekly?.images[0].url} alt="" />

        <div className="body-infoText">
          <strong>PLAYLIST</strong>
          <h1>Discover Weekly</h1>
          <p>{discover_weekly?.description}</p>
            </div>

      </div>
      <div className="body-songs">
        <div className="body-icons">
          <PlayCircleFilledOutlined className='body-shuffle' onClick={playSong}/>
          <FavoriteBorderIcon fontSize='large'/>  
          </div>
          {discover_weekly?.tracks.items.map(item => (
            <SongRow playSong={playSong} track={item.track} />
          ))}
          </div>
      </div>
    
  )
}
