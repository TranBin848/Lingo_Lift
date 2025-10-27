import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

async function run() 
{
    const model = genAI.getGenerativeModel({model : "gemini-2.5-flash"});

    const prompt = "Write a short story about a brave little toaster who saves the day.";

    const result = await model.generateContent(prompt);

    const responseText = result.response.text();

    console.log("Generated Text:\n", responseText);
}

run();