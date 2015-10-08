/**
 * Created by RousseauO
 * Date: 15-10-07.
 */


(function(){

    var Campaigns = require('./routes/campaigns.js');
    var Lists = require('./routes/lists.js');
    var Subscribers = require('./routes/subscribers.js');

    var ml = {};

    ml.init = function(apiKey, baseURL) {

        ml.apiKey = apiKey;
        ml.baseURL = baseURL ? baseURL : "https://app.mailerlite.com/api/v1/";

        ml.campaigns = new Campaigns(this.apiKey, this.baseURL);
        ml.lists = new Lists(this.apiKey, this.baseURL);
        ml.subscribers = new Subscribers(this.apiKey, this.baseURL);

    };


    module.exports = ml;

}());