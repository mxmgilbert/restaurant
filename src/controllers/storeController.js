exports.homePage = (req, res) => {
  res.render('index', { title: 'Welcome' });
};

// we render the same template to add or edit an existing store
exports.addStore = (req, res) => {
  res.render('editStore', { title: 'Add Store' });
};

exports.createStore = (req, res) => {
  res.json(req.body);
};