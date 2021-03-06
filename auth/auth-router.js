const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../users/users-model.js');



// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
      req.session.user = user;
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  console.log(req.body)
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // req.session.username = user.username;
        req.session.username = user.username;
        res.status(200).json({
          message: `Welcome ${user.username}!, have a cookie!`,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json({error});
    });
});

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.send('you can checkout any time you like, but you can never leave....')
      } else {
        res.send('bye, thanks for playing')
      }
    })
  } 
  else {
    res.end();
  }
})

module.exports = router;
