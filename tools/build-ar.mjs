// Generates the Arabic page (ar/index.html) from index.html.
//
//   node tools/build-ar.mjs
//
// index.html is the single source of layout + English text. Every translatable element
// carries data-i18n="key" (inner HTML), data-i18n-aria="key" (aria-label),
// data-i18n-alt="key" (alt) or data-i18n-content="key" (meta content).
// Run this after any change to index.html, then commit both files.
// The script fails if a key is missing on either side, so the two pages can't drift apart.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://riadbaytamouni.github.io/";

const AR = {
  "meta.title": "رياض بيتموني — مهندس برمجيات · الذكاء الاصطناعي وتطبيقات الهواتف | دبي",
  "meta.desc": "رياض بيتموني، مهندس برمجيات (الذكاء الاصطناعي وتطبيقات الهواتف) في دبي. أكثر من 5 سنوات في بناء وكلاء الذكاء الاصطناعي وخصائص LLM وروبوتات المحادثة وتطبيقات Flutter. قاد تطوير تطبيق موارد بشرية يستخدمه أكثر من 1,000 مستخدم نشط شهريًا.",
  "meta.ogTitle": "رياض بيتموني — مهندس برمجيات · الذكاء الاصطناعي وتطبيقات الهواتف",
  "meta.ogDesc": "أبني وكلاء ذكاء اصطناعي وخصائص LLM وتطبيقات Flutter تصل إلى مستخدمين حقيقيين. مقيم في دبي.",

  "nav.skip": "تخطَّ إلى المحتوى",
  "nav.label": "القائمة الرئيسية",
  "nav.home": "رياض بيتموني، العودة إلى الأعلى",
  "nav.about": "نبذة عني",
  "nav.experience": "الخبرات",
  "nav.projects": "المشاريع",
  "nav.skills": "المهارات",
  "nav.education": "التعليم",
  "nav.contact": "تواصل معي",
  "nav.cv": "تحميل السيرة الذاتية",
  "nav.menu": "فتح القائمة",

  "hero.location": "دبي، الإمارات",
  "hero.nationality": "لبناني",
  "hero.open": "متاح لفرص عمل",
  "hero.name": "رياض بيتموني",
  "hero.title": "مهندس برمجيات · الذكاء الاصطناعي وتطبيقات الهواتف",
  "hero.lead": "أبني وكلاء ذكاء اصطناعي وخصائص LLM وتطبيقات Flutter تصل إلى مستخدمين حقيقيين.",
  "hero.sub": "من المتطلبات حتى الإطلاق: أنظمة للهواتف والويب والذكاء الاصطناعي لمنتجات أعمال حقيقية، مختبرة من البداية إلى النهاية.",
  "hero.viewProjects": "استعرض المشاريع",
  "hero.downloadCV": "تحميل السيرة الذاتية",
  "hero.cvHint": "PDF · 248 KB",
  "hero.contact": "تواصل معي",
  "hero.photoAlt": "صورة رياض بيتموني",

  "stats.years": "سنوات في بناء البرمجيات",
  "stats.mau": "مستخدم نشط شهريًا على تطبيق موارد بشرية قدتُ تطويره",
  "stats.clients": "تطبيقات ومواقع لعملاء منذ 2024",

  "about.title": "نبذة عني",
  "about.p1": "مهندس برمجيات بخبرة تتجاوز 5 سنوات، وأعمل حاليًا مهندس ذكاء اصطناعي في BluGrass Technologies في دبي. بدأت في تطوير تطبيقات الهواتف، حيث قدت تطوير نظام موارد بشرية بـ Flutter للحضور والرواتب وإدارة الإجازات، يستخدمه أكثر من 1,000 مستخدم نشط شهريًا على Android و iOS.",
  "about.p2": "اليوم أبني خصائص قائمة على نماذج LLM، ووكلاء ذكاء اصطناعي مع Function Calling، وروبوتات محادثة لمنتجات الأعمال. وأقارن نماذج OpenAI و Claude و Llama لاختيار الأنسب لكل حالة من حيث الدقة والسرعة والتكلفة.",
  "about.p3": "أختبر كل ما أسلّمه، من مسارات المستخدم والـ APIs إلى الحالات الحدّية ومخرجات الذكاء الاصطناعي، وأتتبّع الأخطاء حتى سببها الجذري. أستخدم أدوات البرمجة بالذكاء الاصطناعي، وأراجع وأختبر كل مخرجاتها قبل الإطلاق.",

  "glance.title": "لمحة سريعة",
  "glance.based": "مكان الإقامة",
  "glance.basedV": "دبي، الإمارات",
  "glance.now": "حاليًا",
  "glance.nowV": "مهندس ذكاء اصطناعي، BluGrass Technologies",
  "glance.focus": "مجال التركيز",
  "glance.focusV": "وكلاء الذكاء الاصطناعي · خصائص LLM · تطبيقات Flutter",
  "glance.langs": "اللغات",
  "glance.langsV": "العربية (اللغة الأم) · الإنجليزية والفرنسية (احترافية، DELF B2)",
  "glance.edu": "التعليم",
  "glance.eduV": "بكالوريوس علوم الحاسوب، جامعة بيروت العربية",

  "exp.title": "الخبرات",
  "exp.blugrass.date": "فبراير 2021 – حتى الآن · أكثر من 5 سنوات",
  "exp.ai.role": "مهندس ذكاء اصطناعي",
  "exp.ai.date": "نوفمبر 2024 – حتى الآن · دبي، الإمارات",
  "exp.ai.1": "دمجت خصائص LLM (OpenAI و Claude) في نظام الموارد البشرية للشركة ومنتجاتها على الويب.",
  "exp.ai.2": "بنيت وكلاء ذكاء اصطناعي مع Function Calling لأتمتة مهام داخلية متكررة.",
  "exp.ai.3": "بنيت روبوتات محادثة داخلية ولدعم العملاء، بالإضافة إلى مساعد اتصال بالذكاء الاصطناعي يدعم فريق المبيعات أثناء المكالمات المباشرة.",
  "exp.ai.4": "قارنت نماذج OpenAI و Claude و Llama من حيث الدقة والسرعة والتكلفة لكل حالة استخدام، واختبرت الإجابات واختيار الأدوات وحالات الفشل قبل كل إصدار.",
  "exp.fs.role": "مطوّر Full Stack",
  "exp.fs.date": "فبراير 2021 – نوفمبر 2024 · لبنان",
  "exp.fs.1": "قدت تطوير نظام موارد بشرية بـ Flutter و Firebase على Android و iOS (الحضور والرواتب وإدارة الإجازات) يستخدمه أكثر من 1,000 مستخدم نشط شهريًا.",
  "exp.fs.2": "أضفت تسجيل الدخول عبر Google و Apple والإشعارات الفورية (Firebase Cloud Messaging)، وحسّنت الأداء بتقليل طلبات الـ API وإضافة التخزين المحلي المؤقت.",
  "exp.fs.3": "حوّلت متطلبات المنتج إلى خصائص منجزة بالتعاون مع مديري المنتجات، مع اختبار المسارات الكاملة واختبارات الانحدار قبل كل إصدار.",
  "exp.fs.4": "صنت مواقع الشركة الإلكترونية، بما في ذلك الأداء وتحسين محركات البحث (SEO).",
  "exp.dsc.company": "مجلس دبي الرياضي",
  "exp.dsc.date": "أغسطس 2024 · مطوّر Full Stack (مشروع) · دبي",
  "exp.dsc.1": "بنيت روبوت محادثة ذكيًا (ChatGPT API) يجيب عن أسئلة المستخدمين حول خدمات المجلس، مع مراسلة عبر Twilio.",
  "exp.dsc.2": "طوّرت الواجهة الأمامية بـ React.js والواجهة الخلفية بـ KeystoneJS و PostgreSQL، وتحققت من المسار الكامل من الرسالة حتى قاعدة البيانات.",

  "proj.title": "المشاريع",
  "proj.work": "أعمال للعملاء",
  "proj.featured": "مميّز",
  "proj.client": "مشروع لعميل",
  "proj.school": "مدرسة، لبنان",
  "proj.4clients": "4 مواقع لعملاء",
  "proj.channels": "القنوات",
  "proj.tech": "التقنيات",
  "proj.personal": "مشاريع شخصية",
  "proj.more": "حسابي على GitHub",
  "a11y.newTab": "(يفتح في علامة تبويب جديدة)",

  "filter.label": "تصفية المشاريع",
  "filter.all": "الكل",
  "filter.ai": "ذكاء اصطناعي",
  "filter.mobile": "تطبيقات الهواتف",

  "work.1.name": "وكيل أعمال ذكي متعدد القنوات",
  "work.1.desc": "وكيل ذكاء اصطناعي يعمل كمكتب استقبال للشركات عبر WhatsApp ورسائل Instagram و Messenger: يدير الحجوزات والحصص التجريبية ويدعم العمليات اليومية.",
  "work.2.name": "تطبيق خدمات التأشيرات السعودية",
  "work.2.desc": "تطبيق لعميل لإدارة خدمات التأشيرات السعودية.",
  "work.3.name": "تطبيق تتبّع الحافلات المدرسية",
  "work.3.desc": "تطبيق مخصص لتتبّع الحافلات لمدرسة في لبنان.",
  "work.4.name": "مواقع إلكترونية للعملاء",
  "work.4.desc": "مواقع أكاديميات جراحة الأعصاب مع التسجيل في الدورات عبر الإنترنت، ومتجر على Shopify، وموقع لمكتب محاماة.",

  "proj.1.name": "مستشار — مساعد مستندات ثنائي اللغة قائم على RAG",
  "proj.1.desc": "اطرح أسئلة عن مستنداتك بالعربية أو الإنجليزية واحصل على إجابات مع ذكر المصادر، مع حسابات مستخدمين ومساحات عمل منفصلة.",
  "proj.1.q": "تم التحقق من دقة الاستشهادات وفصل بيانات المستخدمين وهجمات حقن التعليمات",
  "proj.4.name": "لجنة — مراجعة الطلبات بوكلاء متعددين",
  "proj.4.desc": "وكلاء ذكاء اصطناعي يفرزون الطلبات الواردة، ويوافق شخص على كل قرار، وتُسجَّل كل خطوة في سجل تدقيق.",
  "proj.4.q": "تم التحقق من تسليم المهام بين الوكلاء وخطوات الموافقة",
  "proj.3.name": "مصنّف — مصنِّف للملاحظات العربية",
  "proj.3.desc": "نموذج LLM صغير مفتوح المصدر مضبوط بتقنية QLoRA لتصنيف الملاحظات العربية، ومنشور على Hugging Face Spaces.",
  "proj.3.q": "تمت مقارنته بـ GPT من حيث الدقة والتكلفة",
  "proj.5.name": "محضر — مولّد محاضر الاجتماعات",
  "proj.5.desc": "يحوّل تسجيلات الاجتماعات بالعربية أو الإنجليزية إلى محاضر بالقرارات وبنود المتابعة. يعمل دون اتصال ويصدّر إلى Word أو PDF.",
  "proj.5.q": "تم اختباره على تسجيلات عربية وإنجليزية ومختلطة",
  "proj.6.name": "فاتورة — ماسح الفواتير والمصاريف",
  "proj.6.desc": "تطبيق Flutter يعمل دون اتصال يقرأ الفواتير عبر Vision LLM، مع ضريبة القيمة المضافة الإماراتية والميزانيات والتقارير وقفل التطبيق.",
  "proj.6.q": "تمت مطابقة المبالغ والضريبة مع فواتير حقيقية",
  "proj.7.name": "عادة — متتبّع عادات ثنائي اللغة",
  "proj.7.desc": "متتبّع عادات بالعربية والإنجليزية مع سلاسل إنجاز وتقويم هجري ونسخ احتياطية مشفّرة واختبارات آلية.",
  "proj.7.q": "تم التحقق من منطق السلاسل والتواريخ والنسخ الاحتياطي والاستعادة",

  "skills.title": "المهارات",
  "skills.core": "التقنيات الأساسية",
  "skills.agents": "وكلاء الذكاء الاصطناعي و Function Calling",
  "skills.ai": "الذكاء الاصطناعي ونماذج LLM",
  "skills.ft": "الضبط الدقيق بـ QLoRA",
  "skills.mobile": "تطبيقات الهواتف والويب",
  "skills.rtl": "تطبيقات متعددة اللغات ودعم العربية RTL",
  "skills.backend": "الواجهات الخلفية والبيانات",
  "skills.tools": "الاختبار والأدوات",
  "skills.t1": "اختبارات E2E و API والانحدار",
  "skills.t2": "تقييم مخرجات الذكاء الاصطناعي",

  "edu.title": "التعليم",
  "edu.bsc": "بكالوريوس علوم الحاسوب",
  "edu.school": "جامعة بيروت العربية · بيروت، لبنان",
  "edu.certs": "الشهادات",

  "contact.title": "لنبنِ شيئًا معًا",
  "contact.lead": "تبحث عن مهندس ذكاء اصطناعي أو تطبيقات هواتف أو Full Stack، أو تحتاج إلى وكيل ذكاء اصطناعي أو تطبيق؟ أسرع طريقة للتواصل هي البريد الإلكتروني أو WhatsApp.",
  "contact.email": "راسلني بالبريد",
  "contact.copy": "نسخ عنوان البريد الإلكتروني",
  "contact.linkedin": "LinkedIn (يفتح في علامة تبويب جديدة)",
  "contact.github": "GitHub (يفتح في علامة تبويب جديدة)",
  "contact.emailLabel": "البريد الإلكتروني",
  "contact.phone": "الهاتف / WhatsApp:",

  "footer.name": "رياض بيتموني · دبي، الإمارات",
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

let html = readFileSync(join(root, "index.html"), "utf8");
const used = new Set();
const missing = new Set();
const t = (key) => {
  used.add(key);
  if (!(key in AR)) { missing.add(key); return null; }
  return AR[key];
};

// 1) Inner HTML of data-i18n elements. Translatable elements are leaves: they never
//    contain another element with the same tag name, so a lazy match to the closing tag is safe.
html = html.replace(
  /(<([a-zA-Z0-9]+)\b[^>]*\sdata-i18n="([^"]+)"[^>]*>)([\s\S]*?)(<\/\2>)/g,
  (m, open, tag, key, inner, close) => {
    if (new RegExp(`<${tag}\\b`).test(inner)) throw new Error(`Nested <${tag}> inside data-i18n="${key}"`);
    const v = t(key);
    return v === null ? m : open + v + close;
  }
);

// 2) Attributes: aria-label / alt / content
for (const [marker, attr] of [["data-i18n-aria", "aria-label"], ["data-i18n-alt", "alt"], ["data-i18n-content", "content"]]) {
  html = html.replace(new RegExp(`<[^>]*\\s${marker}="([^"]+)"[^>]*>`, "g"), (tagStr, key) => {
    const v = t(key);
    if (v === null) return tagStr;
    if (!new RegExp(`\\s${attr}="`).test(tagStr)) throw new Error(`${marker}="${key}" has no ${attr}`);
    return tagStr.replace(new RegExp(`(\\s${attr}=")[^"]*(")`), `$1${esc(v)}$2`);
  });
}

// 3) Page-level changes
html = html
  .replace('<html lang="en" dir="ltr">', '<html lang="ar" dir="rtl">')
  .replace(`<link rel="canonical" href="${SITE}">`, `<link rel="canonical" href="${SITE}ar/">`)
  .replace(`<meta property="og:url" content="${SITE}">`, `<meta property="og:url" content="${SITE}ar/">`)
  .replace('<meta property="og:locale" content="en_US">', '<meta property="og:locale" content="ar_AE">\n  <meta property="og:locale:alternate" content="en_US">')
  .replace(
    '<a id="langToggle" class="toggle-btn lang-btn" href="ar/" hreflang="ar" lang="ar" aria-label="النسخة العربية">عربي</a>',
    '<a id="langToggle" class="toggle-btn lang-btn" href="../" hreflang="en" lang="en" aria-label="English version">EN</a>'
  );
if (!html.includes('href="../" hreflang="en"')) throw new Error("Language toggle markup changed; update build-ar.mjs");

// 4) Relative asset paths -> one level up (in-page anchors and absolute URLs untouched)
html = html.replace(/\s(href|src|srcset)="(?!#|https?:|mailto:|tel:|data:|\/|\.\.\/)([^"]+)"/g, ' $1="../$2"');

// 5) Stamp
html = html.replace("<!DOCTYPE html>", "<!DOCTYPE html>\n<!-- GENERATED by tools/build-ar.mjs from index.html. Don't edit by hand. -->");

const unused = Object.keys(AR).filter((k) => !used.has(k));
if (missing.size || unused.length) {
  if (missing.size) console.error("Missing Arabic for:", [...missing].join(", "));
  if (unused.length) console.error("Arabic keys not used in index.html:", unused.join(", "));
  process.exit(1);
}

mkdirSync(join(root, "ar"), { recursive: true });
writeFileSync(join(root, "ar", "index.html"), html);
console.log(`ar/index.html written (${used.size} keys)`);
