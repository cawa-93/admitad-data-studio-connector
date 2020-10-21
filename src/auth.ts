import { AuthType, CC } from "./contants";
import { ConnectorConfig } from "./index";



/**
 * @see https://github.com/googleworkspace/apps-script-oauth2#1-create-the-oauth2-service
 */
export function getOAuthService() {
    /**
     * Create a new service with the given name. The name will be used when
     * persisting the authorized token, so ensure it is unique within the
     * scope of the property store.
     */
    return OAuth2.createService('admitad')

        // Set the endpoint URLs, which are the same for all Google services.
        .setAuthorizationBaseUrl('https://www.admitad.com/api/authorize/')
        .setTokenUrl('https://api.admitad.com/token/')

        // Set the client ID and secret, from the Google Developers Console.
        .setClientId(process.env.ADMITAD_CLIENT_ID!)
        .setClientSecret(process.env.ADMITAD_CLIENT_SECRET!)

        // Set the name of the callback function in the script referenced
        // above that should be invoked to complete the OAuth flow.
        .setCallbackFunction('authCallback')

        // Set the property store where authorized tokens should be persisted.
        .setPropertyStore(PropertiesService.getUserProperties())

        // Set the scopes to request (space-separated for Google services).
        .setScope('advertiser_statistics');
}



/**
 * Обрабатывает ответ авторизации, полученный от сторонней службы в рамках процесса OAuth 2.0.
 * @param request
 * @global
 *
 * @see https://developers.google.com/datastudio/connector/reference?hl=ru#authcallback
 */
export function authCallback(request: GoogleAppsScript.Data_Studio.Request<ConnectorConfig>) {
    const authorized = getOAuthService().handleCallback(request);

    if (authorized) {
        return HtmlService.createHtmlOutput('Success! You can close this tab.');
    } else {
        return HtmlService.createHtmlOutput('Denied. You can close this tab');
    }

}



/**
 * Проверяет действительность учетных данных сторонней службы.
 *
 * Возвращает значение true, если учетные данные действительны, и ответ false – если недействительны.
 * В случае ответа true вызов функций getData и getSchema разрешается.
 * При ответе false пользователь получает уведомление об истечении срока действия авторизации и необходимости пройти ее повторно.
 *
 * @global
 * @return {boolean}
 *
 * @see https://developers.google.com/datastudio/connector/reference?hl=ru#isauthvalid
 */
export function isAuthValid() {
    const service = getOAuthService();
    if (service == null) {
        return false;
    }

    return service.hasAccess();
}



/**
 * Возвращает URL авторизации для запуска процесса OAuth 2.0 сторонней службой.
 * @global
 *
 * @see https://developers.google.com/datastudio/connector/reference?hl=ru#get3pauthorizationurls
 */
export function get3PAuthorizationUrls() {
    const service = getOAuthService();
    if (service == null) {
        return '';
    }
    return service.getAuthorizationUrl();
}



/**
 * Удаляет учетные данные пользователя для сторонней службы.
 * @global
 *
 * @see https://developers.google.com/datastudio/connector/reference?hl=ru#resetauth
 */
export function resetAuth() {
    getOAuthService().reset();
}



/**
 * Возвращает метод аутентификации коннектора.
 * @global
 *
 * @see https://developers.google.com/datastudio/connector/reference#getauthtype
 */
export function getAuthType() {

    return CC
        .newAuthTypeResponse()
        .setAuthType(AuthType.OAUTH2)
        .build();
}



/**
 * Проверяет, является ли пользователь администратором коннектора.
 * Эта функция используется для включения и выключения функций отладки.
 *
 * @see https://developers.google.com/datastudio/connector/debug?hl=ru#enablingdisabling_debug_features
 */
export function isAdminUser() {
    return true;
}
