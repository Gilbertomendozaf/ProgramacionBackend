class ProductManager {
  constructor() {
    this.products = [];
    this.lastProductId = 0;
  }

  getProducts() {
    return this.products;
  }

  addProduct(productData) {
    const { title, description, price, thumbnail, code, stock } = productData;
    
    // Comprobar si el código ya está en uso
    const isCodeRepeated = this.products.some(product => product.code === code);
    if (isCodeRepeated) {
      throw new Error('El código del producto ya está en uso.');
    }

    const product = {
      id: ++this.lastProductId,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    };

    this.products.push(product);
  }

  getProductById(productId) {
    const product = this.products.find(product => product.id === productId);

    if (!product) {
      throw new Error('Producto no encontrado.');
    }

    return product;
  }
}

///

// Crear una instancia de ProductManager
const productManager = new ProductManager();

// Obtener los productos (debe devolver un arreglo vacío)
console.log(productManager.getProducts()); // []

// Agregar un producto
try {
  productManager.addProduct({
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25
  });
  console.log('Producto agregado satisfactoriamente.');
} catch (error) {
  console.log('Error al agregar el producto:', error.message);
}

// Obtener los productos nuevamente (debe aparecer el producto recién agregado)
console.log(productManager.getProducts());

// Intentar agregar un producto con el mismo código (debe arrojar un error)
try {
  productManager.addProduct({
    title: 'producto prueba 2',
    description: 'Este es otro producto prueba',
    price: 150,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 20
  });
  console.log('Producto agregado satisfactoriamente.');
} catch (error) {
  console.log('Error al agregar el producto:', error.message);
}

// Obtener un producto por su ID
try {
  const productId = 1; // ID del producto a buscar
  const product = productManager.getProductById(productId);
  console.log('Producto encontrado:', product);
} catch (error) {
  console.log('Error al obtener el producto:', error.message);
}