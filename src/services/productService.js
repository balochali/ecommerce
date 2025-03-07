const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createProduct = async (name, description, price, stock) => {
  return await prisma.product.create({
    data: { name, description, price, stock },
  });
};

const getAllProducts = async () => {
  return await prisma.product.findMany();
};

const getProductById = async (id) => {
  return await prisma.product.findUnique({ where: { id } });
};

const updateProduct = async (id, data) => {
  return await prisma.product.update({
    where: { id },
    data,
  });
};

const deleteProduct = async (id) => {
  return await prisma.product.delete({ where: { id } });
};

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
