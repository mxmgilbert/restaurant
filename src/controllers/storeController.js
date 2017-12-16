const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homePage = (req, res) => {
  res.render('index', { title: 'Welcome' });
};

// We render the form template to add a store
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
  res.render('stores', { title: 'Stores', stores });
};

// Load the form template to edit a store (same template as for creating one)
exports.editStore = async (req, res) => {
  // Find the store given the id
  const store = await Store.findOne({ _id: req.params.id });
  // TODO : confirm they are the owner of the store
  // Render out the edit form so the user can update their store
  res.render('editStore', { title: `Edit ${store.name}`, store });
};

// Update the store values
exports.updateStore = async (req, res) => {
  // Find and update the store
  const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // Return the new store instead of the old one
    runValidators: true // check that required fields are filled
  }).exec();
  // Redirect the user to the edit form and confirm that changes have been accounted
  req.flash('success', `Successfull updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View Store</a>`);
  res.redirect(`/stores/${store._id}/edit`)
};