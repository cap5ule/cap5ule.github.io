// https://dl.dropboxusercontent.com/spa/itlzum78o7pm9h3/camsapp/public/index.html
// https://www.dropbox.com/sh/kt6jsdr5l6m6csj/7qVHQ-z7ej
var client = new Dropbox.Client({ key: "5nkb0v59ecu85s1" });
client.authenticate(function(error, client) {
  if (error) {
    // Replace with a call to your own error-handling code.
    //
    // Don't forget to return from the callback, so you don't execute the code
    // that assumes everything went well.
    return console.error(error);
  }

  // Replace with a call to your own application code.
  //
  // The user authorized your app, and everything went well.
  // client is a Dropbox.Client instance that you can use to make API calls.
  alert("booyah");
  debugger;
});