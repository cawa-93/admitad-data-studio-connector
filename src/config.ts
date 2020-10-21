import { CC } from "./contants";
import { ConnectorConfig } from "./index";



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
        .setPlaceholder('12345');

    config.setDateRangeRequired(true);

    return config.build();
}



export function validateConfig(configParams: ConnectorConfig = {}) {
    try {
        if (!configParams.c_id) {
            // noinspection ExceptionCaughtLocallyJS
            throw new Error('Affiliate program ID is required.');
        }

    } catch (e) {
        CC
            .newUserError()
            .setText(e.message)
            .throwException();
    }
}
