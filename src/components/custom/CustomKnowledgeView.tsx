import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { CustomKnowledgeItem, JLPTLevel } from '../../types/game';
import { soundService } from '../../services/sound';
import {
  BookPlus,
  Search,
  Sparkles,
  Volume2,
  Trash2,
  Edit3,
  Play,
  Download,
  Upload,
  Plus,
  Check,
  X,
  Filter,
  Star,
  BrainCircuit,
  FolderOpen
} from 'lucide-react';

export const CustomKnowledgeView: React.FC = () => {
  const {
    user,
    addCustomKnowledge,
    updateCustomKnowledge,
    deleteCustomKnowledge,
    playCustomKnowledgeStage,
    exportUserData,
    importUserData,
    showToast,
    openSenseiWithContext
  } = useGame();

  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<'ALL' | JLPTLevel>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);

  // Form state
  const [formTerm, setFormTerm] = useState('');
  const [formFurigana, setFormFurigana] = useState('');
  const [formMeaning, setFormMeaning] = useState('');
  const [formLevel, setFormLevel] = useState<JLPTLevel>('N5');
  const [formCategory, setFormCategory] = useState<'vocabulary' | 'kanji' | 'grammar' | 'phrase'>('vocabulary');
  const [formExampleJp, setFormExampleJp] = useState('');
  const [formExampleVi, setFormExampleVi] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [formTags, setFormTags] = useState('');

  const customList = Object.values(user.customKnowledge || {});

  // Filtered items
  const filteredItems = customList.filter((item) => {
    const matchesSearch =
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.furigana && item.furigana.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.meaningVi.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLevel = levelFilter === 'ALL' || item.level === levelFilter;
    const matchesCategory = categoryFilter === 'ALL' || item.category === categoryFilter;

    return matchesSearch && matchesLevel && matchesCategory;
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormTerm('');
    setFormFurigana('');
    setFormMeaning('');
    setFormLevel('N5');
    setFormCategory('vocabulary');
    setFormExampleJp('');
    setFormExampleVi('');
    setFormNotes('');
    setFormTags('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: CustomKnowledgeItem) => {
    setEditingId(item.id);
    setFormTerm(item.term);
    setFormFurigana(item.furigana || '');
    setFormMeaning(item.meaningVi);
    setFormLevel(item.level);
    setFormCategory(item.category as any);
    setFormExampleJp(item.exampleJp || '');
    setFormExampleVi(item.exampleVi || '');
    setFormNotes(item.notes || '');
    setFormTags((item.tags || []).join(', '));
    setIsModalOpen(true);
  };

  // AI Sakura Sensei autofill assistant
  const handleAiAutoFill = async () => {
    if (!formTerm.trim()) {
      showToast('Vui lòng nhập từ tiếng Nhật cần gợi ý trước!', '⚠️');
      return;
    }

    setAiGenerating(true);
    try {
      const response = await fetch('/api/sensei', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: `Cho từ/ngữ pháp tiếng Nhật "${formTerm}". Hãy cung cấp ngắn gọn theo định dạng: Furigana, nghĩa tiếng Việt, trình độ JLPT (N5/N4/N3), ví dụ tiếng Nhật và dịch nghĩa ví dụ tiếng Việt.`,
          mode: 'simple',
          level: formLevel
        })
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.answer || '';
        setFormNotes(prev => prev ? `${prev}\n\n[Gợi ý của Sensei]: ${text.slice(0, 160)}...` : text.slice(0, 160));
        showToast('Sakura Sensei đã hỗ trợ kiểm tra thông tin!', '🌸');
      }
    } catch {
      showToast('Không thể kết nối với Sakura Sensei lúc này.', 'ℹ️');
    } finally {
      setAiGenerating(false);
    }
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTerm.trim() || !formMeaning.trim()) {
      showToast('Vui lòng nhập đủ từ tiếng Nhật và nghĩa tiếng Việt!', '⚠️');
      return;
    }

    const tagsArray = formTags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (editingId) {
      updateCustomKnowledge(editingId, {
        term: formTerm.trim(),
        furigana: formFurigana.trim() || undefined,
        meaningVi: formMeaning.trim(),
        level: formLevel,
        category: formCategory,
        exampleJp: formExampleJp.trim() || undefined,
        exampleVi: formExampleVi.trim() || undefined,
        notes: formNotes.trim() || undefined,
        tags: tagsArray
      });
    } else {
      addCustomKnowledge({
        term: formTerm.trim(),
        furigana: formFurigana.trim() || undefined,
        meaningVi: formMeaning.trim(),
        level: formLevel,
        category: formCategory,
        exampleJp: formExampleJp.trim() || undefined,
        exampleVi: formExampleVi.trim() || undefined,
        notes: formNotes.trim() || undefined,
        tags: tagsArray
      });
    }

    setIsModalOpen(false);
  };

  const handleExport = () => {
    const data = exportUserData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nihongo_quest_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Đã tải xuống tệp sao lưu dữ liệu!', '💾');
  };

  const handleImport = () => {
    if (!importJsonText.trim()) return;
    const success = importUserData(importJsonText);
    if (success) {
      setShowImportModal(false);
      setImportJsonText('');
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-rose-800/40 bg-gradient-to-br from-slate-900 via-rose-950/40 to-slate-950 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold">
              <BookPlus className="w-3.5 h-3.5" />
              <span>KHO KIẾN THỨC TỰ TẠO • CUSTOM KNOWLEDGE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Tự Thêm & Quản Lý Kiến Thức Tiếng Nhật
            </h1>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              Bạn có thể tự ghi chú từ vựng, Kanji, ngữ pháp bên ngoài hoặc trong đời sống, rồi đưa trực tiếp vào Đấu Trường Flash Battle để thử sức phản xạ!
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleOpenAdd}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm bg-gradient-to-r from-rose-500 via-red-500 to-amber-500 text-white shadow-lg shadow-rose-950/80 hover:brightness-110 active:scale-95 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm kiến thức mới</span>
            </button>

            {filteredItems.length > 0 && (
              <button
                onClick={() => playCustomKnowledgeStage(filteredItems)}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl font-bold text-sm bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md active:scale-95 transition cursor-pointer"
                title="Luyện tập tốc chiến với các thẻ này"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Luyện tập ({filteredItems.length})</span>
              </button>
            )}

            <button
              onClick={handleExport}
              className="p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition"
              title="Sao lưu JSON ra tệp"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={() => setShowImportModal(true)}
              className="p-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition"
              title="Nhập dữ liệu từ tệp JSON"
            >
              <Upload className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center gap-4 text-xs text-slate-400">
          <span>Tổng số thẻ: <strong className="text-white font-bold">{customList.length}</strong></span>
          <span>•</span>
          <span>N5: <strong className="text-rose-300">{customList.filter((c) => c.level === 'N5').length}</strong></span>
          <span>N4: <strong className="text-cyan-300">{customList.filter((c) => c.level === 'N4').length}</strong></span>
          <span>N3: <strong className="text-amber-300">{customList.filter((c) => c.level === 'N3').length}</strong></span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/80 border border-slate-800 rounded-2xl p-3 shadow-lg">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo từ tiếng Nhật, Furigana hoặc nghĩa tiếng Việt..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-rose-500 text-sm text-slate-200 placeholder:text-slate-500 outline-none"
          />
        </div>

        {/* Level Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {(['ALL', 'N5', 'N4', 'N3'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                levelFilter === lvl
                  ? 'bg-rose-600 text-white shadow'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {lvl === 'ALL' ? 'Tất cả' : lvl}
            </button>
          ))}
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: 'ALL', label: 'Tất cả loại' },
            { id: 'vocabulary', label: 'Từ vựng' },
            { id: 'kanji', label: 'Kanji' },
            { id: 'grammar', label: 'Ngữ pháp' },
            { id: 'phrase', label: 'Hội thoại' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer whitespace-nowrap ${
                categoryFilter === cat.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      {filteredItems.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-slate-900/50 border border-slate-800 space-y-3">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center text-3xl">
            🌸
          </div>
          <h3 className="text-lg font-bold text-white">Chưa tìm thấy thẻ kiến thức nào!</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Hãy bắt đầu tạo thẻ kiến thức tiếng Nhật đầu tiên của riêng bạn bằng nút "Thêm kiến thức mới" bên trên.
          </p>
          <button
            onClick={handleOpenAdd}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow transition cursor-pointer"
          >
            + Tạo thẻ kiến thức ngay
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-800/90 bg-slate-900/80 p-5 space-y-3 shadow-lg hover:border-rose-500/40 hover:shadow-rose-950/20 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                {/* Badges & Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {item.level}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 uppercase">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => soundService.speakJapanese(item.term)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                      title="Nghe phát âm"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-rose-400" />
                    </button>
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                      title="Sửa thẻ"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteCustomKnowledge(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition"
                      title="Xóa thẻ"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Term & Furigana */}
                <div>
                  <h3 className="text-xl font-bold text-white font-jp tracking-wide">
                    {item.term}
                  </h3>
                  {item.furigana && user.furiganaEnabled && (
                    <div className="text-xs text-rose-300 font-jp font-medium">
                      「{item.furigana}」
                    </div>
                  )}
                </div>

                {/* Meaning */}
                <div className="text-sm font-semibold text-slate-200">
                  {item.meaningVi}
                </div>

                {/* Example if exists */}
                {item.exampleJp && (
                  <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs space-y-1">
                    <div className="text-slate-300 font-jp leading-relaxed">
                      {item.exampleJp}
                    </div>
                    {item.exampleVi && (
                      <div className="text-slate-400 text-[11px]">
                        {item.exampleVi}
                      </div>
                    )}
                  </div>
                )}

                {/* Notes if exists */}
                {item.notes && (
                  <p className="text-[11px] text-slate-400 italic">
                    💡 {item.notes}
                  </p>
                )}

                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {item.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 border border-slate-800"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer: Mastery stars & Sensei link */}
              <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3 h-3 ${
                        s <= (item.mastery || 1) ? 'fill-amber-400' : 'text-slate-700'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() =>
                    openSenseiWithContext(
                      `Giải thích chi tiết cho em từ/ngữ pháp này: "${item.term}" (${item.meaningVi}).`
                    )
                  }
                  className="text-[11px] text-purple-300 hover:text-purple-200 flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Hỏi Sensei</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-lg rounded-3xl border border-rose-500/50 bg-slate-900 p-6 sm:p-7 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <BookPlus className="w-5 h-5 text-rose-500" />
                <span>{editingId ? 'Chỉnh Sửa Kiến Thức' : 'Thêm Kiến Thức Mới'}</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-3.5 text-xs">
              {/* Term & AI button */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-slate-300">
                    Thuật ngữ / Từ tiếng Nhật (Kanji / Kana) *
                  </label>
                  <button
                    type="button"
                    onClick={handleAiAutoFill}
                    disabled={aiGenerating}
                    className="text-[11px] text-rose-300 hover:text-rose-200 flex items-center gap-1 px-2 py-0.5 rounded bg-rose-950/60 border border-rose-800/40"
                  >
                    <Sparkles className="w-3 h-3 text-rose-400" />
                    <span>{aiGenerating ? 'Đang hỏi Sensei...' : 'Nhờ Sensei gợi ý'}</span>
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={formTerm}
                  onChange={(e) => setFormTerm(e.target.value)}
                  placeholder="VD: 感謝, 雨が降る, 一期一会..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:border-rose-500 font-jp outline-none"
                />
              </div>

              {/* Furigana */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">
                  Cách đọc Furigana / Hiragana (Tùy chọn)
                </label>
                <input
                  type="text"
                  value={formFurigana}
                  onChange={(e) => setFormFurigana(e.target.value)}
                  placeholder="VD: かんしゃ, あめがふる..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:border-rose-500 font-jp outline-none"
                />
              </div>

              {/* Meaning */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">
                  Ý nghĩa tiếng Việt *
                </label>
                <input
                  type="text"
                  required
                  value={formMeaning}
                  onChange={(e) => setFormMeaning(e.target.value)}
                  placeholder="VD: Lòng biết ơn, cảm ơn sâu sắc..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:border-rose-500 outline-none"
                />
              </div>

              {/* Level & Category */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Cấp độ JLPT</label>
                  <select
                    value={formLevel}
                    onChange={(e) => setFormLevel(e.target.value as JLPTLevel)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-rose-500 outline-none"
                  >
                    <option value="N5">N5 (Sơ cấp)</option>
                    <option value="N4">N4 (Trung cấp I)</option>
                    <option value="N3">N3 (Trung cấp II)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Phân loại</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-rose-500 outline-none"
                  >
                    <option value="vocabulary">Từ vựng (Vocabulary)</option>
                    <option value="kanji">Hán tự (Kanji)</option>
                    <option value="grammar">Ngữ pháp (Grammar)</option>
                    <option value="phrase">Giao tiếp / Thành ngữ</option>
                  </select>
                </div>
              </div>

              {/* Example JP & VI */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">
                  Câu ví dụ tiếng Nhật (Tùy chọn)
                </label>
                <input
                  type="text"
                  value={formExampleJp}
                  onChange={(e) => setFormExampleJp(e.target.value)}
                  placeholder="VD: いつも心から感謝しています。"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-jp focus:border-rose-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">
                  Dịch nghĩa câu ví dụ (Tùy chọn)
                </label>
                <input
                  type="text"
                  value={formExampleVi}
                  onChange={(e) => setFormExampleVi(e.target.value)}
                  placeholder="VD: Tôi luôn luôn chân thành biết ơn bạn."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-rose-500 outline-none"
                />
              </div>

              {/* Notes & Tags */}
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">
                  Ghi chú cá nhân / Mẹo ghi nhớ
                </label>
                <textarea
                  rows={2}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="Mẹo nhớ, liên hệ ngữ cảnh hoặc lưu ý trợ từ..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-rose-500 outline-none resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">
                  Thẻ phân loại (ngăn cách bởi dấu phẩy)
                </label>
                <input
                  type="text"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  placeholder="VD: Giao tiếp, JLPT, Công sở, Anime"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-rose-500 outline-none"
                />
              </div>

              {/* Actions */}
              <div className="pt-3 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950 transition cursor-pointer"
                >
                  {editingId ? 'Cập nhật thẻ' : 'Lưu thẻ mới (+30 XP)'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Upload className="w-4 h-4 text-rose-500" />
                <span>Nhập Dữ Liệu Sao Lưu</span>
              </h3>
              <button
                onClick={() => setShowImportModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-300">
              Dán nội dung JSON đã sao lưu trước đó để khôi phục toàn bộ tiến độ, điểm kinh nghiệm và kho kiến thức cá nhân của bạn:
            </p>
            <textarea
              rows={6}
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder="Dán mã JSON vào đây..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 outline-none focus:border-rose-500"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-slate-300"
              >
                Hủy
              </button>
              <button
                onClick={handleImport}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white shadow transition cursor-pointer"
              >
                Đồng bộ dữ liệu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
