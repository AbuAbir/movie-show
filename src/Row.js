import React, {useState, useEffect} from 'react';
import axios from './axios'; 
import './Row.css';
import { ReactVideoPlayer } from "video-player-for-react";
import "video-player-for-react/dist/index.css";


const base_url_image = "https://image.tmdb.org/t/p/original/";
const url_ = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export default function Row({ title, fetchUrl, isLargeRow }) {
  
    const [movies, setMovies] =  useState([]); // this state is for storing the 
    // movie information from the axios api
    const [trailerUrl, setTrailerUrl] = useState("");
    // when the Row component loads, with the useEffect I would call the TMDB API
    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
        // if [], run once when the row loads and don't run again, 
        // if there is anything coming from outside useEffect function, we need to pass
        // in to the [] to let the function know that the effect would be triggered on basis of this
        // in this case, fetchUrl is the de-structured prop bringing the url
    }, [fetchUrl]);


    const handleClick = (movie) => {
    
        if(trailerUrl){
            setTrailerUrl('');
        }
        else{
            setTrailerUrl(url_);
        }
    };
    return (

        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {
                    movies.map((movie) => (
                   <img 
                        key={movie.id} //optimization to find the unique keys, not the whole array
                        onClick={() => handleClick(movie)}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        src={`${base_url_image}${
                            isLargeRow ? movie.poster_path: movie.backdrop_path}`} 
                        alt={movie.name}
                    /> 
                ))}
            </div>

      { trailerUrl && 
       <ReactVideoPlayer
        className="video_player"
        width="100%"
        url={trailerUrl}
        type="video/mp4"
        //poster="https://image.shutterstock.com/shutterstock/photos/169039157/display_1500/stock-vector-simple-close-up-address-bar-169039157.jpg"
      /> }
        </div>

    );
}
