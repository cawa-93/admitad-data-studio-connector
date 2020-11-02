import { FieldType } from "./contants";

type Fields = GoogleAppsScript.Data_Studio.Fields


// Dimensions
// ------------

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

function username(fields: Fields) {
    return fields.newDimension()
        .setId('username')
        .setName('Username')
        .setDescription('Publisher')
        .setType(FieldType.TEXT)
}



// Metrics
// ------------

function views(fields: Fields) {
    return fields.newMetric()
        .setId('views')
        .setName('Views')
        .setDescription('The number of impressions')
        .setType(FieldType.NUMBER)
        .setGroup('Efficiency');
}



function clicks(fields: Fields) {
    return fields.newMetric()
        .setId('clicks')
        .setName('Clicks')
        .setType(FieldType.NUMBER)
        .setGroup('Efficiency');
}



function cr(fields: Fields) {
    return fields.newMetric()
        .setId('cr')
        .setName('CR')
        .setDescription('Conversion rate')
        .setType(FieldType.NUMBER)
        .setGroup('Conversions');
}



function ctr(fields: Fields) {
    return fields.newMetric()
        .setId('ctr')
        .setName('CTR')
        .setType(FieldType.NUMBER)
        .setGroup('Efficiency');
}



function ecpc(fields: Fields) {
    return fields.newMetric()
        .setId('ecpc')
        .setName('eCPC')
        .setType(FieldType.NUMBER)
        .setGroup('Cost');
}



function ecpm(fields: Fields) {
    return fields.newMetric()
        .setId('ecpm')
        .setName('eCPM')
        .setType(FieldType.NUMBER)
        .setGroup('Cost');
}



function leads_approved(fields: Fields) {
    return fields.newMetric()
        .setId('leads_approved')
        .setName('Leads approved')
        .setDescription('Number of confirmed leads')
        .setType(FieldType.NUMBER)
        .setGroup('Leads');
}



function leads_declined(fields: Fields) {
    return fields.newMetric()
        .setId('leads_declined')
        .setName('Leads declined')
        .setDescription('Number of rejected leads')
        .setType(FieldType.NUMBER)
        .setGroup('Leads');
}



function leads_open(fields: Fields) {
    return fields.newMetric()
        .setId('leads_open')
        .setName('Leads open')
        .setDescription('Number of leads on hold')
        .setType(FieldType.NUMBER)
        .setGroup('Leads');
}



function payment_sum_approved(fields: Fields) {
    return fields.newMetric()
        .setId('payment_sum_approved')
        .setName('Payment sum approved')
        .setDescription('The amount related to the confirmed actions')
        .setType(FieldType.NUMBER)
        .setGroup('Payments');
}



function payment_sum_open(fields: Fields) {
    return fields.newMetric()
        .setId('payment_sum_open')
        .setName('Payment sum open')
        .setDescription('The amount related to the actions on hold')
        .setType(FieldType.NUMBER)
        .setGroup('Payments');
}



function sales_approved(fields: Fields) {
    return fields.newMetric()
        .setId('sales_approved')
        .setName('Sales approved')
        .setDescription('Number of confirmed sales')
        .setType(FieldType.NUMBER)
        .setGroup('Sales');
}



function sales_declined(fields: Fields) {
    return fields.newMetric()
        .setId('sales_declined')
        .setName('Sales declined')
        .setDescription('Number of rejected sales')
        .setType(FieldType.NUMBER)
        .setGroup('Sales');
}

function sales_open(fields: Fields) {
    return fields.newMetric()
        .setId('sales_open')
        .setName('Sales open')
        .setDescription('Number of sales on hold')
        .setType(FieldType.NUMBER)
        .setGroup('Sales');
}



export const fieldSet = {
    currency,
    date,
    views,
    clicks,
    cr,
    ctr,
    ecpc,
    ecpm,
    leads_approved,
    leads_declined,
    leads_open,
    payment_sum_approved,
    payment_sum_open,
    sales_approved,
    sales_declined,
    sales_open,
    username,
};
