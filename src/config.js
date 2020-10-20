// https://developers.google.com/datastudio/connector/reference#getconfig
function getConfig({languageCode}) {

	const config = DataStudioApp.createCommunityConnector().getConfig();

	config
		.newTextInput()
		.setId('c_id')
		.setName('Affiliate program ID')
		.setPlaceholder('12345');

	config.setDateRangeRequired(true);

	return config.build();
}


function validateConfig(configParams) {
	configParams = configParams || {};
	try {
		if (!configParams.c_id) {
			throw new Error('Affiliate program ID is required.');
		}

	} catch (e) {
		DataStudioApp.createCommunityConnector()
			.newUserError()
			.setText(e.message)
			.throwException();
	}
}
