// https://developers.google.com/datastudio/connector/reference#getconfig
function getConfig({languageCode}) {
	const cc = DataStudioApp.createCommunityConnector();

	const config = cc.getConfig();

	config
		.newTextInput()
		.setId('c_id')
		.setName('Идентификатор партнерской программы')
		.setPlaceholder('12345')

	config.setDateRangeRequired(true);

	return config.build();
}
