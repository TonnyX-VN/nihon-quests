import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../../context/GameContext';
import { soundService } from '../../services/sound';
import { Send, Sparkles, Lightbulb, Brain, Volume2, Bot, RefreshCw, MessageSquare } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'sensei';
  text: string;
  mode?: 'simple' | 'deep';
  timestamp: string;
}

export const StudyView: React.FC = () => {
  const { user, selectedLevel, senseiInitialContext, showToast } = useGame();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_welcome',
      sender: 'sensei',
      text: `Konnichiwa, ${user.username}! Cô là さくら先生 (Sakura Sensei) đây. 🌸\n\nEm đang gặp khó khăn ở phần nào trong tiếng Nhật? Hãy hỏi cô bất cứ điều gì về từ vựng, Kanji, cách dùng trợ từ hay sự khác biệt giữa các cấu trúc ngữ pháp từ N5 đến N3 nhé!\n\nEm có thể chọn chế độ "💡 Giải thích đơn giản" hoặc "🧠 Giải thích chuyên sâu" ở bên dưới nhé.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'simple' | 'deep'>('simple');
  const [loading, setLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // If there is initial context from a missed question, inject it
  useEffect(() => {
    if (senseiInitialContext) {
      setInput(`Thưa cô Sakura, xin cô giải thích giúp em cấu trúc này: "${senseiInitialContext}"`);
    }
  }, [senseiInitialContext]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const quickQuestions = [
    { title: 'Trợ từ に vs で', prompt: 'Xin cô phân biệt cách dùng trợ từ に và で khi chỉ địa điểm?' },
    { title: 'Trợ từ は vs が', prompt: 'Sự khác nhau cơ bản giữa trợ từ は và trợ từ が là gì?' },
    { title: 'Cấu trúc ように vs ために', prompt: 'Làm thế nào để phân biệt giữa ように và ために trong N4?' },
    { title: 'Cách chia thể て', prompt: 'Cô có mẹo nào giúp nhớ nhanh cách chia động từ nhóm 1 sang thể て không?' },
    { title: 'わけではない vs わけがない', prompt: 'Ý nghĩa và sắc thái khác nhau giữa わけではない và わけがない trong N3?' }
  ];

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || input.trim();
    if (!textToSend || loading) return;

    soundService.play('click');
    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: textToSend,
      mode,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/sensei', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: textToSend,
          mode,
          level: selectedLevel,
          context: senseiInitialContext || ''
        })
      });

      if (!response.ok) {
        throw new Error('Lỗi phản hồi từ máy chủ Sakura Sensei');
      }

      const data = await response.json();
      const senseiMsg: ChatMessage = {
        id: `sensei_${Date.now()}`,
        sender: 'sensei',
        text: data.answer || 'Sensei đã ghi nhận câu hỏi. Chúc em học tốt!',
        mode,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, senseiMsg]);
      soundService.play('correct');
    } catch (err: any) {
      // Fallback response with helpful grammar insight
      const fallbackMsg: ChatMessage = {
        id: `sensei_fb_${Date.now()}`,
        sender: 'sensei',
        text: `Sensei xin giải đáp cho em nhé:\n\nĐối với "${textToSend}":\n- Quy tắc: Hãy chú ý đối tượng và hành động trong câu.\n- Ví dụ: 毎日日本語を勉強します (Mỗi ngày tôi đều học tiếng Nhật).\n- Nghĩa: Việc kiên trì từng chút một là chìa khóa để đạt kết quả tốt nhất. Cố lên nhé!`,
        mode,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayVoice = (text: string) => {
    // Extract japanese text from sensei's response or whole message
    const jpRegex = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]+/g;
    const matches = text.match(jpRegex);
    if (matches && matches.length > 0) {
      soundService.speakJapanese(matches.join(' '));
      showToast('Đang phát âm tiếng Nhật...', '🔊');
    } else {
      soundService.speakJapanese(text);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-4xl mx-auto">
      {/* Sensei Header Card */}
      <div className="relative overflow-hidden rounded-3xl border border-rose-800/40 bg-gradient-to-br from-slate-900 via-rose-950/40 to-slate-950 p-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center text-4xl shadow-lg ring-4 ring-rose-400/20">
            🌸
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                さくら先生 (Sakura Sensei)
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online
              </span>
            </div>
            <p className="text-xs sm:text-sm text-rose-200/80 mt-0.5">
              Cố vấn AI đồng hành thông thái • Giải thích ngữ pháp, Kanji & trợ từ JLPT N5 - N3
            </p>
          </div>
        </div>
      </div>

      {/* Mode Selector & Quick Presets */}
      <div className="space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Chế độ giải thích:
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode('simple')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                mode === 'simple'
                  ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-400/50'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>💡 Giải thích đơn giản</span>
            </button>

            <button
              onClick={() => setMode('deep')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                mode === 'deep'
                  ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-400/50'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Brain className="w-3.5 h-3.5" />
              <span>🧠 Giải thích chuyên sâu</span>
            </button>
          </div>
        </div>

        {/* Quick questions chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q.prompt)}
              className="whitespace-nowrap px-3 py-1.5 rounded-lg text-xs bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-rose-500/40 text-slate-300 hover:text-white transition cursor-pointer"
            >
              {q.title}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 sm:p-6 min-h-[380px] max-h-[500px] overflow-y-auto space-y-4 shadow-inner">
        {messages.map((msg) => {
          const isSensei = msg.sender === 'sensei';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isSensei ? 'justify-start' : 'justify-end'}`}
            >
              {isSensei && (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center text-lg shrink-0 shadow">
                  🌸
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 space-y-2 text-sm leading-relaxed ${
                  isSensei
                    ? 'bg-slate-900/95 border border-rose-900/40 text-slate-200 shadow-md'
                    : 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-md'
                }`}
              >
                <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-1 text-[11px] opacity-80">
                  <span className="font-bold">
                    {isSensei ? 'Sakura Sensei (さくら先生)' : user.username}
                  </span>
                  <span>{msg.timestamp}</span>
                </div>

                <div className="whitespace-pre-wrap font-sans text-sm">
                  {msg.text}
                </div>

                {isSensei && (
                  <div className="pt-1 flex items-center justify-end">
                    <button
                      onClick={() => handlePlayVoice(msg.text)}
                      title="Phát âm tiếng Nhật trong câu trả lời"
                      className="flex items-center gap-1 text-[11px] text-rose-300 hover:text-rose-200 px-2 py-1 rounded bg-rose-950/50 border border-rose-800/40 hover:bg-rose-900/40 transition"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe phát âm</span>
                    </button>
                  </div>
                )}
              </div>

              {!isSensei && (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-600 flex items-center justify-center text-lg shrink-0 shadow">
                  {user.avatar}
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-3 justify-start items-center text-xs text-rose-300 animate-pulse">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center text-lg shadow">
              🌸
            </div>
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
              Sensei đang nghiên cứu và soạn câu trả lời chuẩn xác cho em...
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Input Box */}
      <div className="relative flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder={
            mode === 'simple'
              ? 'Hỏi Sensei (VD: "Trợ từ に và で khác nhau ra sao?")...'
              : 'Hỏi chuyên sâu (VD: "Phân tích sắc thái của わけではない và cách dùng thực tế")...'
          }
          className="flex-1 px-4 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 text-slate-100 placeholder:text-slate-500 text-sm outline-none shadow-lg transition"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={!input.trim() || loading}
          className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm shadow-lg shadow-rose-950/60 transition flex items-center gap-1.5 cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Gửi</span>
        </button>
      </div>
    </div>
  );
};
