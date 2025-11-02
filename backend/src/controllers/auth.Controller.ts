import bcrypt from 'bcryptjs';
import { User } from '../models/User.model.js';
import { Session } from '../models/Session.model.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const ACCESS_TOKEN_TTL = '30m';
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000 //14 ngay

export const signUp = async (req, res) => {
    try {
        const { username, email, password, firstName, lastName } = req.body;
        if (!username || !email || !password || !firstName || !lastName) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const duplicate = await User.findOne({ username });

        if (duplicate) {
            return res.status(409).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            username,
            email,
            password: hashedPassword,
            displayName: `${firstName} ${lastName}`,
        });

        return res.sendStatus(204);

    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const signIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }
    // include password explicitly because schema sets `select: false`
    const user = await User.findOne({ username }).select('+password')
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const accessToken = jwt.sign({ userId: user._id }, 
            // @ts-ignore
            process.env.ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_TTL });
        
        const refreshToken = crypto.randomBytes(64).toString('hex');

        // Session model expects `refreshToken` and `userId` fields
        await Session.create({
            refreshToken: refreshToken,
            userId: user._id,
            expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
        });

        const isProd = process.env.NODE_ENV === 'production';

        // In production we need secure + sameSite='none' for cross-site cookies over HTTPS.
        // For local development (non-production) use lax + secure=false so the cookie can be set over http://localhost.
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? 'none' : 'lax',
            maxAge: REFRESH_TOKEN_TTL,
        });

        return res.status(200).json({ accessToken }); 

    }
    catch (error) {
        console.error('Error signing in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const signOut = async (req, res) => {
    try {
        const token = req.cookies?.refreshToken;

        if (token) {
            await Session.deleteOne({ refreshToken: token });

            const isProd = process.env.NODE_ENV === 'production';
            res.clearCookie('refreshToken', { secure: isProd, sameSite: isProd ? 'none' : 'lax' });
        }
            return res.sendStatus(204);
    }
    catch (error) {
        console.error('Error signing out:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};