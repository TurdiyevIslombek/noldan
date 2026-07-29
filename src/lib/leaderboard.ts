/* --------------------------------------------------------------------
   Leaderboard scoring.

   The whole point is that NOTHING here is self-reported. A student
   publishes a tokenizer to the Hub; this file downloads their real
   tokenizer.json, runs it over a fixed Uzbek text in the visitor's own
   browser, and computes the score. There is no submission form and no
   number anyone can type in.

   WHY bits-per-character AND NOT tokens-per-word:

     Fertility (tokens/soʻz) alone is trivially gamed — make the
     vocabulary enormous and it always falls. That would reward exactly
     the opposite of what the Lugʻat chapter teaches.

     Each token costs log2(vocabSize) bits to identify, so

       bit/belgi = tokens * log2(vocab) / chars

     prices the vocabulary budget instead of ignoring it. Measured:
     BLOOM carries a 250,680 vocabulary — 15x uzbek-bpe-16k — and still
     scores worse (7.51 vs 3.24). A bigger table only wins if it
     genuinely earns its keep.

   The eval text below is PUBLIC — it ships in this bundle. Someone
   could train on it. For a tokenizer that is a much weaker attack than
   it sounds (compressing Uzbek well IS the goal), and bits-per-char
   caps the gain from memorising it with a huge vocabulary. It is not a
   sealed benchmark and is not presented as one.

   SOURCE: Uzbek Corpus Sample (CC BY 4.0),
   https://github.com/elmurod1202/Uzbek-Corpus-Sample — a slice held out
   of DEMO_CORPUS in bpe.ts, normalised to U+02BB. Verified: zero of
   these 150 sentences appear there.
   -------------------------------------------------------------------- */

import { loadFromHub, encode, measure, type LoadedTokenizer } from "./hf-tokenizer";

/** Fixed evaluation text. Changing it invalidates every published score,
 *  so treat it as append-only once the leaderboard has entries. */
export const EVAL_TEXT = [
  "U toʻsatdan gapimizni toʻxtatdi.",
  "Oʻqning uchi burgutning oʻz patlari bilan qoplangan edi.",
  "Biz imkon qadar koʻproq kitob oʻqishimiz kerak.",
  "Kitlar shakli baliqlarga oʻxshaydi.",
  "U oʻzining qishloq mulkida yashaydi.",
  "Men sizga bu lugʻatni beraman.",
  "Meri qoʻlidan kelganicha yordam beradigan yaxshi qalbli qiz edi.",
  "Bu yutuq energiya va yurak bilan bogʻliq boʻlishi kerak.",
  "Matnni oʻz soʻzlaringiz bilan umumlashtiring.",
  "Bu yuk pochta orqali joʻnatish uchun juda katta.",
  "Siz bu xonada qulayroq boʻlasiz.",
  "Tom Maryamga oʻzini joyida emasligini aytdi.",
  "Bunday katta oilani boqishim kerak deb oʻylamagan edim.",
  "Televizorni oʻchirib oʻqishga kirishdi.",
  "Men uni birinchi boʻlib koʻrdim.",
  "Agar siz simni uzsangiz nima boʻlishini taxmin qiling.",
  "Ikki kundan beri yomgʻir yogʻmoqda.",
  "Men juda koʻp shovqindan aqldan ozaman.",
  "Ular imtihondan oʻta olmadilar.",
  "Men mushukchaga Tama deb ism qoʻydim.",
  "Men bolalar oʻyinlarini tomosha qilishdan zavqlanaman.",
  "U bunga ishonmasligini qoʻshimcha qildi.",
  "Siz oʻzingizni yaxshiroq tutishga harakat qilishingiz kerak.",
  "Har kuni ertalab oʻzimdan nega deb soʻrayman.",
  "Biz goʻdaklar kabi emaklanamiz.",
  "Biz oʻtgan yozda Fudzi togʻiga chiqdik.",
  "Tom biroz bugʻni tashlashi kerak.",
  "Uning kontserti koʻpchilikni oʻziga tortdi.",
  "Men bu rasmni bolaligimni eslamasdan koʻra olmayman.",
  "Men sizni qiziqtirayotgandir deb oʻyladim.",
  "U yolgʻiz sakson kunda dunyoni kezib chiqdi.",
  "U raqsga tushayotganda oʻzini jarohatlagan.",
  "Yaponlar qushlar va hasharotlarning qoʻshiqlaridan zavqlanishadi.",
  "Olimpiya oʻyinlari toʻrt yil oraligʻida boʻlib oʻtadi.",
  "Men nima boʻlishini koʻrmoqchiman.",
  "Tomning deyarli barcha boʻsh vaqti golf maydonida oʻtadi.",
  "Sport bilan shugʻullaning va ertaga ertalab soat oltida meni uygʻoting.",
  "Men kechki ovqatga ketyapmiz deb oʻyladim.",
  "Uning koʻzlarida jozibali nigoh bor edi.",
  "Biz soat sakkizda joʻnab ketamiz.",
  "Siz juda koʻp chekmasligingiz kerak.",
  "Shveytsariya oʻzining goʻzalligi bilan mashhur.",
  "Tom kimnidir kutayotganga oʻxshaydi.",
  "Kabinada suv va elektr yoʻq edi.",
  "Menga uch funt tovuq goʻshti kerak.",
  "Biz katta oilaga ega boʻlishni xohlaymiz.",
  "Biz bayramimizni Gavayidagi plyajda oʻtkazdik.",
  "Biz har kuni kechqurun televizor koʻramiz.",
  "Siz nimaga ega ekanligingizdan koʻra muhimroqdir.",
  "U har kuni fikrini oʻzgartirdi.",
  "Men faqat baxtli boʻlishingizni xohlayman.",
  "Javonda juda koʻp kitoblar bor.",
  "Men bularning barchasini oʻzim qila olmayman.",
  "Tom Meri bilan mashinaga oʻtirdi va ular ketishdi.",
  "Bu binoda uy hayvonlari boʻlishi mumkin emas.",
  "Boshidanoq katta shaharda yashash niyatim yoʻq edi.",
  "Ular Maryamni yaxshi koʻrishardi.",
  "Qishda juda koʻp yomgʻir yogʻdi.",
  "Biz unga boʻsh ayol sifatida qaraymiz.",
  "Menda ingliz tilidagi kitoblar deyarli yoʻq.",
  "Tom mendan nega bora olmasligimni soʻradi.",
  "Chiptalar ariza berish tartibiga koʻra taqsimlanadi.",
  "Siz juda yaxshi advokat boʻlishingizni his qilyapman.",
  "U birdaniga oʻrnidan turolmadi.",
  "Faqat u oʻzini sovuq tutdi va doʻstlarini ishontirdi.",
  "Bu qanday ishlashini koʻrsating.",
  "Mendan soʻralgandagina javob beraman.",
  "Men nima juda kulgili ekanligini koʻrmayapman.",
  "Bugun unga qoʻngʻiroq qilishni unutibman.",
  "Tom u erga yolgʻiz borish uchun juda yosh.",
  "Men juda keksa boʻlishim mumkin.",
  "Hammasi uning javobiga bogʻliq.",
  "Men siz uchun oʻgʻirlay olmayman.",
  "Inson tabiati shunday narsalarga duchor boʻladi.",
  "Ularning uyi Feng Shui boʻyicha tashkil etilgan.",
  "Men asabga tegdim deb oʻylayman.",
  "Koʻcha butunlay tartibsizlikda edi.",
  "Hovuzda suzayotganida u shkafning kalitini yoʻqotib qoʻydi.",
  "Men bu oʻyinni oʻynamoqchi emasman.",
  "U har kecha oʻq ovozlarini eshitdi.",
  "Tom unga koʻproq vaqt kerakligini aytdi.",
  "Tom koʻpincha yotoqda ovqatlanadi.",
  "Siz juda koʻp narsani oʻzingiz uchun qabul qilyapsiz.",
  "Mening eng yaqin doʻstim menga yolgʻon gapirdi.",
  "Qushlar bir guruh boʻlib uchib ketishdi.",
  "Oʻqituvchi sinfga Bibliyadan parcha oʻqib berdi.",
  "U kitobni menga joʻnatish uchun mashaqqat oldi.",
  "Biz yaqin atrofdagi cherkov qoʻngʻirogʻining noaniq ovozini eshitdik.",
  "Men doim akam bilan oʻynaganman.",
  "Men Meri oʻrniga Tomni tinglashim kerak edi.",
  "Qoʻlingizdan kelganini qiling.",
  "Men ham rasm chizishni yaxshi koʻraman.",
  "Men qor yogʻishiga shubha qilaman.",
  "Tom va uning xodimlari uchrashuvga tayyorgarlik koʻrmoqda.",
  "Bugun doʻstlarimdan birining tugʻilgan kuni.",
  "Mandarinlarda koʻp miqdorda S vitamini mavjud.",
  "Tom tugʻilgan kun uchun shlyapa kiygan.",
  "Oʻz qoʻlingizdan kelganini ayting.",
  "Tom tashqi koʻrinishidan ancha katta.",
  "Ular yorqin ranglar kiyishni yaxshi koʻradilar.",
  "Menda koʻproq boʻlishini xohlardim.",
  "Biz koʻl chegarasida qarorgoh qurdik.",
  "Men ularga oʻyin qoidalarini tushuntirdim.",
  "U koʻp toʻsiqlarni engib oʻtdi.",
  "Ushbu zavodda koʻplab ishchilar ishdan boʻshatildi.",
  "Oʻsha kunlarda men juda kambagʻal edim.",
  "Har bir oʻgʻil va qiz oʻqish va yozishni oʻrgatadi.",
  "Men koʻpincha qiyinchiliklarga duch kelaman.",
  "Uni hayratda qoldiradiganlar koʻp.",
  "Biz koʻrgan Tom ekanligimizga ham ishonchimiz komil emas.",
  "Tom oʻtgan hafta boshida mashinasini oʻgʻirlab ketgan.",
  "U imtihondan oʻtishi uchun qattiq ishlaydi.",
  "Biz hech qachon rozi boʻlmaymiz.",
  "Men bunday boʻlishini xohlamadim.",
  "Mening fikrim sinfimdagi koʻpchilik oʻquvchilardan farq qiladi.",
  "Qoʻlingizni yuvishingiz kerak.",
  "Ikki narsa oʻrtasida nozik farqlar mavjud.",
  "Uning bankda juda koʻp puli bor.",
  "Siz yolgʻizligingizni aytdingiz deb oʻyladim.",
  "Maykl bugun kechqurun teledasturda boʻladi.",
  "Kelajakda siz bu erga oʻz vaqtida kelishingiz kerak.",
  "Tom kecha doʻstlaridan biri bilan keldi.",
  "Tom Maryamni himoya qilish uchun qoʻlidan kelganini qildi.",
  "Tilni tezda oʻrganishni biladi.",
  "Jeffri doʻstlari tomonidan Jeff deb nomlanadi.",
  "U siz oʻylagandan ham yoshroq.",
  "Har yili chet elga oʻqish uchun ketayotgan talabalar soni ortib bormoqda.",
  "U borgan sari semirib ketayotganga oʻxshaydi.",
  "Tom beysbol oʻynashni yaxshi koʻradi.",
  "Siz oʻz huquqlaringizni bilasiz.",
  "Tom Meridan uni kutubxona oldida kutishni soʻradi.",
  "Vetnam tilini oʻrganish juda oson.",
  "Koʻpincha ayollar erkaklarnikiga qaraganda koʻproq umr koʻrishadi deb aytishadi.",
  "Men bu sirgʻalarni buvimdan olganman.",
  "Doʻstim men bilan yashashni xohlaydi.",
  "Genri Jeyms tugʻilishidan amerikalik edi.",
  "U maktubni oʻqiyotganida gʻamgin koʻrinardi.",
  "Oʻliklar raqsga tushmadi. Ularda bundan ham yaxshiroq ish bor edi.",
  "Kechki ovqatni u oʻzi pishirdi.",
  "Biz uzoq misollarni qoʻshamiz.",
  "Yaponiyada juda koʻp goʻzal joylar bor.",
  "Dik meni oʻz rejasiga rozi boʻlishga majbur qildi.",
  "Men sizga qanday tarjima qilishni oʻrgataman.",
  "Ertasi kuni ertalab Tomga qoʻngʻiroq qildim.",
  "Tom velosiped haydashni oʻrganishga qiynaldi.",
  "Tyorner oʻz davrining rassomlari orasida ajralib turadi.",
  "U nimani nazarda tutayotganini koʻrsatdi.",
  "Men unga chiroyli Rojdestvo sovgʻasi sotib oldim.",
  "Tom butun uyni oʻziga tegishli edi.",
  "Oʻyin maydonchasida ikkita qiz bor.",
].join("\n");

/** The tag a student adds to their model card to appear here. */
export const HUB_TAG = "noldan";

export type Entry = {
  repo: string;
  label: string;
  /** Shown as the author's own reference row, not a student submission. */
  reference?: string;
  vocabSize: number;
  /** tokens * log2(vocab) / chars — the ranking key, lower is better. */
  bitsPerChar: number;
  /** tokens per soʻz, shown because it is the intuitive one. */
  perWord: number;
  /** Characters the tokenizer could not represent at all. */
  unknown: number;
  tokens: number;
};

export type Failed = { repo: string; reason: string };

/**
 * Score one already-loaded tokenizer against EVAL_TEXT.
 * Pure and synchronous so it can be unit-checked without the network.
 */
export function scoreTokenizer(tk: LoadedTokenizer, repo: string, reference?: string): Entry {
  const tokens = encode(EVAL_TEXT, tk);
  const st = measure(EVAL_TEXT, tokens);
  return {
    repo,
    label: tk.label,
    reference,
    vocabSize: tk.vocabSize,
    // log2 of a 1-token vocabulary is 0; guard so a broken file cannot
    // score a perfect 0 and take first place.
    bitsPerChar:
      st.chars > 0 && tk.vocabSize > 1
        ? (st.tokens * Math.log2(tk.vocabSize)) / st.chars
        : Infinity,
    perWord: st.perWord,
    unknown: st.unknown,
    tokens: st.tokens,
  };
}

/** Seeded rows so the board is meaningful before any student has entered.
 *  These are real published tokenizers, scored by the same code path as
 *  every other row — no hardcoded numbers. */
export const SEED: Array<{ repo: string; reference: string }> = [
  { repo: "IslombekT/uzbek-bpe-16k", reference: "Noldan — kursning natijasi" },
  { repo: "openai-community/gpt2", reference: "OpenAI GPT-2" },
  { repo: "bigscience/bloom-560m", reference: "BLOOM — koʻp tilli" },
  { repo: "FacebookAI/roberta-base", reference: "RoBERTa" },
];

/**
 * Ask the Hub which models carry our tag. Returns repo ids only.
 *
 * The Hub API is CORS-open, so this needs no backend and no database:
 * a student tags their model and appears here on the next page load.
 * The flip side is that the tag is public and unmoderated — see the
 * note in the page copy.
 */
export async function discoverTagged(signal?: AbortSignal): Promise<string[]> {
  try {
    const res = await fetch(
      `https://huggingface.co/api/models?filter=${HUB_TAG}&limit=100`,
      { signal }
    );
    if (!res.ok) return [];
    const json: unknown = await res.json();
    if (!Array.isArray(json)) return [];
    return json
      .map((m) => (m && typeof m === "object" && "id" in m ? String((m as { id: unknown }).id) : ""))
      .filter(Boolean);
  } catch {
    // Offline or rate-limited: the seeded rows still render.
    return [];
  }
}

/**
 * Load and score every repo, skipping the ones that are not byte-level
 * BPE. SentencePiece and WordPiece models (XLM-R, mBERT) genuinely
 * cannot be read by the course's tokenizer, so they are reported as
 * skipped rather than silently dropped.
 */
export async function buildBoard(
  repos: Array<{ repo: string; reference?: string }>,
  signal?: AbortSignal,
  onProgress?: (done: number, total: number) => void
): Promise<{ entries: Entry[]; failed: Failed[] }> {
  const entries: Entry[] = [];
  const failed: Failed[] = [];
  let done = 0;

  for (const { repo, reference } of repos) {
    try {
      const tk = await loadFromHub(repo, undefined, signal);
      entries.push(scoreTokenizer(tk, repo, reference));
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") throw e;
      failed.push({ repo, reason: e instanceof Error ? e.message : "Nomaʼlum xato" });
    }
    onProgress?.(++done, repos.length);
  }

  entries.sort((a, b) => a.bitsPerChar - b.bitsPerChar);
  return { entries, failed };
}
