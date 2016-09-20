import express from 'express';
import restaurant from './restaurant';
import search from './search';

const router = new express.Router();

router.use('/restaurant', restaurant);
router.use('/search', search);

export default router;
