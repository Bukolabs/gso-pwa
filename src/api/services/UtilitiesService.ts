/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListDataDto } from '../models/ListDataDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UtilitiesService {

    /**
     * @returns any API is up and running.
     * @throws ApiError
     */
    public static utilitiesControllerPulseCheck(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/utilities/pulse-check',
            errors: {
                400: `Something went wrong with the API. Blame JIM!`,
            },
        });
    }

    /**
     * @returns ListDataDto Returns List of Puroks
     * @throws ApiError
     */
    public static utilitiesControllerCivilStatus(): CancelablePromise<ListDataDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/utilities/civil-status',
            errors: {
                400: `Something went wrong with the API. Blame JIM!`,
            },
        });
    }

    /**
     * @returns ListDataDto Returns List of Puroks
     * @throws ApiError
     */
    public static utilitiesControllerHouseholdRole(): CancelablePromise<ListDataDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/utilities/household-role',
            errors: {
                400: `Something went wrong with the API. Blame JIM!`,
            },
        });
    }

    /**
     * @returns ListDataDto Returns List of Puroks
     * @throws ApiError
     */
    public static utilitiesControllerGender(): CancelablePromise<ListDataDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/utilities/gender',
            errors: {
                400: `Something went wrong with the API. Blame JIM!`,
            },
        });
    }

    /**
     * @returns ListDataDto Returns List of Puroks
     * @throws ApiError
     */
    public static utilitiesControllerPuroks(): CancelablePromise<ListDataDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/utilities/puroks',
            errors: {
                400: `Something went wrong with the API. Blame JIM!`,
            },
        });
    }

    /**
     * @returns ListDataDto Returns List of Regions
     * @throws ApiError
     */
    public static utilitiesControllerRegions(): CancelablePromise<ListDataDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/utilities/regions',
            errors: {
                400: `Something went wrong with the API. Blame JIM!`,
            },
        });
    }

    /**
     * @param region 
     * @returns ListDataDto Returns List of Provinces
     * @throws ApiError
     */
    public static utilitiesControllerProvinces(
region: string,
): CancelablePromise<ListDataDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/utilities/provinces/{region}',
            path: {
                'region': region,
            },
            errors: {
                400: `Something went wrong with the API. Blame JIM!`,
            },
        });
    }

    /**
     * @param region 
     * @param province 
     * @returns ListDataDto Returns List of Cities
     * @throws ApiError
     */
    public static utilitiesControllerCities(
region: string,
province: string,
): CancelablePromise<ListDataDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/utilities/cities/{region}/{province}',
            path: {
                'region': region,
                'province': province,
            },
            errors: {
                400: `Something went wrong with the API. Blame JIM!`,
            },
        });
    }

    /**
     * @param region 
     * @param province 
     * @param city 
     * @returns ListDataDto Returns List of Barangay
     * @throws ApiError
     */
    public static utilitiesControllerBarangay(
region: string,
province: string,
city: string,
): CancelablePromise<ListDataDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/utilities/barangay/{region}/{province}/{city}',
            path: {
                'region': region,
                'province': province,
                'city': city,
            },
            errors: {
                400: `Something went wrong with the API. Blame JIM!`,
            },
        });
    }

    /**
     * @returns ListDataDto Returns List of User Roles
     * @throws ApiError
     */
    public static utilitiesControllerGetUtilsRoleDataAsList(): CancelablePromise<ListDataDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/utilities/roles',
            errors: {
                400: `Something went wrong with the API. Blame JIM!`,
                403: `Unauthorized Access!`,
            },
        });
    }

}
