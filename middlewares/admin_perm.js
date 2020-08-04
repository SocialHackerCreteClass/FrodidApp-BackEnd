const admin_perm = (req, res, next) => {
    if (req.session.user.role_id === 1 || req.params.id == req.session.user.id) {
        next();
      } else {
        res.send('Your account is not authorized to access this option.');
      }
  };
  
  module.exports = admin_perm;