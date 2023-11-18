/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChangePasswordDto } from '../models/ChangePasswordDto';
import type { ForgotPasswordDto } from '../models/ForgotPasswordDto';
import type { LoginPersonDto } from '../models/LoginPersonDto';
import type { LoginResponseDto } from '../models/LoginResponseDto';
import type { MessageResponseDto } from '../models/MessageResponseDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class OauthService {

    /**
     * @param requestBody 
     * @returns LoginResponseDto Login success.
     * @throws ApiError
     */
    public static oauthControllerLogin(
requestBody: LoginPersonDto,
): CancelablePromise<LoginResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/oauth/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Incorrect credentials.`,
            },
        });
    }

    /**
     * @param requestBody 
     * @returns MessageResponseDto An e-mail has been sent to your account.
     * @throws ApiError
     */
    public static oauthControllerForgotPassword(
requestBody: ForgotPasswordDto,
): CancelablePromise<MessageResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/oauth/forgot-password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Unable to complete process. Invalid data supplied.`,
            },
        });
    }

    /**
     * @param requestBody 
     * @returns MessageResponseDto Password has been successfully updated.
     * @throws ApiError
     */
    public static oauthControllerChangePassword(
requestBody: ChangePasswordDto,
): CancelablePromise<MessageResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/oauth/change-password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Unable to complete process. Invalid data supplied.`,
            },
        });
    }

}
