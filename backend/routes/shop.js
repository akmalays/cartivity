 const express = require('express');

const router = express.Router();

module.exports = (supabase) => {
  // Get all products
  router.get('/', async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*');
      if (error) throw error;

      // Group by tag
      const grouped = data.reduce((acc, product) => {
        if (!acc[product.tag]) acc[product.tag] = [];
        acc[product.tag].push(product);
        return acc;
      }, {});
      res.json(grouped);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Add product (for admin)
  router.post('/', async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([req.body])
        .select();
      if (error) throw error;
      res.status(201).json(data[0]);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  return router;
};