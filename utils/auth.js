const withAuth = (req, res, next) => {
    //when no session user id
    //redirect to login page
    if (!req.session.user_id) {
      res.redirect('/login');
    } else {
    //otherwise continue/call next middlware
    //in this case it will call the fetch request
      next();
    }
  };
  
  module.exports = withAuth;