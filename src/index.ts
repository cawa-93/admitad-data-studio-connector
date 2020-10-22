import * as auth from "./auth";
import * as config from './config';
import { ConnectorConfig } from "./contants";
import * as data from './data';
import * as schema from './schema';
import DS = GoogleAppsScript.Data_Studio;


type GoogleDataStudioContext = {
    getConfig: (request: DS.Request<ConnectorConfig>) => DS.Config
    getSchema: (request: DS.Request<ConnectorConfig>) => DS.GetSchemaResponse
    getData: (request: DS.Request<ConnectorConfig>) => DS.GetDataResponse
    getAuthType: () => DS.GetAuthTypeResponse,

    get3PAuthorizationUrls: () => string
    authCallback: (request: DS.Request<ConnectorConfig>) => void

    isAuthValid: () => boolean
    getOAuthService: () => GoogleAppsScriptOAuth2.OAuth2Service
    resetAuth: () => void

    isAdminUser?: () => void
}

const ctx: GoogleDataStudioContext = {
    getConfig: config.getConfig,
    getSchema: schema.getSchema,
    getData: data.getData,
    getAuthType: auth.getAuthType,
    get3PAuthorizationUrls: auth.get3PAuthorizationUrls,
    authCallback: auth.authCallback,
    isAuthValid: auth.isAuthValid,
    getOAuthService: auth.getOAuthService,
    resetAuth: auth.resetAuth,
    isAdminUser: auth.isAdminUser,
};

Object.assign(this, ctx);
