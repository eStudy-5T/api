// LOG IN

/**
 * @api {post} /login Log In
 *
 * @apiGroup Authentication
 *
 * @apiParam {String} email User's unique email
 * @apiParam {String} password User's password
 *
 * @apiSuccess {String} id User's unique ID
 * @apiSuccess {String} email Email
 * @apiSuccess {String} username Username
 * @apiSuccess {String} accessToken Access token
 * @apiSuccess {String} refreshToken Refresh token
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      "id": 1,
 *      "email": "bkhactri@apple.com",
 *      "username": bkhactri
 *      "accessToken": "egvcbeisdhfieu29.3223479234.23934824iuf237847euhd2",
 *      "refreshToken": "egvcbeisdhfieu29.3223479234.23934824iuf237847euhd2"
 *    }]
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 *    HTTP/1.1 400 Login information is not matched with any account
 */

// SIGN UP

/**
 * @api {post} /signup Sign up account
 *
 * @apiGroup Authentication
 *
 * @apiParam {String} email User's unique email
 * @apiParam {String} password User's password
 *
 * @apiSuccess {String} id User's unique ID
 * @apiSuccess {String} email Email
 * @apiSuccess {String} username Username
 * @apiSuccess {String} accessToken Access token
 * @apiSuccess {String} refreshToken Refresh token
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      "id": 1,
 *      "email": "bkhactri@apple.com",
 *      "username": bkhactri
 *      "accessToken": "egvcbeisdhfieu29.3223479234.23934824iuf237847euhd2",
 *      "refreshToken": "egvcbeisdhfieu29.3223479234.23934824iuf237847euhd2"
 *    }]
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 *    HTTP/1.1 400 Login information is not matched with any account
 */

// LOG OUT

/**
 * @api {post} /logout Log out
 *
 * @apiGroup Authentication
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
