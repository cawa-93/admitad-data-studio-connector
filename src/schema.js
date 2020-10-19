function getSchema(request) {
	const cc = DataStudioApp.createCommunityConnector();
	const fields = cc.getFields();
	const types = cc.FieldType;

	// Dimensions

	fields.newDimension()
		.setId('currency')
		.setName('Currency')
		.setDescription('Валюта')
		.setType(types.TEXT);

	const date = fields.newDimension()
		.setId('date')
		.setName('Date')
		.setDescription('Дата статистики')
		.setType(types.YEAR_MONTH_DAY)

	// Metrics

	fields.newMetric()
		.setId('views')
		.setName('Views')
		.setDescription('Количество показов')
		.setType(types.NUMBER);

	const clicks = fields.newMetric()
		.setId('clicks')
		.setName('Clicks')
		.setDescription('Клики')
		.setType(types.NUMBER);

	fields.newMetric()
		.setId('cr')
		.setName('CR')
		.setDescription('Конверсия')
		.setType(types.NUMBER);

	fields.newMetric()
		.setId('ctr')
		.setName('CTR')
		.setDescription('CTR')
		.setType(types.NUMBER);

	fields.newMetric()
		.setId('ecpc')
		.setName('eCPC')
		.setDescription('eCPC')
		.setType(types.NUMBER);

	fields.newMetric()
		.setId('ecpm')
		.setName('eCPM')
		.setDescription('eCPM')
		.setType(types.NUMBER);

	fields.newMetric()
		.setId('leads_approved')
		.setName('Leads approved')
		.setDescription('Количество подтверждённых лидов')
		.setType(types.NUMBER)
		.setGroup('Leads');

	fields.newMetric()
		.setId('leads_declined')
		.setName('Leads declined')
		.setDescription('Количество отклоненных лидов')
		.setType(types.NUMBER)
		.setGroup('Leads');

	fields.newMetric()
		.setId('leads_open')
		.setName('Leads open')
		.setDescription('Количество открытых лидов')
		.setType(types.NUMBER)
		.setGroup('Leads');

	fields.newMetric()
		.setId('payment_sum_approved')
		.setName('Payment sum approved')
		.setDescription('Сумма по подтверждённым действиям')
		.setType(types.NUMBER)
		.setGroup('Payments');


	fields.setDefaultMetric(clicks.getId());
	fields.setDefaultDimension(date.getId());

	return {'schema': fields.build()};
}
