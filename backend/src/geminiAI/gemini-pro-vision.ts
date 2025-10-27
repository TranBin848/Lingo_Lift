import dotenv from "dotenv";
import * as fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

interface GenerativePart {
  inlineData: {
    data: string;
    mimeType: string;
  };
}

function fileToGenerativePart(filePath: string, mimeType: string): GenerativePart {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(filePath)).toString("base64"),
      mimeType,
    },
  };
}

async function run() {
  try {
    // Use the new model name instead of deprecated gemini-pro-vision
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt =
      "What is the difference between the two images? Understand whats written on the paper.";

    // Check if image files exist
    const image1Path = "pen.jpg";
    const image2Path = "page-and-pen.jpg";

    if (!fs.existsSync(image1Path)) {
      console.error(`❌ Image not found: ${image1Path}`);
      console.log("💡 Please add 'pen.jpg' to the geminiAI folder");
      return;
    }

    if (!fs.existsSync(image2Path)) {
      console.error(`❌ Image not found: ${image2Path}`);
      console.log("💡 Please add 'page-and-pen.jpg' to the geminiAI folder");
      return;
    }

    console.log("📸 Loading images...");
    const imageParts = [
      fileToGenerativePart(image1Path, "image/jpeg"),
      fileToGenerativePart(image2Path, "image/jpeg"),
    ];

    console.log("🤖 Sending request to Gemini...");
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    
    console.log("\n✅ Generated Text:");
    console.log(text);
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Error:", error.message);
      
      if (error.message.includes("404")) {
        console.log("\n💡 The model name might be incorrect. Try:");
        console.log("   - gemini-1.5-pro");
        console.log("   - gemini-1.5-flash");
      }
      
      if (error.message.includes("403") || error.message.includes("API key")) {
        console.log("\n💡 API Key issue. Please:");
        console.log("   1. Get a new key: https://aistudio.google.com/app/apikey");
        console.log("   2. Update .env file with: GEMINI_API_KEY=your_key");
      }
    }
  }
}

run();