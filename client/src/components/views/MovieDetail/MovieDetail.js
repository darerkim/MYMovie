import React, {useEffect, useState} from 'react';
import {API_URL, API_KEY} from '../../Config';
import MainImage from '../commons/MainImage';
import {IMAGE_BASE_URL} from '../../Config';
import GridCards from '../commons/GridCards';
import MovieInfo from './Section/MovieInfo';
import Favorite from './Section/Favorite';
import { Row } from 'antd';

function MovieDetail(props) {
  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [ActorsToggle, setActorsToggle] = useState(false);
  let movieId = props.match.params.movieId;

  const toggleActorView = () => {
    setActorsToggle(!ActorsToggle);
  }

  const showCasts = () => {
    const endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`;
    fetch(endpointCrew)
    .then(response => response.json())
    .then(json => {
      console.log('showCasts : ',json);
      setCasts(json.cast);
    });
  }

  useEffect(() => {
    const endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    fetch(endpointInfo)
    .then(response => response.json())
    .then(json => {
      console.log(json);
      setMovie(json);
    });

    showCasts();
  }, [])
  
  return (
    <div>
      {/* Header */}
      {Movie.backdrop_path &&
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
          title={Movie.original_title}
          text={Movie.overview}
        />
      }
      
      {/* Body */}
      <div style={{ width: '85%', margin: '1rem auto' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}/>
        </div>
        {/* MovieInfo */}
        <MovieInfo movie={Movie}/>
        <br />
        {/* ActorsGrid */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
          <button onClick={toggleActorView}> Toggle Actor View </button>
        </div>
        {ActorsToggle &&
          <Row gutter={[16, 16]}>
            {Casts && Casts.map((cast, index) => (
              <React.Fragment key={index}>
                {cast.profile_path &&
                  <GridCards
                    image={`${IMAGE_BASE_URL}w500${cast.profile_path}`}
                    characterName={cast.name}
                  />
                }
              </React.Fragment>
            ))}
          </Row>
        }
      </div>
    </div>
  )
}

export default MovieDetail
