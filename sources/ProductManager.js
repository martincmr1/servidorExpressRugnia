const fs = require('fs')
const products=[]

class ProductManager {    
    path
    idProduct=0
    codeProduct=0
    constructor(file){
        this.path= `${process.cwd()}/${file}`
    }
    async addProduct(product){
        try { 
            const { id, title, description, price, thumbnail,code,stock } = product
            const infoProduct = {                
               id:++this.idProduct,
                title,
                description,
                price,
                thumbnail,
                code:++this.codeProduct,
                stock,
            }
            products.push(infoProduct)
            if (fs.existsSync(this.path)) {
                await fs.promises.appendFile(this.path, JSON.stringify(products));
              } else {
                await fs.promises.writeFile(this.path, JSON.stringify(products));
              }        
              return infoProduct;      
        } catch (error) {
            console.log(error)            
        }
    }
    async getProducts() {
      try {
        if (fs.existsSync(this.path)) {
          const data = await fs.promises.readFile(this.path, 'utf-8');
          return data; 
        }
        return []; 
      } catch (error) {
        console.log(error);
        return []; 
      }
    }
    
      async getProductById(id) {
        try {
          const data = await fs.promises.readFile(this.path, 'utf-8');
          const product = JSON.parse(data);
          return product.find(product => product.id === id) || console.log('id no encontrado');
        } catch (error) {
         console.error('Error al leer el archivo:', error);
          return null;
        }
      }
      async updateProduct(id, updatedFields) {
        try {
          const products = await this.getProducts();
          const productIndex = products.findIndex(product => product.id === id);
          if (productIndex !== -1) {
            const updatedProduct = {
              ...products[productIndex],
              ...updatedFields,
            }; 
            products[productIndex] = updatedProduct;    
            await fs.promises.writeFile(this.path, JSON.stringify(products));    
            return updatedProduct;
          }    
          return null;
        } catch (error) {
          console.log(error);
          return null;
        }
      }
      async deleteProduct(id) {
        try {
          const data = await fs.promises.readFile(this.path, 'utf-8');
          const products = JSON.parse(data);
      
          const index = products.findIndex(product => product.id === id);
          if (index !== -1) {
            products.splice(index, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            console.log('Producto eliminado');
          } else {
            console.log('ID no existe');
          }
        } catch (error) {
          console.error('Error en el archivo:', error);
        }
      }     
    }
    
//const productManager = new ProductManager('Productos.json')




/////////testing addProduct//////////////////////
/*
const product = {
    title : 'plancha',
    description:'atma',  
    price:2600,
    thumbnail:'www.imagen.jpg',
    stock:20 
}
const product1 = {
  title : 'Celular',
  description:'nokia',  
  price:2500,
  thumbnail:'www.imagen.jpg',
  stock:20
}
const product2 = {
  title : 'tv',
  description:'samsung',  
  price:500,
  thumbnail:'www.imagen.jpg',
  stock:20
}
const product3 = {
  title : 'estufa',
  description:'orbis',  
  price:800,
  thumbnail:'www.imagen.jpg',
  stock:20
}


const product4 = {
  title : 'heladera',
  description:'siam',  
  price:7000,
  thumbnail:'www.imagen.jpg',
  stock:20
}
const product5 = {
  title : 'pantalon',
  description:'levis',  
  price:72000,
  thumbnail:'www.imagen.jpg',
  stock:160
}
const product6 = {
  title : 'camisa',
  description:'moha',  
  price:2000,
  thumbnail:'www.imagen.jpg',
  stock:22
}
const product7 = {
  title : 'cinturon',
  description:'cuero',  
  price:1000,
  thumbnail:'www.imagen.jpg',
  stock:5
}
const product8 = {
  title : 'auto',
  description:'hot whells',  
  price:9000,
  thumbnail:'www.imagen.jpg',
  stock:1
}
const product9 = {
  title : 'helado',
  description:'frutilla',  
  price:2,
  thumbnail:'www.imagen.jpg',
  stock:60
}


productManager.addProduct(product)
productManager.addProduct(product1)
productManager.addProduct(product2)
productManager.addProduct(product3)
productManager.addProduct(product4)
productManager.addProduct(product5)
productManager.addProduct(product6)
productManager.addProduct(product7)
productManager.addProduct(product8)
productManager.addProduct(product9)
*/
/////////////testing getProducts//////////////////////////////////////////////////////
/*
productManager
  .getProducts()
  .then(products => console.log(products))
  .catch(err => console.log(err));

*/

//////////////testing getProductsById///////////////////////////////////////
/*
const productId = 9;
productManager
 .getProductById(productId)
 .then(product => {
  if (product) {
    console.log('Producto encontrado:', product);
      } else {
     console.log('Producto no encontrado.');
      }
    })
    .catch(err => console.log(err));

*/

//////////////////testing updateProduct/////////////////////
/*  
const productId = 2;
    const updatedFields = {
        title: 'estufa',
        price: 6500,
      };
productManager
  .updateProduct(productId, updatedFields)
  .then(updatedProduct => {
   if (updatedProduct) {
   console.log('Producto actualizado:', updatedProduct);
    } else {
    console.log('Producto no encontrado.');
    }
   })
  .catch(err => console.log(err));
*/


///////////////////testing deleteProduct//////////////////////
/*
productManager.deleteProduct(2)
*/




module.exports = ProductManager
