/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateItemDto } from '../models/CreateItemDto';
import type { DeleteItemDto } from '../models/DeleteItemDto';
import type { EditItemDto } from '../models/EditItemDto';
import type { ListDataDto } from '../models/ListDataDto';
import type { MessageResponseDto } from '../models/MessageResponseDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ItemService {

    /**
     * @param requestBody 
     * @returns MessageResponseDto Create Item.
     * @throws ApiError
     */
    public static itemControllerCreate(
requestBody: CreateItemDto,
): CancelablePromise<MessageResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/item/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Unable to create Item.`,
                403: `Unauthorized Access!`,
            },
        });
    }

    /**
     * @param requestBody 
     * @returns MessageResponseDto Update Item.
     * @throws ApiError
     */
    public static itemControllerEdit(
requestBody: EditItemDto,
): CancelablePromise<MessageResponseDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/item/edit',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Unable to update Item.`,
                403: `Unauthorized Access!`,
            },
        });
    }

    /**
     * @returns ListDataDto Returns List of Items
     * @throws ApiError
     */
    public static itemControllerGetDataAsList(): CancelablePromise<ListDataDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/item/get',
            errors: {
                400: `Something went wrong with the API. Blame JIM!`,
                403: `Unauthorized Access!`,
            },
        });
    }

    /**
     * @param requestBody 
     * @returns MessageResponseDto Delete Item.
     * @throws ApiError
     */
    public static itemControllerDelete(
requestBody: DeleteItemDto,
): CancelablePromise<MessageResponseDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/item/delete',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Unable to delete Item.`,
                403: `Unauthorized Access!`,
            },
        });
    }

}
