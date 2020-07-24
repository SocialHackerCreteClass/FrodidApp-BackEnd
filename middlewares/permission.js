const permission = (req, res, next) => {
  if (req.params.id == req.session.user.id) {
    next();
  } else {
    res.send('You are not allowed to do this');
  }
};

module.exports = permission;
