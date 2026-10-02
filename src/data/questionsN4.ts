import { LearningItem } from '../types/game';

export const QUESTIONS_N4: LearningItem[] = [
  // --- N4 GRAMMAR ---
  {
    id: 'n4_gra_001',
    level: 'N4',
    category: 'grammar',
    question: '雨が ___ なら、出かけません。',
    choices: ['降る', '降って', '降った', '降り'],
    correctAnswer: '降る',
    explanation: 'Cấu trúc giả định 「〜なら」 (Nếu): Động từ thể từ điển (V-ru) + なら.',
    example: '雨が降るなら、うちにいます。',
    translation: 'Nếu trời mưa thì tôi sẽ ở nhà.',
    difficulty: 2,
    audioText: 'あめがふるなら、でかけません。'
  },
  {
    id: 'n4_gra_002',
    level: 'N4',
    category: 'grammar',
    question: '健康の ___ 、毎日ジョギングをしています。',
    choices: ['ために', 'ように', 'ことに', 'そうに'],
    correctAnswer: 'ために',
    explanation: 'Cấu trúc Danh từ + のために: Vì / Để cho (chỉ mục đích hoặc đối tượng hưởng lợi ích).',
    example: '家族のために一生懸命働きます。',
    translation: 'Làm việc chăm chỉ vì gia đình.',
    difficulty: 2,
    audioText: 'けんこうのために、まいにちジョギングをしています。'
  },
  {
    id: 'n4_gra_003',
    level: 'N4',
    category: 'grammar',
    question: '日本語が上手に話せる ___ 練習しています。',
    choices: ['ように', 'ために', 'ばかり', 'ほど'],
    correctAnswer: 'ように',
    explanation: 'Cấu trúc V-khả năng + ように: Để có thể... (hành động hướng tới trạng thái mong muốn).',
    example: '早く治るように薬を飲みます。',
    translation: 'Uống thuốc để mau chóng khỏi bệnh.',
    difficulty: 2,
    audioText: 'にほんごがじょうずにはなせるようにれんしゅうしています。'
  },
  {
    id: 'n4_gra_004',
    level: 'N4',
    category: 'grammar',
    question: '来月から大阪へ転勤する ___ なりました。',
    choices: ['ことに', 'ように', 'ために', 'とおりに'],
    correctAnswer: 'ことに',
    explanation: 'Cấu trúc V-ru + ことになる: Được quyết định là... (quyết định từ ngoại cảnh, công ty, hoàn cảnh).',
    example: '来年結婚することになりました。',
    translation: 'Chúng tôi đã được định là năm sau sẽ kết hôn.',
    difficulty: 2,
    audioText: 'らいげつからおおさかへてんきんすることになりました。'
  },
  {
    id: 'n4_gra_005',
    level: 'N4',
    category: 'grammar',
    question: '毎日、漢字を５つ覚える ___ しました。',
    choices: ['ことに', 'ように', 'ために', 'はず'],
    correctAnswer: 'ことに',
    explanation: 'Cấu trúc V-ru / V-nai + ことにする: Tự bản thân quyết tâm/quyết định làm gì.',
    example: 'お酒をやめることにしました。',
    translation: 'Tôi đã quyết định bỏ rượu.',
    difficulty: 2,
    audioText: 'まいにち、かんじをごつおぼえることにしました。'
  },
  {
    id: 'n4_gra_006',
    level: 'N4',
    category: 'grammar',
    question: 'このケーキは とても おいし___ ですね。',
    choices: ['そう', 'らしい', 'よう', 'みたい'],
    correctAnswer: 'そう',
    explanation: 'Cấu trúc phỏng đoán qua thị giác: Tính từ đuôi い bỏ い + そうです (Trông có vẻ ngon). おいしい -> おいしそう.',
    example: 'この料理はおいしそうですね。',
    translation: 'Món ăn này trông có vẻ ngon thế nhỉ.',
    difficulty: 1,
    audioText: 'このケーキはとてもおいしそうですね。'
  },
  {
    id: 'n4_gra_007',
    level: 'N4',
    category: 'grammar',
    question: '薬を ___ も、熱が下がりません。',
    choices: ['飲んで', '飲む', '飲んだ', '飲まない'],
    correctAnswer: '飲んで',
    explanation: 'Cấu trúc nhượng bộ: V-ても (Dù có... nhưng vẫn...). 飲む -> 飲んでも.',
    example: 'いくら安くても、買いません。',
    translation: 'Dù có rẻ bao nhiêu đi nữa tôi cũng không mua.',
    difficulty: 2,
    audioText: 'くすりをのんでも、ねつがさがりません。'
  },
  {
    id: 'n4_gra_008',
    level: 'N4',
    category: 'grammar',
    question: '安けれ ___ 、買いたいです。',
    choices: ['ば', 'たら', 'なら', 'ても'],
    correctAnswer: 'ば',
    explanation: 'Thể điều kiện của tính từ đuôi い: Đổi い thành ければ. 安い -> 安ければ (Nếu rẻ).',
    example: '天気がよければ、山に行きましょう。',
    translation: 'Nếu thời tiết đẹp thì cùng đi leo núi nhé.',
    difficulty: 2,
    audioText: 'やすければ、かいたいです。'
  },
  {
    id: 'n4_gra_009',
    level: 'N4',
    category: 'grammar',
    question: 'うちに ___ たら、すぐ電話してください。',
    choices: ['着い', '着く', '着いて', '着いた'],
    correctAnswer: '着い',
    explanation: 'Cấu trúc V-たら (Sau khi / Khi): Động từ thể quá khứ ngắn た + ら. 着く -> 着いた -> 着いたら.',
    example: '駅に着いたら連絡してね。',
    translation: 'Khi nào tới ga thì liên lạc cho mình nhé.',
    difficulty: 1,
    audioText: 'うちについたら、すぐでんわしてください。'
  },
  {
    id: 'n4_gra_010',
    level: 'N4',
    category: 'grammar',
    question: '明日までにレポートを 出さなけれ___ いけません。',
    choices: ['ば', 'て', 'たら', 'でも'],
    correctAnswer: 'ば',
    explanation: 'Cấu trúc bắt buộc: V-なければいけません (Phải làm gì). 出す -> 出さない -> 出さなければ.',
    example: '宿題をしなければなりません。',
    translation: 'Phải làm bài tập về nhà.',
    difficulty: 2,
    audioText: 'あしたまでにレポートをださなければいけません。'
  },

  // --- N4 VOCABULARY ---
  {
    id: 'n4_voc_001',
    level: 'N4',
    category: 'vocabulary',
    question: '「遠慮しないで、召し上がってください。」「遠慮」の意味は？',
    choices: ['Khách sáo / Ngại ngùng', 'Vội vã / Gấp gáp', 'Ồn ào / Náo nhiệt', 'Lười biếng'],
    correctAnswer: 'Khách sáo / Ngại ngùng',
    explanation: '「遠慮する」(えんりょする) nghĩa là khách khí, e dè, ngại ngùng.',
    example: '遠慮しないでたくさん食べてね。',
    translation: 'Đừng ngại ngùng, hãy ăn thật nhiều nhé.',
    difficulty: 2,
    audioText: 'えんりょしないで、めしあがってください。'
  },
  {
    id: 'n4_voc_002',
    level: 'N4',
    category: 'vocabulary',
    question: '事故で 電車が ___ しまいました。',
    choices: ['遅れて', '進んで', '始まって', '届いて'],
    correctAnswer: '遅れて',
    explanation: '「遅れる」(おくれる) nghĩa là trễ, muộn. 電車が遅れる = tàu bị trễ giờ.',
    example: '約束の時間に遅れました。',
    translation: 'Tôi đã bị muộn giờ hẹn.',
    difficulty: 1,
    audioText: 'じこででんしゃがおくれてしまいました。'
  },
  {
    id: 'n4_voc_003',
    level: 'N4',
    category: 'vocabulary',
    question: '荷物が届いたか ___ してください。',
    choices: ['確認', '案内', '準備', '連絡'],
    correctAnswer: '確認',
    explanation: '「確認する」(かくにんする) nghĩa là kiểm tra, xác nhận.',
    example: 'スケジュールを確認します。',
    translation: 'Tôi xác nhận lại lịch trình.',
    difficulty: 2,
    audioText: 'にもつがとどいたかかくにんしてください。'
  },
  {
    id: 'n4_voc_004',
    level: 'N4',
    category: 'vocabulary',
    question: '「複雑な問題」の「複雑」の意味はどれですか？',
    choices: ['Phức tạp', 'Đơn giản', 'Thú vị', 'Nguy hiểm'],
    correctAnswer: 'Phức tạp',
    explanation: '「複雑」(ふくざつ) mang ý nghĩa phức tạp, rắc rối.',
    example: 'この機械の操作は複雑です。',
    translation: 'Thao tác máy này khá phức tạp.',
    difficulty: 1,
    audioText: 'ふくざつなもんだい'
  },
  {
    id: 'n4_voc_005',
    level: 'N4',
    category: 'vocabulary',
    question: '海外旅行の ___ をしています。',
    choices: ['準備', '出発', '到着', '合格'],
    correctAnswer: '準備',
    explanation: '「準備」(じゅんび) là chuẩn bị (hành lý, tài liệu, đồ đạc).',
    example: '旅行の準備が終わりました。',
    translation: 'Việc chuẩn bị cho chuyến đi đã xong.',
    difficulty: 1,
    audioText: 'かいがいりょこうのじゅんびをしています。'
  },

  // --- N4 KANJI ---
  {
    id: 'n4_kanji_001',
    level: 'N4',
    category: 'kanji',
    question: '漢字「案内」の読み方は何ですか？',
    choices: ['あんない', 'あんぜん', 'べんり', 'てんき'],
    correctAnswer: 'あんない',
    explanation: '「案」(Án) + 「内」(Nội) đọc là あんない (hướng dẫn, chỉ dẫn).',
    example: '町を案内します。',
    translation: 'Tôi sẽ hướng dẫn bạn tham quan thị trấn.',
    difficulty: 1,
    audioText: 'あんない'
  },
  {
    id: 'n4_kanji_002',
    level: 'N4',
    category: 'kanji',
    question: '漢字「経験」の読み方は何ですか？',
    choices: ['けいけん', 'けいざい', 'じっけん', 'きけん'],
    correctAnswer: 'けいけん',
    explanation: '「経」(Kinh) + 「験」(Nghiệm) đọc là けいけん (kinh nghiệm, trải nghiệm).',
    example: '日本でいろいろな経験をしました。',
    translation: 'Tôi đã trải qua nhiều kinh nghiệm tại Nhật.',
    difficulty: 2,
    audioText: 'けいけん'
  },
  {
    id: 'n4_kanji_003',
    level: 'N4',
    category: 'kanji',
    question: '漢字「説明」の読み方は何ですか？',
    choices: ['せつめい', 'しょうめい', 'せいかつ', 'はつめい'],
    correctAnswer: 'せつめい',
    explanation: '「説」(Thuyết) + 「明」(Minh) đọc là せつめい (giải thích, thuyết minh).',
    example: '使い方を説明してください。',
    translation: 'Xin hãy giải thích cách sử dụng.',
    difficulty: 1,
    audioText: 'せつめい'
  },
  {
    id: 'n4_kanji_004',
    level: 'N4',
    category: 'kanji',
    question: '漢字「都合」の読み方は何ですか？',
    choices: ['つごう', 'とごう', 'しあい', 'ばあい'],
    correctAnswer: 'つごう',
    explanation: '「都」(Đô) + 「合」(Hợp) đọc là つごう (sự thuận tiện, tiện lợi về thời gian/hoàn cảnh).',
    example: '明日は都合がいいですか。',
    translation: 'Ngày mai bạn có tiện thời gian không?',
    difficulty: 2,
    audioText: 'つごう'
  },
  {
    id: 'n4_kanji_005',
    level: 'N4',
    category: 'kanji',
    question: '漢字「急ぐ」の読み方は何ですか？',
    choices: ['いそぐ', 'およぐ', 'はしる', 'おきる'],
    correctAnswer: 'いそぐ',
    explanation: '「急」(Cấp) đọc là いそぐ (vội vã, gấp rút).',
    example: '急いで駅へ走りました。',
    translation: 'Tôi đã vội vã chạy đến nhà ga.',
    difficulty: 1,
    audioText: 'いそぐ'
  },

  // --- N4 SENTENCE BUILDER ---
  {
    id: 'n4_sen_001',
    level: 'N4',
    category: 'grammar',
    question: 'Sắp xếp câu: "Tôi uống trà ấm để không bị cảm lạnh."',
    choices: ['風邪を', '温かいお茶を', '引かないように', '飲みます'],
    correctAnswer: '風邪を 引かないように 温かいお茶を 飲みます',
    wordTiles: ['温かいお茶を', '風邪を', '飲みます', '引かないように'],
    explanation: 'Mục đích phòng ngừa (風邪を引かないように) đứng trước hành động (温かいお茶を飲みます).',
    example: '風邪を引かないように温かいお茶を飲みます。',
    translation: 'Tôi uống trà ấm để không bị cảm lạnh.',
    difficulty: 2,
    audioText: 'かぜをひかないようにあたたかいおちゃをのみます。'
  },
  {
    id: 'n4_sen_002',
    level: 'N4',
    category: 'grammar',
    question: 'Sắp xếp câu: "Vì trời sắp mưa nên hãy mang theo ô nhé."',
    choices: ['傘を', '雨が', '降るそうだから', '持って行きなさい'],
    correctAnswer: '雨が 降るそうだから 傘を 持って行きなさい',
    wordTiles: ['傘を', '降るそうだから', '雨が', '持って行きなさい'],
    explanation: 'Nghe nói/dự báo mưa (雨が降るそうだから) + Lời khuyên/yêu cầu (傘を持って行きなさい).',
    example: '雨が降るそうだから傘を持って行きなさい。',
    translation: 'Nghe nói trời sẽ mưa nên hãy mang ô đi nhé.',
    difficulty: 2,
    audioText: 'あめがふるそうだからかさをもってゆきなさい。'
  },

  // --- N4 CONVERSATION ---
  {
    id: 'n4_con_001',
    level: 'N4',
    category: 'conversation',
    speakerName: 'Trưởng phòng (部長 - Bucho)',
    question: '部長：「田中くん、この資料をコピーしておいてくれる？」\nBạn (Tanaka) đáp lại lịch sự và sẵn lòng:',
    choices: [
      'かしこまりました。すぐやっておきます。',
      'だめです、忙しいです。',
      'どういたしまして。',
      'ごちそうさまでした。'
    ],
    correctAnswer: 'かしこまりました。すぐやっておきます。',
    explanation: 'Khi cấp trên giao việc, câu trả lời chuẩn mực công sở Nhật là 「かしこまりました / 承知いたしました」(Tôi đã hiểu rõ rồi ạ).',
    example: 'かしこまりました。すぐに対応いたします。',
    translation: 'Tôi hiểu rồi ạ, tôi sẽ làm ngay bây giờ.',
    difficulty: 2,
    audioText: 'たなかくん、このしりょうをコピーしておいてくれる？'
  },
  {
    id: 'n4_con_002',
    level: 'N4',
    category: 'conversation',
    speakerName: 'Bác sĩ (お医者さん)',
    question: '医者：「一日三回、食後にこの薬を飲んでくださいね。」\nBệnh nhân đáp lời hướng dẫn của bác sĩ:',
    choices: [
      'はい、わかりました。ありがとうございます。',
      'おめでとうございます。',
      'お大事に。',
      'ごめんなさい。'
    ],
    correctAnswer: 'はい、わかりました。ありがとうございます。',
    explanation: 'Bệnh nhân lắng nghe lời dặn dò của bác sĩ và cảm ơn. (Lưu ý: 「お大事に」 là lời bác sĩ/người khác chúc người bệnh).',
    example: 'はい、わかりました。ありがとうございました。',
    translation: 'Vâng, tôi hiểu rồi. Xin cảm ơn bác sĩ.',
    difficulty: 1,
    audioText: 'いちにちさんかい、しょくごにこのくすりをのんでくださいね。'
  },

  // --- N4 LISTENING ---
  {
    id: 'n4_lis_001',
    level: 'N4',
    category: 'listening',
    question: 'Nghe đoạn hội thoại và chọn điều người phụ nữ khuyên:',
    furigana: 'あしたは ゆきがふるそうだから、はやく でかけたほうがいいですよ',
    choices: [
      'Nên xuất phát sớm vì trời có thể sẽ có tuyết rơi',
      'Ngày mai không nên đi làm vì trời bão',
      'Hãy mặc áo thật ấm vì trong nhà rất lạnh',
      'Nên đi mua sắm trước khi trời đổ mưa'
    ],
    correctAnswer: 'Nên xuất phát sớm vì trời có thể sẽ có tuyết rơi',
    explanation: '「雪が降るそうだから」(Vì nghe nói có tuyết rơi) + 「早く出かけたほうがいい」(Nên ra ngoài sớm).',
    example: '早く出かけたほうがいいですよ。',
    translation: 'Nên đi sớm thì tốt hơn đấy.',
    difficulty: 2,
    audioText: 'あしたはゆきがふるそうだから、はやくでかけたほうがいいですよ。'
  },
  {
    id: 'n4_lis_002',
    level: 'N4',
    category: 'listening',
    question: 'Nghe câu nói và xác định tình huống:',
    furigana: 'お待たせいたしました。ご注文のラーメンでございます。',
    choices: [
      'Nhân viên phục vụ mang món ăn đến cho khách',
      'Khách hàng gọi tính tiền',
      'Đầu bếp hỏi khách muốn ăn gì',
      'Chủ quán cảm ơn khách khi ra về'
    ],
    correctAnswer: 'Nhân viên phục vụ mang món ăn đến cho khách',
    explanation: '「お待たせいたしました」(Xin lỗi đã để quý khách đợi) + 「ご注文のラーメンでございます」(Đây là mì ramen quý khách đã gọi).',
    example: 'お待たせいたしました。こちらへどうぞ。',
    translation: 'Xin lỗi đã để quý khách đợi lâu. Mời đi lối này.',
    difficulty: 2,
    audioText: 'おまたせいたしました。ごちゅうもんのラーメンでございます。'
  },

  // --- N4 READING ---
  {
    id: 'n4_rea_001',
    level: 'N4',
    category: 'reading',
    question: '【Thông báo tại ký túc xá】\n「金曜日の午後2時から5時まで、エレベーターの点検を行います。その間は階段をご利用ください。」\nNgười trong ký túc xá phải làm gì trong thời gian trên?',
    choices: [
      'Sử dụng cầu thang bộ vì thang máy đang được kiểm tra',
      'Không được ra khỏi phòng',
      'Phải trả thêm tiền phí bảo trì thang máy',
      'Đến văn phòng nộp đơn khiếu nại'
    ],
    correctAnswer: 'Sử dụng cầu thang bộ vì thang máy đang được kiểm tra',
    explanation: 'エレベーターの点検 (kiểm tra thang máy) -> 階段をご利用ください (xin hãy sử dụng cầu thang bộ).',
    example: '階段をご利用ください。',
    translation: 'Xin hãy sử dụng cầu thang bộ.',
    difficulty: 2,
    audioText: 'きんようびのごごにじからごじまで、エレベーターのてんけんをおこないます。'
  },

  // --- MORE N4 ITEMS ---
  {
    id: 'n4_gra_011',
    level: 'N4',
    category: 'grammar',
    question: '子どもに 部屋を ___ せました。',
    choices: ['掃除', '掃除さ', '掃除し', '掃除す'],
    correctAnswer: '掃除さ',
    explanation: 'Thể sai khiến (使役形): する -> させる. Cụm từ: 掃除させる (bắt/cho phép dọn dẹp).',
    example: '先生は生徒に本を読ませました。',
    translation: 'Thầy giáo đã cho/bắt học sinh đọc sách.',
    difficulty: 3,
    audioText: 'こどもにへやをそうじさせました。'
  },
  {
    id: 'n4_gra_012',
    level: 'N4',
    category: 'grammar',
    question: '私は 先生に 褒め___ ました。',
    choices: ['られ', 'させ', 'て', 'たい'],
    correctAnswer: 'られ',
    explanation: 'Thể bị động (受身形): 褒める (khen) -> 褒められる (được khen).',
    example: '試験に合格して先生に褒められました。',
    translation: 'Thi đỗ nên tôi đã được thầy khen ngợi.',
    difficulty: 2,
    audioText: 'わたしはせんせいにほめられました。'
  }
];
