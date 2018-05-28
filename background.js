browser.runtime.onMessage.addListener(function (request, sender) {
	console.log("Got message from content.js");

	if (request.type == "ftp_infos") {
		// split the request.value to only get the ftp instead of the entire command 
		let ftp_value = request.value.split(' ')[1];
		console.log(ftp_value);
		// connect to the native app
		var port = browser.runtime.connectNative("fzlauncher");
		console.log(port);
		// post the message to the host app (cpp app)
		port.postMessage( ftp_value );

		// on a message from the host app (cpp app)
		port.onMessage.addListener(function (message) {
			console.log(message);
		})
		

		// when the connection between the extension and the native app is lost
		port.onDisconnect.addListener(function (error) {
			if (browser.runtime.lastError) {
				console.log('Disconnected due to: ' + browser.runtime.lastError.message)	
			}
		})
	}
});