/**
 * @file utils.ts
 * @description This file contains generic utility functions used throughout the controllers module.
 *
 * The functions provided here are designed to be reusable tools that facilitate
 * common operations such as handling errors, data transformations, string manipulations, etc.
 */

import {Response} from 'express';
import User from "../models/User";

/**
 * Handles errors and sends appropriate HTTP responses.
 *
 * @param res - The Express response object.
 * @param error - The error object.
 */
export function handleControllerError(res: Response, error: unknown) {
    if (error instanceof Error) {
        if (error.message === 'User not found') {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.status(500).json({ error: `An error has occurred: ${error.message}` });
        }
    } else {
        res.status(500).json({ error: `An error has occurred: ${String(error)}` });
    }
}

export async function handleServiceError(userId: string) {
    const user = await User.findByPk(userId)
    if (!user) throw new Error ('User not found')
}

