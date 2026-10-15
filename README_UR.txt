AI PROMPT STUDIO — STARTER WEBSITE
==================================

یہ ایک ابتدائی پروفیشنل ویب سائٹ ہے۔ اس میں:
- Responsive dark design
- Search bar اور categories
- Prompt cards اور detail popup
- Copy Image Prompt / Copy Video Prompt buttons
- YouTube tutorial link کا آپشن
- Demo prompts
- Supabase کے ساتھ published prompts پڑھنے کی بنیادی integration

اہم: یہ starter ابھی مکمل Admin Panel نہیں ہے۔ پہلے front-end کو شائع اور ٹیسٹ کریں؛ پھر Supabase Auth کے ساتھ محفوظ Admin Panel شامل کریں۔ کسی بھی صورت public insert/update/delete اجازت نہ دیں۔

فائلیں
------
index.html       مرکزی صفحہ
styles.css       ڈیزائن
app.js           سرچ، فلٹر، prompt popup اور copy buttons
config.js        Supabase project کی public configuration
schema.sql       Supabase میں prompts table بنانے کی SQL
about.html       About page
privacy.html     Privacy Policy کا ابتدائی نمونہ
contact.html     Contact page

لوکل ٹیسٹ
---------
1. تمام فائلیں ایک ہی فولڈر میں رکھیں۔
2. index.html براؤزر میں کھولیں۔ Demo prompts نظر آئیں گے۔
3. موبائل پر ZIP کھولنے کے لیے Files app میں Extract کریں۔

مفت ہوسٹنگ پر شائع کرنا
-----------------------
1. Cloudflare اکاؤنٹ بنائیں۔
2. Pages میں نیا project بنائیں اور Git repository یا Direct Upload کے دستیاب طریقے سے یہ static files اپ لوڈ کریں۔
3. Build command خالی رکھیں (static HTML ہے)۔
4. Output directory کے طور پر / یا root directory منتخب کریں، اگر dashboard یہی پوچھے۔
5. شائع ہونے کے بعد ملنے والے pages.dev لنک پر سائٹ چیک کریں۔

Supabase سے prompts پڑھنے کی integration (اختیاری)
--------------------------------------------------
1. Supabase پر project بنائیں۔
2. SQL Editor میں schema.sql چلائیں۔
3. config.js میں supabaseUrl اور supabaseAnonKey بھریں۔
   صرف public anon/publishable key استعمال کریں۔ service_role/secret key کبھی بھی browser code میں نہ ڈالیں۔
4. prompts table میں prompts شامل کریں اور published = true رکھیں۔
5. سائٹ refresh کریں۔ published prompts لوڈ ہونے چاہییں۔

Admin Panel
-----------
محفوظ Admin Panel اگلا مرحلہ ہے: Supabase Auth، صرف admin user کی شناخت، اور admin-only insert/update/delete policies۔ اسے بناتے وقت پہلے authentication اور Row Level Security ٹیسٹ کریں۔ اس starter میں public write access جان بوجھ کر شامل نہیں کی گئی، کیونکہ اس سے کوئی بھی آپ کی ویب سائٹ کا مواد بدل سکتا ہے۔

AdSense
-------
یہ starter AdSense approval کی ضمانت نہیں دیتا۔ پہلے اپنی original/helpful content شامل کریں، About، Contact، Privacy Policy کو درست کریں، navigation چیک کریں اور Google کی تازہ publisher policies پڑھیں۔ اشتہار کو Copy Prompt button کے ساتھ یا اس طرح نہ رکھیں کہ صارف غلطی سے کلک کرے۔ اپنی ads پر کبھی click نہ کریں۔

لانچ سے پہلے
------------
- AI Prompt Studio نام اور branding اپنی ضرورت کے مطابق بدلیں۔
- اپنے رابطے کی درست معلومات Contact page میں درج کریں۔
- Privacy Policy کو اپنی اصل data/analytics/ad setup کے مطابق اپ ڈیٹ کریں۔
- ہر prompt میں اپنی اصل وضاحت، مثال اور مفید ہدایات شامل کریں۔
Updated
