import express from 'express';
import { protectRoute } from '../middleware/auth.js';
import { getMesseges, getUserForSidebar, markMessageAsSeen, sendMessage } from '../controllers/messageController.js';
const messageRouter = express.Router();


messageRouter.get('/users',protectRoute,getUserForSidebar);
messageRouter.get('/:id',protectRoute,getMesseges);
messageRouter.put('/mark/:id',protectRoute,markMessageAsSeen);
messageRouter.post('/send/:id',protectRoute,sendMessage)


export default messageRouter;

