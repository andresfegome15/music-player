const catchAsync = af => {
  return (req, res, next) => {
    af(req, res, next).catch(error => next(error));
  };
};

module.exports = { catchAsync };
