const APP_VERSION='1.1.0';

const DAILY_ACHIEVEMENTS=[
{id:'d-woda',name:'Pierwsza szklanka',icon:'💧',category:'zdrowie',desc:'Wypij szklankę wody.',xp:10},
{id:'d-spacer',name:'Krótka rozkładówka',icon:'🚶',category:'ruch',desc:'Przejdź chociaż 10 minut.',xp:15},
{id:'d-25',name:'25 minut skupienia',icon:'⏱️',category:'praca',desc:'Poświęć 25 minut jednemu zadaniu.',xp:20},
{id:'d-cisza',name:'Cicha minuta',icon:'🤫',category:'odpoczynek',desc:'Spędź minutę bez telefonu i rozmów.',xp:10},
{id:'d-czytanie',name:'Czytelnik',icon:'📖',category:'nauka',desc:'Przeczytaj co najmniej 10 stron.',xp:15},
{id:'d-porządek',name:'Pięć minut porządku',icon:'🧹',category:'dom',desc:'Sprzątnij przez pięć minut.',xp:15},
{id:'d-posilek',name:'Domowa kuchnia',icon:'🍲',category:'zdrowie',desc:'Przygotuj własny posiłek.',xp:15},
{id:'d-telefon',name:'Telefonowy pustelnik',icon:'📵',category:'odpoczynek',desc:'Zostaw telefon w innym pokoju na godzinę.',xp:20},
{id:'d-dobra-rzecz',name:'Dobry uczynek',icon:'💝',category:'relacje',desc:'Pomóż komuś bez oczekiwania wdzięczności.',xp:20},
{id:'d-spontan',name:'Tego nie przewidziałem',icon:'🎲',category:'eksperymenty',desc:'Spróbuj czegoś spontanicznego.',xp:15},
{id:'d-sniadanie',name:'Zdrowy początek',icon:'🥣',category:'zdrowie',desc:'Zjedz zdrowe śniadanie.',xp:10},
{id:'d-trening',name:'Poranna energia',icon:'🏃',category:'ruch',desc:'Wykonaj ćwiczenia przez 15 minut.',xp:20},
{id:'d-plan',name:'Planista dnia',icon:'🗓️',category:'praca',desc:'Zapisz trzy najważniejsze zadania.',xp:10},
{id:'d-no-social',name:'Digital Detox',icon:'🌙',category:'odpoczynek',desc:'Przez godzinę nie używaj social mediów.',xp:20},
{id:'d-słowa',name:'Nowe słowo',icon:'🔤',category:'nauka',desc:'Naucz się jednego nowego słowa.',xp:10},
{id:'d-obiad',name:'Obiad bez ekranu',icon:'🍽️',category:'zdrowie',desc:'Zjedz posiłek bez telefonu i telewizora.',xp:15},
{id:'d-szczoteczka',name:'Czyste zęby',icon:'🪥',category:'higiena',desc:'Umyj zęby rano i wieczorem.',xp:10},
{id:'d-oddech',name:'Głębokie oddychanie',icon:'🌬️',category:'odpoczynek',desc:'Wykonaj pięć spokojnych oddechów.',xp:10},
{id:'d-krok',name:'Pierwszy krok',icon:'👟',category:'ruch',desc:'Zrób pierwszy spacer.',xp:10},
{id:'d-schody',name:'Schody zamiast windy',icon:'🪜',category:'ruch',desc:'Wybierz schody zamiast windy lub windy ruchomej.',xp:15},
{id:'d-inna-droga',name:'Bez mapy',icon:'🧭',category:'eksperymenty',desc:'Wracaj inną, bezpieczną drogą niż zwykle.',xp:15},
{id:'d-lodowka',name:'Bohater lodówki',icon:'🥬',category:'dom',desc:'Wykorzystaj składniki, które trzeba zużyć.',xp:15},
{id:'d-szafka',name:'Detektyw szafki',icon:'🗄️',category:'dom',desc:'Uporządkuj jedną małą szufladę lub półkę.',xp:15},
{id:'d-opakowanie',name:'Ostatnie opakowanie',icon:'📦',category:'dom',desc:'Wyrzuć lub posegreguj jedno zbędne opakowanie.',xp:10},
{id:'d-nie-kupuj',name:'Mały oszczędzacz',icon:'🪙',category:'finanse',desc:'Nie dokonaj impulsowego zakupu.',xp:15},
{id:'d-wydatki',name:'Snajper wydatków',icon:'🧾',category:'finanse',desc:'Zapisz wszystkie dzisiejsze wydatki.',xp:15},
{id:'d-monetka',name:'Mistrz grosza',icon:'🪙',category:'finanse',desc:'Odłóż drobną kwotę na oszczędności.',xp:10},
{id:'d-wiadomosc',name:'Jedna minuta odwagi',icon:'💬',category:'relacje',desc:'Napisz do osoby, do której dawno nie pisałeś.',xp:15},
{id:'d-podziękowanie',name:'Dobrze o Tobie pomyślałem',icon:'🙏',category:'relacje',desc:'Podziękuj jednej bliskiej osobie.',xp:15},
{id:'d-komplement',name:'Radosny człowiek',icon:'😊',category:'relacje',desc:'Powiedz komukolwiek szczery komplement.',xp:15},
{id:'d-sam',name:'Czas dla siebie',icon:'☕',category:'odpoczynek',desc:'Zarezerwuj godzinę tylko dla siebie.',xp:20},
{id:'d-kolor',name:'Kolor dnia',icon:'🎨',category:'eksperymenty',desc:'Przez dzień zwracaj uwagę na jeden wybrany kolor.',xp:10},
{id:'d-dźwięki',name:'Odkrywca dźwięków',icon:'👂',category:'eksperymenty',desc:'Zanotuj pięć dźwięków słyszanych w otoczeniu.',xp:10},
{id:'d-perspektywa',name:'Nowa perspektywa',icon:'🪟',category:'eksperymenty',desc:'Spędź chwilę w innym miejscu i obserwuj świat.',xp:15},
{id:'d-smiech',name:'Śmiech bez powodu',icon:'😂',category:'humor',desc:'Przejdź się lub zatańcz bez powodu przez minutę.',xp:10},
{id:'d-pseudonim',name:'Pseudonim dnia',icon:'🦸',category:'humor',desc:'Wymyśl sobie zabawny pseudonim na dziś.',xp:10},
{id:'d-robot',name:'Robot, który spał',icon:'🤖',category:'humor',desc:'Wykonaj zwykłą rutynę w zupełnie innym rytmie.',xp:10},
{id:'d-20slow',name:'Krótka legenda',icon:'✍️',category:'eksperymenty',desc:'Opisz dziś jednym akapitem lub dwudziestoma słowami.',xp:10},
{id:'d-przyszlosc',name:'Szept przyszłości',icon:'📮',category:'eksperymenty',desc:'Napisz krótką wiadomość do siebie sprzed/za rok.',xp:15},
{id:'d-sen',name:'Sen o poranku',icon:'🌙',category:'odpoczynek',desc:'Pójdź spać o wcześniej zaplanowanej porze.',xp:20}
];

const LEGACY_ACHIEVEMENTS=[
{name:'Pierwsze kroki',icon:'🚪',desc:'Odwiedź stronę po raz pierwszy.',xp:10},
{name:'Stały bywalec',icon:'🏠',desc:'Odwiedź stronę 5 razy.',xp:20},
{name:'Domownik',icon:'🏡',desc:'Odwiedź stronę 20 razy.',xp:30},
{name:'Serduszkowy',icon:'💗',desc:'Kliknij pulsujące serce.',xp:10},
{name:'Puls',icon:'💓',desc:'Kliknij serce 5 razy.',xp:20},
{name:'Powiedz mi to',icon:'💌',desc:'Użyj przycisku miłości.',xp:10},
{name:'Zakochany',icon:'💖',desc:'Kliknij przycisk miłości 10 razy.',xp:20},
{name:'Mistrz miłości',icon:'❤️‍🔥',desc:'Kliknij przycisk miłości 100 razy.',xp:50},
{name:'Listonosz',icon:'📜',desc:'Przeczytaj list.',xp:10},
{name:'Podróżnik',icon:'🚶',desc:'Zobacz oś czasu.',xp:10},
{name:'Wszystkie powody',icon:'💖',desc:'Odkryj wszystkie powody.',xp:25},
{name:'Fotograf',icon:'📸',desc:'Otwórz galerię.',xp:10},
{name:'Lightbox',icon:'🔍',desc:'Powiększ zdjęcie.',xp:15},
{name:'Szczęściarz',icon:'🎡',desc:'Zakręć kołem.',xp:15},
{name:'Tester miłości',icon:'💘',desc:'Użyj Love Tester.',xp:15},
{name:'Quizowicz',icon:'❓',desc:'Ukończ quiz.',xp:20},
{name:'Perfekcjonista',icon:'🌟',desc:'Ukończ quiz bez błędu.',xp:50},
{name:'Rozpakowany',icon:'🎁',desc:'Otwórz pierwszy prezent.',xp:15},
{name:'Kolekcjoner',icon:'🎀',desc:'Otwórz wszystkie prezenty.',xp:40},
{name:'Gracz',icon:'🎮',desc:'Rozpocznij minigrę.',xp:10},
{name:'Rekordzista',icon:'🏆',desc:'Pobij rekord w minigrze.',xp:40},
{name:'Nocny marek',icon:'🌙',desc:'Przełącz motyw.',xp:10},
{name:'Kod Konami',icon:'🎮',desc:'Wpisz kod Konami.',xp:100},
{name:'Legenda',icon:'👑',desc:'Odblokuj 40 osiągnięć.',xp:100}
].map((a,i)=>({...a,id:`legacy-${i+1}`,category:'nasza strona',hidden:i===22,rule:'Własna akcja na stronie.'}));

const ACHIEVEMENTS_DATA=[...DAILY_ACHIEVEMENTS.map(a=>({...a,type:'daily',xp:a.xp||10,hidden:false,rule:'Kliknij „Wykonane” po wykonaniu zadania.'})),...LEGACY_ACHIEVEMENTS];

const STORAGE_KEY='nasza-strona-pro-v1';
function readProgress(){try{const d=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}');return d&&typeof d==='object'?d:{}}catch(e){return{}}}
function saveProgress(d){localStorage.setItem(STORAGE_KEY,JSON.stringify(d))}
function todayKey(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
function getXP(){const d=readProgress();return Number(d.xp||0)}
function getLevel(){const xp=getXP();return 1+Math.floor(xp/100)}
function toast(title,icon='🏆'){const c=document.getElementById('achievementToast');if(!c)return;c.querySelector('.toast-icon').textContent=icon;c.querySelector('.toast-title').text=z=title;c.classList.add('show');clearTimeout(window.__toastTimer);window.__toastTimer=setTimeout(()=>c.classList.remove('show'),4000)}

function unlockAchievement(id,source='manual'){
 const d=readProgress();d.unlocked=d.unlocked||{};
 if(d.unlocked[id])return false;
 const a=ACHIEVEMENTS_DATA.find(x=>x.id===id);if(!a)return false;
 d.unlocked[id]={date:new Date().toISOString(),source};d.xp=(d.xp||0)+(a.xp||10);saveProgress(d);renderAchievements();toast(a.name,a.icon);burstAchievement();return true;
}
function burstAchievement(){if(document.getElementById('achievementToast')){for(let i=0;i<18;i++)setTimeout(()=>createFloating(innerWidth/2,innerHeight/2,['✨','⭐','💖','🏆'][i%4],18,1600),i*20)}}

function isDailyUnlocked(id){const d=readProgress();return d.daily&&d.daily[todayKey()]&&d.daily[todayKey()].includes(id)}
function toggleDaily(id){const d=readProgress();d.daily=d.daily||{};d.daily[todayKey()]=d.daily[todayKey()]||[];const arr=d.daily[todayKey()];const i=arr.indexOf(id);
 if(i>=0){arr.splice(i,1);d.xp=Math.max(0,(d.xp||0)-(DAILY_ACHIEVEMENTS.find(a=>a.id===id)?.xp||10));saveProgress(d)}
 else{arr.push(id);saveProgress(d);unlockAchievement(id,'daily')}
 renderAchievements();}

function initAchievements(){
 let box=document.getElementById('achievements');
 if(!box){box=document.querySelector('.achievements-section')||null}if(!box)return;
 const panel=box.querySelector('.steam-panel')||box;
 panel.insertAdjacentHTML('afterbegin',`<div class="achievement-toolbar"><input id="achievementSearch" type="search" placeholder="Szukaj osiągnięcia…" aria-label="Szukaj"><select id="achievementCategory"><option value="all">Wszystkie</option><option value="daily">Codzienne</option><option value="zdrowie">Zdrowie</option><option value="ruch">Ruch</option><option value="dom">Dom</option><option value="nauka">Nauka</option><option value="praca">Praca</option><option value="odpoczynek">Relaks</option><option value="relacje">Relacje</option><option value="eksperymenty">Eksperymenty</option><option value="humor">Humor</option><option value="finanse">Finanse</option><option value="nasza strona">Nasza strona</option></select><select id="achievementStatus"><option value="all">Wszystkie</option><option value="unlocked">Odblokowane</option><option value="locked">Zablokowane</option></select></div><div class="xp-panel"><div><strong>Poziom <span id="playerLevel">1</span></strong><span id="playerXP">0 XP</span></div><div class="xp-bar"><div id="xpFill"></div></div></div><div id="achievementToast" class="achievement-toast"><span class="toast-icon">🏆</span><div><small>Odblokowano!</small><strong class="toast-title"></strong></div></div>`);
 document.getElementById('achievementSearch').addEventListener('input',renderAchievements);
 document.getElementById('achievementCategory').addEventListener('change',renderAchievements);
 document.getElementById('achievementStatus').addEventListener('change',renderAchievements);
 renderAchievements();
}

function renderAchievements(){
 const grid=document.getElementById('achievementsGrid');if(!grid)return;
 const d=readProgress();const unlocked=d.unlocked||{};
 const search=(document.getElementById('achievementSearch')?.value||'').toLowerCase();
 const category=document.getElementById('achievementCategory')?.value||'all';
 const status=document.getElementById('achievementStatus')?.value||'all';
 let shown=ACHIEVEMENTS_DATA.filter(a=>{
  const ok=category==='all'||(category==='daily'?a.type==='daily':a.category===category)||false;
  const is=!!unlocked[a.id];
  const st=status==='all'||(status==='unlocked'?is:!is);
  return ok&&st&&(!search||a.name.toLowerCase().includes(search)||a.desc.toLowerCase().includes(search));
 });
 let count=Object.keys(unlocked).length;
 document.getElementById('achievementsCount').textContent=count;
 document.getElementById('achievementsTotal').textContent=ACHIEVEMENTS_DATA.length;
 const percent=ACHIEVEMENTS_DATA.length?Math.round(count/ACHIEVEMENTS_DATA.length*100):0;
 document.getElementById('achPercent').textContent=`(${percent}%)`;document.getElementById('achProgressFill').style.width=percent+'%';
 const level=getLevel(),xp=getXP(),current=xp%100;
 document.getElementById('playerLevel').textContent=level;document.getElementById('playerXP').textContent=xp+' XP';document.getElementById('xpFill').style.width=current+'%';
 grid.innerHTML=shown.map(a=>{const is=!!unlocked[a.id];const daily=a.type==='daily';const dailyDone=daily&&isDailyUnlocked(a.id);const hidden=a.hidden&&!is;
  if(hidden)return `<article class="ach-card locked secret"><div class="ach-icon">❓</div><div class="ach-info"><h4>Tajne osiągnięcie</h4><p>Odkryj sposób, by odblokować.</p></div></article>`;
  return `<article class="ach-card ${is?'unlocked':'locked'}"><div class="ach-icon">${is||!a.hidden?a.icon:'❓'}</div><div class="ach-info"><h4>${a.name}</h4><p>${a.desc}</p><span class="ach-meta">${a.category||'ogólne'} • ${a.xp||10} XP</span></div>${daily?`<button class="daily-check ${dailyDone?'done':''}" data-achievement="${a.id}" aria-label="${dailyDone?'Anuluj wykonanie':'Oznacz jako wykonane'}">${dailyDone?'✓':'Wykonane'}</button>`:''}</article>`}).join('');
 grid.queryAll=grid.querySelectorAll.bind(grid);
 grid.querySelectorAll('[data-achievement]').forEach(b=>b.addEventListener('click',()=>toggleDaily(b.dataset.achievement)));
}

function exportProgress(){const blob=new Blob([localStorage.getItem(STORAGE_KEY)||'{}'],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='postep-nasza-strona.json';a.click();URL.revokeObjectURL(a.href)}
function importProgress(file){const r=new FileReader;r.onload=()=>{try{const d=JSON.parse(r.result);if(!d||typeof d!='object')throw 0;localStorage.setItem(STORAGE_KEY,JSON.stringify(d));renderAchievements();toast('Postęp przywrócony','📥')}catch(e){toast('Nieprawidłowy plik','⚠️')}};r.readAsText(file)}

function extendExistingActions(){
 const loveBtn=document.getElementById('loveBtn');if(loveBtn)loveBtn.addEventListener('click',()=>{const n=parseInt(localStorage.getItem('statsLove')||'0');if(n>=10)unlockAchievement('legacy-7');if(n>=100)unlockAchievement('legacy-8')});
 const heart=document.querySelector('.pulse-heart');if(heart)heart.addEventListener('click',()=>unlockAchievement('legacy-4'));
 const conf=document.getElementById('confettiBtn');if(conf)conf.addEventListener('click',()=>unlockAchievement('legacy-22'));
 document.querySelectorAll('.gift').forEach(g=>g.addEventListener('click',()=>{const opened=document.querySelectorAll('.gift.opened').length;if(opened>=1)unlockAchievement('legacy-18');if(document.querySelectorAll('.gift').length===opened)unlockAchievement('legacy-19')}));
 document.getElementById('gameStartBtn')?.addEventListener('click',()=>unlockAchievement('legacy-20'));
}

const originalInitMainPage=typeof initMainPage==='function'?initMainPage:null;
window.initMainPage=function(){if(originalInitMainPage)originalInitMainPage();initAchievements();extendExistingActions();unlockAchievement('legacy-1')};
