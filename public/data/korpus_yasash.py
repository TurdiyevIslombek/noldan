# -*- coding: utf-8 -*-
# Dars 15 uchun oʻquv korpusi.
# Bu matnlar oʻquv uchun toʻqilgan. Ulardagi muammolar esa haqiqiy:
# internet matnida (va FineWeb-2 ning oʻzida) uchraydigan narsalar.
import json

ULASHISH = "Ulashish: Telegram | Facebook | X"
HUQUQ = "Barcha huquqlar himoyalangan."
COOKIE = "We use cookies to improve your experience."
ENSIKLOPEDIYA = "Ushbu maqolani yozishda Oʻzbekiston milliy ensiklopediyasi (2000-2005) maʼlumotlaridan foydalanilgan."

# --- bitta yangilik, bir necha saytda ---
METRO_SARLAVHA = "Metroda yangi bekat yoʻlovchilarni kutmoqda"
METRO = ("Toshkent metropolitenining halqa yoʻnalishida yangi bekat yoʻlovchilarni qabul qila boshladi. "
         "Bekat zamonaviy uslubda qurilgan, unda lift va eskalatorlar bor. "
         "Metropoliten maʼlumotiga koʻra, bekat har kuni ertalab soat beshdan tungi yarim birgacha ishlaydi. "
         "Yoʻl haqi oʻzgarmadi. "
         "Yangi bekat yonidagi avtobus bekatlari ham koʻchiriladi, shuning uchun yoʻlovchilarga xaritani oldindan koʻrib chiqish tavsiya etiladi.")

def belgi_bilan(matn, okina, tutuq):
    return matn.replace("ʻ", okina).replace("ʼ", tutuq)

ob_havo = ("Ertaga ob-havo qanday boʻladi\n"
           "Ertaga poytaxtda havo bulutli boʻladi, kunduzi yengil yomgʻir yogʻishi kutilmoqda. "
           "Havo harorati kunduzi 18-20 daraja, kechasi 9-11 daraja iliq boʻladi. "
           "Shamol shimoli-gʻarbdan sekundiga 5-8 metr tezlikda esadi. "
           "Mutaxassislar haydovchilarni ehtiyot boʻlishga chaqirmoqda.")

kutubxona = ("Kutubxonada yangi o’quv zali ochildi\n"
             "Zalda o’n beshta kompyuter va tez internet bor. "
             "O’quvchilar u yerda bepul dars tayyorlashlari mumkin. "
             "Kutubxona har kuni soat to’qqizdan oltigacha ishlaydi, dam olish kuni yakshanba.")

hujjatlar = [
    ("sayt01.misol/yangiliklar/metro", METRO_SARLAVHA + "\n" + METRO + "\n" + ULASHISH + "\n" + HUQUQ),
    ("sayt02.misol/news/12345", belgi_bilan(METRO_SARLAVHA + "\n" + METRO, "'", "'") + "\n" + ULASHISH + "\n" + HUQUQ),
    ("sayt03.misol/2024/metro-bekat", belgi_bilan(METRO_SARLAVHA + "\n" + METRO, "‘", "’") + "\n" + COOKIE),
    ("sayt01.misol/yangiliklar/metro?sahifa=2", METRO_SARLAVHA + "\n" + METRO + "\n" + ULASHISH + "\n" + HUQUQ),
    ("sayt05.misol/shahar/metro",
     belgi_bilan("Poytaxtda yangi metro bekati foydalanishga topshirildi\n"
                 "Shahrimizda yana bir metro bekati ochilib, yoʻlovchilarni qabul qila boshladi. "
                 + METRO.split(". ", 1)[1], "’", "’") + "\n" + HUQUQ),
    ("sayt06.misol/uz/metro",
     belgi_bilan(METRO_SARLAVHA + "\n" + METRO
                 + " Bekat ochilishida shahar hokimligi vakillari ishtirok etdi.", "'", "'") + "\n" + ULASHISH),

    ("sayt01.misol/ob-havo", ob_havo + "\n" + HUQUQ),
    ("sayt07.misol/maktab",
     "Maktablarda yangi oʻquv dasturi\n"
     "Yangi oʻquv yilidan boshlab boshlangʻich sinflarda dasturlash asoslari oʻqitiladi. "
     "Darslar haftada bir marta oʻtadi va oʻyin shaklida tashkil etiladi. "
     "Oʻqituvchilar yozgi taʼtil davomida maxsus kurslarda malaka oshirdi. "
     "Ota-onalar bu yangilikni ijobiy kutib olishmoqda.\n" + ULASHISH),
    ("sayt08.misol/taomlar/palov",
     "Toshkent palovi qanday tayyorlanadi\n"
     "Palov uchun guruch, goʻsht, sabzi, piyoz va oʻsimlik yogʻi kerak boʻladi. "
     "Avval qozonda yogʻ yaxshilab qizdiriladi, keyin piyoz va goʻsht qovuriladi. "
     "Sabzi somoncha shaklida toʻgʻraladi va goʻshtga qoʻshiladi. "
     "Zirvak tayyor boʻlgach, yuvilgan guruch tekis solinadi va ustidan suv quyiladi. "
     "Palov past olovda damlanadi.\n" + COOKIE),
    ("sayt09.misol/bayram/navruz",
     "Navro'z bayrami\n"
     "Navro'z bahor va yangilanish bayrami. U har yili 21-mart kuni keng nishonlanadi. "
     "Bayram kunlari sumalak pishiriladi, mahallalarda sayillar o'tkaziladi. "
     "Odamlar bir-birini tabriklab, qarindoshlarnikiga boradi. "
     "Navro'z O'zbekistonda eng sevimli bayramlardan biri hisoblanadi.\n" + ULASHISH),
    ("sayt10.misol/sport/futbol",
     "Terma jamoa navbatdagi oʻyinga tayyorlanmoqda\n"
     "Milliy terma jamoa saralash bosqichining navbatdagi uchrashuviga tayyorgarlik koʻrmoqda. "
     "Bosh murabbiy yigʻinga yigirma uch nafar futbolchini chaqirdi. "
     "Jamoa mashgʻulotlarni poytaxtdagi markaziy stadionda oʻtkazmoqda. "
     "Uchrashuv shanba kuni kechqurun boʻlib oʻtadi.\n" + HUQUQ),
    ("sayt11.misol/qishloq/bugdoy",
     "Bug’doy hosili yig’ib olindi\n"
     "Viloyatda bug’doy o’rimi yakunlandi. "
     "Fermerlar bu yil har gektardan o’rtacha oltmish sentnerdan hosil olishdi. "
     "Hosilni tez yig’ib olish uchun qo’shimcha kombaynlar jalb qilindi. "
     "Mutaxassislarning fikricha, yaxshi hosilga o’z vaqtida sug’orish sabab bo’lgan."),
    ("sayt12.misol/talim/ai-kurs",
     "Sunʼiy intellekt boʻyicha bepul kurs\n"
     "Yoshlar uchun sunʼiy intellekt asoslari boʻyicha bepul onlayn kurs boshlandi. "
     "Kursda Python tili, maʼlumotlar bilan ishlash va oddiy modellar qurish oʻrgatiladi. "
     "Darslar oʻzbek tilida olib boriladi. "
     "Kursni muvaffaqiyatli tugatganlar sertifikat oladi.\n" + COOKIE),
    ("sayt13.misol/sayohat/samarqand",
     "Samarqandga sayohat\n"
     "Samarqand dunyodagi eng qadimiy shaharlardan biri. "
     "Registon maydoni, Go`ri Amir maqbarasi va Shohi Zinda majmuasi sayyohlarni o`ziga tortadi. "
     "Bahor va kuz oylari sayohat uchun eng qulay vaqt hisoblanadi. "
     "Shaharga Toshkentdan tezyurar poyezdda taxminan ikki soatda yetib borish mumkin."),
    ("ensiklopediya.misol/amudaryo",
     "Amudaryo\n"
     "Amudaryo Oʻrta Osiyodagi eng yirik daryolardan biri. "
     "U Pomir togʻlaridan boshlanadi va Orol dengizi tomon oqadi. "
     "Daryo suvi qadimdan dehqonchilikda sugʻorish uchun ishlatiladi. "
     "Amudaryo boʻyida koʻplab qadimiy shaharlar joylashgan.\n" + ENSIKLOPEDIYA),
    ("ensiklopediya.misol/paxta",
     "Paxta\n"
     "Paxta gʻoʻza oʻsimligining tolasi. "
     "Undan ip, gazlama va kiyim tayyorlanadi. "
     "Paxta chigitidan esa yogʻ olinadi. "
     "Oʻzbekistonda paxta yetishtirish uzoq tarixga ega.\n" + ENSIKLOPEDIYA),
    ("ensiklopediya.misol/navoiy",
     "Alisher Navoiy\n"
     "Alisher Navoiy buyuk shoir va mutafakkir. "
     "U 1441-yilda Hirotda tugʻilgan. "
     "Navoiy turkiy tilda yozilgan koʻplab asarlar muallifi, uning eng mashhur asari «Xamsa» hisoblanadi. "
     "Uning tavallud kuni har yili 9-fevralda nishonlanadi.\n" + ENSIKLOPEDIYA),
    ("sayt14.misol/til-bayrami",
     "Oʻzbek tili bayrami\n"
     "Har yili 21-oktabr Oʻzbek tili bayrami kuni sifatida nishonlanadi. "
     "Bu kunda maktab va universitetlarda turli tadbirlar oʻtkaziladi. "
     "Yoshlar oʻzbek tilida yozilgan sheʼrlarni yoddan aytishadi. "
     "Tilni asrash va rivojlantirish har birimizning burchimizdir."),
    ("sayt15.misol/ru/kniga",
     "Сегодня в Ташкенте открылась "
     "книжная ярмарка. "
     "В ней участвуют более ста "
     "издательств. "
     "Посетители могут прийти "
     "бесплатно до конца недели."),
    ("sayt16.misol/kitob",
     "Бугун пойтахтда китоб "
     "кўргазмаси очилди. "
     "Кўргазмада юздан ортиқ "
     "нашриёт иштирок этмоқда. "
     "Ташриф буюрувчилар "
     "кўргазмани бепул кўришлари "
     "мумкин."),
    ("sayt17.misol/kutubxona", kutubxona.encode("utf-8").decode("mac_latin2")),
    ("sayt18.misol/pogoda",
     "Погода на завтра: "
     "облачно, возможен "
     "небольшой дождь, "
     "температура днём "
     "до двадцати градусов."
     .encode("cp1251").decode("utf-8", errors="replace")),
    ("sayt19.misol/404", "Sahifa topilmadi."),
    ("sayt20.misol/", "Bosh sahifa | Yangiliklar | Sport | Aloqa"),
    ("sayt21.misol/", "Saytga xush kelibsiz!\n" + HUQUQ),
    ("sayt22.misol/sport/shaxmat",
     "Shaxmat turnirida yoshlar gʻalaba qozondi\n"
     "Toshkentda boʻlib oʻtgan shaxmat turnirida yosh oʻyinchilar yaxshi natija koʻrsatdi. "
     "Gʻolib turnirdan soʻng jurnalistlarga «Спасибо всем!» "
     "deb rus tilida ham minnatdorlik bildirdi. "
     "Keyingi turnir yoz oylarida oʻtkaziladi. "
     "Musobaqada oʻttizdan ortiq ishtirokchi qatnashdi.\n" + ULASHISH),
    ("sayt02.misol/ob-havo", ob_havo + "\n" + ULASHISH),
    ("sayt23.misol/fan/quyosh",
     "Quyosh tizimi\n"
     "Quyosh tizimida sakkizta sayyora bor. "
     "Ulardan eng kattasi Yupiter, eng kichigi esa Merkuriy. "
     "Yer Quyoshdan uchinchi sayyora hisoblanadi. "
     "Sayyoralar Quyosh atrofida turli tezlikda aylanadi.\n" + COOKIE),
    ("sayt24.misol/texno/ilova",
     "Talabalar uchun yangi mobil ilova\n"
     "Talabalar uchun dars jadvalini koʻrsatadigan yangi mobil ilova ishga tushirildi. "
     "Ilovada imtihon sanalari va kutubxona ish vaqti ham koʻrsatiladi. "
     "U bepul va internet boʻlmaganda ham ishlaydi. "
     "Ishlab chiquvchilar ilovani yanada qulay qilish uchun takliflar kutmoqda.\n" + HUQUQ),
]

with open("xom_korpus.jsonl", "w", encoding="utf-8") as f:
    for i in range(len(hujjatlar)):
        url, matn = hujjatlar[i]
        hujjat = {"id": i + 1, "url": "https://" + url, "text": matn}
        f.write(json.dumps(hujjat, ensure_ascii=False) + "\n")

print("yozildi:", len(hujjatlar), "ta hujjat")
