/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type EditPersonDto = {
    code: string;
    first_name: string;
    last_name: string;
    middle_name?: string;
    suffix?: string;
    position?: string;
    gender: string;
    civil_status: string;
    birthday?: string;
    street_name?: string;
    subdivision?: string;
    zone?: string;
    sitio?: string;
    purok?: string;
    barangay?: string;
    municipality?: string;
    province?: string;
    region?: string;
    country?: string;
    zip?: string;
    email: string;
    mobile?: string;
    phone?: string;
    is_active?: boolean;
    is_verified?: boolean;
    avatar?: string;
    activation_code?: string;
    /**
     * The date and time of the event. Format: YYYY-MM-DD HH:ii:ss
     */
    created_at?: string;
    created_by?: string;
    /**
     * The date and time of the event. Format: YYYY-MM-DD HH:ii:ss
     */
    updated_at?: string;
    updated_by?: string;
};
