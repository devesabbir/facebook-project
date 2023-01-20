import express from 'express'
import userRoute from './UserRoutes.js';
const routes = express.Router()

routes.use('/users', userRoute)

export default routes