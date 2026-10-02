import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize GoogleGenAI
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Sensei endpoint
app.post('/api/sensei', async (req, res) => {
  try {
    const { question, mode = 'simple', level = 'N5', context = '' } = req.body;

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Câu hỏi không được để trống.' });
    }

    if (!ai) {
      // Intelligent fallback when API key is not yet configured
      return res.json({
        answer: `[Sakura Sensei - Chế độ ngoại tuyến]\nChào bạn! Hiện tại kết nối AI đang ở chế độ ngoại tuyến mô phỏng. \n\nVề câu hỏi "${question}":\n- Trình độ: ${level}\n- Lời khuyên: Hãy kiểm tra kỹ trợ từ và bối cảnh câu.\n- Ví dụ: 私は毎日日本語を勉強します。(Tôi học tiếng Nhật mỗi ngày).\n\n(Để mở khóa toàn bộ trí tuệ của Sakura Sensei, hãy thiết lập GEMINI_API_KEY trong môi trường.)`,
        examples: [
          { jp: '私は毎日日本語を勉強します。', vi: 'Tôi học tiếng Nhật mỗi ngày.' }
        ]
      });
    }

    const systemPrompt = `Bạn là さくら先生 (Sakura Sensei), một giáo viên tiếng Nhật tận tâm, thân thiện và am hiểu sâu sắc về ngữ pháp, từ vựng, Kanji từ trình độ JLPT N5 đến N3.
Bạn giải thích bằng tiếng Việt tự nhiên, ấm áp, khuyến khích học viên, pha chút phong cách Sensei trong game RPG.
QUY TẮC BẮT BUỘC:
1. Giải thích bằng tiếng Việt dễ hiểu, chuẩn xác tuyệt đối, KHÔNG ĐƯỢC tự bịa quy tắc ngữ pháp.
2. Luôn luôn có ít nhất 1-2 câu ví dụ tiếng Nhật (kèm Kanji + Furigana/Hiragana trong ngoặc đơn nếu có) và bản dịch tiếng Việt chuẩn xác.
3. Chế độ giải thích:
   - Nếu mode === 'simple' (💡 Giải thích đơn giản): Ngắn gọn, súc tích (3-5 câu), tập trung vào mẹo nhớ nhanh và 1 ví dụ cụ thể.
   - Nếu mode === 'deep' (🧠 Giải thích chuyên sâu): Phân tích chi tiết bản chất ngữ pháp, sắc thái (nuance), các lỗi người Việt hay gặp, so sánh với cấu trúc tương tự (như に vs で, は vs が, ても vs たら), kèm 2 ví dụ thực tế.
4. Trình độ học viên hiện tại: ${level}.
${context ? `Ngữ cảnh câu hỏi/bài tập đang làm: ${context}` : ''}`;

    const userPrompt = `Câu hỏi của học viên: "${question}". Chế độ: ${mode === 'deep' ? 'Giải thích chuyên sâu' : 'Giải thích đơn giản'}.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.3,
      }
    });

    const replyText = response.text || 'Xin lỗi học viên, Sensei đang suy nghĩ thêm một chút. Hãy thử lại nhé!';
    return res.json({ answer: replyText });
  } catch (error: any) {
    console.error('Sensei API Error:', error);
    return res.status(500).json({
      error: 'Không thể kết nối với Sakura Sensei lúc này. Hãy thử lại!',
      details: error?.message || String(error)
    });
  }
});

// Setup dev server with Vite or production static assets
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Nihongo Quest] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
