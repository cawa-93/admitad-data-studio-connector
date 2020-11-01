import { CC, ConnectorConfig, ReportType } from "./contants";



/**
 * Возвращает параметры коннектора, которые настраиваются пользователем.
 * @global
 *
 * @see https://developers.google.com/datastudio/connector/reference?hl=ru#getconfig
 */
export function getConfig() {

    const config = CC.getConfig();

    config
        .newTextInput()
        .setId('c_id')
        .setName('Affiliate program ID')
        .setPlaceholder('12345')
    ;

    config
        .newSelectSingle()
        .setId('report_type')
        .setName('Choose advertiser report')
        .addOption(config.newOptionBuilder().setLabel('Reports on date').setValue(ReportType.dates))
        .addOption(config.newOptionBuilder().setLabel('Reports on publishers').setValue(ReportType.webmasters))
    ;


    config.setDateRangeRequired(true);

    return config.build();
}



export function validateConfig(configParams: Partial<ConnectorConfig> = {}) {
    try {
        if (!configParams.c_id) {
            // noinspection ExceptionCaughtLocallyJS
            throw new Error('Affiliate program ID is required.');
        }

        if (!configParams.report_type || !Object.keys(ReportType).includes(configParams.report_type)) {
            // noinspection ExceptionCaughtLocallyJS
            throw new Error('Choose advertiser report.');
        }

    } catch (e) {
        CC
            .newUserError()
            .setText(e.message)
            .throwException();
    }
}
