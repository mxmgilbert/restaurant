const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homePage = (req, res) => {
  res.render('index', { title: 'Welcome' });
};

// We render the same template to add or edit an existing store
exports.addStore = (req, res) => {
  res.render('editStore', { title: 'Add Store' });
};

// Create new store in MongoDB using Async / Await
exports.createStore = async (req, res) => {
  // We wait to the store to come back, this way we can use the slug
  const store = await (new Store(req.body)).save();
  req.flash('success', `Successfully created ${store.name}. Care to leave a review ?`);
  res.redirect(`/store/${store.slug}`);
};

// Get the store from DB and pass it to the template
exports.getStores = async (req, res) => {
  // Query the database for a list of all stores
  const stores = await (Store.find());
  res.render('stores', {title: 'Stores', stores});
};