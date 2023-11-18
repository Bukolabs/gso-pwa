/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUtilsUnitDto } from '../models/CreateUtilsUnitDto';
import type { DeleteUtilsUnitDto } from '../models/DeleteUtilsUnitDto';
import type { EditUtilsUnitDto } from '../models/EditUtilsUnitDto';
import type { ListDataDto } from '../models/ListDataDto';
import type { MessageResponseDto } from '../models/MessageResponseDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UnitService {

    /**
     * @param requestBody 
     * @returns MessageResponseDto Create Unit.
     * @throws ApiError
     */
    public static utilsUnitControllerCreate(
requestBody: CreateUtilsUnitDto,
): CancelablePromise<MessageResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/utils-unit/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Unable to create Unit.`,
            },
        });
    }

    /**
     * @param requestBody 
     * @returns MessageResponseDto Update Unit.
     * @throws ApiError
     */
    public static utilsUnitControllerEdit(
requestBody: EditUtilsUnitDto,
): CancelablePromise<MessageResponseDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/utils-unit/edit',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Unable to update Unit.`,
            },
        });
    }

    /**
     * @returns ListDataDto Returns List of Units
     * @throws ApiError
     */
    public static utilsUnitControllerGetDataAsList(): CancelablePromise<ListDataDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/utils-unit/get',
            errors: {
                400: `Something went wrong with the API. Blame JIM!`,
            },
        });
    }

    /**
     * @param requestBody 
     * @returns MessageResponseDto Delete Unit.
     * @throws ApiError
     */
    public static utilsUnitControllerDelete(
requestBody: DeleteUtilsUnitDto,
): CancelablePromise<MessageResponseDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/utils-unit/delete',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Unable to delete Unit.`,
            },
        });
    }

}
