import { validateConfig } from './config';
import { getFields } from "./fields";
import { ConnectorConfig } from "./index";



/**
 * Возвращает схему данного запроса, предоставляя информацию об организации данных в коннекторе. Это позволяет получить для каждого поля такую информацию, как идентификатор, название, тип данных и т. д.
 * @param request объект JavaScript, содержащий параметры запроса схемы.
 * @global
 *
 * @see https://developers.google.com/datastudio/connector/reference?hl=ru#getschema
 */
export function getSchema(request: GoogleAppsScript.Data_Studio.Request<ConnectorConfig>) {
    validateConfig(request.configParams);

    const cc = DataStudioApp.createCommunityConnector();


    const fields = getFields(request);

    return cc.newGetSchemaResponse().setFields(fields).build();
}
