/**
 * Created by RousseauO
 * Date: 15-10-07.
 */


var Campaigns = require('./routes/campaigns.js');
var Lists = require('./routes/lists.js');
var Subscribers = require('./routes/subscribers.js');

function MailerLite(apiKey, baseURL){

    this.apiKey = apiKey;
    this.baseURL = baseURL ? baseURL : "https://app.mailerlite.com/api/v1/";

    this.campaigns = new Campaigns(this.apiKey, this.baseURL);
    this.lists = new Lists(this.apiKey, this.baseURL);
    this.subscribers = new Subscribers(this.apiKey, this.baseURL);

}


module.exports = MailerLite;