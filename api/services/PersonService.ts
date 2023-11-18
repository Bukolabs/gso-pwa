/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActivatePersonDto } from '../models/ActivatePersonDto';
import type { AddPersonDto } from '../models/AddPersonDto';
import type { MessageResponseDto } from '../models/MessageResponseDto';
import type { UpdatePersonDto } from '../models/UpdatePersonDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PersonService {

    /**
     * @param requestBody 
     * @returns MessageResponseDto Create User.
     * @throws ApiError
     */
    public static personControllerAddPerson(
requestBody: AddPersonDto,
): CancelablePromise<MessageResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/person/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Unable to create User.`,
            },
        });
    }

    /**
     * @param requestBody 
     * @returns MessageResponseDto Account has been activated.
     * @throws ApiError
     */
    public static personControllerActivateAccount(
requestBody: ActivatePersonDto,
): CancelablePromise<MessageResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/person/activate',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Unable to complete process. Unable to activate account.`,
            },
        });
    }

    /**
     * @param requestBody 
     * @returns MessageResponseDto User has been successfully updated.
     * @throws ApiError
     */
    public static personControllerUpdatePerson(
requestBody: UpdatePersonDto,
): CancelablePromise<MessageResponseDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/person/update',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Unable to update User Data.`,
            },
        });
    }

}
