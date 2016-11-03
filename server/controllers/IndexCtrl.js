'use strict';

module.exports.getIndex = (req, res) => {
    res.render('index', { title: 'Express' });
};
