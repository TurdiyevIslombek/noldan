/* --------------------------------------------------------------------
   A real byte-level byte-pair encoder.

   This is not a simulation for the page. It trains actual merges over a
   corpus and encodes arbitrary input with them, which is the whole point
   of showing it: a reader can type Uzbek and watch where the boundaries
   land. It is the same algorithm the Tokenizator course walks through,
   written small enough to run in a browser on every keystroke.

   Two decisions worth keeping if you edit this:

   1. The corpus is varied rather than one block repeated. A repeated
      block lets BPE merge whole paragraphs into single tokens, which
      produces spectacular and completely meaningless compression.
   2. The compression curve is measured on PROBE, which does NOT appear
      in the corpus. Measuring compression on your own training data is
      how you end up quoting a number that means nothing.
   3. The text keeps its oʻ and gʻ. Those are U+02BB, two bytes each in
      UTF-8, and watching the encoder handle them is half the point of a
      BYTE-level demo — stripping them to plain o and g would hide the
      exact thing this page is teaching.

   SOURCE: real human-written Uzbek, sampled from the Uzbek Corpus Sample
   (https://github.com/elmurod1202/Uzbek-Corpus-Sample), CC BY 4.0. Lines
   were hand-picked for register and normalised from U+2018 to U+02BB so
   the orthography matches the rest of the site; otherwise verbatim.
   -------------------------------------------------------------------- */

export const DEMO_CORPUS = `
Oʻqituvchi kirib kelganida gapirishni toʻxtating.
Ogʻzaki nutq kundalik suhbatda qoʻllaniladi.
Buni oddiy soʻzlar bilan tushuntiring.
Bu soʻz nimani anglatishini bilmayman.
Bu soʻz oxirgi boʻgʻinga urgʻu berilgan.
Gap oxirida nuqta qoʻyish kerak.
U ingliz tilidagi qoʻshiqlarni oʻrganmoqchi.
U bor kuchini ispan tilini oʻrganishga bagʻishladi.
Ingliz tili butun mamlakat boʻylab tarqaldi.
Men ibroniy tilida koʻp soʻzlarni bilmayman.
Oʻtgan yil davomida sizdan koʻp narsani oʻrgandim.
Biz har oyda kamida bitta kitob oʻqishimiz kerak.
Maktabda oʻqib yurgan paytlarim ham astoydil oʻqiganman.
Sinfingizga yetib olish uchun siz qattiq oʻrganishingiz kerak.
Odatdagidek fizika oʻqituvchisi darsga kechikib qoldi.
Talabalaringizni koʻproq oʻylaydigan kitoblarni oʻqing.
Yigirma nafar talabadan faqat bittasi kitobni oʻqigan.
Ushbu kutubxonada juda koʻp kitoblar mavjud.
Uning kitoblari mendan ikki barobar koʻp.
Ular tarix kitoblariga koʻchib oʻtishgan.
Men kitoblarni yuklab olishni yaxshi koʻraman.
Kitob doʻkoni ham kech yopilganga oʻxshaydi.
Oʻtgan yakshanbani roman oʻqish bilan oʻtkazdim.
Men bu romanni oʻqishdan zavq oldim.
Har kuni hech kim oʻqimaydigan narsalarni oʻqing.
U gazeta oʻqishni yaxshi koʻradi.
Bu haqda u oʻz kundaligida yozgan.
Biz kelajak uchun oʻtmishni oʻrganamiz.
Dadam meni pianino chalishni oʻrganishga undagan.
Otam nihoyat ellik yoshida mashina haydashni oʻrgandi.
Men maktabdan keyin tennis oʻynamayman.
Oʻrmonda koʻplab baland daraxtlar va turli xil oʻtlar bor.
Gullar orasida koʻplab begona oʻtlar oʻsib chiqdi.
Qalin tuman tufayli yoʻlni koʻrish qiyin edi.
Bu xonada koʻp quyosh nuri tushmaydi.
Nihoyat togʻ choʻqqisiga yetib keldik.
Bahorda hamma yer goʻzal koʻrinadi.
Mening uyim yonidan kichik bir oqim oqib oʻtadi.
Biz osmonda minglab yulduzlarni koʻrishimiz mumkin.
Yozda terlaganda koʻp suv ichish kerak.
Men gullarni sugʻorishim shart emas edi.
Otam yakshanba kunlari bogʻlar quradi.
Men sohilda oʻtirishni yaxshi koʻraman.
Men plyajda koʻplab sayyohlarni koʻrdim.
Men hozir tulkining yoʻldan oʻtib ketayotganini koʻrdim.
Koʻrshapalaklar kalamush kabi qush emas.
Bobom erta tongda sayr qilishni yaxshi koʻradi.
Stansiya shu ikki shahar oʻrtasida joylashgan.
Orol iqtisodiyoti baliqchilik sanoatiga bogʻliq.
Doʻst tanlashda ehtiyot boʻlish kerak.
Koʻpchilik doʻstlari kabi u juda koʻp sayohat qilgan.
Men sayohat qilishni yaxshi koʻraman.
Menga yordam beradigan doʻstlarim koʻp.
Doʻstlarim mening tugʻilgan kunimni nishonlashdi.
Bir kuni men eski doʻstimga tashrif buyurdim.
Biz amakivachchamni tugʻilgan kuni bilan ajablantirdik.
Tez orada koʻplab tugʻilgan kun kartalari keladi.
Men uni oʻgʻli tugʻilishi bilan tabrikladim.
Dadam kulgili narsalarni aytishni yaxshi koʻradi.
U menga boshqalarga mehribon boʻlishni aytdi.
Jiyanim kech oʻtirishga odatlangan edi.
Akam rasmni teskari osib qoʻydi.
Uning xonasida juda koʻp mebel bor.
Men xonamdagi mebellarning tartibini oʻzgartirdim.
Bir nechta xonalar hali ham boʻsh edi.
Bu xona ellik kishini sigʻdira oladi.
Men har kuni televizor koʻraman.
Men musiqa tinglashni yaxshi koʻraman.
Bu xalq qoʻshiqlarining hammasi menga yoqmaydi.
Men uning qoʻshiq aytishini hech qachon eshitmaganman.
Bu qoʻshiq men bir necha daqiqa oldin eshitganimga oʻxshaydi.
Idishdagi shoʻrva juda mazali edi.
Menga nondan koʻra guruch koʻproq yoqadi.
U kartoshka salatini yaxshi koʻradi.
Uygʻurlarning oshxonasida har xil taomlar mavjud.
Tovuqlarim oʻtgan yili kamroq tuxum qoʻydi.
Men engilroq rangni afzal koʻraman.
U shlyapa oldi va qanday koʻrinishini koʻrish uchun uni kiydi.
Ular oʻsha doʻkonda poyabzal va kiyimlar bilan shugʻullanadilar.
Koʻcha odamlar bilan gavjum edi.
Menga avtobus bekatiga boradigan yoʻlni koʻrsating.
Yoʻlni kesib oʻtayotganda ehtiyot boʻlishingiz kerak.
U odatdagi avtobusini oʻtkazib yuborgan boʻlishi mumkin.
Ertaga menga qoʻngʻiroq qilishni unutmang.
Men uni telefon bilan bogʻlay olmadim.
U belgilangan vaqtdan bir soat oʻtib keldi.
Men bu hafta juda koʻp ishladim.
Ishni toʻxtatish unga qiyin edi.
U oʻz biznesini yoʻlga qoʻymoqchi.
Men oʻzimga real maqsadlar qoʻydim.
Har kimning maqsadi boʻlishi kerak.
Kelgusi yili u oʻn yetti yoshga toʻladi.
Oʻzingizni onangizning oʻrniga qoʻyishga harakat qiling.
Hikoyada bundan ham koʻproq narsa boʻlishi kerak.
Men buni sinab koʻrishga arziydi deb oʻyladim.
U oʻyinda gʻalaba qozonishi mumkin.
Biz qoidalar boʻyicha oʻynashimiz kerak.
Yomgʻir tufayli beysbol oʻyini toʻxtatildi.
Oynani ochganimda beysbol oʻynayotgan bolalarni koʻrdim.
U unga qanday qilib sogʻlom boʻlishni maslahat beradi.
Faqat erkin odamlar baxtli boʻlishi mumkin.
Ikki davlat oʻrtasidagi savdo murakkab boʻlishi mumkin.
Uning sevimli mashgʻulotlaridan biri futbolkalarni yigʻishdir.
Men shunchaki nima boʻlishini koʻrmoqchi edim.
Men birga koʻproq vaqt oʻtkazishimizni istardim.
Siz qor toʻxtaguncha shu yerda qolishingiz mumkin.
U odatdagidan koʻproq ishlagani uchun charchaganini his qildi.
Narxlar oʻn yil avvalgidan ikki baravar koʻp.
`;

/** Held-out probe. Real Uzbek from the same source, deliberately kept
 *  out of the corpus above so the compression figure means something. */
export const PROBE = "Men qadimgi tillarni oʻrganishni yaxshi koʻraman.";

const PAIR_SEP = ",";

export type BpeModel = {
  /** "a,b" -> id of the merged token. Insertion order is merge order. */
  ranks: Map<string, number>;
  /** token id -> the raw bytes it expands to */
  vocab: Map<number, number[]>;
  vocabSize: number;
  mergeCount: number;
  /**
   * Measured compression on held-out text: how many tokens PROBE needs
   * after N merges. Sampled during training against data the tokenizer
   * has never seen, so the numbers mean something.
   */
  curve: Array<{ merges: number; tokens: number }>;
  /** PROBE's length in bytes — the curve's starting point. */
  probeBytes: number;
  probeText: string;
};

export type Token = {
  id: number;
  text: string;
  bytes: number[];
};

function toBytes(text: string): number[] {
  return Array.from(new TextEncoder().encode(text));
}

function countPairs(ids: number[], into: Map<string, number>): Map<string, number> {
  into.clear();
  for (let i = 0; i < ids.length - 1; i++) {
    const key = ids[i] + PAIR_SEP + ids[i + 1];
    into.set(key, (into.get(key) ?? 0) + 1);
  }
  return into;
}

function mergeOnce(ids: number[], a: number, b: number, newId: number): number[] {
  const out: number[] = [];
  let i = 0;
  while (i < ids.length) {
    if (i < ids.length - 1 && ids[i] === a && ids[i + 1] === b) {
      out.push(newId);
      i += 2;
    } else {
      out.push(ids[i]);
      i += 1;
    }
  }
  return out;
}

/** Apply a rank table to bytes. Shared by encode() and the curve probe. */
function applyRanks(bytes: number[], ranks: Map<string, number>): number[] {
  let ids = bytes.slice();
  while (ids.length >= 2) {
    let bestKey: string | null = null;
    let bestId = Infinity;

    for (let i = 0; i < ids.length - 1; i++) {
      const key = ids[i] + PAIR_SEP + ids[i + 1];
      const id = ranks.get(key);
      if (id !== undefined && id < bestId) {
        bestId = id;
        bestKey = key;
      }
    }
    if (bestKey === null) break;

    const sep = bestKey.indexOf(PAIR_SEP);
    ids = mergeOnce(
      ids,
      Number(bestKey.slice(0, sep)),
      Number(bestKey.slice(sep + 1)),
      bestId
    );
  }
  return ids;
}

/**
 * Train merges over `text` until the vocabulary reaches `vocabSize`.
 * Byte-level: the base vocabulary is always the 256 byte values, so no
 * word list, no language rules, and nothing is ever out-of-vocabulary.
 */
export function trainBPE(
  text: string,
  vocabSize: number,
  probe: string = PROBE
): BpeModel {
  const ranks = new Map<string, number>();
  const vocab = new Map<number, number[]>();
  for (let i = 0; i < 256; i++) vocab.set(i, [i]);

  let ids = toBytes(text);
  const probeBytes = toBytes(probe);
  const target = Math.max(0, vocabSize - 256);
  const counter = new Map<string, number>();

  const curve: Array<{ merges: number; tokens: number }> = [
    { merges: 0, tokens: probeBytes.length },
  ];
  const sampleEvery = Math.max(1, Math.floor(target / 40));

  let merges = 0;
  for (let step = 0; step < target; step++) {
    countPairs(ids, counter);
    if (counter.size === 0) break;

    let bestKey = "";
    let bestCount = 0;
    for (const [key, count] of counter) {
      if (count > bestCount) {
        bestCount = count;
        bestKey = key;
      }
    }
    // Nothing repeats any more; the corpus is exhausted.
    if (bestCount < 2) break;

    const sep = bestKey.indexOf(PAIR_SEP);
    const a = Number(bestKey.slice(0, sep));
    const b = Number(bestKey.slice(sep + 1));
    const newId = 256 + step;

    ids = mergeOnce(ids, a, b, newId);
    ranks.set(bestKey, newId);
    vocab.set(newId, [...(vocab.get(a) ?? []), ...(vocab.get(b) ?? [])]);
    merges++;

    if (merges % sampleEvery === 0) {
      curve.push({ merges, tokens: applyRanks(probeBytes, ranks).length });
    }
  }

  if (curve[curve.length - 1]?.merges !== merges) {
    curve.push({ merges, tokens: applyRanks(probeBytes, ranks).length });
  }

  return {
    ranks,
    vocab,
    vocabSize: 256 + merges,
    mergeCount: merges,
    curve,
    probeBytes: probeBytes.length,
    probeText: probe,
  };
}

const decoder = new TextDecoder("utf-8", { fatal: false });

function decodeBytes(bytes: number[]): string {
  return decoder.decode(new Uint8Array(bytes));
}

/**
 * Encode text with a trained model. Merges are applied lowest-id first,
 * which reproduces the order they were learned in — the detail that most
 * hand-rolled implementations get wrong.
 */
export function encode(text: string, model: BpeModel): Token[] {
  const bytes = toBytes(text);
  if (bytes.length === 0) return [];

  return applyRanks(bytes, model.ranks).map((id) => {
    const b = model.vocab.get(id) ?? [id];
    return { id, text: decodeBytes(b), bytes: b };
  });
}
