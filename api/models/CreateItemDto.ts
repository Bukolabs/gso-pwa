/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateItemDto = {
    code?: string;
    name: string;
    description?: string;
    unit: string;
    category: string;
    brand: string;
    is_active?: boolean;
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
