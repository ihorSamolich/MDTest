const express = require('express');

module.exports = (models) => {
    const router = express.Router();
    const OrderData = models.OrderData;
    const OrderItem = models.OrderItem;
    const Medication = models.Medication;

    router.get('/', async (req, res) => {
        try {

            const orders = await OrderData.findAll({
                include: [{
                    model: OrderItem,
                    include: [Medication] // Включаємо дані з моделі Medication у OrderItem
                }]
            });

            // Повертаємо список замовлень у відповідь
            res.status(200).json(orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });


    router.post('/', async (req, res) => {
        try {
            const { items, customer } = req.body;
            const { address, email, phone, name } = customer;

            const newOrderData = await OrderData.create({ address, email, phone, name });

            for (const item of items) {
                await OrderItem.create({
                    count: item.count,
                    OrderDatumId: newOrderData.id,
                    MedicationId: item.medicate.id,
                });
            }


            res.status(201).json(newOrderData);
        } catch (error) {
            console.error('Error creating order data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    return router;
};
