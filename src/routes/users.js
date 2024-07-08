const userController = require('../controller/user')
const router = require('express').Router()


// start
router.route('/')
     // to retrieve a single resource
     .get(userController.getStart)

// create new account
router.route('/create')
     .post(userController.createNewAccount)

// Read all data
router.route('/read')
      .get(userController.readAllData)


// Get single user from db
router.route('/read/:phone')
      .get(userController.getSingleData)

// Update point for single user
router.route('/update/:phone')
      .patch(userController.updatePoint)

module.exports = router