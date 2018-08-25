/**
 * API routes
 */

// API handlers
const helloAPIHandler = (data, callback) => {
    if (data) {
        console.log('Information posted by user', data);
        return callback(200, { message: 'Looks like you posted something. Thanks!' });
    }
    return callback(200, { message: 'Hey there! Welcome! Feel free to post any update.' })
};

const applicationRoutes = {
    'hello': helloAPIHandler
};

module.exports = applicationRoutes;
