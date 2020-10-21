import { CC, FieldType } from "./contants";
import { ConnectorConfig } from "./index";

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



const map: { [id: string]: (fields: Fields) => Field } = {
    currency,
    date,
    views,
    clicks,
};



export function getFields(request: GoogleAppsScript.Data_Studio.Request<ConnectorConfig>) {

    const fieldIds = request.fields
        ? request.fields.map(f => f.name)
        : ['currency', 'date', 'views', 'clicks'];

    const fields = CC.getFields();

    for (const fieldId of fieldIds) {
        map[fieldId](fields);
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


    return fields;
}
