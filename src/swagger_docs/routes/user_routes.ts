/**
*@swagger
*  paths:
*   /users: 
*    get:
*     description: Get all users. Currently limited to 10.
*     responses:
*      200:
*        description: A array of users.
*        content: 
*          application/json:
*            schema:
*                type: array
*                items:
*                    $ref: '#/components/schemas/user'
*      tags:
*         - users
*/  

/**
*@swagger
* paths:
*   /users/{id}: 
*     get:
*      description: Get user by id.
*      parameters:
*         - in: path
*           name: id
*           required: true
*           schema:
*             type: integer
*             minimum: 0
*           description: The user ID
*      responses:
*       200:
*         description: A user object.
*         content: 
*           application/json:
*            schema:
*              allOf:
*               - $ref: '#/components/schemas/user'
*               - $ref: '#/components/schemas/userAddress'
*               - $ref: '#/components/schemas/userPayment'
*       402:
*         description: Not found Error
*       tags:
*          - users
*/

/**
*@swagger
* paths:
*   /users/{id}/profile: 
*    put:
*     description: update user profile by id.
*     parameters:
*        - in: path
*          name: id
*          required: true
*          schema:
*            type: integer
*            minimum: 0
*          description: The user ID
*     requestBody:
*       description: User can update one Property at a time. see schema
*       required: true
*       content:
*         application/json:
*           schema:
*             allOf:
*                - $ref: '#/components/schemas/user'
*                - $ref: '#/components/schemas/userAddress'
*                - $ref: '#/components/schemas/userPayment'
*           example:
*             first_name
*     responses:
*      200:
*        description: A user object.
*        content: 
*          application/json:
*           schema:
*             oneOf:
*              - $ref: '#/components/schemas/user'
*              - $ref: '#/components/schemas/userAddress'
*              - $ref: '#/components/schemas/userPayment'
*           example:
*             first_name: 'new first name'
*      402:
*        description: Not found Error
*/  


/**
*@swagger
* paths:
*   /users/{id}: 
*    delete:
*     description: delete user profile by id.
*     parameters:
*        - in: path
*          name: id
*          required: true
*          schema:
*            type: integer
*            minimum: 0
*          description: The user ID
*     responses:
*      200:
*        description: user Deleted
*      402:
*        description: cannot delete user
*/  

/**
*@swagger
* paths:
*   /users/{id}/orders: 
*    get:
*     description: gets all user orders by id.
*     parameters:
*        - in: path
*          name: id
*          required: true
*          schema:
*            type: integer
*            minimum: 0
*          description: The user ID
*     responses:
*      200:
*        description: list of users orders.
*        content: 
*          application/json:
*           schema:
*             $ref: '#/components/schemas/userOrders'
*      402:
*        description: Not found Error
*/

/**
*@swagger
* paths:
*   /users/{id}/orders/{order_id}: 
*    tags:
*     - orders
*    get:
*     description: gets all user orders by id.
*     parameters:
*        - in: path
*          name: id
*          required: true
*          schema:
*            type: integer
*            minimum: 0
*          description: The user ID
*        - in: path
*          name: order_id
*          required: true
*          schema:
*            type: integer
*            minimum: 0
*          description: The order ID
*     responses:
*      200:
*        description: list of users orders.
*        content: 
*          application/json:
*           schema:
*             $ref: '#/components/schemas/orderItems'
*      402:
*        description: Not found Error
*/