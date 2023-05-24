# Full Stack E-commerce PERN App Written in Typescript<br>
<p style="text-align: center"><b>Live Website Link <a href="www.google.com" title="TODO" >'Coming Soon' TODO</a></b><p>

___

- [Full Stack E-commerce PERN App Written in Typescript](#full-stack-e-commerce-pern-app-written-in-typescript)
  - [**Overview**:](#overview)
    - [**Educational recourses used**](#educational-recourses-used)
  - [**Instillation and usage**](#instillation-and-usage)
  - [**Live Link**](#live-link)
  - [**Front End:**](#front-end)
  - [**Back End:**](#back-end)
    - [DataBase Schema](#database-schema)
    - [**Points of interest:**](#points-of-interest)
      - [*product, quantity and category table :* ](#product-quantity-and-category-table--)
      - [*Cart checkout process:* ](#cart-checkout-process-)

## **Overview**:
Made for educational purpose's.
1. #### **Author**: 
     - *Sean Paulson*. 
      - Contact Me: portfolio *<Link:TODO>* Linked *<Link:TODO>* <br>

2. **App Structure And Thoughts**:<br>
This app is designed using a MVC Structure. <br><br>
It allows Customers to Browse Products stored on the database, store them in there cart and checkout their active cart. Customers can also retrieve their cart after logging out.<br>
Authentication/Authorization is handled with bcrypt and express-sessions.<br><br>

1. #### **Focus**: 
     - Learn back end technologies, languages and architecture
2. **Languages and Technologies used**
    - Postgress
       - PGPL/POSTGRESQL
       - SQL
     - Node
        - Express
        - Express Session
        - bcrypt
        - pg (node-postgress query tool)
        - connect-pg-simple
     - Typescript
     - swagger-jsdoc
  
### **Educational recourses used**
I was reading *Designing Data Intensive Applications* by  Martin Kleppmann <br>
while designing the backend for this application

___

## **Instillation and usage**
###**coming soon**
  - Fork or clone Git
  - npm install
  - npm run build
  - npm run dev
  - prebuilt database is coming soon. 

## **Live Link**
*<Link:TODO>*

___

## **Front End:**
    TODO

___

## **Back End:**
### DataBase Schema
<img src=".server/Design/schemaV2.0.1.png">

### **Points of interest:** 
#### *product, quantity and category table :* <br>
The tricky part about this design is products are not listed as there own tuple, instead items(products) are grouped together and their quantity is referenced in a separate product_inventory table with a quantity field. Probably not necessary since this is a 1 to 1 relationship but it allows for expansion.<br>
Because of this, quantity has a *non_negative_check* before checkout and only on a successful checkout is the product_inventory is reduced.<br>
<br>
#### *Cart checkout process:* <br>
The shopping cart (cart_items table) is made up of 3 columns ~ *customer_id*, *product_id* and quantity.
The checkout process is handled by database functions/procedures instead of being handled programmatically by the cart_controller. This allows for less calls to the database and increased security/data synchrony.<br><br>
The cart_items is a join table with a composite primary key of *user_id* and *customer_id* and a unique_userid_customerid_check made from the customer and product table. <br> 
The checkout process is handled by a plpgsql procedure *checkout* that takes a customer id as a parameter. It also uses a get_user_cart function written with plpgsql shown here:

~~~
CREATE OR REPLACE FUNCTION commerce.get_user_cart(
	id integer)
    RETURNS TABLE(user_id integer, name character varying, description text, price money, quantity integer, total money) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
RETURN QUERY SELECT
		cart_items.user_id,
		product.name, 
		product.description, 
		product.price, 
		cart_items.quantity,
		product.price * cart_items.quantity AS total
	FROM commerce.cart_items 
	JOIN commerce.product
	  ON commerce.product.id = commerce.cart_items.prod_id
WHERE cart_items.user_id = $1;
RETURN;
END;
$BODY$;
~~~
---
~~~
REATE OR REPLACE PROCEDURE commerce.checkout(
	IN uid integer)
LANGUAGE 'plpgsql'
AS $BODY$

DECLARE item RECORD;
DECLARE order_details_id integer;
BEGIN 
	RAISE NOTICE 'storing user order info...';
	INSERT INTO commerce.order_details (
			user_id,
			total
		)
		SELECT user_id, sum(total) FROM commerce.get_user_cart($1) 
		GROUP BY user_id
		RETURNING id INTO order_details_id;
	
	INSERT INTO commerce.order_items (order_id, product_id, quantity) 
	SELECT DISTINCT ON (prod_id) order_details_id, prod_id, quantity
	FROM commerce.cart_items
	JOIN commerce.order_details 
		ON order_details.user_id = cart_items.user_id
	WHERE cart_items.user_id = $1;
	
	RAISE NOTICE 'removing cart item from product inventory...';
	FOR item IN 
		SELECT quantity, prod_id, user_id FROM commerce.cart_items WHERE user_id = $1
	LOOP
		BEGIN
			RAISE NOTICE 'updating product inventory';
			UPDATE commerce.product_inventory 
			SET quantity = quantity - item.quantity WHERE product_id = item.prod_id ;
			EXCEPTION 
				WHEN SQLSTATE '23514' THEN
				RAISE EXCEPTION 'check constraint non negative %', item
				USING COLUMN=item.prod_id, ERRCODE='23514';
		END;
	END LOOP;
	RAISE NOTICE 'updated product inventory';
	RAISE NOTICE 'deleting user_cart';
	DELETE FROM commerce.cart_items WHERE user_id = uid;
	RAISE NOTICE 'Order Complete!';
	RETURN;
END;
$BODY$;
~~~
<br>
One interesting thing to note is the using the for loop to loop through cart_items table to update product inventory, since a customer can have multiple items in a cart.
Also if any part of this procedure fails the entire transaction fails.


