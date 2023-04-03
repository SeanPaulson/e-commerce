/**
*@swagger
* components:
*  schemas:
*    user:
*        type: object
*        properties:
*          id:
*            type: integer
*            description: user ID
*            example: 1
*          first_name:
*            type: string
*            description: user ID
*            example: sean
*          last_name:
*            type: string
*            description: user ID
*            example: dirt
*          email_address:
*            type: string
*            description: user ID
*            example: fake@fake.com
*          phone:
*            type: string
*            description: user ID
*            example: 111-111-1111
*    userAddress:
*     type: object
*     properties:
*         address_line1:
*           type: string
*           description: users address
*         address_line2:
*           type: string
*         city:
*           type: string
*           description: user ID
*           example: city
*         zip_code:
*           type: string
*           description: zip_code
*           example: 11111
*         country_code:
*           type: string
*           description: Country where customer resides
*           example: US
*    userPayment:
*     type: object
*     properties:
*         expires:
*           type: string
*           format: date
*           description: date the payment method expires
*         provider:
*           type: string
*           description: payment provider -ie Visa
*    userOrders:
*     type: object
*     properties:
*         id:
*           type: integer
*           description: order ID
*         user_id:
*           type: integer
*           description: users ID
*         total:
*           type: integer
*           description: total user spent on all items in order
*    orderItems:
*     type: object
*     properties:
*         id:
*           type: integer
*           description: order item ID
*         order_id:
*           type: integer
*           description: order ID
*         product_id:
*           type: integer
*           description: product id for this order
*         quantity:
*           type: integer
*           description: order quantity for this item.
*         created_at:
*           type: string
*           format: date
*           description: time the order was placed
*         modified_at:
*           type: string
*           format: date
*           description: time the order was modified. should be the same as created.
*           
*/
   
