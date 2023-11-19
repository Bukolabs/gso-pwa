/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUtilsCategoryDto } from '../models/CreateUtilsCategoryDto';
import type { DeleteUtilsCategoryDto } from '../models/DeleteUtilsCategoryDto';
import type { EditUtilsCategoryDto } from '../models/EditUtilsCategoryDto';
import type { ListDataDto } from '../models/ListDataDto';
import type { MessageResponseDto } from '../models/MessageResponseDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CateogryService {

    /**
     * @param requestBody 
     * @returns MessageResponseDto Create Category.
     * @throws ApiError
     */
    public static utilsCategoryControllerCreate(
requestBody: CreateUtilsCategoryDto,
): CancelablePromise<MessageResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/utils-cateogry/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Unable to create Category.`,
                403: `Unauthorized Access!`,
            },
        });
    }

    /**
     * @param requestBody 
     * @returns MessageResponseDto Update Category.
     * @throws ApiError
     */
    public static utilsCategoryControllerEdit(
requestBody: EditUtilsCategoryDto,
): CancelablePromise<MessageResponseDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/utils-cateogry/edit',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Unable to update Category.`,
                403: `Unauthorized Access!`,
            },
        });
    }

    /**
     * @returns ListDataDto Returns List of Categories
     * @throws ApiError
     */
    public static utilsCategoryControllerGetDataAsList(): CancelablePromise<ListDataDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/utils-cateogry/get',
            errors: {
                400: `Something went wrong with the API. Blame JIM!`,
                403: `Unauthorized Access!`,
            },
        });
    }

    /**
     * @param requestBody 
     * @returns MessageResponseDto Delete Category.
     * @throws ApiError
     */
    public static utilsCategoryControllerDelete(
requestBody: DeleteUtilsCategoryDto,
): CancelablePromise<MessageResponseDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/utils-cateogry/delete',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Unable to delete Category.`,
                403: `Unauthorized Access!`,
            },
        });
    }

}
