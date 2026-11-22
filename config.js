/* ============================================================================
   ⚙️ PLIK KONFIGURACYJNY STRONY (config.js)
   Tutaj możesz łatwo zmieniać ustawienia, hasło, daty, kolory oraz listę
   osiągnięć bez ingerencji w główny kod strony (script.js / index.html).
============================================================================ */

const SITE_CONFIG = {
  /* --------------------------------------------------------------------------
     1. EKRAN BLOKADY I BEZPIECZEŃSTWO
  -------------------------------------------------------------------------- */
  security: {
    secretCode: "4016", // Kod dostępu wymagany do odblokowania strony
    lockTitle: "Tylko dla Ciebie", // Nagłówek na ekranie blokady
    lockSubtitle: "Wpisz nasz sekretny kod,\naby otworzyć tę stronę 💌", // Podtytuł
    lockHint: "Dodaj nasze roczniki. 💗", // Podpowiedź wyświetlana pod przyciskiem
    rememberSessionByDefault: true, // Czy checkbox "Zapamiętaj sesję" ma być domyślnie zaznaczony
    sessionStorageType: "session" // "session" = pamięta do zamknięcia karty | "local" = pamięta na stałe do ręcznego zablokowania
  },

  /* --------------------------------------------------------------------------
     2. WAŻNE DATY I LICZNIKI
  -------------------------------------------------------------------------- */
  dates: {
    // Data rozpoczęcia związku (Format: RRRR-MM-DDTHH:MM:SS)
    relationshipStart: "2025-09-25T18:00:00",

    // Rocznica (miesiąc 1-12, dzień 1-31)
    anniversary: { month: 9, day: 25, label: "Rocznica" },

    // Urodziny (wyświetlane w sekcji "Ważne daty")
    birthdays: [
      { id: "countdown-janek", name: "Janek", icon: "🎂", day: 13, month: 3, year: 2010, fullText: "13 marca 2010" },
      { id: "countdown-kochanie", name: "Kochanie", icon: "💖", day: 11, month: 8, year: 2006, fullText: "11 sierpnia 2006" }
    ]
  },

  /* --------------------------------------------------------------------------
     3. WYGLĄD, MOTYW I KOLORY
  -------------------------------------------------------------------------- */
  theme: {
    defaultMode: "day", // Domyślny motyw przy pierwszym wejściu: "day" (jasny) lub "night" (ciemny)
    primaryColor: "#d63384", // Główny kolor akcentu (różowy)
    secondaryColor: "#8a2be2", // Drugi kolor akcentu (fioletowy)
    enableParticles: true, // Czy włączyć latające serduszka/iskierki w tle (true / false)
    enableCursorTrail: true // Czy włączyć ślad serduszek za kursorem na komputerze (true / false)
  },

  /* --------------------------------------------------------------------------
     4. TEKSTY POWITALNE I KOMPLEMENTY
  -------------------------------------------------------------------------- */
  texts: {
    heroTitle: "Dla Ciebie, Kochanie 💖",
    heroSubtitle: "Kilka słów prosto z serca...",
    compliments: [
      "Jesteś najpiękniejsza 💖",
      "Uwielbiam Twój uśmiech 😊",
      "Dziękuję, że jesteś 💕",
      "Jesteś moim szczęściem 🌟",
      "Kocham Cię nad życie 💗",
      "Jesteś wyjątkowa ✨",
      "Mój świat to Ty 💫",
      "Z Tobą wszystko jest lepsze 🌈",
      "Jesteś moim marzeniem 💭",
      "Na zawsze razem 💍"
    ],
    secretMessages: [
      "Jesteś moim całym światem 💖",
      "Kocham Cię każdego dnia bardziej 💕",
      "Dziękuję, że jesteś przy mnie 💗",
      "Z Tobą wszystko jest możliwe 🌟",
      "Jesteś moim marzeniem 💫",
      "Na zawsze i o jeden dzień dłużej 💍"
    ]
  },

  /* --------------------------------------------------------------------------
     5. KOŁO FORTUNY I QUIZ
  -------------------------------------------------------------------------- */
  wheelItems: [
    "Kocham Cię 💖",
    "Jesteś piękna 💕",
    "Moje szczęście 🌟",
    "Moja miłość 💗",
    "Mój świat 💫",
    "Na zawsze 💍",
    "Uwielbiam Cię 💞",
    "Jesteś wyjątkowa ✨"
  ],

  /* --------------------------------------------------------------------------
     6. LISTA OSIĄGNIĘĆ (KLIKALNE + AUTOMATYCZNE)
     Kategorie: "Relacja", "Życiowe", "Interakcje", "Gry", "Klimat", "Sekretne"
     - id: unikalny identyfikator (nie powtarzaj ich)
     - category: nazwa kategorii do filtrowania
     - name: tytuł osiągnięcia
     - icon: emotka
     - desc: opis widoczny na karcie
     - secret: (opcjonalnie true) ukrywa opis dopóki nie zostanie kliknięte/odblokowane
  -------------------------------------------------------------------------- */
  achievements: [
    // === KATEGORIA: RELACJA ===
  { id: "rel-first-step", category: "Relacja", name: "Pierwsze kroki", icon: "🚪", desc: "Odwiedź naszą stronę po raz pierwszy." },
  { id: "rel-regular", category: "Relacja", name: "Stały bywalec", icon: "🏠", desc: "Odwiedź stronę minimum 5 razy." },
  { id: "rel-owner", category: "Relacja", name: "Współwłaściciel serca", icon: "🏰", desc: "Odwiedź stronę 25 razy." },
  { id: "rel-100-days", category: "Relacja", name: "Pierwsza setka", icon: "💯", desc: "Przekrocz 100 wspólnych dni na liczniku." },
  { id: "rel-365-days", category: "Relacja", name: "Pełny obrót wokół Słońca", icon: "🌍", desc: "Świętuj pełny rok razem!" },
  { id: "rel-letter", category: "Relacja", name: "Uważny czytelnik", icon: "📜", desc: "Przeczytaj cały list od Janka." },
  { id: "rel-timeline", category: "Relacja", name: "Podróż w czasie", icon: "⏳", desc: "Przejrzyj całą naszą oś czasu." },
  { id: "rel-barbed-wire", category: "Relacja", name: "Akcja „Drut Kolczasty”", icon: "🚧", desc: "Wspomnienie z 21.01.2026 u Oli – wiemy, o co chodzi." },
  { id: "rel-golden-ksalosie", category: "Relacja", name: "Złote Ksałosie", icon: "🏆", desc: "Uczcij nasze legendarne święto wymyślone 28.04.2026." },
  { id: "rel-white-protocol", category: "Relacja", name: "Biały Protokół", icon: "📁", desc: "Tajna organizacja założona 05.01.2026." },
  { id: "rel-rooftop", category: "Relacja", name: "Strażniczka dachu", icon: "🏙️", desc: "Pamiętaj o naszym pierwszym spotkaniu na dachu budynku." },
  { id: "rel-nameday", category: "Relacja", name: "Pierwsze wspólne imieniny", icon: "💐", desc: "05.03.2026 – niezapomniane życzenia i alfabet." },
  { id: "rel-valentine", category: "Relacja", name: "Moja Walentynka", icon: "💝", desc: "Mini kolaż zdjęć z 14.02.2026." },
  { id: "rel-miss-you", category: "Relacja", name: "Tęsknota na odległość", icon: "🥺", desc: "Zatęsknij za sobą już 5 minut po pożegnaniu." },
  { id: "rel-all-reasons", category: "Relacja", name: "Wszystkie powody", icon: "💖", desc: "Odkryj wszystkie karty w sekcji „Dlaczego Cię kocham”." },
  { id: "rel-telepathy", category: "Relacja", name: "Komunikacja wzrokowa", icon: "👀", desc: "Zrozumiano się bez słowa dokładnie w tym samym momencie." },
  { id: "rel-mood-radar", category: "Relacja", name: "Radar nastroju", icon: "📡", desc: "Wyczuto gorszy dzień po samym sposobie pisania lub tonie głosu." },
  { id: "rel-inside-joke", category: "Relacja", name: "Szyfr dla wtajemniczonych", icon: "🧩", desc: "Użyto żartu lub hasła, które dla innych brzmi kompletnie niezrozumiale." },
  { id: "rel-half-sentence", category: "Relacja", name: "Kończenie myśli", icon: "💬", desc: "Wystarczyło pół zdania, żeby druga osoba dopowiedziała resztę." },
  { id: "rel-safe-place", category: "Relacja", name: "Bezpieczna przystań", icon: "⚓", desc: "Miejsce i osoba, przy której można zrzucić wszystkie maski." },
  { id: "rel-random-photo", category: "Relacja", name: "Nieplanowane ujęcie", icon: "📸", desc: "Zrobiono zwykłe, spontaniczne zdjęcie, które nagle staje się ulubionym." },
  { id: "rel-shared-snack", category: "Relacja", name: "„Wezmę tylko kęsa”", icon: "🍟", desc: "Klasyczny podział jedzenia, gdzie „tylko trochę” zmienia definicję." },
  { id: "rel-goodnight-ritual", category: "Relacja", name: "Wieczorny rytuał", icon: "🌙", desc: "Dzień nie jest w pełni domknięty bez pożegnania i kilku ciepłych słów." },
  { id: "rel-long-voice", category: "Relacja", name: "Podcast zamiast wiadomości", icon: "🎙️", desc: "Wysłano wiadomość głosową, która trwa dłużej niż niejeden odcinek." },
  { id: "rel-sudden-smile", category: "Relacja", name: "Uśmiech znikąd", icon: "😊", desc: "Wspomnienie wspólnej chwili wywołało uśmiech pośrodku zwykłego dnia." },
  { id: "rel-support-crew", category: "Relacja", name: "Drużyna wsparcia", icon: "🤝", desc: "Zawsze po tej samej stronie, niezależnie od tego, co przyniesie dzień." },
  { id: "rel-first-laugh", category: "Relacja", name: "Wspólna fala śmiechu", icon: "😂", desc: "Zaczęło się od drobiazgu, a skończyło łzami ze śmiechu." },

  // === KATEGORIA: ŻYCIOWE & MEMY ===
  { id: "life-jehovah", category: "Życiowe", name: "Pokonano Jehowych", icon: "🛡️", desc: "Skutecznie obroniono drzwi wejściowe przed niespodziewaną wizytą." },
  { id: "life-no-coffee", category: "Życiowe", name: "Przetrwano poranek bez kawy", icon: "☕", desc: "Udało się otworzyć oczy i funkcjonować bez kofeiny." },
  { id: "life-fixed-working", category: "Życiowe", name: "Naprawiono coś, co działało", icon: "🔧", desc: "Grzebano tak długo, aż przestało działać, a potem naprawiono z powrotem." },
  { id: "life-5-more-min", category: "Życiowe", name: "Jeszcze tylko 5 minut", icon: "⏰", desc: "Ustawiono 7 drzemek pod rząd i nadal zdążono na czas." },
  { id: "life-battery-1", category: "Życiowe", name: "Życie na krawędzi (1%)", icon: "🪫", desc: "Podłączono ładowarkę dokładnie w sekundzie, gdy ekran już gasł." },
  { id: "life-chair-clothes", category: "Życiowe", name: "Krzesło pełne ubrań", icon: "🪑", desc: "Ubrania ani do szafy, ani do prania – idealne na fotel." },
  { id: "life-fridge-check", category: "Życiowe", name: "Inspektor lodówki", icon: "🧊", desc: "Otworzono lodówkę 3 razy w ciągu 10 minut z nadzieją, że coś przybyło." },
  { id: "life-what-to-eat", category: "Życiowe", name: "„Nie wiem, wybierz Ty”", icon: "🍕", desc: "20 minut ustalania, co zjeść na obiad, zakończone klasykiem." },
  { id: "life-overthinking", category: "Życiowe", name: "Mistrz analizy o 2:00 w nocy", icon: "🧠", desc: "Przeanalizowano rozmowę sprzed 3 lat tuż przed zaśnięciem." },
  { id: "life-meme-dealer", category: "Życiowe", name: "Hurtownik memów", icon: "😂", desc: "Wysłano sobie nawzajem ponad 15 memów bez ani jednego słowa tekstu." },
  { id: "life-blanket-thief", category: "Życiowe", name: "Złodziej kołdry", icon: "🛏️", desc: "Przejęto 90% kołdry w trakcie snu bez budzenia drugiej osoby." },
  { id: "life-cold-feet", category: "Życiowe", name: "Lodowate stopy", icon: "🧊", desc: "Użyto drugiej osoby jako darmowego grzejnika do stóp." },
  { id: "life-hair-everywhere", category: "Życiowe", name: "Znak terytorialny", icon: "💇‍♀️", desc: "Znaleziono długi włos w miejscu, w którym nie miał prawa się znaleźć." },
  { id: "life-no-jacket", category: "Życiowe", name: "„Wcale nie jest zimno”", icon: "🥶", desc: "Wyjście w samej bluzie przy 5 stopniach i udawanie, że jest super." },
  { id: "life-plan-cancel", category: "Życiowe", name: "Radość z odwołanych planów", icon: "🛋️", desc: "Ten moment ulgi, gdy nikt nigdzie nie wychodzi i zostajecie w domu." },
  { id: "life-jar-boss", category: "Życiowe", name: "Pokonano wieczko słoika", icon: "🫙", desc: "Zwycięstwo nad opornym słoikiem bez użycia siły nadprzyrodzonej." },
  { id: "life-5min-myth", category: "Życiowe", name: "Mit „zaraz wracam”", icon: "⏳", desc: "„Szybkie wyjście po jedną rzecz” trwało znacznie dłużej niż planowano." },
  { id: "life-one-episode", category: "Życiowe", name: "„Jeszcze tylko jeden odcinek”", icon: "📺", desc: "Nocny maraton, który miał skończyć się o rozsądnej porze." },
  { id: "life-ninja-snack", category: "Życiowe", name: "Kuchenny ninja", icon: "🤫", desc: "Zdobyto przekąskę w środku nocy bez wydania ani jednego zbędnego dźwięku." },
  { id: "life-lost-sock", category: "Życiowe", name: "Tropem zaginionej skarpetki", icon: "🧦", desc: "Odnaleziono samotną skarpetkę w najbardziej nieoczywistym miejscu." },
  { id: "life-phone-save", category: "Życiowe", name: "Refleks mistrza", icon: "📱", desc: "Telefon już leciał ku zagładzie, ale udało się go złapać w ostatniej chwili." },
  { id: "life-courier-dres", category: "Życiowe", name: "Strategia kurierska", icon: "📦", desc: "Odebrano paczkę w stroju, w którym absolutnie nie powinno się otwierać drzwi." },
  { id: "life-impulse-cart", category: "Życiowe", name: "Impuls zakupowy", icon: "🛒", desc: "Włożono do koszyka coś totalnie nieplanowanego, bo „ładnie wyglądało”." },
  { id: "life-why-entered", category: "Życiowe", name: "Amnezja progowa", icon: "🚪", desc: "Wejście do innego pokoju i całkowite zapomnienie, po co się tam przyszło." },
  { id: "life-already-in-hand", category: "Życiowe", name: "Szukanie w dłoni", icon: "🔎", desc: "Rozpoczęto poszukiwania przedmiotu, który cały czas był trzymany w ręku." },
  { id: "life-a-nie-mowilem", category: "Życiowe", name: "Wyrocznia", icon: "🔮", desc: "Padło legendarne „a nie mówiłem/am?” i okazało się, że w 100% trafnie." },
  { id: "life-alarm-blind", category: "Życiowe", name: "Wyłączony budzik we śnie", icon: "😴", desc: "Wyłączono alarm w stanie półsnu i nie ma żadnego wspomnienia tego faktu." },
  { id: "life-hot-food-wait", category: "Życiowe", name: "Zbyt gorące, żeby zjeść", icon: "🍲", desc: "Danie gotowe, głód wielki, ale trzeba dmuchać przez 10 minut, żeby nie spalić języka." },
  { id: "life-tabs-50", category: "Życiowe", name: "„Jeszcze tylko ta karta”", icon: "🗂️", desc: "Otwarto tyle kart w przeglądarce, że nawet autor już nie pamięta, co jest gdzie." },
  { id: "life-typo-master", category: "Życiowe", name: "Autokorekta w formie", icon: "⌨️", desc: "Napisano wiadomość, którą trzeba było przeczytać trzy razy, żeby zrozumieć sens." },
  { id: "life-wifi-panic", category: "Życiowe", name: "3 sekundy bez internetu", icon: "📶", desc: "Łącze zerwało na ułamek sekundy, a w głowie już pojawił się kryzys egzystencjalny." },
  { id: "life-bag-tetris", category: "Życiowe", name: "Pakowanie w trybie Tetris", icon: "🧳", desc: "Upchnięto „tylko kilka rzeczy” do torby, która ledwo się dopina." },
  { id: "life-compliment-deflect", category: "Życiowe", name: "Obrona przed komplementem", icon: "🙈", desc: "Usłyszano miłe słowa i odruchowo próbowano je zdementować." },
  { id: "life-silent-laugh", category: "Życiowe", name: "Bezgłośny atak śmiechu", icon: "🤣", desc: "Próba powstrzymania śmiechu w poważnej chwili, która tylko pogarsza sprawę." },
  { id: "life-soup-spoon", category: "Życiowe", name: "Ostatnia kropla z talerza", icon: "🥄", desc: "Podjęto heroiczną próbę przechylenia talerza tak, by nic nie stracić." },

  // === KATEGORIA: INTERAKCJE ===
  { id: "int-heart-1", category: "Interakcje", name: "Pierwsze uderzenie", icon: "💗", desc: "Kliknij wielkie pulsujące serce na stronie głównej." },
  { id: "int-heart-20", category: "Interakcje", name: "Kardiogram miłości", icon: "💓", desc: "Kliknij pulsujące serce 20 razy." },
  { id: "int-heart-100", category: "Interakcje", name: "Serce ze stali", icon: "💝", desc: "Kliknij pulsujące serce 100 razy." },
  { id: "int-heart-500", category: "Interakcje", name: "Niezniszczalne serce", icon: "❤️", desc: "Kliknij wielkie serce aż 500 razy – czysta determinacja." },
  { id: "int-love-btn", category: "Interakcje", name: "Powiedz mi to!", icon: "💌", desc: "Kliknij przycisk „Powiedz mi, że mnie kochasz”." },
  { id: "int-love-50", category: "Interakcje", name: "Zakochany po uszy", icon: "💘", desc: "Kliknij przycisk miłości 50 razy." },
  { id: "int-love-250", category: "Interakcje", name: "Miłość bez granic", icon: "❤️‍🔥", desc: "Kliknij przycisk miłości 250 razy." },
  { id: "int-love-1000", category: "Interakcje", name: "Nieskończona pętla uczuć", icon: "♾️", desc: "Kliknij przycisk miłości 1000 razy. To już wyższa matematyka." },
  { id: "int-fireworks", category: "Interakcje", name: "Pirotechnik", icon: "🎆", desc: "Odpal pokaz fajerwerków na stronie głównej." },
  { id: "int-double-fireworks", category: "Interakcje", name: "Festiwal na niebie", icon: "🎇", desc: "Odpal fajerwerki ponownie, bo jeden pokaz to za mało." },
  { id: "int-gallery-zoom", category: "Interakcje", name: "Pod lupą", icon: "🔍", desc: "Powiększ dowolne zdjęcie w galerii (Lightbox)." },
  { id: "int-carousel", category: "Interakcje", name: "Karuzela wspomnień", icon: "🎠", desc: "Przewiń slajdy w galerii zdjęć." },
  { id: "int-gallery-binge", category: "Interakcje", name: "Maraton wspomnień", icon: "🖼️", desc: "Przejrzyj galerię zdjęć wzdłuż i wszerz, bez pośpiechu." },
  { id: "int-memory-add", category: "Interakcje", name: "Kronikarz", icon: "📔", desc: "Dodaj własny wpis na Ścianie Wspomnień." },
  { id: "int-memory-5", category: "Interakcje", name: "Pamiętnikarz", icon: "📚", desc: "Zgromadź 5 wspomnień na Ścianie Wspomnień." },
  { id: "int-memory-15", category: "Interakcje", name: "Strażnik kroniki", icon: "📖", desc: "Zgromadź aż 15 wpisów na Ścianie Wspomnień." },
  { id: "int-capsule-bury", category: "Interakcje", name: "Strażnik czasu", icon: "🕰️", desc: "Zakop pierwszą Kapsułę Czasu na przyszłość." },
  { id: "int-capsule-3", category: "Interakcje", name: "Archiwista przyszłości", icon: "📦", desc: "Zostaw 3 wiadomości w Kapsułach Czasu dla przyszłych Was." },
  { id: "int-surprise", category: "Interakcje", name: "Ciekawy świata", icon: "🎊", desc: "Odkryj ukrytą niespodziankę w zakładce Zabawa." },
  { id: "int-scroll-top", category: "Interakcje", name: "Winda na samą górę", icon: "⬆️", desc: "Użyj przycisku szybkiego powrotu na górę strony." },
  { id: "int-video-watch", category: "Interakcje", name: "Seans kinowy", icon: "🎬", desc: "Odtwórz nasz film lub memowy alfabet." },
  { id: "int-reset-check", category: "Interakcje", name: "Kontrola jakości", icon: "🧪", desc: "Przetestuj interaktywne elementy strony, żeby sprawdzić, czy wszystko gra." },

  // === KATEGORIA: GRY ===
  { id: "game-wheel-1", category: "Gry", name: "Pierwszy obrót", icon: "🎡", desc: "Zakręć Kołem Miłości po raz pierwszy." },
  { id: "game-wheel-10", category: "Gry", name: "Bywalec kasyna", icon: "🎰", desc: "Zakręć Kołem Miłości 10 razy." },
  { id: "game-wheel-25", category: "Gry", name: "Król / Królowa ruletki", icon: "🎡", desc: "Zakręć Kołem Miłości już 25 razy." },
  { id: "game-wheel-love", category: "Gry", name: "Trafione w dziesiątkę", icon: "🎯", desc: "Wylosuj „Kocham Cię 💖” na Kole Miłości." },
  { id: "game-tester", category: "Gry", name: "Chemik miłości", icon: "🧪", desc: "Przetestuj dwa imiona w Love Testerze." },
  { id: "game-tester-100", category: "Gry", name: "100% Dopasowania", icon: "⚗️", desc: "Uzyskaj maksymalny wynik 100% w Love Testerze." },
  { id: "game-tester-low", category: "Gry", name: "Błąd w systemie?", icon: "📉", desc: "Uzyskaj wyjątkowo niski wynik w Love Testerze – i nie przejmować się nim ani trochę." },
  { id: "game-quiz-easy", category: "Gry", name: "Rozgrzewka", icon: "😊", desc: "Ukończ Quiz Miłosny na poziomie łatwym." },
  { id: "game-quiz-medium", category: "Gry", name: "Znawca tematu", icon: "😎", desc: "Ukończ Quiz Miłosny na poziomie średnim." },
  { id: "game-quiz-hard", category: "Gry", name: "Prawdziwy twardziel", icon: "🔥", desc: "Ukończ Quiz Miłosny na poziomie trudnym." },
  { id: "game-quiz-perfect", category: "Gry", name: "Perfekcjonista", icon: "🌟", desc: "Zdobądź 5/5 punktów w dowolnym quizie." },
  { id: "game-quiz-comeback", category: "Gry", name: "Wielki powrót", icon: "🔁", desc: "Podejdź do quizu ponownie, żeby poprawić wcześniejszy wynik." },
  { id: "game-gifts-half", category: "Gry", name: "Ciekawski odkrywca", icon: "🎀", desc: "Rozpakuj połowę prezentów i sprawdź, co kryje się w środku." },
  { id: "game-gifts-all", category: "Gry", name: "Mikołaj", icon: "🎁", desc: "Rozpakuj wszystkie 6 prezentów." },
  { id: "game-catch-start", category: "Gry", name: "Gracz", icon: "🎮", desc: "Rozpocznij minigrę „Złap serduszka”." },
  { id: "game-catch-15", category: "Gry", name: "Łowca serc", icon: "🏹", desc: "Zdobądź minimum 15 punktów w minigrze." },
  { id: "game-catch-30", category: "Gry", name: "Mistrz refleksu", icon: "⚡", desc: "Zdobądź minimum 30 punktów w 20 sekund!" },
  { id: "game-catch-50", category: "Gry", name: "Nadludzki refleks", icon: "🚀", desc: "Zdobądź minimum 50 punktów w minigrze „Złap serduszka”." },

  // === KATEGORIA: KLIMAT ===
  { id: "mood-night-owl", category: "Klimat", name: "Nocny marek", icon: "🦉", desc: "Odwiedź stronę między północą a 4:00 rano lub włącz tryb nocny." },
  { id: "mood-witching-hour", category: "Klimat", name: "Godzina duchów", icon: "🕯️", desc: "Odwiedź stronę między 3:00 a 4:00 w nocy, gdy świat śpi." },
  { id: "mood-dark-mode", category: "Klimat", name: "Ciemna strona mocy", icon: "🌙", desc: "Przełącz motyw strony na tryb nocny." },
  { id: "mood-day-mode", category: "Klimat", name: "Promyk słońca", icon: "☀️", desc: "Wróć do jasnego, pastelowego motywu dnia." },
  { id: "mood-music-on", category: "Klimat", name: "DJ Romantyk", icon: "🎵", desc: "Włącz muzykę w tle przyciskiem w nawigacji." },
  { id: "mood-spotify", category: "Klimat", name: "Meloman", icon: "🎧", desc: "Odwiedź sekcję z naszą playlistą Spotify." },
  { id: "mood-weather", category: "Klimat", name: "Meteorolog uczuć", icon: "🌦️", desc: "Sprawdź dzisiejszą Pogodę Miłości." },
  { id: "mood-weekend", category: "Klimat", name: "Weekendowy chill", icon: "🌈", desc: "Wejdź na stronę w sobotę lub niedzielę." },
  { id: "mood-early-bird", category: "Klimat", name: "Ranny ptaszek", icon: "🌅", desc: "Odwiedź stronę przed 8:00 rano." },
  { id: "mood-coffee-time", category: "Klimat", name: "Poranna kawa z ekranem", icon: "☕", desc: "Odwiedź stronę rano przy pierwszym łyku kawy lub herbaty." },
  { id: "mood-golden-hour", category: "Klimat", name: "Złota godzina", icon: "🌇", desc: "Wejdź na stronę w porze zachodu słońca." },
  { id: "mood-cozy-evening", category: "Klimat", name: "Wieczorny koc", icon: "🧣", desc: "Zajrzyj na stronę wieczorem w trybie nocnym." },
  { id: "mood-monday-survival", category: "Klimat", name: "Przetrwanie poniedziałku", icon: "💼", desc: "Odwiedź stronę w poniedziałek, żeby naładować baterie na start tygodnia." },
  { id: "mood-friday-relief", category: "Klimat", name: "Piątkowe odetchnięcie", icon: "🎉", desc: "Wejdź na stronę w piątek i poczuj ulgę przed weekendem." },
  { id: "mood-midnight-wish", category: "Klimat", name: "Życzenie o północy", icon: "✨", desc: "Złap na zegarze godzinę 00:00 lub 21:37." },
  { id: "mood-rain-walk", category: "Klimat", name: "Spacer w deszczu", icon: "☔", desc: "Wspólny spacer mimo brzydkiej pogody." },

  // === KATEGORIA: SEKRETNE ===
  { id: "sec-konami", category: "Sekretne", name: "Kod Konami", icon: "🕹️", desc: "Wpisz na klawiaturze legendarny kod: ↑ ↑ ↓ ↓ ← → ← → B A", secret: true },
  { id: "sec-lock-relock", category: "Sekretne", name: "Paranoik bezpieczeństwa", icon: "🔒", desc: "Zablokuj stronę ponownie przyciskiem kłódki w menu.", secret: true },
  { id: "sec-code-first-try", category: "Sekretne", name: "Pamięć absolutna", icon: "🔑", desc: "Wpisz poprawny kod blokady za pierwszym razem.", secret: true },
  { id: "sec-wrong-code", category: "Sekretne", name: "Włamywacz", icon: "🕵️", desc: "Wpisz błędny kod na ekranie blokady.", secret: true },
  { id: "sec-logo-click", category: "Sekretne", name: "Powrót do korzeni", icon: "💖", desc: "Kliknij logo „Nasza historia” w lewym górnym rogu.", secret: true },
  { id: "sec-ach-clicker", category: "Sekretne", name: "Ręczna robota", icon: "👆", desc: "Kliknij bezpośrednio w kartę osiągnięcia, aby je odznaczyć.", secret: true },
  { id: "sec-ach-toggle-5", category: "Sekretne", name: "Żongler osiągnięciami", icon: "🤹", desc: "Kliknij karty osiągnięć ręcznie 5 razy, testując system.", secret: true },
  { id: "sec-speed-clicker", category: "Sekretne", name: "Szybszy niż animacja", icon: "⚡", desc: "Kliknięto w locie, zanim poprzedni efekt zdążył się zakończyć.", secret: true },
  { id: "sec-curious-explorer", category: "Sekretne", name: "Przeklikiwacz zakamarków", icon: "🧭", desc: "Sprawdzono zakamarki strony, do których mało kto zagląda.", secret: true },
  { id: "sec-night-secret", category: "Sekretne", name: "Sekret nocnej zmiany", icon: "🌑", desc: "Połącz tryb nocny z wizytą po północy.", secret: true },
  { id: "sec-konami-reverse", category: "Sekretne", name: "Ciekawski haker", icon: "💻", desc: "Przetestowano zachowanie strony przy nietypowych kombinacjach lub akcjach.", secret: true },
  { id: "sec-half-way", category: "Sekretne", name: "Połowa drogi", icon: "🌗", desc: "Zdobądź 50% wszystkich osiągnięć na stronie.", secret: true },
  { id: "sec-almost-legend", category: "Sekretne", name: "Tuż za podium", icon: "🥉", desc: "Zdobądź 90% wszystkich osiągnięć – już prawie szczyt!", secret: true },
  { id: "sec-legend", category: "Sekretne", name: "Absolutna Legenda", icon: "👑", desc: "Zdobądź 100% wszystkich osiągnięć!", secret: true }
]
};