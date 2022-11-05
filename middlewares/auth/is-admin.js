module.exports = (req, res, next) => {
  console.log(req.user);
  if (req.user.role == "admin") return next();
  const error = new Error("Not Authuorized.");
  error.statusCode = 401;
  return next(error);
};
