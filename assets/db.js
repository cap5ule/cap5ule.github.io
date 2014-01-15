// https://dl.dropboxusercontent.com/spa/itlzum78o7pm9h3/camsapp/public/index.html
// https://www.dropbox.com/sh/kt6jsdr5l6m6csj/7qVHQ-z7ej
// access_token=YnX3FfFKz4QAAAAAAAAAAQHeebRjX9Xo56NCIq-QrlhrdfRcdN-9kYyoxqxr7y9o
$(function() {
	var showError = function(error) {
		switch (error.status) {
			case Dropbox.ApiError.INVALID_TOKEN:
				// If you're using dropbox.js, the only cause behind this error is that
				// the user token expired.
				// Get the user through the authentication flow again.
				break;

			case Dropbox.ApiError.NOT_FOUND:
				// The file or folder you tried to access is not in the user's Dropbox.
				// Handling this error is specific to your application.
				break;

			case Dropbox.ApiError.OVER_QUOTA:
				// The user is over their Dropbox quota.
				// Tell them their Dropbox is full. Refreshing the page won't help.
				break;

			case Dropbox.ApiError.RATE_LIMITED:
				// Too many API requests. Tell the user to try again later.
				// Long-term, optimize your code to use fewer API calls.
				break;

			case Dropbox.ApiError.NETWORK_ERROR:
				// An error occurred at the XMLHttpRequest layer.
				// Most likely, the user's network connection is down.
				// API calls will not succeed until the user gets back online.
				break;

			case Dropbox.ApiError.INVALID_PARAM:
			case Dropbox.ApiError.OAUTH_ERROR:
			case Dropbox.ApiError.INVALID_METHOD:
			default:
				// Caused by a bug in dropbox.js, in your application, or in Dropbox.
				// Tell the user an error occurred, ask them to refresh the page.
		}
	};

	var client = new Dropbox.Client({
		key: "5nkb0v59ecu85s1"
	});
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
	});

	client.getAccountInfo(function(error, accountInfo) {
		if (error) {
			return showError(error); // Something went wrong.
		}

		alert("Hello, " + accountInfo.name + "!");
	});
	// client.writeFile("hello_world.txt", "Hello, world!\n", function(error, stat) {
	// 	if (error) {
	// 		return showError(error); // Something went wrong.
	// 	}

	// 	alert("File saved as revision " + stat.revisionTag);
	// });
	// Setup file handler
	function handleFiles(elem) {
		var files = elem.currentTarget.files;
		var d = document.getElementById("fileList");
		if (!files.length) {
			d.innerHTML = "<p>No video selected!</p>";
		} else {
			d.innerHTML = "";
			var list = document.createElement("ul");
			d.appendChild(list);
			for (var i = 0; i < files.length; i++) {
				var li = document.createElement("li");
				list.appendChild(li);
				var info = document.createElement("span");
				var fileName = files[i].name
				info.innerHTML = fileName + ": " + files[i].size + " bytes";
				li.appendChild(info);

				var fileReader = new FileReader({
					'blob': true
				});

				//--------------------------------------------------------------------------------------------------------- 
				// Once the file reader has read the file into memory, 
				// do the dropbox upload 
				//--------------------------------------------------------------------------------------------------------- 
				fileReader.onload = function(e) {

					// Get the raw file to PUT 
					var rawBytes = e.target.result;

					client.writeFile(fileName, rawBytes, {
						noOverwrite: true
					}, function(error, stat) {
						if (error) {
							return showError(error); // Something went wrong.
						}

						alert(stat.humanSize + " file uploaded at this path: " + stat.path);
					});
				};

				//--------------------------------------------------------------------------------------------------------- 
				// Start by loading the file into memory 
				//--------------------------------------------------------------------------------------------------------- 
				fileReader.readAsArrayBuffer(files[i]);
			}
		}
	}
	$("#fileElem").on("change", handleFiles);

});