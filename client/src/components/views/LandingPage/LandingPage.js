import React, { useEffect, useState } from 'react';
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../commons/MainImage';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';

function LandingPage() {

  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [CurrentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetchMovies();
  }, [])

  const loadMoreItems = () => { 
    fetchMovies();
  }

  const fetchMovies = () => {
    setCurrentPage(CurrentPage+1);
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage}`;
    fetch(endpoint)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        setMovies([...Movies, ...json.results]);
        (CurrentPage===1 && setMainMovieImage(json.results[0]));
      });
  }

  
  return (
    <div style={{ width: '100%', margin: '0' }}>
      {/* Main Image */}
      {MainMovieImage &&
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
          title={MainMovieImage.original_title}
          text={MainMovieImage.overview}
        />
      }
      <div style={{ width: '85%', margin: '1rem auto' }}>
        <h2>Movies by latest</h2>
        <hr />

        {/* Movie Grids Cards */}
        <Row gutter={[16, 16]}>
          {Movies && Movies.map((movie, index) => (
            <React.Fragment key={index}>
              {movie.poster_path &&
                <GridCards
                  landingPage
                  image={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                  movieId={movie.id}
                  movieName={movie.original_title}
                />
              }
            </React.Fragment>
          ))}
        </Row>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={loadMoreItems}> Load More </button>
      </div>
    </div>
  )
}

export default LandingPage
