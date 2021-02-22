
// hooks 
require('../config/database')
const mongoose = require('mongoose')

// before test check connection 
describe('hooks before', () => {

    before((done) => {
        mongoose.connect(dbConnectionURL.LOCALURL, options);
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'Mongodb Connection Error:' + dbConnectionURL.LOCALURL));
        db.once('open', () => {

            console.log('###### ======== Mongodb Connection Successful ========= ########');
            done()
        });
        done()
    })

})
beforeEach((done) => {
    mongoose.connection.collections.posts.drop(() => {
        done();
    })
})