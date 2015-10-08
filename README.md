mailerlite-js
=================
A nodeJS wrapper for the MailerLite API. 

[MailerLite](https://www.mailerlite.com/) is an affordable solution for email marketing. 

Check out the [MailerLite documentation](http://docs.mailerlite.com/) for more details about the API responses.

Installation
-------

	npm install mailerlite-js

Usage
-------
 
Initialize the module with your secret API Key.

    var ml = require('mailerlite-js');
    ml.init("MAILERLITE_API_KEY");
    
Now just call the methods you need like this:

	ml.campaigns.getAll(callback);
 

Methods
-------
*Params after the callback are optional.*

#### Campaigns
- **getAll**(callback, limit, page)
- **getDetails**(campaign_id, callback)
- **getRecipients**(campaign_id, callback, limit, page)
- **getOpens**(campaign_id, callback, limit, page)
- **getClicks**(campaign_id, callback, limit, page)
- **getUnsubscribes**(campaign_id, callback, limit, page)
- **getBounces**(campaign_id, callback, limit, page) 
- **getSpamComplaints**(campaign_id, callback, limit, page)

#### Lists
- **getAll**(callback, limit, page)
- **getDetails**(list_id, callback)
- **getActiveSubscribers**(list_id, callback, limit, page)
- **getUnsubscribers**(list_id, callback, limit, page)
- **getBounces**(list_id, callback, limit, page)
- **create**(list_name, callback)
- **update**(list_id, list_name, callback) 
- **delete**(list_id, callback)

#### Subscribers
- **addToList**(list_id, email, callback, firstName, otherFieldsArray, resubscribe)
- **removeFromList**(list_id, email, callback)
- **unsubscribe**(email, callback)
- **addManyToList**(list_id, subscribers_array, callback, resubscribe)
- **getDetails**(email, callback, history)
- **prepareFieldsArray**(object) 
- **prepareSubscriberObject**(object)



Release History
-------

* 1.0.0 Initial release
* 1.1.0 Complete wrapper