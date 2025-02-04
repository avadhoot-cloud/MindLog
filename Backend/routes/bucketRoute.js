const express = require('express');
const router = express.Router();
const BucketController = require('../controllers/BucketController');

// Get all bucket list items
router.get('/', BucketController.getAllItems);

// Add a new item to the bucket list
router.post('/', BucketController.addItem);

// Update the status of an item
router.put('/:id', BucketController.updateItemStatus);

// Define the route for updating an item
router.put('/:id', BucketController.updateItem);

// Delete an item
router.delete('/:id', BucketController.deleteItem);

module.exports = router;
