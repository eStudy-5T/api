import express from 'express';
import classController from './class.controller';

const classRouter = express.Router();

classRouter.get('/:classId', classController.getSpecificClass);

classRouter.put('/:classId', classController.updateClass);

classRouter.delete('/:classId', classController.deleteClass);

export default classRouter;
