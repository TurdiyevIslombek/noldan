/* --------------------------------------------------------------------
   A real byte-level byte-pair encoder.

   This is not a simulation for the page. It trains actual merges over a
   corpus and encodes arbitrary input with them, which is the whole point
   of showing it: a reader can type Uzbek and watch where the boundaries
   land. It is the same algorithm module 01 walks through, written small
   enough to run in a browser on every keystroke.

   Two decisions worth keeping if you edit this:

   1. The corpus is varied rather than one block repeated. A repeated
      block lets BPE merge whole paragraphs into single tokens, which
      produces spectacular and completely meaningless compression.
   2. The compression curve is measured on PROBE, which does NOT appear
      in the corpus. Measuring compression on your own training data is
      how you end up quoting a number that means nothing.

   AUTHOR NOTE: DEMO_CORPUS is placeholder Uzbek written to exercise the
   algorithm, not vetted prose — replace it with a real slice of your
   training data and both the demo and the curve get sharper. Same for
   PROBE.
   -------------------------------------------------------------------- */

export const DEMO_CORPUS = `
noldan boshlaymiz va modelni ozimiz quramiz
til modeli sozlarni emas baytlarni oqiydi
har bir belgi son bolib ifodalanadi
tokenizator matnni bolaklarga ajratadi
eng kop uchraydigan juftlik birlashtiriladi
bu jarayon lugat toldirilguncha davom etadi
model ozbek tilida yozilgan matnlarni organadi
har bir qadam kodda yoziladi va tekshiriladi
kod ishlaydi natija ekranda korinadi
biz tayyor apidan foydalanmaymiz
sozlar bolaklarga ajraladi keyin sonlarga aylanadi
sonlar modelga kiradi va vazn yangilanadi
model keyingi belgini bashorat qiladi
oqitish sekin boradi lekin natija aniq boladi
kichik model ham yaxshi ishlashi mumkin
lugat hajmi juda katta bolsa xotira yetmaydi
lugat hajmi kichik bolsa matn uzun boladi
qoshimchalar sozga ulanadi va yangi shakl hosil qiladi
ozbek tilida qoshimchalar kop uchraydi
shuning uchun tokenizator alohida tayyorlanadi
matn tayyorlash eng muhim bosqich hisoblanadi
sifatli matn sifatli model beradi
xato kod jim turmaydi darrov korinadi
har bir satr tushunarli bolishi kerak
oddiy kod murakkab koddan yaxshiroq
tajriba qilish orqali organiladi
kutubxona emas algoritm organiladi
diqqat mexanizmi belgilar orasidagi boglanishni topadi
model kontekstni hisobga oladi
yozilgan kod qayta ishlatiladi
natijalar solishtiriladi va tanlanadi
`;

/** Held-out probe. Deliberately absent from the corpus above. */
export const PROBE = "ozbek tilida model qurish uchun kod yozamiz";

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
