var https = require('https');

function Lists(apiKey, baseURL) {
    this.apiKey = apiKey;
    this.baseURL = baseURL;

    this.domain = baseURL.split('/')[2];
    this.apiPath = baseURL.split('com')[1];
}

Lists.prototype.getAll = function(callback, limit, page) {

    var url = this.baseURL + 'lists/?apiKey=' + this.apiKey ;

    if(limit) {
        url += "&limit="+limit;
    }

    if(page) {
        url += "&page="+page;
    }

    httpGet(url, callback);
};

Lists.prototype.getDetails = function(list_id, callback) {

    var url = this.baseURL + 'lists/' + list_id + '/?apiKey=' + this.apiKey ;

    httpGet(url, callback);
};

Lists.prototype.getActiveSubscribers = function(list_id, callback, limit, page) {

    var url = this.baseURL + 'lists/' + list_id + '/active/?apiKey=' + this.apiKey ;

    if(limit) {
        url += "&limit="+limit;
    }

    if(page) {
        url += "&page="+page;
    }

    httpGet(url, callback);
};

Lists.prototype.getUnsubscribers = function(list_id, callback, limit, page) {

    var url = this.baseURL + 'lists/' + list_id + '/unsubscribed/?apiKey=' + this.apiKey ;

    if(limit) {
        url += "&limit="+limit;
    }

    if(page) {
        url += "&page="+page;
    }

    httpGet(url, callback);
};


Lists.prototype.getBounces = function(list_id, callback, limit, page) {

    var url = this.baseURL + 'lists/' + list_id + '/bounced/?apiKey=' + this.apiKey ;

    if(limit) {
        url += "&limit="+limit;
    }

    if(page) {
        url += "&page="+page;
    }

    httpGet(url, callback);
};

Lists.prototype.create = function(list_name, callback) {

    var postData = {
        "apiKey": this.apiKey,
        "name": list_name
    };

    var strData = JSON.stringify(postData);

    var options = {
        host: this.domain,
        port: 443,
        path: this.apiPath + 'lists/',
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
            'Content-Length': Buffer.byteLength(strData, 'utf8')
        }
    };

    httpReq(strData, options, callback);

};

Lists.prototype.update = function(list_id, list_name, callback) {

    var postData = {
        "apiKey": this.apiKey,
        "id": list_id,
        "name": list_name
    };

    var strData = JSON.stringify(postData);

    var options = {
        host: this.domain,
        port: 443,
        path: this.apiPath + 'lists/' + list_id + '/',
        method: 'PUT',
        headers: {
            'Content-Type': "application/json",
            'Content-Length': Buffer.byteLength(strData, 'utf8')
        }
    };

    httpReq(strData, options, callback);

};

Lists.prototype.delete = function(list_id, callback) {

    var postData = {
        "apiKey": this.apiKey,
        "id": list_id
    };

    var strData = JSON.stringify(postData);

    var options = {
        host: this.domain,
        port: 443,
        path: this.apiPath + 'lists/' + list_id + '/',
        method: 'DELETE',
        headers: {
            'Content-Type': "application/json",
            'Content-Length': Buffer.byteLength(strData, 'utf8')
        }
    };

    httpReq(strData, options, callback);

};

//Utils

function httpGet(url, callback) {
    var req = https.get(url, function(res) {

        res.setEncoding('utf8');

        var data = "";

        res.on('data', function (chunk) {
            data+=chunk;
        });

        res.on('end', function(){

            var responseObject = JSON.parse(data);

            callback(null, responseObject);

        });
    });

    req.end();
}

function httpReq(strData, options, callback) {

    var req = https.request(options, function(res) {

        res.setEncoding('utf8');

        var data = "";

        res.on('data', function (chunk) {
            data+=chunk;
        });

        res.on('end', function(){

            var responseObject = JSON.parse(data);

            callback(null, responseObject);

        });
    });

    req.on('error', function (error) {
        callback(error);
    });

    req.write(strData);
    req.end();


}

module.exports = Lists;