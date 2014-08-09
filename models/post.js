
var _ = require('lodash');

var baseBookshelf = require('./base');

var Post = null;
var Posts = null;

Post = baseBookshelf.Model.extend({
    tableName: 'posts',
}, {
    findAll: function(options) {
        return baseBookshelf.Model.findAll.call(this, options);
    },

    findOne: function(data, options) {
        return baseBookshelf.Model.findOne.call(this, data, options);
    },

    add: function(data, options) {
        var self = this;

        return baseBookshelf.Model.add.call(this, data, options).then(function (post) {
            return self.findOne({id: post.id}, options);
        });
    },

    edit: function(data, options) {
        return baseBookshelf.Model.edit.call(this, data, options);
    },

    destroy: function(options) {
        return baseBookshelf.Model.destroy.call(this, options);
    }
});

Posts = baseBookshelf.Collection.extend({
    model: Post
});

module.exports = {
    Post: baseBookshelf.model('Post', Post),
    Posts: baseBookshelf.collection('Posts', Posts)
};
