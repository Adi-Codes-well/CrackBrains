const express = require('express');
const router = express.Router();
const { getTrustScore } = require('../controllers/trustController');

router.get('/:supplierId', getTrustScore);

module.exports = router;
