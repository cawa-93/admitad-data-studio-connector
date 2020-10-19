function getOAuthService() {
	// Create a new service with the given name. The name will be used when
	// persisting the authorized token, so ensure it is unique within the
	// scope of the property store.
	return OAuth2.createService('admitad')

		// Set the endpoint URLs, which are the same for all Google services.
		.setAuthorizationBaseUrl('https://www.admitad.com/api/authorize/')
		.setTokenUrl('https://api.admitad.com/token/')

		// Set the client ID and secret, from the Google Developers Console.
		.setClientId('OO6psWATyhJeaK4yPtUc3ZUkFhydZy')
		.setClientSecret('lXDuieM3MAURt0p3Uww5s4QdaVoyQl')

		// Set the name of the callback function in the script referenced
		// above that should be invoked to complete the OAuth flow.
		.setCallbackFunction('authCallback')

		// Set the property store where authorized tokens should be persisted.
		.setPropertyStore(PropertiesService.getScriptProperties())

		// Set the scopes to request (space-separated for Google services).
		.setScope('advertiser_statistics');

	// // Below are Google-specific OAuth2 parameters.
	//
	// // Sets the login hint, which will prevent the account chooser screen
	// // from being shown to users logged in with multiple accounts.
	// .setParam('login_hint', Session.getEffectiveUser().getEmail())
	//
	// // Requests offline access.
	// .setParam('access_type', 'offline')
	//
	// // Consent prompt is required to ensure a refresh token is always
	// // returned when requesting offline access.
	// .setParam('prompt', 'consent');
}


function authCallback(request) {
	var authorized = getOAuthService().handleCallback(request);
	if (authorized) {
		return HtmlService.createHtmlOutput('Success! You can close this tab.');
	} else {
		return HtmlService.createHtmlOutput('Denied. You can close this tab');
	}
	;
};


function isAuthValid() {
	const service = getOAuthService();
	console.log(service);
	if (service == null) {
		return false;
	}
	return service.hasAccess();
}


function get3PAuthorizationUrls() {
	var service = getOAuthService();
	if (service == null) {
		return '';
	}
	return service.getAuthorizationUrl();
}


function resetAuth() {
	var service = getOAuthService();
	service.reset();
}


// https://developers.google.com/datastudio/connector/reference#getauthtype
function getAuthType() {
	var cc = DataStudioApp.createCommunityConnector();

	var AuthTypes = cc.AuthType;
	return cc
		.newAuthTypeResponse()
		.setAuthType(AuthTypes.OAUTH2)
		.build();
}
