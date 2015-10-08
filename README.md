mailerlite-js
=========
A nodeJS wrapper for the MailerLite API. 

##Installation##

npm install mailerlite-js

##Usage##
See the [MailerLite documentation](http://docs.mailerlite.com/) for more details on the API. 

Require the module

    var MailerLite = require('mailerlite-js');

 Initialize a MailerLite object with your secret api key, and an optional api url. (Default is https://app.mailerlite.com/api/v1/)

    var ml = new MailerLite("apiKey");

Here is an example of how to get all the campaigns.

	ml.campaigns.getAll(function(err, response){
		console.log(response);
	});

## Methods ##
Listed soon...

## Release History##

* 1.0.0 Initial release