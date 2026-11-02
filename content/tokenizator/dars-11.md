# Dars 11 — `decode`: raqamdan matnga

> **Kurs:** Noldan · Kurs 1 — Tokenizator qurish
> **Oldingi dars:** Dars 10 — Trening tsikli
> **Vaqt:** ~45 daqiqa
> **Kerak:** Dars 01–10. `vocab`, `merges`, `train`

---

## Bu darsdan keyin siz...

- **yozasiz** `decode` — tokenlar ro'yxatini matnga qaytaradigan funksiya;
- **ko'rasiz** to'liq round-trip ishlashini: matn → tokenlar → matn;
- **bilasiz** `b"".join()` nima uchun `+=` dan **o'nlab barobar** tez ekanini;
- **hal qilasiz** yarim belgi muammosini — `errors="replace"` bilan;
- **tiklaysiz** butun `vocab` ni faqat `merges` jadvalidan.

---

## 1. Bitta savol

Dars 10 oxirida savol qoldirgan edim:

> `dekodla([202])` nima qaytaradi?

Dars 06 dan eslang: `202` — bu `ʻ` belgisining **birinchi yarmi**. Ikkinchi yarmi — `187`.

Yolg'iz o'zi u nima?

```python
print(bytes([202]).decode("utf-8"))
```

**Natija:**

```
UnicodeDecodeError: 'utf-8' codec can't decode byte 0xca in position 0: unexpected end of data
```

**Dastur qulab tushdi.**

Xatoni o'qing: `unexpected end of data` — "ma'lumot kutilmaganda tugadi".

`202` = `11001010` (Dars 06). Boshidagi `110` — bu signal: **"men 2 baytlik belgining
boshiman, mendan keyin yana bitta bayt keladi"**.

Lekin keyin hech narsa kelmadi. Dekoder kutdi, kutdi — va xato berdi.

**Bu shunchaki qiziq holat emas.** Bu real muammo, va uni hal qilmasangiz,
tokenizatoringizni ishlatgan dastur ishonchsiz bo'ladi. Nima uchun — 6-bo'limda
ko'rasiz.

---

## 2. `decode` nima qiladi

Bizda `vocab` bor — har bir token raqami qaysi baytlarga to'g'ri kelishini
ko'rsatadigan jadval (Dars 10):

```python
for tid in [98, 202, 256, 257, 267]:
    print(f"  vocab[{tid}] = {vocab[tid]!r}")
```

**Natija:**

```
  vocab[98] = b'b'
  vocab[202] = b'\xca'
  vocab[256] = b'la'
  vocab[257] = b'lar'
  vocab[267] = b'\xca\xbb'
```

`decode` ning ishi uch qadamdan iborat:

```
[98, 111, 257]                     tokenlar
     ↓  har birini vocab dan olamiz
b'b'  b'o'  b'lar'                 baytlar
     ↓  qoʻshamiz
b'bolar'                           bitta bayt ketma-ketligi
     ↓  .decode("utf-8")
"bolar"                            matn
```

---

## 3. Birinchi versiya

```python
def decode(ids, vocab):
    baytlar = b""
    for tid in ids:
        baytlar += vocab[tid]
    return baytlar.decode("utf-8")
```

**Satr izohi:**

- `baytlar = b""` — **bo'sh bayt ketma-ketligi**. Oddiy `""` emas! `b` old
  qo'shimchasi "bu matn emas, baytlar" degani (Dars 06).
- `baytlar += vocab[tid]` — har bir tokenning baytlarini ulaymiz. `+=` baytlar
  bilan ham ishlaydi (Dars 02 dagi `+` kabi).
- `.decode("utf-8")` — baytlarni matnga aylantiramiz (Dars 06).

> ⚠️ `b""` va `""` ni aralashtirmang. `b"" + "salom"` → `TypeError`. Baytga faqat
> baytni qo'shish mumkin.

Sinaymiz:

```python
print(decode([98, 111, 257], vocab))
print(decode([256, 261], vocab))
```

```
bolar
lalar 
```

`[98, 111, 257]` = `b` + `o` + `lar` = `bolar` ✓

---

## 4. To'liq round-trip

Endi eng muhim sinov. Dars 10 da `train` bizga `tokenlar` ni qaytargan edi —
butun matnning siqilgan ko'rinishi. Uni qaytaramiz:

```python
merges, vocab, tokenlar = train(matn, 276)

qayta = decode(tokenlar, vocab)
print("tokenlar soni:", len(tokenlar))
print("round-trip:", qayta == matn)
```

**Natija:**

```
tokenlar soni: 286
round-trip: True
```

**286 ta raqamdan 480 belgilik matn to'liq tiklandi.** Bitta belgi ham
yo'qolmadi.

Bu — Dars 02 da o'rgangan round-trip tekshiruvi, endi butun tokenizator
darajasida:

```
matn → kodla → merge × 20 → decode → matn
```

Agar bu `True` bo'lmasa, tokenizatoringiz **buzuq**. Va bu tekshiruvni har safar
qilish kerak — u bir qator, lekin u hamma narsani tekshiradi.

---

## 5. `.join()` — va nima uchun u muhim

Kodimiz ishlaydi. Lekin unda **jiddiy tezlik muammosi** bor, va uni ko'rsatmoqchiman.

Avval yangi buyruq:

```python
print(b"".join([b"bo", b"la", b"lar"]))
print(" ".join(["bir", "ikki", "uch"]))
```

```
b'bolalar'
bir ikki uch
```

`ajratgich.join(roʻyxat)` — ro'yxatdagi bo'laklarni **birlashtiradi**, orasiga
ajratgichni qo'yib.

- `b"".join(...)` — bo'sh ajratgich, ya'ni shunchaki yopishtiradi. Baytlar uchun.
- `" ".join(...)` — bo'shliq bilan. Matnlar uchun.

Ikkinchi versiya:

```python
def decode_join(ids, vocab):
    qismlar = []
    for tid in ids:
        qismlar.append(vocab[tid])
    return b"".join(qismlar).decode("utf-8")
```

G'oya: avval hamma bo'lakni **ro'yxatga yig'amiz**, keyin **bir marta**
birlashtiramiz.

### Farqni o'lchaymiz

```python
import time

uzun = tokenlar * 500      # 143 000 token

t0 = time.perf_counter()
decode(uzun, vocab)
a = time.perf_counter() - t0

t0 = time.perf_counter()
decode_join(uzun, vocab)
b = time.perf_counter() - t0

print(f"+= usuli   : {a:.3f} s")
print(f"join usuli : {b:.4f} s")
print(f"farq       : {a/b:.0f} barobar")
```

**Natija:**

```
+= usuli   : 0.468 s
join usuli : 0.0123 s
farq       : 38 barobar
```

**38 barobar.** Bir xil natija, bir xil ma'lumot.

### Nima uchun bunchalik farq?

Chunki **baytlar o'zgarmas** (Dars 02 dagi matn kabi). `baytlar += yangi` deganda
Python eskisini o'zgartirmaydi — u **butunlay yangi** bayt ketma-ketligi yasaydi va
eskisining hammasini unga **ko'chiradi**.

```
1-qadam:  b"bo"                      2 bayt koʻchirildi
2-qadam:  b"bo" + b"la"  → yangi     4 bayt koʻchirildi
3-qadam:  b"bola" + b"lar" → yangi   7 bayt koʻchirildi
...
100 000-qadam:                       ~200 000 bayt koʻchirildi
```

Ya'ni oxirgi qadamlarda Python har safar butun matnni qaytadan ko'chiradi.

`join` esa bo'laklarni ro'yxatda saqlaydi (ko'chirish yo'q), oxirida jami hajmni
hisoblaydi, bir marta joy ajratadi va bir marta ko'chiradi.

<!-- animatsiya: m3 | += va join -->

**Bu shunchaki "biroz tezroq" emas — farq matn uzayishi bilan o'sib boradi:**

```
 57 200 token  →  22 barobar
143 000 token  →  38 barobar
```

Farqning o'zi ham o'sdi. 100 MB korpusda bu farq **soatlarni** anglatadi.

> **Qoida:** tsikl ichida matn yoki baytni `+=` bilan yig'manglar. Ro'yxatga
> yig'ing, oxirida `join` qiling.
>
> Bu Python'dagi eng ko'p uchraydigan tezlik xatosi.

Bundan keyin `decode` ning `join` versiyasini ishlatamiz.

---

## 6. Buzuq ketma-ketlik

Endi 1-bo'limdagi muammoga qaytamiz.

```python
print(decode([270, 202], vocab))
```

```
UnicodeDecodeError: 'utf-8' codec can't decode byte 0xca in position 2: unexpected end of data
```

`270` = `bo`, `202` = `ʻ` ning yarmi. Natija — qulash.

### Bu qachon haqiqatan sodir bo'ladi?

Uchta holatda, va uchalasi ham amaliy:

**1. Model matn yaratganda.** Til modeli tokenlarni **bittalab** chiqaradi. U
ehtimollik bo'yicha tanlaydi (Kurs 2, Dars 07) va hech narsa uni to'g'ri juftlikni
tanlashga majbur qilmaydi. Model `202` ni chiqarib, keyin `187` emas, boshqa
tokenni chiqarishi mumkin.

**2. Oqim (streaming) paytida.** ChatGPT javobni yozayotganda harflar birin-ketin
paydo bo'ladi — bu har bir yangi tokendan keyin matnni qayta dekodlash demak.
Ba'zi lahzalarda qo'lingizda **yarim belgi** bo'ladi.

**3. Matn kesilganda.** Uzun matnni bo'laklarga bo'lganingizda kesish joyi
belgining o'rtasiga tushishi mumkin.

**Uchala holatda ham dastur qulashi mumkin emas.** Foydalanuvchi chiroyli xabar
olishi kerak, `UnicodeDecodeError` emas.

---

## 7. Yechim: `errors="replace"`

```python
def decode(ids, vocab):
    qismlar = []
    for tid in ids:
        qismlar.append(vocab[tid])
    baytlar = b"".join(qismlar)
    return baytlar.decode("utf-8", errors="replace")
```

Faqat bitta parametr qo'shildi. Sinaymiz:

```python
print(repr(decode([202], vocab)))
print(repr(decode([270, 202], vocab)))
print(repr(decode([202, 187], vocab)))
print(repr(decode([111, 202, 187, 113], vocab)))
```

**Natija:**

```
'�'
'bo�'
'ʻ'
'oʻq'
```

- Yolg'iz `202` → `�`
- `bo` + yarim belgi → `bo�`
- `202` va `187` **birga** → to'g'ri `ʻ`
- To'liq `oʻq` → to'g'ri

**Dastur endi hech qachon qulamaydi.**

### `�` nima?

```python
print(ord("\ufffd"), hex(ord("\ufffd")))
```

```
65533 0xfffd
```

Bu **U+FFFD**, maxsus Unicode belgisi. Rasmiy nomi — *replacement character*,
"almashtirish belgisi". Uning yagona vazifasi: **"bu yerda nimadir bor edi, lekin
men uni o'qiy olmadim"** deyish.

Siz uni internetda ko'rgansiz — buzilgan saytlarda, eski fayllarda.
Endi bilasiz: u **xato belgisi emas**, u **xato haqidagi xabar**.

<!-- animatsiya: m1 | Yarim belgi -->

### `errors` ning boshqa qiymatlari

| Qiymat | Nima qiladi |
|---|---|
| `"strict"` | **standart** — xato bersa, qulaydi |
| `"replace"` | `�` qo'yadi va davom etadi |
| `"ignore"` | buzuq baytni **jimgina tashlab yuboradi** |

`"ignore"` ni ishlatmang. U muammoni yashiradi: matn "toza" ko'rinadi, lekin
undan bo'laklar **ovozsiz** yo'qolgan bo'ladi. `"replace"` esa muammo borligini
ko'rsatadi.

> **Umumiy qoida:** xatoni yashirmang — uni **ko'rinadigan** qiling.

---

## 8. Oqimni ko'ramiz

Endi eng qiziq demo. Modelning matn yozishini taqlid qilamiz: tokenlarni
bittalab qo'shib, har safar dekodlaymiz.

```python
baytlar = kodla("oʻzbek")
print(baytlar)

yigilgan = []
for tid in baytlar:
    yigilgan.append(tid)
    print(f"  {tid:4d} -> {decode(yigilgan, vocab)!r}")
```

**Natija:**

```
[111, 202, 187, 122, 98, 101, 107]
   111 -> 'o'
   202 -> 'o�'
   187 -> 'oʻ'
   122 -> 'oʻz'
    98 -> 'oʻzb'
   101 -> 'oʻzbe'
   107 -> 'oʻzbek'
```

**Ikkinchi va uchinchi qatorga qarang.**

```
202 -> 'o�'      ← yarim belgi, ekranda � koʻrinadi
187 -> 'oʻ'      ← juftlik toʻldi, belgi tiklandi
```

Bir lahza uchun ekranda `�` turadi, keyin u `ʻ` ga aylanadi.

**Bu — haqiqiy hodisa.** Agar siz ChatGPT ga o'zbekcha savol berib, javobni
diqqat bilan kuzatsangiz, ba'zan `ʻ` o'rnida bir lahza `�` yonib o'tishini
ko'rishingiz mumkin. Endi nima uchun ekanini bilasiz.

Va `errors="replace"` bo'lmasa — bu joyda butun dastur **qulab tushardi**.

<!-- animatsiya: m2 | Oqim -->

---

## 9. `vocab` ni `merges` dan tiklash

Oxirgi muhim narsa. Dars 10 da aytgan edim: **`merges` — butun tokenizator.**
Buni endi isbotlaymiz.

Faylga saqlanadigan narsa — `merges`. `vocab` esa undan **qayta hisoblanadi**:

```python
def vocab_qur(merges):
    vocab = {}
    for i in range(256):
        vocab[i] = bytes([i])

    for juftlik, tid in merges.items():
        vocab[tid] = vocab[juftlik[0]] + vocab[juftlik[1]]

    return vocab
```

Tekshiramiz:

```python
v2 = vocab_qur(merges)
print("teng:", v2 == vocab)
print("v2[257] =", v2[257])
print("v2[275] =", v2[275])
```

**Natija:**

```
teng: True
v2[257] = b'lar'
v2[275] = b'lalar '
```

**Aynan bir xil.**

### Nima uchun bu ishlaydi?

Chunki Python lug'ati **qo'shilish tartibini saqlaydi**. `merges` ga qatorlar
Dars 10 dagi tsiklda tartib bilan qo'shilgan edi — 256, 257, 258...

Demak `for juftlik, tid in merges.items()` ham **o'sha tartibda** yuradi. Va
`vocab[257] = vocab[256] + vocab[114]` hisoblanganda, `vocab[256]` allaqachon
mavjud bo'ladi.

**Bu — Dars 10 dagi "tartib zanjir" g'oyasining amaliy natijasi.** Agar
`merges` tartibsiz bo'lganida, bu funksiya `KeyError` bilan qulardi.

Va amaliy foyda: faylga faqat `merges` ni yozasiz (Dars 18). `vocab` — hosila,
uni saqlash shart emas.

---

## 10. Muammo

Yarim tokenizator tayyor:

- ✓ `decode` — tokenlardan matnga
- ✗ `encode` — **yangi** matndan tokenlarga

Diqqat: `train` matnni kodladi, lekin **faqat o'z matnini**. Yangi jumla
bersangiz — uni qayta ishlash kerak.

Va bu ko'rinishdan qiyinroq. Yangi matnni baytlarga aylantirish oson
(`kodla`). Lekin keyin `merges` jadvalidagi birlashtirishlarni **qaysi
tartibda** qo'llash kerak?

Dars 10 dagi zanjir esingizdami? `257 = (256, 114)`. Demak `257` ni yasashdan
oldin `256` yasalgan bo'lishi shart.

Agar tartibni noto'g'ri qo'llasangiz — natija noto'g'ri tokenlar bo'ladi,
va model ularni tanimaydi.

Keyingi dars aynan shu haqda.

---

## 11. To'liq kod

```python
def decode(ids, vocab):
    qismlar = []
    for tid in ids:
        qismlar.append(vocab[tid])
    baytlar = b"".join(qismlar)
    return baytlar.decode("utf-8", errors="replace")


def vocab_qur(merges):
    vocab = {}
    for i in range(256):
        vocab[i] = bytes([i])
    for juftlik, tid in merges.items():
        vocab[tid] = vocab[juftlik[0]] + vocab[juftlik[1]]
    return vocab


# ---- Sinov ----
merges, vocab, tokenlar = train(matn, 276)

# 1. Round-trip
qayta = decode(tokenlar, vocab)
print("tokenlar:", len(tokenlar), "| round-trip:", qayta == matn)

# 2. Buzuq ketma-ketlik qulamaydi
print(repr(decode([202], vocab)))
print(repr(decode([270, 202], vocab)))
print(repr(decode([202, 187], vocab)))

# 3. Oqim
yigilgan = []
for tid in kodla("oʻzbek"):
    yigilgan.append(tid)
    print(f"  {tid:4d} -> {decode(yigilgan, vocab)!r}")

# 4. vocab ni merges dan tiklash
print("tiklandi:", vocab_qur(merges) == vocab)
```

**Kutilgan natija:**

```
tokenlar: 286 | round-trip: True
'�'
'bo�'
'ʻ'
   111 -> 'o'
   202 -> 'o�'
   187 -> 'oʻ'
   122 -> 'oʻz'
    98 -> 'oʻzb'
   101 -> 'oʻzbe'
   107 -> 'oʻzbek'
tiklandi: True
```

---

## 12. O'zingiz yozing

```python
def decode(ids, vocab):
    qismlar = ___                       # boʻsh roʻyxat
    for tid in ids:
        qismlar.append(vocab[___])      # tokenning baytlari
    baytlar = ___.join(qismlar)         # bayt ajratgich
    return baytlar.decode("utf-8", ___="replace")


# Sinov — bu natijalarni olishingiz kerak:
print(decode([98, 111, 257], vocab))    # bolar
print(repr(decode([202], vocab)))       # '�'
```

<details>
<summary>Yechimni ko'rsatish</summary>

```python
def decode(ids, vocab):
    qismlar = []
    for tid in ids:
        qismlar.append(vocab[tid])
    baytlar = b"".join(qismlar)
    return baytlar.decode("utf-8", errors="replace")
```

Ikkita eng ko'p xato:

1. `"".join(...)` — `b` unutilgan. Natija: `TypeError: sequence item 0:
   expected str instance, bytes found`. Bo'sh **matn** bilan **baytlarni**
   birlashtirib bo'lmaydi.
2. `errors="replace"` ni tashlab ketish. Kod ishlaydi — to'g'ri ma'lumotda.
   Keyin bir kun model yarim belgi chiqaradi va hamma narsa to'xtaydi.
</details>

---

## 13. Mashqlar

---

**Mashq 1.** `decode([], vocab)` nima qaytaradi?

<details>
<summary>Javobni ko'rsatish</summary>

```python
print(repr(decode([], vocab)))    # ''
```

Bo'sh matn.

`qismlar` bo'sh ro'yxat bo'lib qoladi, `b"".join([])` → `b""`,
`b"".decode()` → `""`.

Hech qanday `if len(ids) == 0` tekshiruvi kerak emas — Dars 08 va 09 dagi kabi,
yaxshi yozilgan kod chekka holatni o'zi hal qiladi.
</details>

---

**Mashq 2.** Bu ikkisining farqi nima?

```python
a = decode([202, 187], vocab)
b = decode([267], vocab)
```

<details>
<summary>Javobni ko'rsatish</summary>

```python
print(repr(a), repr(b), a == b)    # 'ʻ' 'ʻ' True
```

**Bir xil matn, ikki xil yo'l.**

- `[202, 187]` — ikkita bayt-token, dekodlashda birlashib `ʻ` beradi
- `[267]` — bitta BPE token, uning ichida allaqachon ikkala bayt bor

`decode` uchun farq yo'q — u baytlarni yig'ib, keyin bir marta dekodlaydi.

**Lekin model uchun farq katta:** birinchisi 2 token, ikkinchisi 1 token.
Aynan shu farq `fertility` ni tashkil qiladi.
</details>

---

**Mashq 3.** Nima uchun bu xato beradi?

```python
print(decode([99999], vocab))
```

<details>
<summary>Javobni ko'rsatish</summary>

```
KeyError: 99999
```

`vocab` da bunday kalit yo'q — bizning lug'atimizda 0 dan 275 gacha tokenlar
bor.

Bu qachon sodir bo'ladi? Agar:
- model boshqa lug'at bilan o'qitilgan bo'lsa
- token ro'yxati boshqa tokenizatordan kelgan bo'lsa
- kodda xato bo'lsa

**Bu yerda `errors="replace"` yordam bermaydi** — u faqat UTF-8 dekodlash
xatosini hal qiladi, `vocab` dagi yo'q kalitni emas.

Haqiqiy tokenizatorlar bunday holat uchun tekshiruv qo'shadi. Dars 18 da
klassni yozganingizda buni qo'shishingiz mumkin.
</details>

---

**Mashq 4.** `errors="ignore"` bilan sinab ko'ring va nima uchun u yomonroq
ekanini ayting.

```python
print(repr(bytes([98, 111, 202]).decode("utf-8", errors="ignore")))
print(repr(bytes([98, 111, 202]).decode("utf-8", errors="replace")))
```

<details>
<summary>Javobni ko'rsatish</summary>

```
'bo'
'bo�'
```

`"ignore"` buzuq baytni **jimgina o'chirib tashladi**. Natija toza ko'rinadi —
`'bo'` — va hech kim u yerda nimadir yo'qolganini bilmaydi.

`"replace"` esa `�` qoldirdi: **"bu yerda muammo bor"**.

Nima uchun bu muhim: tasavvur qiling, siz 100 MB korpusni tozalayapsiz va
`"ignore"` ishlatdingiz. Fayl "toza" chiqadi. Lekin undan minglab belgi
ovozsiz yo'qolgan bo'ladi, va siz buni **hech qachon bilmaysiz**.

`"replace"` bilan esa `�` larni sanab, muammo qanchalik katta ekanini
o'lchay olasiz:

```python
print(matn.count("\ufffd"))
```

**Dars 15 da korpusni tozalaganingizda aynan shunday qilasiz.**
</details>

---

**Mashq 5 (eng muhimi).** `merges` ni **teskari tartibda** aylanib `vocab` qurishga
urining. Nima bo'ladi va nima uchun?

<details>
<summary>Javobni ko'rsatish</summary>

```python
def vocab_qur_teskari(merges):
    vocab = {}
    for i in range(256):
        vocab[i] = bytes([i])
    juftliklar = list(merges.items())
    i = len(juftliklar) - 1
    while i >= 0:
        juftlik, tid = juftliklar[i]
        vocab[tid] = vocab[juftlik[0]] + vocab[juftlik[1]]
        i -= 1
    return vocab


vocab_qur_teskari(merges)
```

```
KeyError: 256
```

Teskari tartibda birinchi bo'lib `275 = (256, 261)` hisoblanadi. Lekin
`vocab[256]` hali mavjud emas — u eng oxirida hisoblanardi.

**Bu Dars 10 dagi minora tajribasining kod ko'rinishi.** Pastdagi g'ishtni
olib tashlasangiz, ustidagi hammasi qulaydi.

Amaliy xulosa: `merges` ni faylga saqlaganingizda **tartibni saqlash shart**.
Agar uni tartibsiz formatda (masalan oddiy JSON obyekti sifatida, tartib
kafolatisiz) saqlasangiz, yuklashda tokenizator buziladi.

Dars 18 da saqlash formatini tanlaganingizda buni yodda tuting.
</details>

---

## 14. Xulosa

1. `decode` uch qadam: `vocab` dan baytlarni ol → birlashtir → `.decode("utf-8")`.
2. **Round-trip** — `decode(tokenlar) == matn` — tokenizatorning asosiy sinovi.
   Bir qator, hamma narsani tekshiradi.
3. `b"".join(roʻyxat)` — `+=` dan **o'nlab barobar** tez, va farq matn uzayishi
   bilan **o'sib boradi**. Tsikl ichida `+=` bilan yig'manglar.
4. Yarim belgi real muammo: model generatsiyasi, oqim, matn kesish.
5. `errors="replace"` dasturning qulashini oldini oladi va `�` (U+FFFD) qoldiradi.
6. `errors="ignore"` ishlatmang — u muammoni **yashiradi**.
7. `vocab` ni `merges` dan to'liq tiklash mumkin, chunki `merges` tartib saqlaydi.

---

## Keyingi dars

`decode` tayyor. Endi teskarisi.

**Dars 12 — `encode`.** Yangi matnni tokenlarga aylantirish. Bu `decode` dan
ancha qiyinroq, chunki birlashtirishlarni **to'g'ri tartibda** qo'llash kerak.

Keyingi darsning savoli: *matnda `(108, 97)` va `(256, 114)` juftliklari bor.
Qaysi birini birinchi birlashtirasiz — va nima uchun bu muhim?*
