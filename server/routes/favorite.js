const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite');

//=================================
//             Favorite
//=================================

router.post('/favoriteNumber', (req, res) => {
  
  //mongoDB에서 Favorite숫자 가져오기
  Favorite.find({'movieId':req.body.movieId})
  .exec((err, info) => {
    if(err) return res.status(400).send(err);
    res.status(200).json({success:true, favoriteNumber:info.length });
  })
  //그 다음에 프론트에 다시 숫자정보를 보내주기
})

router.post('/favorited', (req, res) => {
  
  //mongoDB에서 Favorited 여부 가져오기
  Favorite.find({'movieId':req.body.movieId, 'userFrom': req.body.userFrom})
  .exec((err, info) => {
    if(err) return res.status(400).send(err);

    let result = false;
    if (info.length !== 0)
      result = true;

    res.status(200).json({success:true, favorited:result });
  })
  //그 다음에 프론트에 다시 숫자정보를 보내주기
})

router.post('/add', (req, res) => {
  console.log("req.body : ", req.body);
  const favorite = new Favorite(req.body);
  favorite.save((err, doc) => {
    if(err) return status(400).send(err);
    return res.status(200).json({success:true});
  })
})

router.post('/remove', (req, res) => {
  Favorite.findOneAndDelete({movieId:req.body.movieId, userFrom:req.body.userFrom})
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({success:true, doc});
    })
})

router.post('/getFavoredMovie', (req, res) => {
  Favorite.find({'userFrom': req.body.userFrom})
    .exec((err, favorites) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({success:true, favorites});
    })
})


module.exports = router;
