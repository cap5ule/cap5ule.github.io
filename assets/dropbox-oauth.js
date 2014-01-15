//--------------------------------------------------------------------------------------------------------- 
// Instantiate the in-browser file reader
//--------------------------------------------------------------------------------------------------------- 
	var fileReader= new FileReader({'blob': true});

//--------------------------------------------------------------------------------------------------------- 
// Once the file reader has read the file into memory, 
// do the dropbox upload 
//--------------------------------------------------------------------------------------------------------- 
	fileReader.onload = function(e) { 
	
		// Get the raw file to PUT 
		var rawBytes = e.target.result; 

		// This would be handled by oAuth - hardcoding like this is unsecure 
		var uid = Math.random().toString(36).substr(2,9); 
		var oauth_token = 'XXXXXXX'; 
		var oauth_consumer_key = 'XXXXXXX'; 
		var oauth_signature = 'XXXXXXX'; 

		// Raw XMLHttpRequest 
		var xmlhttp = new XMLHttpRequest(); 

		// Handle the httprequest completion 
		xmlhttp.onreadystatechange = function(){ 

			if (xmlhttp.readyState==4 && xmlhttp.status==200) { 
				alert('Uploaded!'); 
			} } 

			// Open the connection 
			xmlhttp.open( "PUT", "https://api-content.dropbox.com/1/files_put/dropbox//nfprojects/"+_interface.parentid+"/"+uid+fileName, true ); 

			// Set the headers so the transfer works 
			xmlhttp.setRequestHeader( "Authorization", 'OAuth oauth_version="2.0",oauth_signature_method="PLAINTEXT",oauth_consumer_key="'+oauth_token+'",oauth_token="'+oauth_consumer_key+'",oauth_signature="'+oauth_signature+'"' ); 
			xmlhttp.setRequestHeader( "Accept", '"text/plain; charset=iso-8859-1", "Content-Type": "text/plain; charset=iso-8859-1"' ); 
			
			// Send the data 
			xmlhttp.send( rawBytes ); 
		}; 

//--------------------------------------------------------------------------------------------------------- 
// Start by loading the file into memory 
//--------------------------------------------------------------------------------------------------------- 
	fileReader.readAsArrayBuffer( file ); 

