var express = require('express');
var fs = require('fs');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    var html_viz_files = fs.readdirSync('public/viz_html');
    var re = /.*\.html/i;
    html_viz_files = html_viz_files.filter(word => word.match(re));
    re = /(^\d{4}-\d{2}-\d{2})\.(\d{2}:\d{2}:\d{2})\.(.{7})/;
    //var test = re.exec(html_viz_files.join(''));
    //console.log(test);
    var html_data = html_viz_files.map(file => re.exec(file));
    var dates = html_data.map(data => data[1]);
    var hours = html_data.map(data => data[2]);
    var hashes = html_data.map(data => data[3]);

    var graphs = html_viz_files.map((file, index) =>
    {return {
        file: file,
        date: dates[index],
        hour: hours[index],
        hash: hashes[index]
    };
    });

    res.send(graphs);
    // res.render('viz',
    //     {
    //         html_viz_files: html_viz_files,
    //         dates: dates,
    //         hours: hours,
    //         hashes: hashes
    //     });
});

module.exports = router;
