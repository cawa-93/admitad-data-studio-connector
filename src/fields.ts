import { CC, ConnectorConfig, ReportType } from "./contants";
import { fieldSet } from "./fieldSet";



function getDefaultFields(report_type: ReportType) {
    switch (report_type) {
        case ReportType.dates:
            return [
                'currency',
                'date',
                'views',
                'clicks',
                'cr',
                'ctr',
                'ecpc',
                'ecpm',
                'leads_approved',
                'leads_declined',
                'leads_open',
                'payment_sum_approved',
                'payment_sum_open',
                'sales_approved',
                'sales_declined',
                'sales_open',
            ] as const;
        case ReportType.webmasters:
            return [
                'clicks',
                'currency',
                'cr',
                'ctr',
                'username',
                'ecpc',
                'ecpm',
                'leads_approved',
                'leads_declined',
                'leads_open',
                'payment_sum_approved',
                'payment_sum_open',
                'sales_approved',
                'sales_declined',
                'sales_open',
                'views',
            ] as const;
    }

    // noinspection JSUnusedLocalSymbols
    const _exhaustiveCheck: never = report_type;

    return undefined;
}



export function getFields({configParams: {report_type}, fields}: GoogleAppsScript.Data_Studio.Request<ConnectorConfig>) {

    const fieldIds = fields && fields.length
        ? fields.map(f => f.name) as Array<keyof typeof fieldSet>
        : getDefaultFields(ReportType[report_type]);

    const fieldsBuilder = CC.getFields();


    for (const fieldId of fieldIds) {
        fieldSet[fieldId](fieldsBuilder);
    }

    return fieldsBuilder;
}



