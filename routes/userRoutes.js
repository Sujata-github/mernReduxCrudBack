import express, { Router } from 'express'
import User from '../models/User.js'
import { successResponse, errorResponse } from '../helper/serverResponse.js'

const router = Router()

//Get All Users
router.get('/', async (req, res) => {
  try {
    const data = await User.find()
    if (!data) {
      errorResponse(res, 404, 'data not found')
    }
    successResponse(res, 'Success', data)
    // res.json(users)
  } catch (err) {
    errorResponse(res, 500, 'internal server error')
  }
})

// //Create a new User
// router.post('/create', async (req, res) => {
//   try {
//     const { firstname, lastname, email, mobile } = req.body
//     console.log(req.body)
//     if (!firstname || !lastname || !email || !mobile) {
//       errorResponse(res, 404, 'some params are missing')
//     }
//     // const newUser = new User({ firstname, lastname, email, mobile })
//     // const savedUser = await newUser.save()
//     // res.json({ message: 'User Created Successfully' })

//     const data = await User.create({
//       firstname,
//       lastname,
//       email,
//       mobile
//     })
//     if (!data) {
//       errorResponse(res, 404, 'data not found')
//     }
//     successResponse(res, 'Success', data)
//   } catch (err) {
//     errorResponse(res, 500, 'internal server error')
//   }
// })

// //Update a User
// router.post('/update/:id', async (req, res) => {
//   try {
//     const { id } = req.params
//     const updatedData = req.body
//     const updated = await User.findByIdAndUpdate(id, updatedData, {
//       new: true
//     })
//     if (
//       !updatedData.firstname ||
//       !updatedData.lastname ||
//       !updatedData.email ||
//       !updatedData.mobile
//     ) {
//       errorResponse(res, 500, 'internal server error')
//       return
//     }
//     successResponse(res, 'success Updated', updated)
//   } catch (err) {
//     errorResponse(res, 500, 'Internal server error ')
//   }
// })

// Create a new User
router.post('/create', async (req, res) => {
  try {
    const { firstname, lastname, email, mobile } = req.body

    if (!firstname || !lastname || !email || !mobile) {
      return errorResponse(res, 400, 'Some parameters are missing')
    }

    const data = await User.create({
      firstname,
      lastname,
      email,
      mobile
    })

    successResponse(res, 'User created successfully', data)
  } catch (err) {
    if (err.code === 11000 && err.keyPattern.email) {
      // Duplicate email error
      return errorResponse(res, 400, 'Email already exists')
    }
    errorResponse(res, 500, 'Internal server error')
  }
})

// Update a User
router.post('/update/:id', async (req, res) => {
  try {
    const { id } = req.params
    const updatedData = req.body

    if (
      !updatedData.firstname ||
      !updatedData.lastname ||
      !updatedData.email ||
      !updatedData.mobile
    ) {
      return errorResponse(res, 400, 'Some parameters are missing')
    }

    const updated = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true // Ensures validation runs on update
    })

    if (!updated) {
      return errorResponse(res, 404, 'User not found')
    }

    successResponse(res, 'User updated successfully', updated)
  } catch (err) {
    if (err.code === 11000 && err.keyPattern.email) {
      // Duplicate email error
      return errorResponse(res, 400, 'Email already exists')
    }
    errorResponse(res, 500, 'Internal server error')
  }
})

router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params
    const data = await User.findByIdAndDelete(id)
    console.log(data)
    if (!data) {
      return errorResponse(res, 404, 'data not found')
    }
    successResponse(res, 'success')
  } catch (err) {
    errorResponse(res, 500, 'internal server error')
  }
})

export default router
