var https = require('https');

function Subscribers(apiKey, baseURL) {
    this.apiKey = apiKey;
    this.baseURL = baseURL;

    this.domain = baseURL.split('/')[2];
    this.apiPath = baseURL.split('com')[1];
}

Subscribers.prototype.addToList = function(list_id, email, callback, firstName, otherFieldsArray, resubscribe) {

    var postData = {
        "apiKey": this.apiKey,
        "id" : list_id,
        "email" : email
    };

    //Optional data
    if(firstName) {
        postData.name = firstName;
    }
    if(otherFieldsArray) {
        postData.fields = otherFieldsArray;
    }
    if(resubscribe) {
        postData.resubscribe = resubscribe;
    }

    var strData = JSON.stringify(postData);

    var options = {
        host: this.domain,
        port: 443,
        path: this.apiPath + 'subscribers/' + list_id + '/',
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
            'Content-Length': Buffer.byteLength(strData, 'utf8')
        }
    };

    httpReq(strData, options, callback);

};

Subscribers.prototype.removeFromList = function(list_id, email, callback) {

    var postData = {
        "apiKey": this.apiKey,
        "id" : list_id,
        "email" : email
    };

    var strData = JSON.stringify(postData);

    var options = {
        host: this.domain,
        port: 443,
        path: this.apiPath + 'subscribers/' + list_id + '/',
        method: 'DELETE',
        headers: {
            'Content-Type': "application/json",
            'Content-Length': Buffer.byteLength(strData, 'utf8')
        }
    };

    httpReq(strData, options, callback);

};

Subscribers.prototype.unsubscribe = function(email, callback) {

    var postData = {
        "apiKey": this.apiKey,
        "email" : email
    };

    var strData = JSON.stringify(postData);

    var options = {
        host: this.domain,
        port: 443,
        path: this.apiPath + 'subscribers/unsubscribe/',
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
            'Content-Length': Buffer.byteLength(strData, 'utf8')
        }
    };

    httpReq(strData, options, callback);

};

Subscribers.prototype.addManyToList = function(list_id, subscribers_array, callback, resubscribe) {

    var postData = {
        "apiKey": this.apiKey,
        "id" : list_id,
        "subscribers" : subscribers_array
    };

    //Optional data
    if(resubscribe) {
        postData.resubscribe = resubscribe;
    }

    var strData = JSON.stringify(postData);

    var options = {
        host: this.domain,
        port: 443,
        path: this.apiPath + 'subscribers/' + list_id + '/import/',
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
            'Content-Length': Buffer.byteLength(strData, 'utf8')
        }
    };

    httpReq(strData, options, callback);

};


Subscribers.prototype.getDetails = function(email, callback, history) {

    var url = this.baseURL + 'subscribers/?apiKey=' + this.apiKey + "&email=" + email;

    //Optional
    if(history) {
        url += "&history="+history;
    }

    httpGet(url, callback);
};


Subscribers.prototype.prepareFieldsArray = function(object) {

    var fieldsArray = [];

    //Iterate for each key
    for(var key in object) {

        //We only want to find properties, not the functions
        if(typeof object[key] !== 'function') {

            var customFieldObject = {
                "name":key,
                "value": object[key]
            };

            fieldsArray.push(customFieldObject);
        }

    }

    return fieldsArray;

};

Subscribers.prototype.prepareSubscriberObject = function(object) {

    var ml_object = {
        "email" : "",
        "name" : "",
        "fields": []
    };

    //Iterate for each key
    for(var key in object) {

        //We only want to find properties, not the functions
        if(typeof object[key] !== 'function') {

            if(key == "email"){
                ml_object.email = object[key];
            }
            else if(key == "name" || key == "first_name") {
                ml_object.name = object[key];
            }
            else {

                var customFieldObject = {
                    "name":key,
                    "value": object[key]
                };

                ml_object.fields.push(customFieldObject);
            }
        }

    }

    return ml_object;

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

module.exports = Subscribers;