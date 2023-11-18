/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type LoginResponseDto = {
    person_code: string;
    person_first_name: string;
    person_last_name: string;
    person_middle_name?: string;
    person_suffix?: string;
    person_position?: string;
    person_gender: string;
    person_civil_status: string;
    person_birthday?: string;
    person_street_name?: string;
    person_subdivision?: string;
    person_zone?: string;
    person_sitio?: string;
    person_purok?: string;
    person_barangay?: string;
    person_municipality?: string;
    person_province?: string;
    person_region?: string;
    person_country?: string;
    person_zip?: string;
    person_email: string;
    person_mobile?: string;
    person_phone?: string;
    person_is_active?: boolean;
    person_is_verified?: boolean;
    person_avatar?: string;
    oauth_client_secret: string;
    oauth_client_scope?: string;
    oauth_client_grant_type?: string;
    oauth_token: string;
    oauth_refresh_token: string;
    /**
     * The date and time of the event. Format: YYYY-MM-DD HH:ii:ss
     */
    oauth_expiry: string;
};
