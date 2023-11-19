/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUtilsBrandDto } from '../models/CreateUtilsBrandDto';
import type { DeleteUtilsBrandDto } from '../models/DeleteUtilsBrandDto';
import type { EditUtilsBrandDto } from '../models/EditUtilsBrandDto';
import type { ListDataDto } from '../models/ListDataDto';
import type { MessageResponseDto } from '../models/MessageResponseDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BrandService {

    /**
     * @param requestBody 
     * @returns MessageResponseDto Create Brand.
     * @throws ApiError
     */
    public static utilsBrandControllerCreate(
requestBody: CreateUtilsBrandDto,
): CancelablePromise<MessageResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/utils-brand/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Unable to create Brand.`,
                403: `Unauthorized Access!`,
            },
        });
    }

    /**
     * @param requestBody 
     * @returns MessageResponseDto Update Brand.
     * @throws ApiError
     */
    public static utilsBrandControllerEdit(
requestBody: EditUtilsBrandDto,
): CancelablePromise<MessageResponseDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/utils-brand/edit',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Unable to update Brand.`,
                403: `Unauthorized Access!`,
            },
        });
    }

    /**
     * @returns ListDataDto Returns List of Brands
     * @throws ApiError
     */
    public static utilsBrandControllerGetDataAsList(): CancelablePromise<ListDataDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/utils-brand/get',
            errors: {
                400: `Something went wrong with the API. Blame JIM!`,
                403: `Unauthorized Access!`,
            },
        });
    }

    /**
     * @param requestBody 
     * @returns MessageResponseDto Delete Brand.
     * @throws ApiError
     */
    public static utilsBrandControllerDelete(
requestBody: DeleteUtilsBrandDto,
): CancelablePromise<MessageResponseDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/utils-brand/delete',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Unable to delete Brand.`,
                403: `Unauthorized Access!`,
            },
        });
    }

}
