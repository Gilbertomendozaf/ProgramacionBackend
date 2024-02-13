import express from 'express'

const express = require('express');
const ProductManager = require('./ProductManager.js');

const app = express();
const productManager = new ProductManager('products.json');

// Endpoint para obtener todos los productos
app.get('/productos', (req, res) => {
  const products = productManager.getProducts();
  res.json(products);
});

// Endpoint para obtener un producto por ID
app.get('/productos/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  try {
    const product = productManager.getProductById(productId);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Puerto en el que escucha el servidor
const port = 3000;

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
