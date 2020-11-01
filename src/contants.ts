export const CC = DataStudioApp.createCommunityConnector();
export const FieldType = CC.FieldType;
export const AuthType = CC.AuthType;

export enum ReportType {
    dates = 'dates',
    // actions = 'actions',
    webmasters = 'webmasters',
    // websites = 'websites',
    // banners = 'banners',
    // landings = 'landings',
    // landingwebsites = 'landingwebsites',
    // channels = 'channels',
    // groups = 'groups',
    // offline = 'offline',
}

export interface ConnectorConfig {
    c_id: string;
    report_type: ReportType
}
