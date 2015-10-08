/**
 * Created by oli2 on 15-10-07.
 */


var Campaigns = require('./routes/campaigns.js');
var Lists = require('./routes/lists.js');
var Subscribers = require('./routes/subscribers.js');

function MailerLite(apiKey, baseURL){

    this.apiKey = apiKey;
    this.baseURL = baseURL ? baseURL : "https://app.mailerlite.com/api/v1/";

    this.campaigns = new Campaigns(this.apiKey, this.baseURL);
    //this.lists = new Lists(this.apiKey, this.baseURL);
    //this.subscribers = new Subscribers(this.apiKey, this.baseURL);

}

MailerLite.prototype.prepareObject = function(object) {

    var ml_object = {
        "apiKey": this.apiKey,
        "fields": []
    };

    //Iterate for each key
    for(var key in object) {

        //We only want to find properties, not the functions
        if(typeof object[key] !== 'function') {

            if(key == "email" || key == "name"){
                ml_object[key] = object[key];
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


module.exports = MailerLite;