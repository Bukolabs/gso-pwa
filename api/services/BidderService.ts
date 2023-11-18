/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateBidderDto } from '../models/CreateBidderDto';
import type { DeleteBidderDto } from '../models/DeleteBidderDto';
import type { EditBidderDto } from '../models/EditBidderDto';
import type { ListDataDto } from '../models/ListDataDto';
import type { MessageResponseDto } from '../models/MessageResponseDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BidderService {

    /**
     * @param requestBody 
     * @returns MessageResponseDto Create Bidder.
     * @throws ApiError
     */
    public static bidderControllerCreate(
requestBody: CreateBidderDto,
): CancelablePromise<MessageResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/bidder/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Unable to create Bidder.`,
            },
        });
    }

    /**
     * @param requestBody 
     * @returns MessageResponseDto Update Bidder.
     * @throws ApiError
     */
    public static bidderControllerEdit(
requestBody: EditBidderDto,
): CancelablePromise<MessageResponseDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/bidder/edit',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Unable to update Bidder.`,
            },
        });
    }

    /**
     * @returns ListDataDto Returns List of Bidders
     * @throws ApiError
     */
    public static bidderControllerGetDataAsList(): CancelablePromise<ListDataDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/bidder/get',
            errors: {
                400: `Something went wrong with the API. Blame JIM!`,
            },
        });
    }

    /**
     * @param requestBody 
     * @returns MessageResponseDto Delete Bidder.
     * @throws ApiError
     */
    public static bidderControllerDelete(
requestBody: DeleteBidderDto,
): CancelablePromise<MessageResponseDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/bidder/delete',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Unable to delete Bidder.`,
            },
        });
    }

}
