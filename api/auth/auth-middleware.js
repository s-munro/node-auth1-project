module.exports = function (req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    console.log(req.session);
    res.status(401).json("You shall not pass!");
  }
};
