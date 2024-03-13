const express = require('express');

module.exports = (models) => {
    const router = express.Router();
    const Pharmacy = models.Pharmacy;
    const Medication = models.Medication;

    router.get('/', async (req, res) => {
        const pharmacies = await Pharmacy.findAll({
            include: [
                {
                    model: Medication,
                    through: { attributes: [] }
                },
            ],
        });
        res.json(pharmacies);
    });

    return router;
};
