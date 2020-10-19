function isAdminUser() {
	return true;
}


function getData(request) {

	const fixedSchema = getSchema(request).schema;
	const schema = fixedSchema.filter(({name}) => request.fields.find(f => f.name === name));

	// console.log(request);

	let data;
	try {
		data = fetchDataFromApi(request);
	} catch (e) {
		const cc = DataStudioApp.createCommunityConnector();

		cc.newUserError()
			.setDebugText('Error fetching data from API. Exception details: ' + e)
			.setText(
				'Не удалось загрузить данные из Admitad. Возможно у вас нет прав для доступа к статистике указанной партнерской программы. Повторите попытку позже или сообщите о проблеме, если ошибка не исчезнет.',
			)
			.throwException();
	}

	data = data.map(r => {
		r.date = r.date.replace(/-/g, '');
		return r;
	});

	const rows = data.map(result => ({
		values: schema.map(({name}) => result[name] || ''),
	}));

	// console.log(request);
	// console.log(fixedSchema);
	// console.log(schema);
	// console.log(rows);

	return {
		schema,
		rows,
		'filtersApplied': true,
	};
}


function fetchDataFromApi({configParams, dateRange}) {

	// console.log(request);

	const service = getOAuthService();

	const headers = {
		Authorization: 'Bearer ' + service.getAccessToken(),
	};

	const baseUrl = 'https://api.admitad.com/advertiser/' + configParams.c_id + '/statistics/dates/';

	const query = [
		'limit=500',
		'start_date=' + dateRange.startDate,
		'end_date=' + dateRange.endDate,
	].join('&');

	const responseString = UrlFetchApp.fetch(baseUrl + '?' + query, {headers});
	const response = JSON.parse(responseString);
	console.log(response);
	return response.results || [];
}


function mockFetch() {
	return [
		{
			'sales_approved': '0',
			'sales_declined': '0',
			'date': '2020-01-01',
			'payment_sum_approved': '0.00',
			'ctr': 5.11,
			'views': 138265,
			'currency': 'RUB',
			'leads_open': '130',
			'payment_sum_open': '7314.00',
			'ecpm': 52.86,
			'payment_sum_declined': '0.00',
			'cr': 1.84,
			'leads_declined': '0',
			'sales_open': '0',
			'leads_approved': '0',
			'ecpc': 1.03,
			'clicks': 7070,
		},
		{
			'sales_approved': '0',
			'sales_declined': '0',
			'date': '2020-01-02',
			'payment_sum_approved': '0.00',
			'ctr': 4.12,
			'views': 214719,
			'currency': 'RUB',
			'leads_open': '144',
			'payment_sum_open': '7650.00',
			'ecpm': 35.63,
			'payment_sum_declined': '0.00',
			'cr': 1.63,
			'leads_declined': '0',
			'sales_open': '0',
			'leads_approved': '0',
			'ecpc': 0.86,
			'clicks': 8850,
		},
	];
}
