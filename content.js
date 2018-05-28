var ftp_infos = document.getElementById('ftp_infos');
if (ftp_infos) {
	console.log('The ftp table exists');
	var $button = makeElement("a");
	var linkTextNode = document.createTextNode('Open FileZilla');
	$button.appendChild(linkTextNode);
	// Creating the tr and td and appending td to tr 
	var $tr = makeElement("tr")
	var $td = makeElement("td")

	$td.appendChild($button)
	$tr.appendChild($td)

	ftp_infos.appendChild($tr)

	// handle the click event on the open button and sends a message to the background.js file
	$button.addEventListener ('click', function (event) {
		let result = browser.runtime.sendMessage({type: 'ftp_infos', value: getFtpInfos()});
		result.then(function (response) {
			console.log(response)
		}, function (err) {
			console.log(err)
		})
	})

	// helps generate an HTMLElement
	function makeElement(elementName) {
		return document.createElement(elementName);
	}

	// get the ftp info needed
	function getFtpInfos () {
		var cmd_windows = document.getElementById('cmd_windows');
		return cmd_windows.value;
	}	

}
