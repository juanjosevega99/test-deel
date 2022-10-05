const { Router } = require('express');

const { getProfile } = require('../middleware/getProfile');
const {
  getContractById,
  getActiveContracts
} = require('../controllers/contract');
const { getUnpaidJobs, payJob } = require('../controllers/jobs');
const { depositBalance } = require('../controllers/users');
const { getBestClients, getBestProfession } = require('../controllers/admin');

const router = Router();

router.get('/health', (_req, res) => res.status(200).send({ status: 'pass' }));
router.get('/contracts/:id', getProfile, getContractById);
router.get('/contracts', getProfile, getActiveContracts);
router.get('/jobs/unpaid', getProfile, getUnpaidJobs);
router.post('/jobs/:job_id/pay', getProfile, payJob);
router.post('/balances/deposit/:userId', depositBalance);
router.get('/admin/best-profession', getBestProfession);
router.get('/admin/best-clients', getBestClients);

module.exports = router;
