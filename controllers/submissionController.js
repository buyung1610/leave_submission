import jwt from 'jsonwebtoken';
import Submission from '../models/submissionModel.js';

const SubmissionController = {
    createSubmission: async (req, res) => {
        try {
            const submissionId = await Submission.create(req.body, req.body.selectedOption);
            res.status(201).json({ submissionId });
        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    getAllSubmission: async (req, res) => {
        try {
            const submissions = await Submission.getAll();
            res.status(200).json(submissions);
        } catch (error) {
            console.error('Error fetching data :', error);
            res.status(500).send('Internal server error');
        }
    },
    getAllAcceptedSubmission: async (req, res) => {
        try {
            const submissions = await Submission.getAllAccepted();
            res.status(200).json(submissions);
        } catch (error) {
            console.error('Error fetching data :', error);
            res.status(500).send('Internal server error');
        }
    },
    getAllProcessSubmission: async (req, res) => {
        try {
            const submissions = await Submission.getAllProcess();
            res.status(200).json(submissions);
        } catch (error) {
            console.error('Error fetching data :', error);
            res.status(500).send('Internal server error');
        }
    },
    getAllRejectedSubmission: async (req, res) => {
        try {
            const submissions = await Submission.getAllRejected();
            res.status(200).json(submissions);
        } catch (error) {
            console.error('Error fetching data :', error);
            res.status(500).send('Internal server error');
        }
    },
    getSubmissionById: async (req, res) => {
        try {
            const submission = await Submission.getById(req.params.id);
            res.json(submission);
        } catch (err) {
            console.error('Error:', err);
            res.status(404).json({ error: 'Submission not found' });
        }
    },
    updateSubmission: async (req, res) => {
        try {
            await Submission.update(req.params.id, req.body);
            res.json({ message: 'Submission updated successfully' });
        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    updateSubmissionStatus: async (req, res) => {
        try {
            await Submission.updateStatus(req.body, req.params.id);
            res.json({ message: 'Submission updated successfully' });
        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    deleteSubmission: async (req, res) => {
        try {
            await Submission.delete(req.params.id);
            res.json({ message: 'Submission deleted successfully' });
        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

export default SubmissionController;