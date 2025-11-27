import jwt from 'jsonwebtoken';
import { User } from '../models/User.model.js';

export const protectRoute = async (req, res, next) => {
    try {
        console.log('=== Auth Middleware ===');
        console.log('Request originalUrl:', req.originalUrl);
        console.log('Request path:', req.path);
        console.log('Request method:', req.method);
        console.log('All headers:', JSON.stringify(req.headers, null, 2));
        
        const authHeader = req.headers['authorization'] || req.headers.authorization;
        console.log('Auth header:', authHeader);
        
        const token = authHeader && authHeader.split(' ')[1];
        console.log('Token:', token ? 'exists' : 'missing');

        if (!token) {
            return res.status(401).json({ message: 'Access token is missing' });
        }

        // Ensure secret exists
        // @ts-ignore
        const secret = process.env.ACCESS_TOKEN_SECRET;
        if (!secret) {
            console.error('ACCESS_TOKEN_SECRET is not set');
            return res.status(500).json({ message: 'Server misconfiguration' });
        }

        let decoded: any;
        try {
            decoded = jwt.verify(token, secret);
        } catch (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        const userId = decoded?.userId || decoded?.id;
        if (!userId) return res.status(403).json({ message: 'Invalid token payload' });

        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // attach user to request for downstream handlers
        req.user = user;
        return next();
    } catch (error) {
        console.error('Error in auth middleware:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}