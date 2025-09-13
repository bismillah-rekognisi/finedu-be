import crypto from "crypto";

const SECRET_KEY = process.env.VERIFICATION_SECRET || "default_secret_key";
const ALGORITHM = "aes-256-cbc";
const IV_LENGTH = 16;

export function encrypt(payload) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const key = crypto.createHash("sha256").update(SECRET_KEY).digest();
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(JSON.stringify(payload), "utf8", "base64");
  encrypted += cipher.final("base64");
  return iv.toString("base64") + ":" + encrypted;
}

export function decrypt(token) {
  try {
    const [ivBase64, encrypted] = token.split(":");
    const iv = Buffer.from(ivBase64, "base64");
    const key = crypto.createHash("sha256").update(SECRET_KEY).digest();
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    let decrypted = decipher.update(encrypted, "base64", "utf8");
    decrypted += decipher.final("utf8");
    return JSON.parse(decrypted);
  } catch (err) {
    throw new Error("Invalid or expired verification token");
  }
}

export function generateLinkVerification({ baseUrl, userId, email }) {
    const payload = {
        userId,
        email,
        timestamp: Date.now()
    };
    const token = encrypt(payload);
    return `${baseUrl}/auth/verify?token=${encodeURIComponent(token)}`;
}