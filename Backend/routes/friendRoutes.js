const express = require('express');
const {
  getAllFriends,
  getFriendById,
  createFriend,
  updateFriend,
  deleteFriend,
} = require('../controllers/friendController');

const router = express.Router();

// Get all friends and crushes
router.get('/', getAllFriends);

// Get a friend or crush by ID
router.get('/:id', getFriendById);

// Create a new friend or crush
router.post('/', createFriend);

// Update a friend or crush
router.put('/:id', updateFriend);

// Delete a friend or crush
router.delete('/:id', deleteFriend);

module.exports = router;
