const express = require('express');

module.exports = (models) => {
    const router = express.Router();
    const Medication = models.Medication;
    const Pharmacy = models.Pharmacy;

    router.get('/', async (req, res) => {
        try {
            const medications = await Medication.findAll({
                include: [
                    {
                        model: Pharmacy,
                        through: { attributes: [] }
                    },
                ],
            });
            res.json(medications);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
};
