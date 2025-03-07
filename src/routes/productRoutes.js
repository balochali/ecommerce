const express = require("express");
const { authMiddleware, authorizeRoles } = require("../middlewares/authMiddleware");
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require("../services/productService");

const router = express.Router();

// Get all products (Public)
router.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single product (Public)
router.get("/:id", async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new product (Admin only)
router.post("/", authMiddleware, authorizeRoles("ADMIN"), async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const product = await createProduct(name, description, price, stock);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update product (Admin only)
router.put("/:id", authMiddleware, authorizeRoles("ADMIN"), async (req, res) => {
  try {
    const updatedProduct = await updateProduct(req.params.id, req.body);
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete product (Admin only)
router.delete("/:id", authMiddleware, authorizeRoles("ADMIN"), async (req, res) => {
  try {
    await deleteProduct(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
