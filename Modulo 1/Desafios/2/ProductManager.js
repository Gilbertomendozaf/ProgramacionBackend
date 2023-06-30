const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = "/products.JSON";
  }

  readProductsFile() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  writeProductsFile(products) {
    const data = JSON.stringify(products, null, 2);
    fs.writeFileSync(this.path, data);
  }

  addProduct(productData) {
    const products = this.readProductsFile();

    const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    const product = { id, ...productData };

    products.push(product);

    this.writeProductsFile(products);
  }

  getProducts() {
    return this.readProductsFile();
  }

  getProductById(id) {
    const products = this.readProductsFile();

    const product = products.find(product => product.id === id);

    if (!product) {
      throw new Error('Producto no encontrado.');
    }

    return product;
  }

  updateProduct(id, updatedFields) {
    const products = this.readProductsFile();

    const productIndex = products.findIndex(product => product.id === id);

    if (productIndex === -1) {
      throw new Error('Producto no encontrado.');
    }

    const updatedProduct = { ...products[productIndex], ...updatedFields };
    products[productIndex] = updatedProduct;

    this.writeProductsFile(products);
  }

  deleteProduct(id) {
    const products = this.readProductsFile();

    const updatedProducts = products.filter(product => product.id !== id);

    if (updatedProducts.length === products.length) {
      throw new Error('Producto no encontrado.');
    }

    this.writeProductsFile(updatedProducts);
  }
}


