module.exports = function(app) {

  app.route('/mobile/:id')
    .get(function(req, res, next) {
      res.render('index', {containerClass: 'mobile'});
    });

  app.route('/:id')
    .get(function(req, res, next) {
      res.render('index', {containerClass: 'desktop'});
    });

};
