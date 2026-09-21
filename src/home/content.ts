/* ====================================================================
   One source of truth for every landing-page direction.

   Each version below dresses these facts differently, but none of them
   invents a number. Anything shown as a measurement is either published
   on Hugging Face or computed live in the visitor's browser.
   ==================================================================== */

export const HF_USER = "https://huggingface.co/IslombekT";

export const ARTIFACTS = [
  {
    name: "uzbek-gpt-103m",
    href: "https://huggingface.co/IslombekT/uzbek-gpt-103m",
    kind: "model",
    specs: [
      ["Parametr", "103M"],
      ["Korpus", "FineWeb-2"],
      ["Litsenziya", "Apache-2.0"],
    ] as const,
  },
  {
    name: "uzbek-bpe-16k",
    href: "https://huggingface.co/IslombekT/uzbek-bpe-16k",
    kind: "tokenizer",
    specs: [
      ["Lugʻat", "16 000"],
      ["Usul", "Bayt darajasidagi BPE"],
      ["Litsenziya", "Apache-2.0"],
    ] as const,
  },
] as const;

export const FACTS = {
  params: 103,
  cost: 3.6,
  vocab: 16000,
  lessons: 27,
  lessonsReady: 18,
  courses: 2,
};

/** Vocabulary ceiling for the in-page demo. Small enough to train on a
 *  cold load in a few hundred ms; the published tokenizer uses 16 000. */
export const DEMO_VOCAB = 700;

/** Multi-byte on purpose: `oʻ` is one letter and two bytes, which is
 *  where a character-level tokenizer starts lying about Uzbek. */
export const HEXDUMP_WORD = "oʻrganamiz";

export const CHAPTERS = [
  {
    id: "bytes",
    num: "00",
    name: "Baytlar",
    title: "Model soʻzlarni hech qachon koʻrmaydi.",
    body: "U baytlarni koʻradi. Diqqat mexanizmidan ham, vaznlardan ham oldin matn 0 dan 255 gacha boʻlgan butun sonlar ketma-ketligi. Oʻzbekcha, inglizcha, tinish belgilari va emoji bir xil yoʻldan keladi. Hech narsa lugʻatdan tashqarida qolmaydi, chunki hali lugʻatning oʻzi yoʻq.",
  },
  {
    id: "tokens",
    num: "01",
    name: "Tokenlar",
    title: "Takrorlanadigan juftlikni toping. Birlashtiring. Yana takrorlang.",
    body: "Butun byte-pair encoding shu bitta qoidada. Har bir yonma-yon juftlikni sanang, eng koʻp uchraganini yangi belgiga birlashtiring, bir necha ming marta takrorlang. Quyidagi tokenizator koʻrgazma emas: bu sahifa ochilganda haqiqiy oʻzbekcha matnda oʻqidi.",
  },
  {
    id: "vocabulary",
    num: "02",
    name: "Lugʻat",
    title: "Lugʻat hajmi — sozlama emas, byudjet.",
    body: "Har bir birlashma ketma-ketlikni qisqartiradi, lekin embedding parametrlarini talab qiladi. Kam boʻlsa, model kontekstini boʻlaklarga sarflaydi; koʻp boʻlsa, jadvalning katta qismi gradient hech qachon tegmaydigan oʻlik yukka aylanadi. Bitta oʻzakka qoʻshimchalar ketma-ket ulanadigan tilda bu tanlov ingliz tilidagidan keskinroq.",
  },
  {
    id: "training",
    num: "03",
    name: "Oʻqitish",
    title: "Sikl siz oʻylagandan kichik.",
    body: "Oldinga yurish, yoʻqotish, orqaga yurish, qadam. Qolgani — logistika: partiyalash, nazorat nuqtalari, oʻqish tezligi jadvali va yoʻqotish egri chizigʻini umid bilan emas, halol oʻqish intizomi. Sizga klaster kerak emas. Sizga siklning toʻgʻri boʻlishi kerak.",
  },
  {
    id: "model",
    num: "04",
    name: "Model",
    title: "Yakunda nashr qilsa boʻladigan vaznlar qoladi.",
    body: "API chaqiruvlariga toʻla daftar emas. Oʻzingizga tegishli tokenizator va oʻqitilgan parametrlar — internetsiz ishlaydi, istagan odam yuklab oladi. Quyidagi ikkala artefakt ham xuddi shu yoʻldan chiqqan.",
  },
] as const;

export const FIT = {
  yes: {
    head: "Bu sizga mos, agar",
    items: [
      "Kod yozishni noldan oʻrganmoqchi boʻlsangiz.",
      "Modelning ichida nima boʻlayotganini bilmoqchi boʻlsangiz.",
      "Natija chiqmaganda xatoni ikki kun qidirishga tayyor boʻlsangiz.",
    ],
  },
  no: {
    head: "Bu sizga mos emas, agar",
    items: [
      "Shu hafta chatbot chiqarmoqchi boʻlsangiz.",
      "Prompt muhandisligi darslarini izlayotgan boʻlsangiz.",
      "Matematikani chetlab oʻtmoqchi boʻlsangiz.",
    ],
  },
} as const;

/** The first merges a byte-level BPE learns on Uzbek text, read straight
 *  off the trained rank table. Used by several versions as a real table. */
export function firstMerges(
  model: { ranks: Map<string, number>; vocab: Map<number, number[]> },
  count: number
) {
  const dec = new TextDecoder("utf-8", { fatal: false });
  const out: Array<{ rank: number; id: number; text: string; bytes: number }> = [];
  let rank = 1;
  for (const [, id] of model.ranks) {
    const bytes = model.vocab.get(id) ?? [];
    const text = dec.decode(new Uint8Array(bytes));
    // Skip merges that do not land on a printable piece — mid-sequence
    // byte pairs are real but unreadable, and a table of tofu teaches
    // nothing.
    if (text && !text.includes("�")) {
      out.push({ rank, id, text, bytes: bytes.length });
    }
    rank++;
    if (out.length >= count) break;
  }
  return out;
}
