# apexmock

Run this server to trap salesforce apex api requests

* `npm install`
* `sudo vi /etc/hosts`, and add the following line to match the instanceUrl:
    `127.0.0.1 cs51.salesforce.com`
* `sudo node index`
* add `process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"` early in your app as we're using a self-signed cert
* run your script or app

As requests head to the apex api, the request body will be written to disk as json files. You can then use these to verify your requests.

**Important!** When you're done, reverse the changes you made to your `/etc/hosts` file.
