var Package = require("./package.json");

var mime = require("mime"),
    fs = require('fs'),
    path = require('path'),
    request = require('request'),
    nconf = module.parent.require('nconf'),
    winston = module.parent.require('winston');

(function(plugin) {
    "use strict";

    function makeError(err){
        if (err instanceof Error) {
            err.message = Package.name + " :: " + err.message;
        } else {
            err = new Error(Package.name + " :: " + err);
        }

        winston.error(err);
        return err;
    }

    plugin.handleUpload = function (data, callback) {
        var image = data.image;
        var type = image.url ? 'url' : 'file';

        if (type === 'file' && !image.path) {
            return callback(makeError('Invalid image path'));
        }

        request.post({
            url: nconf.get('chevereto:site_url') + '/api/1/upload/?key=' + nconf.get('chevereto:key'),
            formData: {
                source: fs.createReadStream(image.path),
            }
        }, function (err, resp, body) {
            if (err) {
                return callback(makeError(err));
            }

            var data = JSON.parse(body);
            callback(null, {
                name: data.image.name,
                url: data.image.url
            });
        });
    }
}(module.exports));
