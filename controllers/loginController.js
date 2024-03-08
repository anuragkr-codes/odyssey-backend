const test = function (req, res) {
  console.log("Triggered test inside loginController of loginRoute");
  console.log(req.body);
  res.json("from the loginController of loginRoute");
};

module.exports = {
  test,
};
