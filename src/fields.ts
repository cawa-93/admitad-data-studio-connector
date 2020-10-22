import { CC, ConnectorConfig, FieldType, ReportType } from "./contants";

type Fields = GoogleAppsScript.Data_Studio.Fields
type Field = GoogleAppsScript.Data_Studio.Field



function currency(fields: Fields) {
    return fields.newDimension()
        .setId('currency')
        .setName('Currency')
        .setType(FieldType.TEXT);
}



function date(fields: Fields) {
    return fields.newDimension()
        .setId('date')
        .setName('Date')
        .setDescription('Report date')
        .setType(FieldType.YEAR_MONTH_DAY);
}



function views(fields: Fields) {
    return fields.newMetric()
        .setId('views')
        .setName('Views')
        .setDescription('The number of impressions')
        .setType(FieldType.NUMBER);
}



function clicks(fields: Fields) {
    return fields.newMetric()
        .setId('clicks')
        .setName('Clicks')
        .setType(FieldType.NUMBER);
}



const fieldSet: { [id: string]: (fields: Fields) => Field } = {
    currency,
    date,
    views,
    clicks,
};



function getDefaultFields(report_type: ReportType) {
    switch (report_type) {
        case ReportType.dates:
            return ['currency', 'date', 'views', 'clicks'];
    }

    // noinspection JSUnusedLocalSymbols
    const _exhaustiveCheck: never = report_type;

    return [];
}



export function getFields({configParams: {report_type}, fields}: GoogleAppsScript.Data_Studio.Request<ConnectorConfig>) {

    const fieldIds = fields && fields.length
        ? fields.map(f => f.name)
        : getDefaultFields(ReportType[report_type]);

    const fieldsBuilder = CC.getFields();

    for (const fieldId of fieldIds) {
        fieldSet[fieldId](fieldsBuilder);
    }

    return fieldsBuilder;
}



// Metrics


// fields.newMetric()
//     .setId('cr')
//     .setName('CR')
//     .setDescription('Conversion rate')
//     .setType(types.NUMBER);
//
// fields.newMetric()
//     .setId('ctr')
//     .setName('CTR')
//     .setType(types.NUMBER);
//
// fields.newMetric()
//     .setId('ecpc')
//     .setName('eCPC')
//     .setType(types.NUMBER);
//
// fields.newMetric()
//     .setId('ecpm')
//     .setName('eCPM')
//     .setType(types.NUMBER);
//
// fields.newMetric()
//     .setId('leads_approved')
//     .setName('Leads approved')
//     .setDescription('Number of confirmed leads')
//     .setType(types.NUMBER)
//     .setGroup('Leads');
//
// fields.newMetric()
//     .setId('leads_declined')
//     .setName('Leads declined')
//     .setDescription('Number of rejected leads')
//     .setType(types.NUMBER)
//     .setGroup('Leads');
//
// fields.newMetric()
//     .setId('leads_open')
//     .setName('Leads open')
//     .setDescription('Number of leads on hold')
//     .setType(types.NUMBER)
//     .setGroup('Leads');
//
// fields.newMetric()
//     .setId('payment_sum_approved')
//     .setName('Payment sum approved')
//     .setDescription('The amount related to the confirmed actions')
//     .setType(types.NUMBER)
//     .setGroup('Payments');
