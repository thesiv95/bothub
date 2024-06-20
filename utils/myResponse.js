import express from 'express';
import { StatusCodesEnum } from '../consts.js';

/**
 * Success response json
 * @param {express.Response} res
 * @param {Object} data
 * @param {number} statusCode 
 */
export const success = (res, data, statusCode = StatusCodesEnum.ok) => {
    return res.status(statusCode).json({
        success: true,
        ...data,
    });
};

/**
 * Error response json
 * @param {express.Response} res
 * @param {Error} error
 * @param {number} statusCode 
 */
export const error = (res, error, statusCode = StatusCodesEnum.serverError) => {
    return res.status(statusCode).json({
        success: false,
        error: {
            message: error.message,
            stack: error.stack
        }
    });
};