const permission = (req, res, next) => {
  if (req.params.id == req.session.user.id) {
    next();
  } else {
    res.status(401).send('You are not allowed to do this');
    //res.render('error', { "error": "You are not allowed to do this" });
    //res.send('You are not allowed to do this');
  }
};

module.exports = permission;
