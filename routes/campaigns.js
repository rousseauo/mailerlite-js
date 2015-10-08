var https = require('https');

function Campaigns(apiKey, baseURL) {
    this.apiKey = apiKey;
    this.baseURL = baseURL;
}

Campaigns.prototype.getAll = function(callback, limit, page) {

    var url = this.baseURL + 'campaigns/?apiKey=' + this.apiKey ;

    if(limit) {
        url += "&limit="+limit;
    }

    if(page) {
        url += "&page="+page;
    }

    httpGet(url, callback);
};

Campaigns.prototype.getDetails = function(campaign_id, callback) {

    var url = this.baseURL + 'campaigns/' + campaign_id + '/?apiKey=' + this.apiKey ;

    httpGet(url, callback);
};

Campaigns.prototype.getRecipients = function(campaign_id, callback, limit, page) {

    var url = this.baseURL + 'campaigns/' + campaign_id + '/recipients/?apiKey=' + this.apiKey ;

    if(limit) {
        url += "&limit="+limit;
    }

    if(page) {
        url += "&page="+page;
    }

    httpGet(url, callback);
};

Campaigns.prototype.getOpens = function(campaign_id, callback, limit, page) {

    var url = this.baseURL + 'campaigns/' + campaign_id + '/opens/?apiKey=' + this.apiKey ;

    if(limit) {
        url += "&limit="+limit;
    }

    if(page) {
        url += "&page="+page;
    }

    httpGet(url, callback);
};

Campaigns.prototype.getClicks = function(campaign_id, callback, limit, page) {

    var url = this.baseURL + 'campaigns/' + campaign_id + '/clicks/?apiKey=' + this.apiKey ;

    if(limit) {
        url += "&limit="+limit;
    }

    if(page) {
        url += "&page="+page;
    }

    httpGet(url, callback);
};

Campaigns.prototype.getUnsubscribes = function(campaign_id, callback, limit, page) {

    var url = this.baseURL + 'campaigns/' + campaign_id + '/unsubscribes/?apiKey=' + this.apiKey ;

    if(limit) {
        url += "&limit="+limit;
    }

    if(page) {
        url += "&page="+page;
    }

    httpGet(url, callback);
};

Campaigns.prototype.getBounces = function(campaign_id, callback, limit, page) {

    var url = this.baseURL + 'campaigns/' + campaign_id + '/bounces/?apiKey=' + this.apiKey ;

    if(limit) {
        url += "&limit="+limit;
    }

    if(page) {
        url += "&page="+page;
    }

    httpGet(url, callback);
};

Campaigns.prototype.getSpamComplaints = function(campaign_id, callback, limit, page) {

    var url = this.baseURL + 'campaigns/' + campaign_id + '/junk/?apiKey=' + this.apiKey ;

    if(limit) {
        url += "&limit="+limit;
    }

    if(page) {
        url += "&page="+page;
    }

    httpGet(url, callback);
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

module.exports = Campaigns;