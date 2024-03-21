import express from 'express';
const router = express.Router();
import SubmissionController from '../controllers/submissionController.js';

router.post('/submissions', SubmissionController.createSubmission);

router.get('/submissions', SubmissionController.getAllSubmission);

router.get('/submissions-accepted', SubmissionController.getAllAcceptedSubmission);

router.get('/submissions-rejected', SubmissionController.getAllRejectedSubmission);

router.get('/submissions-process', SubmissionController.getAllProcessSubmission);

router.get('/submissions/:id', SubmissionController.getSubmissionById);

router.put('/submissions/:id', SubmissionController.updateSubmission);

router.put('/submissions-status/:id', SubmissionController.updateSubmissionStatus);

router.delete('/submissions/:id', SubmissionController.deleteSubmission);

export default router;