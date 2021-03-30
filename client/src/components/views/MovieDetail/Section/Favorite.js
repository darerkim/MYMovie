import Axios from 'axios';
import React,{useEffect,useState} from 'react';
import { Button } from 'antd';

function Favorite(props) {

  const {
          userFrom, 
          movieId, 
          movieInfo:{
            title:movieTitle, 
            backdrop_path:moviePost,
            runtime:movieRuntime
          }
        } = props;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);
  let variables = {
    userFrom,
    movieId,
    movieTitle,
    moviePost,
    movieRuntime
  }

  useEffect(() => {
    Axios.post('/api/favorite/favoriteNumber', variables)
      .then(response => {
        console.log('response : ',response.data);
        if (response.data.success) {
          setFavoriteNumber(response.data.favoriteNumber);
        }else{
          alert('숫자 정보를 가져오는데 실패 했습니다.');
        }
      })

      Axios.post('/api/favorite/favorited', variables)
      .then(response => {
        if (response.data.success) {
          setFavorited(response.data.favorited);
        }else{
          alert('정보를 가져오는데 실패 했습니다.');
        }
      })

  }, [])

  const onClickFavorite = () => {
    if (Favorited) {
      Axios.post('/api/favorite/remove', variables)
      .then(response => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber - 1);
          setFavorited(!Favorited);
        }else{
          alert('삭제에 실패 했습니다.');
        }
      })
    }else{
      Axios.post('/api/favorite/add', variables)
      .then(response => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          setFavorited(!Favorited);
        }else{
          alert('추가에 실패 했습니다.');
        }
      })
    }
  }

  return (
    <div>
      <Button onClick={onClickFavorite}>{Favorited? ' Not Favorite ':' Add to Favorite '} {FavoriteNumber} </Button>
    </div>
  )
}

export default Favorite
