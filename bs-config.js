module.exports = {
  "port": 8000,
  "files" : [ "./wwwroot/**/*.{html,htm,css,js}" ],
  "server" : {
    "baseDir" : "./" ,
    "middleware" : {
      // overrides the second middleware default with new settings
      1: require('connect-history-api-fallback')({
        index: './wwwroot/index.html',
         verbose: true
      })
    }
  }
}