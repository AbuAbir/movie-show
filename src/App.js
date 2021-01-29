import React from 'react';
import Row from './Row';
import requests from './requests';
import './App.css';

function App() {
  return (
    // BEM
    <div className="app">
      <h1 className="header">Movie flix</h1>

      <Row 
      title= "NETFLIX originals"  
      fetchUrl = {requests.fetchNetflixOriginals}
      />
      <Row title= "Trending now" isLargeRow fetchUrl = {requests.fetchTrending}/>
      <Row title= "Action Movies" fetchUrl = {requests.fetchActionMovies}/>
      <Row title= "Comedy" fetchUrl = {requests.fetchComedyMovies}/>
      <Row title= "Horror" fetchUrl = {requests.fetchHorror}/>
      <Row title= "Romance" fetchUrl = {requests.fetchRomance}/>
      <Row title= "Top Rated" fetchUrl = {requests.fetchTopRated}/>
      <Row title= "Documentary" fetchUrl = {requests.fetchDocumentaries}/>

    </div>
  );
}

export default App;
