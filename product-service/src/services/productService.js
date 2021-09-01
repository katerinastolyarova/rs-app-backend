/* eslint-disable comma-dangle */

export const getAllProducts = async (client) => {
  try {
    const { rows: products } = await client.query(
      `SELECT p.id,p.title,p.description, p.price, s.count FROM products AS p 
       LEFT JOIN stocks AS s on p.id=s.product_id`
    );

    return products;
  } catch (error) {
    throw new Error(`${error}: Unable to get products`);
  }
};

export const getProductById = async (client, productId) => {
  try {
    const { rows: productArray } = await client.query(
      `SELECT p.id,p.title,p.description, p.price, s.count FROM products AS p 
       LEFT JOIN stocks AS s on p.id=s.product_id 
       WHERE p.id='${productId}'`
    );

    return productArray[0];
  } catch (error) {
    throw new Error(`${error}: Unable to get products`);
  }
};

export const addProduct = async (client, productData) => {
  try {
    await client.query('BEGIN');
    const insertProductQuery = `INSERT INTO products(title,description,price) VALUES
                                ('${productData.title}','${productData.description}','${productData.price}')
                                RETURNING *`;
    const { rows: insertProduct } = await client.query(insertProductQuery);
    const insertCountQuery = `INSERT INTO stocks(product_id, count) VALUES
                              ('${insertProduct[0].id}', ${productData.count})
                              RETURNING count`;
    const { rows: insertCount } = await client.query(insertCountQuery);
    await client.query('COMMIT');

    return { ...insertProduct[0], ...insertCount[0] };
  } catch (error) {
    await client.query('ROLLBACK');
    throw new Error(`${error}: Unable to add products`);
  }
};

export const deleteProduct = async (client, productId) => {
  try {
    const { rows: removedProduct } = await client.query(
      `DELETE FROM products WHERE id='${productId}' RETURNING id`
    );

    return removedProduct[0];
  } catch (error) {
    throw new Error(`${error}: Unable to remove product`);
  }
};
