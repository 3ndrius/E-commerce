const mocha = require('mocha');
const assert = require('assert');
const Post = require('../src/models/post.model');

describe('Save post record', function () {

    //test save
    it('Save a record correctly', function (done) {
        let post = new Post({
            title: "Just new title"

        })
        post.save().then(function () {
            assert(post.isNew === false)
            done()
        })
    })
})


describe('Finds records in database', function () {
    let post;
    beforeEach(function (done) {
        post = new Post({
            title: 'First post'
        });
        post.save().then(() => {
            assert(post.isNew === false);
            done();
        })
    })

    it('Find one record from the database', function (done) {

        Post.findOne({ title: 'First post' }).then(function (res) {
            assert(res.title === 'First post');
            done();
        })
    });
    it('Find post by id', (done) => {
        Post.findById(post._id).then((res) => {
            assert(post._id.toString === res._id.toString);
            done();
        })
    })

});

describe('Delete post record from database', () => {
    let post;
    beforeEach((done) => {
        post = new Post({
            title: "New Post"
        });
        post.save().then(() => {
            assert(post.isNew === false);
            done();
        })
    });
    it('Delete one record from database', (done) => {
        Post.findOneAndRemove({ title: "New Post" }).then(() => {
            Post.findOne({ title: "New Post" }).then((result) => {
                assert(result === null);
                done();
            })
        })
    });

});

describe('Update record in database', () => {
    let post;
    beforeEach((done) => {
        post = new Post({
            title: "New Post"
        });
        post.save().then(() => {
            assert(post.isNew === false);
            done();
        })
    });
    it('Find record and update', (done) => {
        Post.findOneAndUpdate({ title: "New Post" }, { title: "Changed title" }).then(() => {
            Post.findOne({ _id: post._id }).then(res => {
                assert(res.title === 'Changed title');
                done();
            })
        })
    })
    it('Find record and update check false positive', (done) => {
        Post.findOneAndUpdate({ title: "New Post" }, { $set: { title: "Changed title" } }).then(() => {
            Post.findOne({ _id: post._id }).then(res => {
                assert(res.title !== 'Changed title1');
                done();
            })
        })
    })
})
