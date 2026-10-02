import { LearningItem } from '../types/game';

export const QUESTIONS_N3: LearningItem[] = [
  // --- N3 GRAMMAR ---
  {
    id: 'n3_gra_001',
    level: 'N3',
    category: 'grammar',
    question: '嫌いな ___ ではないが、甘いものはあまり食べない。',
    choices: ['わけ', 'はず', 'もの', 'こと'],
    correctAnswer: 'わけ',
    explanation: 'Cấu trúc 「〜わけではない」(Không hẳn là / Không có nghĩa là...). Phủ định một phần: Không hẳn là ghét nhưng không hay ăn đồ ngọt.',
    example: '行きたくないわけではないが、時間がない。',
    translation: 'Không hẳn là tôi không muốn đi, nhưng mà không có thời gian.',
    difficulty: 2,
    audioText: 'きらいなわけではないが、あまいものはあまりたべない。'
  },
  {
    id: 'n3_gra_002',
    level: 'N3',
    category: 'grammar',
    question: 'このレストランは 高い ___ 、あまり美味しくない。',
    choices: ['わりに', 'とおりに', 'うちに', 'たびに'],
    correctAnswer: 'わりに',
    explanation: 'Cấu trúc 「〜わりに（は）」: So với... thì... (kết quả trái ngược với mức độ dự đoán thông thường). Giá đắt thế mà không ngon.',
    example: '彼は年のわりに若く見えます。',
    translation: 'Anh ấy trông trẻ hơn so với tuổi thật.',
    difficulty: 2,
    audioText: 'このレストランはたかいわりに、あまりおいしくない。'
  },
  {
    id: 'n3_gra_003',
    level: 'N3',
    category: 'grammar',
    question: '兄が活発な性格なの ___ 、弟はおとなしい。',
    choices: ['に対して', 'に関して', 'について', 'にとって'],
    correctAnswer: 'に対して',
    explanation: 'Cấu trúc 「〜に対して（たいして）」: Trái ngược với... / Đối lập với... So sánh tính cách giữa người anh và người em.',
    example: '都市部に対して、農村部では高齢化が進んでいる。',
    translation: 'Trái ngược với khu vực thành thị, ở nông thôn tình trạng già hóa đang diễn ra nhanh.',
    difficulty: 2,
    audioText: 'あにがかっぱつなせいかくなのにたいして、おとうとはおとなしい。'
  },
  {
    id: 'n3_gra_004',
    level: 'N3',
    category: 'grammar',
    question: 'この小説は 実際の事件に ___ 書かれた。',
    choices: ['基づいて', '関して', '沿って', '通して'],
    correctAnswer: '基づいて',
    explanation: 'Cấu trúc 「〜に基づいて（もとづいて）」: Dựa trên / Căn cứ vào (tài liệu, số liệu, sự kiện có thật).',
    example: 'アンケート結果に基づいて計画を立てます。',
    translation: 'Chúng tôi lập kế hoạch dựa trên kết quả khảo sát.',
    difficulty: 2,
    audioText: 'このしょうせつはじっさいのじけんにもとづいてかかれた。'
  },
  {
    id: 'n3_gra_005',
    level: 'N3',
    category: 'grammar',
    question: '台風が近づいているため、大雨になる ___ がある。',
    choices: ['恐れ', 'お陰', 'せい', 'つもり'],
    correctAnswer: '恐れ',
    explanation: 'Cấu trúc 「〜恐れ（おそれ）がある」: E rằng / Có nguy cơ / Có nguy hiểm sẽ xảy ra điều xấu (thiên tai, tai nạn, dịch bệnh).',
    example: '地震による津波の恐れがあります。',
    translation: 'Có nguy cơ xảy ra sóng thần do động đất.',
    difficulty: 2,
    audioText: 'たいふうがちかづいているため、おおあめになるおそれがある。'
  },
  {
    id: 'n3_gra_006',
    level: 'N3',
    category: 'grammar',
    question: 'この写真を見る ___ 、故郷の家族を思い出す。',
    choices: ['たびに', 'ついでに', '最中に', '途端に'],
    correctAnswer: 'たびに',
    explanation: 'Cấu trúc 「〜たびに」: Mỗi lần / Cứ mỗi dịp... là lại luôn luôn... Cứ mỗi lần nhìn tấm ảnh là lại nhớ gia đình.',
    example: '旅行のたびに、お土産をたくさん買います。',
    translation: 'Mỗi lần đi du lịch tôi đều mua rất nhiều quà lưu niệm.',
    difficulty: 2,
    audioText: 'このしゃしんをみるたびに、こきょうのかぞくをおもいだす。'
  },
  {
    id: 'n3_gra_007',
    level: 'N3',
    category: 'grammar',
    question: '最近、残業続きで 少し 風邪 ___ です。',
    choices: ['気味', 'っぽい', 'がち', 'だらけ'],
    correctAnswer: '気味',
    explanation: 'Cấu trúc 「〜気味（ぎみ）」: Có cảm giác hơi / Hơi có triệu chứng... 風邪気味 = hơi có triệu chứng cảm cúm.',
    example: '寝不足気味なので今日は早く寝ます。',
    translation: 'Vì cảm thấy hơi thiếu ngủ nên hôm nay tôi sẽ ngủ sớm.',
    difficulty: 2,
    audioText: 'さいきん、ざんぎょうつづきですこしかぜぎみです。'
  },
  {
    id: 'n3_gra_008',
    level: 'N3',
    category: 'grammar',
    question: 'コンビニへ行く ___ 、切手を 買ってきてくれない？',
    choices: ['ついでに', '最中に', 'うちに', 'かわりに'],
    correctAnswer: 'ついでに',
    explanation: 'Cấu trúc 「〜ついでに」: Tiện thể / Nhân tiện làm hành động A thì làm luôn hành động B.',
    example: '買い物のついでに図書館に寄りました。',
    translation: 'Tiện thể đi mua sắm tôi đã ghé qua thư viện.',
    difficulty: 2,
    audioText: 'コンビニへいくついでに、きってをかってきてくれない？'
  },
  {
    id: 'n3_gra_009',
    level: 'N3',
    category: 'grammar',
    question: '約束したのだから、最後まで やる ___ だ。',
    choices: ['べき', 'はず', 'わけ', 'もの'],
    correctAnswer: 'べき',
    explanation: 'Cấu trúc 「V-ru + べきだ」: Nên / Phải (theo chuẩn mực đạo đức, trách nhiệm xã hội hiển nhiên). Đã hứa thì nên làm đến cùng.',
    example: '親にはもっと優しくするべきです。',
    translation: 'Bạn nên dịu dàng, quan tâm hơn đối với cha mẹ.',
    difficulty: 2,
    audioText: 'やくそくしたのだから、さいごまでやるべきだ。'
  },
  {
    id: 'n3_gra_010',
    level: 'N3',
    category: 'grammar',
    question: '大事な会議だから、休む ___ にはいかない。',
    choices: ['わけ', 'はず', 'もの', 'ところ'],
    correctAnswer: 'わけ',
    explanation: 'Cấu trúc 「V-ru + わけにはいかない」: Không thể nào (vì lý do đạo đức, trách nhiệm, áp lực tâm lý không cho phép nghỉ).',
    example: 'どんなに疲れていても、途中で諦めるわけにはいかない。',
    translation: 'Dù có mệt mỏi thế nào đi nữa, tôi cũng không thể bỏ cuộc giữa chừng.',
    difficulty: 3,
    audioText: 'だいじなかいぎだから、やすむわけにはいかない。'
  },

  // --- N3 VOCABULARY & NUANCES ---
  {
    id: 'n3_voc_001',
    level: 'N3',
    category: 'vocabulary',
    question: '「彼の努力には まったく 【感心】した。」「感心」の意味は？',
    choices: ['Khâm phục / Ngưỡng mộ', 'Lo lắng / Bất an', 'Thất vọng / Chán nản', 'Nghi ngờ'],
    correctAnswer: 'Khâm phục / Ngưỡng mộ',
    explanation: '「感心する」(かんしんする) nghĩa là thán phục, cảm phục, ngưỡng mộ tấm lòng hay sự nỗ lực của ai đó.',
    example: '彼の礼儀正しい態度に感心しました。',
    translation: 'Tôi rất khâm phục thái độ lễ phép của anh ấy.',
    difficulty: 2,
    audioText: 'かれのどりょくにはまったくかんしんした。'
  },
  {
    id: 'n3_voc_002',
    level: 'N3',
    category: 'vocabulary',
    question: '会議の資料を 【あらかじめ】 配布しておいてください。',
    choices: ['Trước (làm sẵn từ trước)', 'Ngay lập tức', 'Sau khi kết thúc', 'Bí mật'],
    correctAnswer: 'Trước (làm sẵn từ trước)',
    explanation: '「あらかじめ」(予め) có nghĩa là trước, chuẩn bị sẵn từ trước.',
    example: 'あらかじめご連絡いただけますと助かります。',
    translation: 'Nếu bạn có thể liên lạc trước thì thật tiện cho chúng tôi.',
    difficulty: 2,
    audioText: 'かいぎのしりょうをあらかじめはいふしておいてください。'
  },
  {
    id: 'n3_voc_003',
    level: 'N3',
    category: 'vocabulary',
    question: '「思いがけない出来事」の「思いがけない」のニュアンスは？',
    choices: ['Bất ngờ, không lường trước được', 'Rất mong đợi', 'Buồn bã, đau khổ', 'Phức tạp khó hiểu'],
    correctAnswer: 'Bất ngờ, không lường trước được',
    explanation: '「思いがけない」(おもいがけない) có nghĩa là ngoài sức tưởng tượng, bất ngờ không ngờ tới.',
    example: '昔の友人に思いがけない場所で再会した。',
    translation: 'Tình cờ gặp lại người bạn cũ ở một nơi thật không ngờ.',
    difficulty: 2,
    audioText: 'おもいがけないできごと'
  },
  {
    id: 'n3_voc_004',
    level: 'N3',
    category: 'vocabulary',
    question: '彼女は いつも 仕事を 【てきぱき】 とこなす。',
    choices: ['Nhanh nhẹn, tháo vát, gãy gọn', 'Chậm chạp, uể oải', 'Bừa bãi, cẩu thả', 'Lúng túng, bối rối'],
    correctAnswer: 'Nhanh nhẹn, tháo vát, gãy gọn',
    explanation: 'Từ láy tượng hình 「てきぱき」 miêu tả tác phong làm việc nhanh nhẹn, tháo vát, dứt khoát.',
    example: 'てきぱきと家事を片付けた。',
    translation: 'Cô ấy dọn dẹp việc nhà một cách thoăn thoắt, nhanh nhẹn.',
    difficulty: 2,
    audioText: 'かのじょはいつもしごとをてきぱきとこなす。'
  },

  // --- N3 KANJI ---
  {
    id: 'n3_kanji_001',
    level: 'N3',
    category: 'kanji',
    question: '漢字「傾向」の正しい読み方は何ですか？',
    choices: ['けいこう', 'けいかい', 'ていこう', 'こうけい'],
    correctAnswer: 'けいこう',
    explanation: '「傾」(Khuynh) + 「向」(Hướng) đọc là けいこう (khuynh hướng, xu hướng).',
    example: '若者の読書離れの傾向が見られます。',
    translation: 'Có thể nhận thấy xu hướng ít đọc sách hơn ở giới trẻ.',
    difficulty: 2,
    audioText: 'けいこう'
  },
  {
    id: 'n3_kanji_002',
    level: 'N3',
    category: 'kanji',
    question: '漢字「延期」の正しい読み方は何ですか？',
    choices: ['えんき', 'ていき', 'えんちょう', 'きかん'],
    correctAnswer: 'えんき',
    explanation: '「延」(Duyên) + 「期」(Kỳ) đọc là えんき (hoãn lại, dời ngày hẹn).',
    example: '雨のため試合は来週に延期された。',
    translation: 'Trận đấu bị hoãn sang tuần sau do trời mưa.',
    difficulty: 2,
    audioText: 'えんき'
  },
  {
    id: 'n3_kanji_003',
    level: 'N3',
    category: 'kanji',
    question: '漢字「歓迎」の正しい読み方は何ですか？',
    choices: ['かんげい', 'かんこう', 'こうげき', 'かんしゃ'],
    correctAnswer: 'かんげい',
    explanation: '「歓」(Hoan) + 「迎」(Nghênh) đọc là かんげい (hoan nghênh, chào đón nồng nhiệt).',
    example: '新入社員を温かく歓迎します。',
    translation: 'Chào đón nồng nhiệt các nhân viên mới vào công ty.',
    difficulty: 2,
    audioText: 'かんげい'
  },
  {
    id: 'n3_kanji_004',
    level: 'N3',
    category: 'kanji',
    question: '漢字「慎重」の正しい読み方は何ですか？',
    choices: ['しんちょう', 'きんちょう', 'しんせつ', 'じゅんちょう'],
    correctAnswer: 'しんちょう',
    explanation: '「慎」(Thận) + 「重」(Trọng) đọc là しんちょう (thận trọng, cẩn trọng).',
    example: '重要な契約なので慎重に判断してください。',
    translation: 'Vì là hợp đồng quan trọng nên hãy phán đoán thật cẩn trọng.',
    difficulty: 2,
    audioText: 'しんちょう'
  },

  // --- N3 SENTENCE BUILDER ---
  {
    id: 'n3_sen_001',
    level: 'N3',
    category: 'grammar',
    question: 'Sắp xếp câu: "Mặc dù anh ấy bận rộn nhưng lần nào cũng giúp đỡ tôi."',
    choices: ['忙しいにもかかわらず', '彼は', '手伝ってくれる', 'いつも私を'],
    correctAnswer: '彼は 忙しいにもかかわらず いつも私を 手伝ってくれる',
    wordTiles: ['手伝ってくれる', '忙しいにもかかわらず', '彼は', 'いつも私を'],
    explanation: 'Chủ ngữ (彼は) + Cụm nhượng bộ (忙しいにもかかわらず: Mặc dù bận rộn) + Đối tượng (いつも私を) + Hành động (手伝ってくれる).',
    example: '彼は忙しいにもかかわらずいつも私を手伝ってくれる。',
    translation: 'Mặc dù anh ấy bận rộn nhưng lúc nào cũng giúp đỡ tôi.',
    difficulty: 3,
    audioText: 'かれはいそがしいにもかかわらず、いつもわたしをてつだってくれる。'
  },
  {
    id: 'n3_sen_002',
    level: 'N3',
    category: 'grammar',
    question: 'Sắp xếp câu: "Không phải cứ người đỗ đại học danh tiếng là có thể thành công."',
    choices: ['必ずしも', '一流大学を出たからといって', '成功できるわけではない'],
    correctAnswer: '一流大学を出たからといって 必ずしも 成功できるわけではない',
    wordTiles: ['必ずしも', '一流大学を出たからといって', '成功できるわけではない'],
    explanation: 'Cấu trúc: 〜からといって (Không phải cứ vì lý do A) + 必ずしも (không nhất thiết là) + 〜わけではない (phủ định toàn phần).',
    example: '一流大学を出たからといって必ずしも成功できるわけではない。',
    translation: 'Không phải cứ tốt nghiệp đại học hàng đầu là nhất thiết sẽ thành công.',
    difficulty: 3,
    audioText: 'いちりゅうだいがくをでたからといって、かならずしもせいこうできるわけではない。'
  },

  // --- N3 CONVERSATION & KEIGO ---
  {
    id: 'n3_con_001',
    level: 'N3',
    category: 'conversation',
    speakerName: 'Khách hàng đối tác (取引先の担当者)',
    question: '取引先：「恐れ入りますが、社長の山田様はいらっしゃいますでしょうか。」\nBạn là nhân viên lễ tân, sếp山田 đang đi vắng, bạn đáp lịch sự:',
    choices: [
      '申し訳ございません。山田はただいま席を外しております。',
      '山田社長はいらっしゃいません。',
      '山田様は今外出していらっしゃいます。',
      'あいにく社長はどこかへ行きました。'
    ],
    correctAnswer: '申し訳ございません。山田はただいま席を外しております。',
    explanation: 'Quy tắc kính ngữ thương mại: Khi nói với khách ngoài về người trong công ty (dù là giám đốc), phải hạ thấp danh xưng (gọi trần là 山田, dùng khiêm nhường ngữ 席を外しております).',
    example: '申し訳ございません。あいにく山田は外出中でございます。',
    translation: 'Thành thật xin lỗi quý khách, hiện tại ông Yamada đang rời khỏi chỗ ạ.',
    difficulty: 3,
    audioText: 'おそれいりますが、しゃちょうのやまださまはいらっしゃいますでしょうか。'
  },
  {
    id: 'n3_con_002',
    level: 'N3',
    category: 'conversation',
    speakerName: 'Giáo sư cố vấn (指導教授)',
    question: '教授：「ナムさん、論文のテーマについて相談があるなら、研究室にいらっしゃい。」\nBạn muốn nhận lời đến phòng nghiên cứu của thầy vào chiều mai, bạn đáp:',
    choices: [
      'ありがとうございます。では、明日の午後に伺います。',
      'ありがとうございます。では、明日の午後に行かれます。',
      'ありがとうございます。では、明日の午後に参られます。',
      'いいえ、来なくていいです。'
    ],
    correctAnswer: 'ありがとうございます。では、明日の午後に伺います。',
    explanation: 'Hành động của bản thân đến gặp người bề trên (thầy giáo) phải dùng khiêm nhường ngữ 伺う (うかがう - đến thăm/hỏi).',
    example: '明日の午後2時に研究室へ伺います。',
    translation: 'Em cảm ơn thầy. Vậy chiều mai em xin phép đến phòng nghiên cứu của thầy ạ.',
    difficulty: 3,
    audioText: 'ナムさん、ろんぶんのテーマについてそうだんがあるなら、けんきゅうしつにいらっしゃい。'
  },

  // --- N3 LISTENING ---
  {
    id: 'n3_lis_001',
    level: 'N3',
    category: 'listening',
    question: 'Nghe thông báo và cho biết nguyên nhân tàu điện ngừng chạy tạm thời:',
    furigana: 'ただいま、しんごうトラブルのえいきょうにより、ぜんせんでうんてんをみあわせております',
    choices: [
      'Sự cố tín hiệu đường ray (信号トラブル)',
      'Tuyết rơi quá dày làm tắc nghẽn',
      'Xảy ra tai nạn va chạm xe lửa',
      'Đang có động đất mạnh'
    ],
    correctAnswer: 'Sự cố tín hiệu đường ray (信号トラブル)',
    explanation: '「信号トラブルの影響により」(Do ảnh hưởng của sự cố tín hiệu) + 「運転を見合わせております」(Tạm dừng vận hành toàn tuyến).',
    example: '信号トラブルのため運転を見合わせております。',
    translation: 'Do sự cố tín hiệu nên tạm dừng vận hành tàu.',
    difficulty: 2,
    audioText: 'ただいま、しんごうトラブルのえいきょうにより、ぜんせんでうんてんをみあわせております。'
  },

  // --- N3 READING ---
  {
    id: 'n3_rea_001',
    level: 'N3',
    category: 'reading',
    question: '【Đoạn văn ngắn】\n「言葉は時代とともに変化するものである。若者が使う新しい言葉を『乱れ』と批判するだけではなく、その背景にある社会的な要因を冷静に分析することが重要ではないだろうか。」\nTác giả có quan điểm thế nào về ngôn từ của giới trẻ?',
    choices: [
      'Không nên chỉ chỉ trích là "suy đồi", mà cần bình tĩnh phân tích yếu tố xã hội tạo nên nó',
      'Cần tuyệt đối cấm giới trẻ sử dụng tiếng lóng mới để bảo vệ sự thuần khiết của tiếng Nhật',
      'Ngôn ngữ không bao giờ thay đổi theo thời gian',
      'Chỉ có người lớn tuổi mới có quyền sáng tạo từ mới'
    ],
    correctAnswer: 'Không nên chỉ chỉ trích là "suy đồi", mà cần bình tĩnh phân tích yếu tố xã hội tạo nên nó',
    explanation: 'Tác giả nêu rõ: 「批判するだけではなく、その背景にある社会的な要因を冷静に分析することが重要」(Không chỉ trích đơn thuần mà phải phân tích yếu tố xã hội đằng sau).',
    example: '言葉は時代とともに変化する。',
    translation: 'Ngôn từ biến đổi cùng với thời gian.',
    difficulty: 3,
    audioText: 'ことばはじだいとともにへんかするものである。'
  },

  // --- N3 BOSS BATTLE THEMED ITEMS ---
  {
    id: 'n3_gra_011',
    level: 'N3',
    category: 'grammar',
    bossName: 'Hỏa Long Samurai (炎の侍竜)',
    question: 'どんな困難があっても、最後まで やり抜く ___ だ！',
    choices: ['つもり', 'ふり', 'せい', 'ばかり'],
    correctAnswer: 'つもり',
    explanation: 'Cấu trúc 「V-ru + つもりだ」: Quyết tâm / Ý định kiên định làm gì đến cùng. やり抜く (làm tới cùng).',
    example: '最後まで全力を尽くすつもりです。',
    translation: 'Tôi dự định dốc toàn lực cho tới phút cuối cùng.',
    difficulty: 3,
    audioText: 'どんなこんなんがあっても、さいごまでやりぬくつもりだ！'
  },
  {
    id: 'n3_gra_012',
    level: 'N3',
    category: 'grammar',
    bossName: 'Hỏa Long Samurai (炎の侍竜)',
    question: '彼の実力は 誰もが 認める ___ だ。',
    choices: ['ところ', 'わけ', 'はず', 'もの'],
    correctAnswer: 'ところ',
    explanation: 'Cấu trúc 「〜認めるところだ」: Là điều mà ai ai cũng phải công nhận (điểm/chỗ được thừa nhận).',
    example: '彼の功績は誰もが認めるところだ。',
    translation: 'Chiến công của anh ấy là điều mà tất cả mọi người đều công nhận.',
    difficulty: 3,
    audioText: 'かれのじつりょくはだれもがみとめるところだ。'
  }
];
