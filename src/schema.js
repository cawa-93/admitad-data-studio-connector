function getSchema(request) {
	validateConfig(request.configParams)
	const cc = DataStudioApp.createCommunityConnector();
	const fields = cc.getFields();
	const types = cc.FieldType;

	// Dimensions

	fields.newDimension()
		.setId('currency')
		.setName('Currency')
		.setType(types.TEXT);

	const date = fields.newDimension()
		.setId('date')
		.setName('Date')
		.setDescription('Report date')
		.setType(types.YEAR_MONTH_DAY)

	// Metrics

	fields.newMetric()
		.setId('views')
		.setName('Views')
		.setDescription('The number of impressions')
		.setType(types.NUMBER);

	const clicks = fields.newMetric()
		.setId('clicks')
		.setName('Clicks')
		.setType(types.NUMBER);

	fields.newMetric()
		.setId('cr')
		.setName('CR')
		.setDescription('Conversion rate')
		.setType(types.NUMBER);

	fields.newMetric()
		.setId('ctr')
		.setName('CTR')
		.setType(types.NUMBER);

	fields.newMetric()
		.setId('ecpc')
		.setName('eCPC')
		.setType(types.NUMBER);

	fields.newMetric()
		.setId('ecpm')
		.setName('eCPM')
		.setType(types.NUMBER);

	fields.newMetric()
		.setId('leads_approved')
		.setName('Leads approved')
		.setDescription('Number of confirmed leads')
		.setType(types.NUMBER)
		.setGroup('Leads');

	fields.newMetric()
		.setId('leads_declined')
		.setName('Leads declined')
		.setDescription('Number of rejected leads')
		.setType(types.NUMBER)
		.setGroup('Leads');

	fields.newMetric()
		.setId('leads_open')
		.setName('Leads open')
		.setDescription('Number of leads on hold')
		.setType(types.NUMBER)
		.setGroup('Leads');

	fields.newMetric()
		.setId('payment_sum_approved')
		.setName('Payment sum approved')
		.setDescription('The amount related to the confirmed actions')
		.setType(types.NUMBER)
		.setGroup('Payments');


	fields.setDefaultMetric(clicks.getId());
	fields.setDefaultDimension(date.getId());

	return {'schema': fields.build()};
}
