const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware')

router.get('/', restricted, (req, res) => {
  console.log('in restricted')
  console.log(req.session)
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
