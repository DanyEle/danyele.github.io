(function () {
  "use strict";

  const LEVELS = ["1", "2", "3", "4", "5"];
  const PROGRESS_KEY = "daniele-chinese-progress-v3";
  const WORDS_PER_LESSON = 20;
  const VOCAB_PAGE_SIZE = 30;
  const SYLLABUS_COUNTS = { "1": 150, "2": 300, "3": 600, "4": 1200, "5": 2500 };
  const POS_LABELS = {
    a: "adjective", ad: "adjective", ag: "adjective", an: "adjective", b: "distinguishing word",
    c: "conjunction", d: "adverb", dg: "adverb", e: "interjection", f: "locality word",
    g: "morpheme", h: "prefix", i: "idiom", j: "abbreviation", k: "suffix", l: "fixed expression",
    m: "numeral", mg: "numeral", n: "noun", ng: "noun", nr: "personal name", ns: "place name",
    nt: "organization", nx: "proper noun", nz: "proper noun", o: "onomatopoeia", p: "preposition",
    q: "measure word", r: "pronoun", rg: "pronoun", s: "space word", t: "time word", tg: "time word",
    u: "auxiliary", v: "verb", vd: "verb", vg: "verb", vn: "verb/noun", w: "punctuation",
    x: "other", y: "modal particle", z: "descriptive"
  };

  const DATA = {
    "1": level("HSK 1", "Build survival Chinese: greetings, people, numbers, food, time, and simple questions.", [
      v("你好", "nǐ hǎo", "hello", "phrase", "你好，我叫丹尼尔。", "Nǐ hǎo, wǒ jiào Dānní'ěr.", "Hello, my name is Daniele."),
      v("谢谢", "xièxie", "thank you", "phrase", "谢谢你的帮助。", "Xièxie nǐ de bāngzhù.", "Thank you for your help."),
      v("我", "wǒ", "I; me", "pronoun", "我是学生。", "Wǒ shì xuésheng.", "I am a student."),
      v("你", "nǐ", "you", "pronoun", "你好吗？", "Nǐ hǎo ma?", "How are you?"),
      v("他", "tā", "he; him", "pronoun", "他是我的朋友。", "Tā shì wǒ de péngyou.", "He is my friend."),
      v("她", "tā", "she; her", "pronoun", "她是老师。", "Tā shì lǎoshī.", "She is a teacher."),
      v("是", "shì", "to be", "verb", "我是意大利人。", "Wǒ shì Yìdàlì rén.", "I am Italian."),
      v("在", "zài", "at; in; located at", "verb/prep", "我在学校。", "Wǒ zài xuéxiào.", "I am at school."),
      v("有", "yǒu", "to have; there is", "verb", "我有一本书。", "Wǒ yǒu yì běn shū.", "I have a book."),
      v("没有", "méiyǒu", "do not have; there is not", "verb", "我没有钱。", "Wǒ méiyǒu qián.", "I do not have money."),
      v("的", "de", "possessive particle", "particle", "这是我的电脑。", "Zhè shì wǒ de diànnǎo.", "This is my computer."),
      v("吗", "ma", "yes-no question particle", "particle", "你喝茶吗？", "Nǐ hē chá ma?", "Do you drink tea?"),
      v("什么", "shénme", "what", "question", "你想喝什么？", "Nǐ xiǎng hē shénme?", "What do you want to drink?"),
      v("哪儿", "nǎr", "where", "question", "饭店在哪儿？", "Fàndiàn zài nǎr?", "Where is the restaurant?"),
      v("很", "hěn", "very", "adverb", "今天很热。", "Jīntiān hěn rè.", "Today is hot."),
      v("都", "dōu", "all; both", "adverb", "我们都是学生。", "Wǒmen dōu shì xuésheng.", "We are all students."),
      v("也", "yě", "also", "adverb", "我也喜欢茶。", "Wǒ yě xǐhuan chá.", "I also like tea."),
      v("喜欢", "xǐhuan", "to like", "verb", "我喜欢学汉语。", "Wǒ xǐhuan xué Hànyǔ.", "I like studying Chinese."),
      v("想", "xiǎng", "to want; to think", "modal", "我想喝水。", "Wǒ xiǎng hē shuǐ.", "I want to drink water."),
      v("会", "huì", "can; know how to", "modal", "我会说一点儿中文。", "Wǒ huì shuō yìdiǎnr Zhōngwén.", "I can speak a little Chinese."),
      v("学习", "xuéxí", "to study", "verb", "我每天学习中文。", "Wǒ měitiān xuéxí Zhōngwén.", "I study Chinese every day."),
      v("老师", "lǎoshī", "teacher", "noun", "她是我的老师。", "Tā shì wǒ de lǎoshī.", "She is my teacher."),
      v("朋友", "péngyou", "friend", "noun", "我有一个中国朋友。", "Wǒ yǒu yí ge Zhōngguó péngyou.", "I have a Chinese friend."),
      v("中国", "Zhōngguó", "China", "place", "我想去中国。", "Wǒ xiǎng qù Zhōngguó.", "I want to go to China.")
    ], [
      g("A 是 B", "A shì B", "Use 是 to identify people or things.", "我是学生。", "Wǒ shì xuésheng.", "I am a student.", "他 ___ 老师。", ["是", "在", "有", "和"], "是"),
      g("Possession with 的", "owner + de + noun", "Put 的 after the owner or modifier.", "这是我的书。", "Zhè shì wǒ de shū.", "This is my book.", "这是我 ___ 杯子。", ["的", "吗", "不", "都"], "的"),
      g("Yes-no questions", "statement + ma", "Add 吗 to a statement.", "你喜欢茶吗？", "Nǐ xǐhuan chá ma?", "Do you like tea?", "你是学生 ___？", ["吗", "的", "和", "个"], "吗")
    ], r("我的一天", "我每天七点起床。我喝一杯水，吃一点儿饭。八点我去学校。我喜欢学习汉语，因为老师很好。晚上我看书，也听中文。", ["What time does the speaker get up?", "What does the speaker like studying?"]), l("在咖啡店", ["服务员：你好，你想喝什么？", "学生：我想喝茶。", "服务员：你也想吃饭吗？", "学生：不，我不饿。谢谢。"], ["The student wants tea.", "The student is hungry."], [true, false]), p("HSK1 car review", ["你好。今天我们复习简单但是重要的句子。", "我是学生。你是老师吗？", "我喜欢茶，也喜欢学习中文。"])),

    "2": level("HSK 2", "Move into daily routines, travel, comparison, completed actions, and simple opinions.", [
      v("帮助", "bāngzhù", "to help; help", "verb/noun", "谢谢你的帮助。", "Xièxie nǐ de bāngzhù.", "Thank you for your help."),
      v("比", "bǐ", "than; to compare", "preposition", "今天比昨天热。", "Jīntiān bǐ zuótiān rè.", "Today is hotter than yesterday."),
      v("别", "bié", "do not", "adverb", "别说话。", "Bié shuōhuà.", "Do not speak."),
      v("宾馆", "bīnguǎn", "hotel", "noun", "宾馆在学校旁边。", "Bīnguǎn zài xuéxiào pángbiān.", "The hotel is beside the school."),
      v("长", "cháng", "long", "adjective", "这条路很长。", "Zhè tiáo lù hěn cháng.", "This road is long."),
      v("穿", "chuān", "to wear", "verb", "他穿白色衣服。", "Tā chuān báisè yīfu.", "He wears white clothes."),
      v("次", "cì", "time; occurrence", "measure", "我去过一次北京。", "Wǒ qù guo yí cì Běijīng.", "I have been to Beijing once."),
      v("从", "cóng", "from", "preposition", "我从家去公司。", "Wǒ cóng jiā qù gōngsī.", "I go from home to the company."),
      v("错", "cuò", "wrong; mistake", "adjective", "这个字写错了。", "Zhège zì xiě cuò le.", "This character was written incorrectly."),
      v("到", "dào", "to arrive", "verb", "我八点到学校。", "Wǒ bā diǎn dào xuéxiào.", "I arrive at school at eight."),
      v("得", "de", "degree complement particle", "particle", "他说得很快。", "Tā shuō de hěn kuài.", "He speaks very fast."),
      v("懂", "dǒng", "to understand", "verb", "我听懂了。", "Wǒ tīng dǒng le.", "I understood what I heard."),
      v("房间", "fángjiān", "room", "noun", "我的房间很大。", "Wǒ de fángjiān hěn dà.", "My room is big."),
      v("非常", "fēicháng", "very; extremely", "adverb", "我非常喜欢汉语。", "Wǒ fēicháng xǐhuan Hànyǔ.", "I really like Chinese."),
      v("告诉", "gàosu", "to tell", "verb", "请告诉我你的名字。", "Qǐng gàosu wǒ nǐ de míngzi.", "Please tell me your name."),
      v("给", "gěi", "to give; for", "verb/prep", "请给我一杯水。", "Qǐng gěi wǒ yì bēi shuǐ.", "Please give me a cup of water."),
      v("机场", "jīchǎng", "airport", "noun", "机场离这儿很远。", "Jīchǎng lí zhèr hěn yuǎn.", "The airport is far from here."),
      v("觉得", "juéde", "to feel; to think", "verb", "我觉得今天很冷。", "Wǒ juéde jīntiān hěn lěng.", "I think today is cold."),
      v("考试", "kǎoshì", "exam; to take an exam", "noun/verb", "明天有考试。", "Míngtiān yǒu kǎoshì.", "There is an exam tomorrow."),
      v("可以", "kěyǐ", "may; can", "modal", "我可以坐这儿吗？", "Wǒ kěyǐ zuò zhèr ma?", "May I sit here?")
    ], [
      g("Completed action with 了", "verb + le", "Use 了 after a verb when an action is viewed as completed.", "我买了三本书。", "Wǒ mǎi le sān běn shū.", "I bought three books.", "他昨天去了北京 ___。", ["了", "吗", "得", "比"], "了"),
      g("Comparison with 比", "A + bǐ + B + adjective", "The compared item comes before 比.", "今天比昨天热。", "Jīntiān bǐ zuótiān rè.", "Today is hotter than yesterday.", "我 ___ 他高。", ["比", "从", "给", "吧"], "比"),
      g("Degree complement", "verb + de + adjective", "Use 得 to describe how an action is done.", "他说得很快。", "Tā shuō de hěn kuài.", "He speaks very fast.", "她唱歌唱 ___ 很好。", ["得", "了", "比", "在"], "得")
    ], r("去机场", "明天早上我坐公共汽车去机场。机场离我家很远，所以我六点就出门。我的朋友从北京来，我要在机场等他。", ["Why does the speaker leave at six?", "Who is coming from Beijing?"]), l("问路", ["学生：请问，宾馆离这儿远吗？", "老师：不远。你坐公共汽车，十分钟就到。", "学生：谢谢。", "老师：不客气。"], ["The hotel is far away.", "The bus ride takes ten minutes."], [false, true]), p("HSK2 car review", ["今天练习三个高频语法点。", "今天比昨天热。", "我买了咖啡。", "他说得很慢。"])),

    "3": level("HSK 3", "Your current level: connect ideas, explain reasons, handle 把/被, and speak in longer turns.", [
      v("安静", "ānjìng", "quiet", "adjective", "请安静一点。", "Qǐng ānjìng yìdiǎn.", "Please be a little quieter."),
      v("把", "bǎ", "disposal particle", "particle", "我把书放在桌子上。", "Wǒ bǎ shū fàng zài zhuōzi shang.", "I put the book on the table."),
      v("搬", "bān", "to move", "verb", "我下个月搬家。", "Wǒ xià ge yuè bān jiā.", "I will move next month."),
      v("办法", "bànfǎ", "method; solution", "noun", "你有什么办法？", "Nǐ yǒu shénme bànfǎ?", "What solution do you have?"),
      v("被", "bèi", "passive marker", "particle", "门被风关上了。", "Mén bèi fēng guān shàng le.", "The door was closed by the wind."),
      v("比较", "bǐjiào", "relatively; fairly", "adverb", "这个问题比较难。", "Zhège wèntí bǐjiào nán.", "This question is relatively difficult."),
      v("必须", "bìxū", "must; have to", "modal", "你必须早点儿来。", "Nǐ bìxū zǎo diǎnr lái.", "You must come earlier."),
      v("参加", "cānjiā", "to participate in", "verb", "我想参加会议。", "Wǒ xiǎng cānjiā huìyì.", "I want to attend the meeting."),
      v("迟到", "chídào", "to be late", "verb", "他上班迟到了。", "Tā shàngbān chídào le.", "He was late for work."),
      v("除了", "chúle", "except; besides", "preposition", "除了茶，我也喜欢咖啡。", "Chúle chá, wǒ yě xǐhuan kāfēi.", "Besides tea, I also like coffee."),
      v("打算", "dǎsuàn", "to plan; plan", "verb/noun", "你打算去哪儿？", "Nǐ dǎsuàn qù nǎr?", "Where do you plan to go?"),
      v("担心", "dānxīn", "to worry", "verb", "别担心，我没事。", "Bié dānxīn, wǒ méi shì.", "Don't worry; I am fine."),
      v("地铁", "dìtiě", "subway; metro", "noun", "我坐地铁去公司。", "Wǒ zuò dìtiě qù gōngsī.", "I take the subway to the company."),
      v("锻炼", "duànliàn", "to exercise", "verb", "我每天锻炼身体。", "Wǒ měi tiān duànliàn shēntǐ.", "I exercise every day."),
      v("方便", "fāngbiàn", "convenient", "adjective", "你现在方便吗？", "Nǐ xiànzài fāngbiàn ma?", "Is now convenient for you?"),
      v("发现", "fāxiàn", "to discover", "verb", "我发现一个问题。", "Wǒ fāxiàn yí ge wèntí.", "I found a problem."),
      v("复习", "fùxí", "to review", "verb", "我晚上复习汉语。", "Wǒ wǎnshang fùxí Hànyǔ.", "I review Chinese in the evening."),
      v("根据", "gēnjù", "according to", "preposition", "根据地图，银行在前面。", "Gēnjù dìtú, yínháng zài qiánmiàn.", "According to the map, the bank is ahead."),
      v("更", "gèng", "even more", "adverb", "今天比昨天更冷。", "Jīntiān bǐ zuótiān gèng lěng.", "Today is even colder than yesterday."),
      v("认为", "rènwéi", "to think; to believe", "verb", "我认为学习中文很有用。", "Wǒ rènwéi xuéxí Zhōngwén hěn yǒuyòng.", "I think studying Chinese is useful.")
    ], [
      g("把 sentence", "subject + bǎ + object + result", "Use 把 when the object is handled and the result matters.", "我把书放在桌子上。", "Wǒ bǎ shū fàng zài zhuōzi shang.", "I put the book on the table.", "我 ___ 门关上了。", ["把", "被", "比", "向"], "把"),
      g("被 passive", "object + bèi + doer + verb", "Use 被 when the subject receives the action.", "门被风关上了。", "Mén bèi fēng guān shàng le.", "The door was closed by the wind.", "自行车 ___ 他骑走了。", ["被", "把", "给", "从"], "被"),
      g("只要...就...", "as long as... then...", "只要 gives a sufficient condition.", "只要你努力，就会进步。", "Zhǐyào nǐ nǔlì, jiù huì jìnbù.", "As long as you work hard, you will improve.", "___ 有时间，我就复习。", ["只要", "虽然", "除了", "根据"], "只要"),
      g("越来越...", "more and more...", "Use 越来越 before an adjective or psychological verb.", "我的中文越来越好。", "Wǒ de Zhōngwén yuè lái yuè hǎo.", "My Chinese is getting better and better.", "天气 ___ 冷。", ["越来越", "为了", "除了", "终于"], "越来越")
    ], r("学习计划", "最近我发现自己的听力比较弱。为了提高听力，我决定每天听二十分钟中文。除了听课文以外，我还听慢速播客。刚开始我听不懂很多句子，但是我不担心。只要每天练习，我的中文就会越来越好。", ["What skill is weak?", "What does the learner listen to besides textbook audio?", "What grammar pattern expresses confidence?"]), l("安排见面", ["王老师：你明天下午方便吗？", "学生：对不起，明天下午我要参加一个会议。", "王老师：那我们后天上午见面，怎么样？", "学生：可以。我会把作业带来。"], ["The student is free tomorrow afternoon.", "They decide to meet the morning after tomorrow.", "The student will bring homework."], [false, true, true]), p("HSK3 car review", ["今天的目标是把短句连成自然的表达。", "最近我比较忙，但是我每天都复习中文。", "我把手机放在包里。我把作业发给老师。", "只要每天听十分钟，你的听力就会进步。"])),

    "4": level("HSK 4", "Upgrade into opinions, abstract topics, work, culture, and structured arguments.", [
      v("安排", "ānpái", "to arrange; arrangement", "verb/noun", "我已经安排好了会议。", "Wǒ yǐjīng ānpái hǎo le huìyì.", "I have already arranged the meeting."),
      v("安全", "ānquán", "safe; safety", "adj/noun", "晚上一个人回家不太安全。", "Wǎnshang yí ge rén huí jiā bú tài ānquán.", "Going home alone at night is not very safe."),
      v("按时", "ànshí", "on time", "adverb", "请按时完成任务。", "Qǐng ànshí wánchéng rènwu.", "Please complete the task on time."),
      v("保护", "bǎohù", "to protect", "verb", "我们应该保护环境。", "Wǒmen yīnggāi bǎohù huánjìng.", "We should protect the environment."),
      v("保证", "bǎozhèng", "to guarantee", "verb", "我保证不会迟到。", "Wǒ bǎozhèng bú huì chídào.", "I guarantee I will not be late."),
      v("报名", "bàomíng", "to sign up", "verb", "我想报名参加考试。", "Wǒ xiǎng bàomíng cānjiā kǎoshì.", "I want to sign up for the exam."),
      v("抱歉", "bàoqiàn", "sorry; apologetic", "adjective", "抱歉，我来晚了。", "Bàoqiàn, wǒ lái wǎn le.", "Sorry, I arrived late."),
      v("标准", "biāozhǔn", "standard", "noun/adj", "你的发音很标准。", "Nǐ de fāyīn hěn biāozhǔn.", "Your pronunciation is very standard."),
      v("表格", "biǎogé", "form; table", "noun", "请填写这个表格。", "Qǐng tiánxiě zhège biǎogé.", "Please fill in this form."),
      v("表示", "biǎoshì", "to express; indicate", "verb", "他表示同意。", "Tā biǎoshì tóngyì.", "He expressed agreement."),
      v("不过", "búguò", "however; but", "conjunction", "这家店很小，不过东西很好吃。", "Zhè jiā diàn hěn xiǎo, búguò dōngxi hěn hǎochī.", "This shop is small, but the food is tasty."),
      v("材料", "cáiliào", "material", "noun", "请准备申请材料。", "Qǐng zhǔnbèi shēnqǐng cáiliào.", "Please prepare the application materials."),
      v("成功", "chénggōng", "to succeed; success", "verb/noun", "他终于成功了。", "Tā zhōngyú chénggōng le.", "He finally succeeded."),
      v("调查", "diàochá", "to investigate; survey", "verb/noun", "我们做了一个调查。", "Wǒmen zuò le yí ge diàochá.", "We did a survey."),
      v("复杂", "fùzá", "complicated", "adjective", "这个问题很复杂。", "Zhège wèntí hěn fùzá.", "This problem is complicated.")
    ], [
      g("虽然...但是...", "although... but...", "Use 虽然 for concession and 但是 for contrast.", "虽然很累，但是我还要学习。", "Suīrán hěn lèi, dànshì wǒ hái yào xuéxí.", "Although I am tired, I still need to study.", "___ 下雨，但是他还是来了。", ["虽然", "只有", "只要", "连"], "虽然"),
      g("不但...而且...", "not only... but also...", "Use it to add a stronger second point.", "她不但会说中文，而且会写汉字。", "Tā bùdàn huì shuō Zhōngwén, érqiě huì xiě Hànzì.", "She can not only speak Chinese but also write characters.", "他不但聪明，___ 很努力。", ["而且", "但是", "因为", "只有"], "而且"),
      g("无论...都...", "no matter... always...", "Use 无论 to generalize across conditions.", "无论多忙，我都学习中文。", "Wúlùn duō máng, wǒ dōu xuéxí Zhōngwén.", "No matter how busy I am, I study Chinese.", "___ 天气怎么样，我都去。", ["无论", "由于", "按照", "因此"], "无论")
    ], r("为什么要坚持", "学习语言最重要的不是方法有多复杂，而是能不能长期坚持。很多人刚开始非常有兴趣，可是遇到困难以后就放弃了。我的建议是：每天安排一个小任务，按时完成。这样压力不大，不过效果很好。", ["What matters most in language learning?", "What causes many people to give up?", "What is the proposed method?"]), l("工作安排", ["经理：这个项目你负责，可以吗？", "员工：可以，不过我需要更多材料。", "经理：没问题。我今天下午把材料发给你。", "员工：好的，我保证按时完成。"], ["The employee refuses the project.", "The employee needs more materials.", "The manager will send materials this afternoon."], [false, true, true]), p("HSK4 car review", ["今天练习表达观点。", "我认为学习语言最重要的是坚持。", "虽然工作很忙，但是每天听十分钟也有帮助。", "不要追求完美，先保证按时完成小任务。"])),

    "5": level("HSK 5", "Stretch into advanced reading, nuance, abstract discussion, and fast listening.", [
      v("爱惜", "àixī", "to treasure; use sparingly", "verb", "年轻人也要爱惜时间。", "Niánqīng rén yě yào àixī shíjiān.", "Young people should treasure time."),
      v("安慰", "ānwèi", "to comfort", "verb", "朋友失败了，我安慰了他。", "Péngyou shībài le, wǒ ānwèi le tā.", "My friend failed, and I comforted him."),
      v("把握", "bǎwò", "to grasp; confidence", "verb/noun", "我有把握通过考试。", "Wǒ yǒu bǎwò tōngguò kǎoshì.", "I am confident I can pass the exam."),
      v("办理", "bànlǐ", "to handle; process", "verb", "我去银行办理业务。", "Wǒ qù yínháng bànlǐ yèwù.", "I went to the bank to handle business."),
      v("包含", "bāohán", "to contain; include", "verb", "价格包含早餐。", "Jiàgé bāohán zǎocān.", "The price includes breakfast."),
      v("保持", "bǎochí", "to keep; maintain", "verb", "请保持安静。", "Qǐng bǎochí ānjìng.", "Please keep quiet."),
      v("保存", "bǎocún", "to preserve; save", "verb", "请保存这个文件。", "Qǐng bǎocún zhège wénjiàn.", "Please save this file."),
      v("宝贵", "bǎoguì", "precious; valuable", "adjective", "经验非常宝贵。", "Jīngyàn fēicháng bǎoguì.", "Experience is very valuable."),
      v("背景", "bèijǐng", "background", "noun", "你了解他的教育背景吗？", "Nǐ liǎojiě tā de jiàoyù bèijǐng ma?", "Do you know his educational background?"),
      v("比例", "bǐlì", "proportion; ratio", "noun", "这个比例不太合理。", "Zhège bǐlì bú tài hélǐ.", "This ratio is not very reasonable."),
      v("必要", "bìyào", "necessary", "adjective", "没有必要太担心。", "Méiyǒu bìyào tài dānxīn.", "There is no need to worry too much."),
      v("毕竟", "bìjìng", "after all", "adverb", "别怪他，他毕竟还是孩子。", "Bié guài tā, tā bìjìng háishì háizi.", "Do not blame him; after all, he is still a child."),
      v("避免", "bìmiǎn", "to avoid", "verb", "我们应该避免同样的错误。", "Wǒmen yīnggāi bìmiǎn tóngyàng de cuòwù.", "We should avoid the same mistake."),
      v("表面", "biǎomiàn", "surface; appearance", "noun", "表面上很简单，其实很难。", "Biǎomiàn shang hěn jiǎndān, qíshí hěn nán.", "It seems simple on the surface, but is actually hard."),
      v("表明", "biǎomíng", "to indicate; show", "verb", "数据表明情况正在改善。", "Shùjù biǎomíng qíngkuàng zhèngzài gǎishàn.", "The data shows the situation is improving.")
    ], [
      g("之所以...是因为...", "the reason why... is because...", "Use it to explain causes formally.", "他之所以进步快，是因为每天练习。", "Tā zhī suǒyǐ jìnbù kuài, shì yīnwèi měitiān liànxí.", "The reason he improves quickly is that he practices every day.", "他 ___ 成功，是因为坚持。", ["之所以", "不见得", "毕竟", "不断"], "之所以"),
      g("与其...不如...", "rather than... better to...", "Use it to compare choices and recommend the second.", "与其担心，不如马上开始。", "Yǔqí dānxīn, bùrú mǎshàng kāishǐ.", "Rather than worrying, it is better to start now.", "___ 等机会，不如创造机会。", ["与其", "由于", "即使", "一旦"], "与其"),
      g("即使...也...", "even if... still...", "Use 即使 for hypothetical concession.", "即使很忙，我也会复习。", "Jíshǐ hěn máng, wǒ yě huì fùxí.", "Even if I am busy, I will review.", "___ 失败了，也不要放弃。", ["即使", "因此", "凡是", "至于"], "即使")
    ], r("有效学习", "成年人学习语言时，时间往往很有限。因此，与其追求一次学很久，不如保持稳定的节奏。经验表明，短时间、高频率的练习更容易坚持。即使每天只有十五分钟，只要方法正确，也能不断进步。", ["Why is a stable rhythm useful?", "Which structure compares two choices?", "What makes progress possible despite limited time?"]), l("学习方法讨论", ["甲：我背了很多单词，可是说话时还是想不起来。", "乙：只背单词不够。你需要把词放进句子里练。", "甲：也就是说，要在真实语境里使用。", "乙：对。这样不仅记得牢，还能提高表达能力。"], ["Memorizing words alone is enough.", "Words should be practiced in sentences.", "Context helps expression ability."], [false, true, true]), p("HSK5 car review", ["今天我们练习高级表达。", "与其说我没有时间，不如说我没有安排好优先级。", "学习之所以有效，是因为输入、复习和输出互相配合。", "即使每天只有十五分钟，只要不断练习，也会看到变化。"]))
  };

  hydrateVocabulary(DATA);

  const PLACEMENT = [
    q("HSK 1", "你喝茶 ___？", ["吗", "的", "把", "被"], "吗"),
    q("HSK 1", "学习 means:", ["to study", "to travel", "to sell", "to wait"], "to study"),
    q("HSK 2", "今天 ___ 昨天冷。", ["比", "把", "被", "对"], "比"),
    q("HSK 2", "他说 ___ 很快。", ["得", "的", "地", "了"], "得"),
    q("HSK 3", "我 ___ 作业放在桌子上了。", ["把", "被", "比", "从"], "把"),
    q("HSK 3", "只要每天练习，中文 ___ 会进步。", ["就", "才", "却", "又"], "就"),
    q("HSK 4", "虽然很忙，___ 他每天都复习。", ["但是", "所以", "因为", "或者"], "但是"),
    q("HSK 4", "无论天气怎么样，我 ___ 去上课。", ["都", "才", "却", "并"], "都"),
    q("HSK 5", "___ 担心考试，不如现在开始复习。", ["与其", "即使", "由于", "凡是"], "与其"),
    q("HSK 5", "数据 ___ 这个方法有效。", ["表明", "避免", "办理", "保持"], "表明")
  ];

  Object.keys(DATA).forEach(function (levelKey) {
    DATA[levelKey].vocabulary.forEach(function (entry, index) {
      entry.id = "hsk" + levelKey + "-" + String(index + 1).padStart(2, "0");
    });
  });

  const app = document.getElementById("chinese-app");
  if (!app) return;

  const levelKey = DATA[app.dataset.level] ? app.dataset.level : "3";
  const data = DATA[levelKey];
  const basePath = app.dataset.base || ".";
  const homePath = app.dataset.home || "../index.html";

  let currentIndex = 0;
  let flipped = false;
  let searchTerm = "";
  let typeFilter = "all";
  let lessonFilter = "0";
  let vocabPage = 0;
  let quiz = null;
  let quizStats = { correct: 0, total: 0 };
  let grammarAnswers = {};
  let listeningAnswers = {};
  let placementAnswers = {};
  let memoryProgress = {};

  renderLayout();
  renderAll();
  app.addEventListener("click", onClick);
  app.addEventListener("input", onInput);
  app.addEventListener("change", onChange);
  app.addEventListener("keydown", onKeydown);

  function level(label, focus, vocabulary, grammar, reading, listening, podcast) {
    return { label, heading: "中文学习 · " + label, focus, vocabulary, grammar, reading, listening, podcast };
  }

  function v(hanzi, pinyin, english, type, exampleZh, examplePinyin, exampleEn) {
    return { hanzi, pinyin, english, type, exampleZh, examplePinyin, exampleEn };
  }

  function hydrateVocabulary(levels) {
    const source = window.HSK_VOCABULARY;
    if (!source) return;

    Object.keys(levels).forEach(function (key) {
      const curated = levels[key].vocabulary;
      const curatedByWord = new Map(curated.map(function (entry) { return [entry.hanzi, entry]; }));
      const normalized = source[key].map(function (entry) {
        const existing = curatedByWord.get(entry.hanzi);
        return Object.assign({
          hanzi: entry.hanzi,
          pinyin: entry.pinyin,
          english: entry.english,
          type: POS_LABELS[entry.pos[0]] || "other",
          frequency: entry.frequency,
          exampleZh: "",
          examplePinyin: "",
          exampleEn: ""
        }, existing || {});
      });
      const curatedFirst = curated.map(function (entry) {
        return normalized.find(function (candidate) { return candidate.hanzi === entry.hanzi; });
      }).filter(Boolean);
      const remaining = normalized.filter(function (entry) { return !curatedByWord.has(entry.hanzi); }).sort(function (a, b) {
        return (a.frequency || Number.MAX_SAFE_INTEGER) - (b.frequency || Number.MAX_SAFE_INTEGER);
      });
      levels[key].vocabulary = curatedFirst.concat(remaining);
      levels[key].syllabusCount = SYLLABUS_COUNTS[key];
    });
  }

  function g(title, pattern, note, exampleZh, examplePinyin, exampleEn, prompt, choices, answer) {
    return { title, pattern, note, exampleZh, examplePinyin, exampleEn, prompt, choices, answer };
  }

  function r(title, text, questions) {
    return { title, text, questions };
  }

  function l(title, lines, checks, answers) {
    return { title, lines, checks, answers };
  }

  function p(title, lines) {
    return { title, lines };
  }

  function q(level, prompt, choices, answer) {
    return { level, prompt, choices, answer };
  }

  function renderLayout() {
    const uniqueCount = data.vocabulary.length;
    const syllabusCount = data.syllabusCount || uniqueCount;
    const courseCount = uniqueCount === syllabusCount ? uniqueCount + " words" : uniqueCount + " unique words / " + syllabusCount + " syllabus entries";
    app.innerHTML =
      '<div class="study-topbar"><a class="home-link" href="' + esc(homePath) + '">Home</a><p class="source-note">Simplified Chinese · legacy HSK 2.0 · complete vocabulary decks</p></div>' +
      '<header class="study-header"><div><p class="study-kicker">听 · 说 · 读 · 词汇 · 语法</p><h1 class="study-title">' + esc(data.heading) + '</h1><p class="study-subtitle">' + esc(data.focus) + '</p><p class="study-plan">' + esc(courseCount) + '. Study one 20-word lesson at a time, then revisit earlier lessons through the whole-level deck.</p><button class="tool-button primary session-button" type="button" data-action="start-session">Start new session</button></div><div class="hanzi-visual" aria-hidden="true"><span>学</span><span>听</span><span>读</span><span>说</span></div><div class="study-stats">' + stat("Known", "stat-known") + stat("Deck", "stat-deck") + stat("Quiz", "stat-quiz") + '</div></header>' +
      '<nav id="level-nav" class="level-nav"></nav>' +
      '<div class="study-grid">' +
      panel("flashcard-title", "Flashcards", '<div class="panel-actions"><span class="session-progress" id="session-progress" aria-live="polite"></span><button class="small-button" type="button" data-action="reset-progress">Reset level</button></div>', '<div class="flashcard" id="flashcard" tabindex="0"><span class="card-hanzi" id="card-hanzi"></span><span class="card-pinyin" id="card-pinyin"></span><div class="card-meaning" id="card-meaning"></div><div class="card-example" id="card-example"></div></div><div class="tool-row"><button class="tool-button primary" type="button" data-action="flip-card">Flip</button><button class="tool-button" type="button" data-action="speak-current">Speak</button><button class="tool-button" type="button" data-action="prev-card">Previous</button><button class="tool-button" type="button" data-action="next-card">Next</button><button class="tool-button warn" id="toggle-known-current" type="button" data-action="toggle-known-current">Mark known</button></div><div class="known-state" id="known-state" aria-live="polite"></div>') +
      panel("quiz-title", "Quick quiz", '<button class="small-button" type="button" data-action="next-quiz">New question</button>', '<div id="quiz-card" class="quiz-card"></div>') +
      panel("vocab-title", "Vocabulary", '<p class="panel-note" id="vocab-count" aria-live="polite"></p>', '<div class="vocab-controls"><input id="vocab-search" class="search-input" type="search" placeholder="Search Hanzi, pinyin, English" autocomplete="off"><select id="lesson-filter" class="select-input" aria-label="Lesson"></select><select id="type-filter" class="select-input" aria-label="Part of speech"></select></div><div id="vocab-list" class="vocab-list"></div><div id="vocab-pager" class="vocab-pager" aria-label="Vocabulary pages"></div>') +
      panel("grammar-title", "Grammar", '<p class="panel-note">' + data.grammar.length + " patterns</p>", '<div id="grammar-list" class="grammar-list"></div>') +
      panel("reading-title", "Reading comprehension", '<button class="small-button" type="button" data-action="speak-reading">Read aloud</button>', '<div id="reading-card"></div>') +
      panel("listening-title", "Listening comprehension", '<button class="small-button" type="button" data-action="speak-listening">Play dialogue</button>', '<div id="listening-card"></div>') +
      panel("level-test-title", "Current level test", '<button class="small-button" type="button" data-action="reset-placement">Reset test</button>', '<div id="placement-card"></div>') +
      panel("podcast-title", "Car podcasts", '<button class="small-button" type="button" data-action="play-podcast">Play episode</button>', '<div id="podcast-card"></div>') +
      '</div><footer class="study-footer"><p class="source-note">Vocabulary source: HSK 2.0 lists adapted from an MIT-licensed dataset. See <a href="' + esc(basePath + '/CREDITS.md') + '">course credits</a>. The current HSK examination syllabus may differ.</p></footer>';
  }

  function renderAll() {
    renderNav();
    renderCard();
    renderVocab();
    nextQuiz();
    renderGrammar();
    renderReading();
    renderListening();
    renderPlacement();
    renderPodcast();
    renderStats();
  }

  function panel(id, title, aside, body) {
    return '<section class="study-panel" aria-labelledby="' + id + '"><div class="panel-title-row"><h2 id="' + id + '" class="panel-title">' + title + "</h2>" + aside + "</div>" + body + "</section>";
  }

  function stat(label, id) {
    return '<div class="stat-tile"><span class="stat-label">' + label + '</span><span class="stat-value" id="' + id + '">0</span></div>';
  }

  function renderNav() {
    document.getElementById("level-nav").innerHTML = LEVELS.map(function (key) {
      const active = key === levelKey ? " is-active" : "";
      return '<a class="level-link' + active + '" href="' + esc(basePath + "/hsk" + key + "/index.html") + '"' + (key === levelKey ? ' aria-current="page"' : "") + '><span>HSK ' + key + '</span><small>' + DATA[key].vocabulary.length + " words</small></a>";
    }).join("");
  }

  function renderStats() {
    setText("stat-known", currentKnownSet().size + "/" + data.vocabulary.length);
    const deck = activeDeck();
    const position = Math.max(0, deck.indexOf(data.vocabulary[currentIndex]));
    setText("stat-deck", position + 1 + "/" + deck.length);
    setText("stat-quiz", quizStats.correct + "/" + quizStats.total);
  }

  function renderCard() {
    const entry = data.vocabulary[currentIndex];
    setText("card-hanzi", entry.hanzi);
    setText("card-pinyin", flipped ? entry.pinyin : "");
    setText("card-meaning", flipped ? entry.english : "Recall the pinyin, meaning, and one sentence before flipping.");
    document.getElementById("card-example").innerHTML = flipped ? exampleMarkup(entry) : "";
    const isKnown = currentKnownSet().has(entry.id);
    setText("known-state", isKnown ? "Known in this level" : "Needs review");
    setText("toggle-known-current", isKnown ? "Mark for review" : "Mark known");
    renderSession();
    renderStats();
  }

  function renderSession() {
    const deck = activeDeck();
    const mastered = deck.filter(function (entry) { return currentKnownSet().has(entry.id); }).length;
    const name = lessonFilter === "all" ? "Whole level" : "Lesson " + (Number(lessonFilter) + 1);
    setText("session-progress", name + " · " + mastered + "/" + deck.length + " mastered");
  }

  function renderVocab() {
    const deck = activeDeck();
    const types = Array.from(new Set(data.vocabulary.map(function (entry) { return entry.type; }))).sort();
    const lessonCount = Math.ceil(data.vocabulary.length / WORDS_PER_LESSON);
    document.getElementById("lesson-filter").innerHTML = '<option value="all"' + (lessonFilter === "all" ? " selected" : "") + '>Whole level (' + data.vocabulary.length + ' words)</option>' + Array.from({ length: lessonCount }, function (_, index) {
      const start = index * WORDS_PER_LESSON + 1;
      const end = Math.min(start + WORDS_PER_LESSON - 1, data.vocabulary.length);
      return '<option value="' + index + '"' + (lessonFilter === String(index) ? " selected" : "") + '>Lesson ' + (index + 1) + ' (' + start + '-' + end + ')</option>';
    }).join("");
    document.getElementById("type-filter").innerHTML = '<option value="all">All types</option>' + types.map(function (type) {
      return '<option value="' + esc(type) + '"' + (type === typeFilter ? " selected" : "") + ">" + esc(type) + "</option>";
    }).join("");
    const known = currentKnownSet();
    const filteredRows = deck.filter(matchesFilter);
    const pageCount = Math.max(1, Math.ceil(filteredRows.length / VOCAB_PAGE_SIZE));
    vocabPage = Math.min(vocabPage, pageCount - 1);
    const start = vocabPage * VOCAB_PAGE_SIZE;
    const rows = filteredRows.slice(start, start + VOCAB_PAGE_SIZE);
    const range = filteredRows.length ? " · " + (start + 1) + "-" + (start + rows.length) : "";
    setText("vocab-count", filteredRows.length + " of " + deck.length + " shown" + range);
    document.getElementById("vocab-list").innerHTML = rows.map(function (entry) {
      const isKnown = known.has(entry.id);
      return '<div class="vocab-row' + (isKnown ? " is-known" : "") + '"><div class="vocab-hanzi">' + esc(entry.hanzi) + '</div><div class="vocab-pinyin">' + esc(entry.pinyin) + '</div><div class="vocab-meaning">' + esc(entry.english) + '</div><div class="tool-row compact"><button class="small-button" type="button" data-action="focus-card" data-id="' + entry.id + '">Study</button><button class="small-button" type="button" data-action="speak-entry" data-id="' + entry.id + '">Speak</button><button class="small-button" type="button" data-action="toggle-known" data-id="' + entry.id + '">' + (isKnown ? "Known" : "Review") + "</button></div></div>";
    }).join("") || '<div class="empty-state">No vocabulary matches that filter.</div>';
    document.getElementById("vocab-pager").innerHTML = pageCount > 1 ? '<button class="small-button" type="button" data-action="prev-vocab-page"' + (vocabPage === 0 ? " disabled" : "") + '>Previous page</button><span class="page-status">Page ' + (vocabPage + 1) + " of " + pageCount + '</span><button class="small-button" type="button" data-action="next-vocab-page"' + (vocabPage === pageCount - 1 ? " disabled" : "") + '>Next page</button>' : "";
  }

  function activeDeck() {
    if (lessonFilter === "all") return data.vocabulary;
    const start = Number(lessonFilter) * WORDS_PER_LESSON;
    return data.vocabulary.slice(start, start + WORDS_PER_LESSON);
  }

  function exampleMarkup(entry) {
    if (!entry.exampleZh) {
      return '<span class="example-en">Add this word to a sentence aloud before marking it known.</span>';
    }
    return '<span class="example-zh">' + esc(entry.exampleZh) + '</span><span class="example-pinyin">' + esc(entry.examplePinyin) + '</span><span class="example-en">' + esc(entry.exampleEn) + '</span>';
  }

  function moveCard(direction) {
    const deck = activeDeck();
    const position = deck.indexOf(data.vocabulary[currentIndex]);
    const nextPosition = (position + direction + deck.length) % deck.length;
    currentIndex = data.vocabulary.indexOf(deck[nextPosition]);
    flipped = false;
    renderCard();
  }

  function startSession() {
    const known = currentKnownSet();
    const nextUnknown = data.vocabulary.findIndex(function (entry) { return !known.has(entry.id); });
    const lesson = nextUnknown >= 0 ? Math.floor(nextUnknown / WORDS_PER_LESSON) : 0;
    lessonFilter = String(lesson);
    currentIndex = lesson * WORDS_PER_LESSON;
    vocabPage = 0;
    flipped = false;
    quizStats = { correct: 0, total: 0 };
    renderCard();
    renderVocab();
    nextQuiz();
    document.getElementById("flashcard").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderQuiz() {
    const answered = quiz.selected !== "";
    document.getElementById("quiz-card").innerHTML = '<p class="quiz-prompt">Choose the correct meaning.</p><span class="quiz-word">' + esc(quiz.item.hanzi) + '</span><span class="quiz-pinyin">' + esc(quiz.item.pinyin) + '</span><div class="choice-grid">' + quiz.options.map(function (option) {
      let state = "";
      if (answered && option === quiz.item.english) state = " is-correct";
      if (answered && option === quiz.selected && option !== quiz.item.english) state = " is-wrong";
      return '<button class="choice-button' + state + '" type="button" data-action="answer-quiz" data-choice="' + esc(option) + '"' + (answered ? " disabled" : "") + ">" + esc(option) + "</button>";
    }).join("") + '</div><p class="feedback">' + esc(quiz.feedback) + "</p>";
    renderStats();
  }

  function renderGrammar() {
    document.getElementById("grammar-list").innerHTML = data.grammar.map(function (entry, index) {
      const selected = grammarAnswers[index] || "";
      const answered = selected !== "";
      return '<article class="grammar-item"><h3>' + esc(entry.title) + '</h3><span class="pattern">' + esc(entry.pattern) + '</span><p>' + esc(entry.note) + '</p><p><strong>' + esc(entry.exampleZh) + '</strong></p><p>' + esc(entry.examplePinyin) + '</p><p>' + esc(entry.exampleEn) + '</p><div class="grammar-exercise"><p>Complete: ' + esc(entry.prompt) + '</p><div class="grammar-choices">' + entry.choices.map(function (choice) {
        let state = "";
        if (answered && choice === entry.answer) state = " is-correct";
        if (answered && choice === selected && choice !== entry.answer) state = " is-wrong";
        return '<button class="choice-button' + state + '" type="button" data-action="answer-grammar" data-index="' + index + '" data-choice="' + esc(choice) + '"' + (answered ? " disabled" : "") + ">" + esc(choice) + "</button>";
      }).join("") + '</div><p class="feedback">' + (answered ? (selected === entry.answer ? "Correct." : "Review: " + esc(entry.pattern)) : "") + "</p></div></article>";
    }).join("");
  }

  function renderReading() {
    document.getElementById("reading-card").innerHTML = '<article class="comprehension-card"><h3>' + esc(data.reading.title) + '</h3><p class="reading-text">' + esc(data.reading.text) + '</p><div class="prompt-list">' + data.reading.questions.map(function (question, index) {
      return '<label><span>' + (index + 1) + ". " + esc(question) + '</span><textarea rows="2" placeholder="Answer in English or Chinese"></textarea></label>';
    }).join("") + "</div></article>";
  }

  function renderListening() {
    document.getElementById("listening-card").innerHTML = '<article class="comprehension-card"><h3>' + esc(data.listening.title) + '</h3><div class="dialogue-lines">' + data.listening.lines.map(function (line) {
      return "<p>" + esc(line) + "</p>";
    }).join("") + '</div><div class="choice-grid">' + data.listening.checks.map(function (check, index) {
      const selected = listeningAnswers[index];
      const answered = typeof selected === "boolean";
      return '<button class="choice-button' + answerState(answered, true, selected, data.listening.answers[index]) + '" type="button" data-action="answer-listening" data-index="' + index + '" data-choice="true">' + esc(check) + " · True</button>" +
        '<button class="choice-button' + answerState(answered, false, selected, data.listening.answers[index]) + '" type="button" data-action="answer-listening" data-index="' + index + '" data-choice="false">' + esc(check) + " · False</button>";
    }).join("") + "</div></article>";
  }

  function renderPlacement() {
    const answered = Object.keys(placementAnswers).length;
    const score = PLACEMENT.reduce(function (sum, item, index) {
      return sum + (placementAnswers[index] === item.answer ? 1 : 0);
    }, 0);
    document.getElementById("placement-card").innerHTML = '<p class="panel-note">' + esc(answered === PLACEMENT.length ? recommendation(score) : "Answer all questions for a placement suggestion.") + '</p><div class="level-test-grid">' + PLACEMENT.map(function (item, index) {
      const selected = placementAnswers[index] || "";
      const done = selected !== "";
      return '<article class="test-item"><strong>' + esc(item.level) + '</strong><p>' + esc(item.prompt) + '</p><div class="grammar-choices">' + item.choices.map(function (choice) {
        let state = "";
        if (done && choice === item.answer) state = " is-correct";
        if (done && choice === selected && choice !== item.answer) state = " is-wrong";
        return '<button class="choice-button' + state + '" type="button" data-action="answer-placement" data-index="' + index + '" data-choice="' + esc(choice) + '"' + (done ? " disabled" : "") + ">" + esc(choice) + "</button>";
      }).join("") + "</div></article>";
    }).join("") + "</div>";
  }

  function renderPodcast() {
    document.getElementById("podcast-card").innerHTML = '<article class="comprehension-card podcast-card"><h3>' + esc(data.podcast.title) + '</h3><p class="panel-note">Hands-free grammar and vocabulary review for driving.</p><ol>' + data.podcast.lines.map(function (line) {
      return "<li>" + esc(line) + "</li>";
    }).join("") + '</ol><div class="tool-row"><button class="tool-button" type="button" data-action="play-podcast-slow">Slow play</button><button class="tool-button" type="button" data-action="stop-audio">Stop</button></div></article>';
  }

  function onClick(event) {
    const target = event.target.closest("[data-action]");
    if (!target) return;
    const action = target.dataset.action;
    if (action === "flip-card") flipped = !flipped, renderCard();
    if (action === "next-card") moveCard(1);
    if (action === "prev-card") moveCard(-1);
    if (action === "speak-current") speak(data.vocabulary[currentIndex].hanzi, 0.82);
    if (action === "toggle-known-current") toggleKnown(data.vocabulary[currentIndex].id), renderCard(), renderVocab();
    if (action === "toggle-known") toggleKnown(target.dataset.id), renderCard(), renderVocab();
    if (action === "focus-card") focusCard(target.dataset.id);
    if (action === "speak-entry") speakById(target.dataset.id);
    if (action === "start-session") startSession();
    if (action === "prev-vocab-page") changeVocabularyPage(-1);
    if (action === "next-vocab-page") changeVocabularyPage(1);
    if (action === "next-quiz") nextQuiz();
    if (action === "answer-quiz") answerQuiz(target.dataset.choice);
    if (action === "answer-grammar") grammarAnswers[target.dataset.index] = target.dataset.choice, renderGrammar();
    if (action === "speak-reading") speak(data.reading.text, 0.78);
    if (action === "speak-listening") speak(data.listening.lines.join("。"), 0.8);
    if (action === "answer-listening") listeningAnswers[target.dataset.index] = target.dataset.choice === "true", renderListening();
    if (action === "answer-placement") placementAnswers[target.dataset.index] = target.dataset.choice, renderPlacement();
    if (action === "reset-placement") resetPlacement();
    if (action === "play-podcast") speak(data.podcast.lines.join("。"), 0.78);
    if (action === "play-podcast-slow") speak(data.podcast.lines.join("。"), 0.68);
    if (action === "stop-audio") stopAudio();
    if (action === "reset-progress") resetProgress();
  }

  function onInput(event) {
    if (event.target.id === "vocab-search") {
      searchTerm = event.target.value.trim().toLowerCase();
      vocabPage = 0;
      renderVocab();
    }
  }

  function onChange(event) {
    if (event.target.id === "type-filter") {
      typeFilter = event.target.value;
      vocabPage = 0;
      renderVocab();
    }
    if (event.target.id === "lesson-filter") {
      lessonFilter = event.target.value;
      currentIndex = lessonFilter === "all" ? 0 : Number(lessonFilter) * WORDS_PER_LESSON;
      vocabPage = 0;
      flipped = false;
      renderCard();
      renderVocab();
      nextQuiz();
    }
  }

  function onKeydown(event) {
    const tag = event.target.tagName;
    if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA" || tag === "BUTTON" || tag === "A" || event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      flipped = !flipped;
      renderCard();
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveCard(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveCard(1);
    }
  }

  function matchesFilter(entry) {
    const haystack = [entry.hanzi, entry.pinyin, entry.english, entry.type, entry.exampleZh].join(" ").toLowerCase();
    return (typeFilter === "all" || entry.type === typeFilter) && (searchTerm === "" || haystack.indexOf(searchTerm) !== -1);
  }

  function nextQuiz() {
    const deck = activeDeck();
    const weak = deck.filter(function (entry) { return !currentKnownSet().has(entry.id); });
    const pool = weak.length ? weak : deck;
    const answer = pool[Math.floor(Math.random() * pool.length)];
    const distractors = shuffle(uniqueValues(deck.filter(function (entry) { return entry.english !== answer.english; }).map(function (entry) { return entry.english; }))).slice(0, 3);
    quiz = { item: answer, options: shuffle([answer.english].concat(distractors)), selected: "", feedback: "" };
    renderQuiz();
  }

  function answerQuiz(choice) {
    if (quiz.selected) return;
    quiz.selected = choice;
      quizStats.total += 1;
    if (choice === quiz.item.english) {
      quizStats.correct += 1;
      quiz.feedback = quiz.item.exampleZh ? "Correct: " + quiz.item.exampleZh + " " + quiz.item.exampleEn : "Correct: say the word in your own sentence before moving on.";
      toggleKnown(quiz.item.id, true);
    } else {
      quiz.feedback = "Answer: " + quiz.item.english;
    }
    renderQuiz();
    renderCard();
    renderVocab();
  }

  function focusCard(id) {
    const index = data.vocabulary.findIndex(function (entry) { return entry.id === id; });
    if (index >= 0) {
      currentIndex = index;
      flipped = true;
      renderCard();
      document.getElementById("flashcard").scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  function changeVocabularyPage(direction) {
    vocabPage = Math.max(0, vocabPage + direction);
    renderVocab();
    document.getElementById("vocab-list").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function speakById(id) {
    const entry = data.vocabulary.find(function (candidate) { return candidate.id === id; });
    if (entry) speak(entry.hanzi + (entry.exampleZh ? "。" + entry.exampleZh : ""), 0.82);
  }

  function currentKnownSet() {
    const progress = loadProgress();
    return new Set(Array.isArray(progress[levelKey]) ? progress[levelKey] : []);
  }

  function toggleKnown(id, forceKnown) {
    const progress = loadProgress();
    const known = currentKnownSet();
    if (forceKnown === true) known.add(id);
    else if (known.has(id)) known.delete(id);
    else known.add(id);
    progress[levelKey] = Array.from(known);
    saveProgress(progress);
    renderStats();
  }

  function resetProgress() {
    if (!window.confirm("Reset all known-word progress for this HSK level?")) return;
    const progress = loadProgress();
    progress[levelKey] = [];
    saveProgress(progress);
    renderCard();
    renderVocab();
  }

  function resetPlacement() {
    if (!window.confirm("Reset all placement-test answers?")) return;
    placementAnswers = {};
    renderPlacement();
  }

  function loadProgress() {
    try {
      const raw = window.localStorage.getItem(PROGRESS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (error) {
      return memoryProgress;
    }
  }

  function saveProgress(progress) {
    memoryProgress = progress;
    try {
      window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    } catch (error) {
      memoryProgress = progress;
    }
  }

  function speak(text, rate) {
    if (!("speechSynthesis" in window)) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    utterance.rate = rate || 0.8;
    const voice = window.speechSynthesis.getVoices().find(function (candidate) {
      const label = (candidate.lang + " " + candidate.name).toLowerCase();
      return label.indexOf("zh") !== -1 || label.indexOf("chinese") !== -1 || label.indexOf("mandarin") !== -1;
    });
    if (voice) utterance.voice = voice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  function stopAudio() {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  }

  function recommendation(score) {
    if (score <= 2) return "Placement: review HSK 1 foundations. Score: " + score + "/10.";
    if (score <= 4) return "Placement: HSK 2 review. Score: " + score + "/10.";
    if (score <= 6) return "Placement: HSK 3, matching your current level. Score: " + score + "/10.";
    if (score <= 8) return "Placement: HSK 4 bridge work. Score: " + score + "/10.";
    return "Placement: HSK 5 stretch is appropriate. Score: " + score + "/10.";
  }

  function answerState(answered, option, selected, answer) {
    if (!answered) return "";
    if (option === answer) return " is-correct";
    if (option === selected) return " is-wrong";
    return "";
  }

  function shuffle(values) {
    const copy = values.slice();
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      const value = copy[index];
      copy[index] = copy[swapIndex];
      copy[swapIndex] = value;
    }
    return copy;
  }

  function uniqueValues(values) {
    return Array.from(new Set(values));
  }

  function setText(id, value) {
    const node = document.getElementById(id);
    if (node) node.textContent = value;
  }

  function esc(value) {
    return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }
})();
