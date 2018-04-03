const path = process.cwd()

var routes = function (app) {
  app.get('/', function (req, res) {
    res.sendFile(path + '/public/index.html')
  })
}

module.exports = routes
