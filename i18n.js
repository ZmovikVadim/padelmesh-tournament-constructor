/*
 * Padelmesh — общий модуль локализации (RU / EN / ES).
 *
 * Подключение:  <script src="i18n.js"></script>  (в <head>, до основного скрипта страницы)
 * Разметка статики:
 *   data-i18n="key"        — textContent
 *   data-i18n-html="key"   — innerHTML (для строк с <b>, <em> и т.п.)
 *   data-i18n-ph="key"     — placeholder
 *   data-i18n-title="key"  — title
 * Переключатель языка:  <div class="lang-switch" data-lang-switch></div>  (стили инжектятся отсюда)
 *
 * В JS:  PMI18N.t('key', {var: value})   — с подстановкой {var}
 *        PMI18N.formatDate(iso)          — дата по текущей локали
 *        PMI18N.lang                     — текущий язык
 *        событие window 'pm:langchange'  — перерисуйте динамический контент здесь
 *
 * Язык по умолчанию — русский; выбор сохраняется в localStorage (padelmesh_lang).
 */
(function () {
  'use strict';

  var LANGS = ['ru', 'en', 'es'];
  var STORE = 'padelmesh_lang';
  var lang = 'ru';
  try { var saved = localStorage.getItem(STORE); if (saved && LANGS.indexOf(saved) >= 0) lang = saved; } catch (e) {}

  /* ============================== СЛОВАРИ ============================== */
  var DICT = {
    /* ------------------------------- RU ------------------------------- */
    ru: {
      /* nav / общее */
      'nav.home': 'Главная',
      'crumb.new': 'Новый турнир',
      'badge.tournaments': 'Турниры',
      'common.cancel': 'Отмена',
      'common.delete': '🗑 Удалить',
      'common.save': '💾 Сохранить',

      /* index — создание */
      'index.title': 'Турниры — Padelmesh',
      'index.h1': 'Создай свой <em>падел-турнир</em> за минуту',
      'index.subtitle': 'Выбери формат, укажи участников — и получи готовые сетки на каждый корт и каждый раунд. Счёт, таблица лидеров и ссылка для зрителей уже внутри.',
      'index.newT': 'Новый турнир',
      'index.name.ph': 'Например: Пятничное Americano в Padel Club (можно пропустить)',
      'index.type.label': 'Тип турнира',
      'index.type.hint': 'Дату, количество игроков и кортов выберете на следующем шаге',
      'index.btn.create': 'Создать турнир →',
      'index.soon': '· скоро',
      'index.tag.progressive': 'раунд за раундом',
      'index.tag.upfront': 'сетка сразу',
      'index.next.progressive': 'Сетка следующего раунда генерируется после ввода результатов текущего.',
      'index.next.upfront': 'Сетки всех раундов генерируются сразу при старте.',
      'index.err.notReady': 'Генератор формата «{name}» в разработке. Пока доступен Classic Americano — попробуйте его!',
      'index.menu.create': '🎾 Создать турнир',
      'index.menu.clubs': '🏟️ Мои клубы',
      'index.menu.tournaments': '🏆 Мои турниры',

      /* index — клубы */
      'index.clubs.h1': 'Мои клубы',
      'index.clubs.subtitle': 'Клубы, в которых вы проводите турниры. Названия появятся в подсказках поля «Клуб» при создании турнира. На проде раздел переедет в личный кабинет.',
      'index.clubs.new': 'Новый клуб',
      'index.clubs.ph': 'Название клуба',
      'index.clubs.add': '+ Добавить',
      'index.clubs.none': 'Пока нет клубов — добавьте первый.',
      'index.clubs.dupErr': 'Такой клуб уже есть в списке.',
      'index.clubs.emptyErr': 'Название не может быть пустым.',
      'index.clubs.editLabel': 'Название клуба',
      'index.clubs.cardMeta': 'Доступен в подсказках при создании турнира',
      'index.clubs.edit': '✏️ Изменить',
      'index.clubs.delTitle': 'Удалить клуб?',
      'index.clubs.delMsg': '«{name}» исчезнет из списка и из подсказок при создании турнира.',

      /* index — мои турниры */
      'index.tour.h1': 'Мои турниры',
      'index.tour.subtitle': 'Турниры сохраняются автоматически — можно вернуться и продолжить в любой момент. На проде раздел переедет в личный кабинет.',
      'index.tour.current': 'Текущие',
      'index.tour.finished': 'Завершённые',
      'index.tour.none': 'Пока нет сохранённых турниров — создайте первый в разделе «Создать турнир».',
      'index.card.finishedStatus': '🏁 Завершён',
      'index.card.playedStatus': 'Сыграно матчей: {filled} из {total}',
      'index.card.delTitle': 'Удалить турнир?',
      'index.card.delMsg': '«{name}» будет удалён безвозвратно вместе со всеми результатами.',

      /* setup — общее */
      'setup.name.label': 'Название турнира',
      'setup.name.ph': 'Например: Пятничное {format} в Padel Club (можно пропустить)',
      'setup.date': 'Дата',
      'setup.time': 'Время начала',
      'setup.club': 'Клуб',
      'setup.club.ph': 'Название клуба (можно пропустить)',
      'setup.club.hint': 'Скоро — выбор из «Моих клубов»',
      'setup.payLink.label': 'Ссылка для оплаты',
      'setup.payLink.ph': 'Например, ссылка Tikkie или PayPal (необязательно)',
      'setup.payLink.hint': 'Необязательно. Будет видна всем, у кого есть ссылка на турнир.',
      't.payLink.button': '💳 Оплатить участие',
      'setup.players': 'Игроков',
      'setup.pairs': 'Пар',
      'setup.rounds': 'Раундов',
      'setup.matchPoints': 'Очков в матче',
      'setup.matchPoints.hint': 'Сумма очков двух команд в каждом матче',
      'setup.matchPoints.hintPairs': 'Сумма очков двух пар в каждом матче',
      'setup.step1': 'Параметры турнира',
      'setup.step2.players': 'Имена игроков',
      'setup.step2.pairs': 'Составы пар',
      'setup.step2.hint': 'Можно пропустить — пустые поля получат номера по порядку (Игрок 1, Игрок 2…)',
      'setup.step2.hintPairs': 'Два игрока в каждой паре. Можно пропустить — пустые поля получат номера по порядку',
      'setup.step2.hintMix': 'Можно пропустить — пустые поля получат номера по порядку (Мужчина 1, Женщина 1…)',
      'setup.step3.courts': 'Названия кортов',
      'setup.step3.hint': 'Можно пропустить — корты будут пронумерованы по порядку',
      'setup.step3.hintKotc': 'Можно пропустить — корты будут пронумерованы по порядку. Первый корт — королевский 👑, последний — нижний',
      'setup.btn.toNames': 'Далее: имена игроков →',
      'setup.btn.toPairs': 'Далее: составы пар →',
      'setup.btn.back': '← Назад',
      'setup.btn.start': 'Сгенерировать сетку →',
      'setup.courtsHint': 'Кортов: {courts}',
      'setup.courtsHint.rest': ' · отдыхают каждый раунд: {rest}',
      'setup.mix.men': '♂ Мужчины',
      'setup.mix.women': '♀ Женщины',
      'setup.mix.man': 'Мужчина',
      'setup.mix.woman': 'Женщина',
      'setup.mix.balancedHint': 'Поровну мужчин и женщин',
      'setup.mix.count': '{men} М + {women} Ж',

      /* значения по умолчанию */
      'default.player': 'Игрок {n}',
      'default.man': 'Мужчина {n}',
      'default.woman': 'Женщина {n}',
      'default.court': 'Корт {n}',
      'default.pair': 'Пара {n}',

      /* ошибки */
      'err.dupNames': 'Имена игроков не должны повторяться.',
      'err.mixBalance': 'Нужно поровну мужчин и женщин.',

      /* вид турнира */
      't.defaultTitle': 'Турнир {format}',
      'sub.players': '{n} игроков',
      'sub.pairs': '{n} пар',
      'sub.courtsN': 'кортов: {n}',
      'sub.courtsWord': '{n} корт(а)',
      'sub.rounds': '{n} раундов',
      'sub.matchTo': 'матч до {mp} очков (в сумме)',
      'sub.mixCount': '{men} М + {women} Ж',
      'sub.finished': '🏁 турнир завершён',
      'sub.allDone': '✅ все результаты внесены',
      'sub.readOnly': '🔒 режим просмотра',

      't.tab.round': 'Раунд {n}',
      't.tab.final': '🏆 Финальные результаты',
      't.showResults': '🏆 Показать результаты',
      't.delRoundModal.title': 'Удалить последний раунд?',
      't.delRoundModal.ok': '➖ Удалить раунд',
      't.final.h2': 'Финальные результаты',
      't.final.finished': 'турнир завершён',
      't.final.allDone': 'все результаты внесены',
      't.final.lbTitle': 'Итоговая таблица',
      't.lb.title': '🏆 Таблица лидеров',
      't.lb.th.player': 'Игрок',
      't.lb.th.pair': 'Пара',
      't.lb.th.pay': 'Оплата',
      't.lb.th.matches': 'Матчи',
      't.lb.th.wins': 'Победы',
      't.lb.th.points': 'Очки',
      't.lb.payTitle': 'Отметка об оплате — видна только организатору',
      't.lb.payCheck': 'Оплатил участие',
      't.lb.payCheckPair': 'Пара оплатила участие',

      't.resting.title': '😴 Отдыхают в этом раунде',
      't.resting.note': '{names} — после завершения раунда начисляется {pts} очков (среднее количество очков команды в раунде).',
      't.variety': 'Разнообразие сетки: в среднем {p} разных партнёров и {o} разных соперников на игрока (из {max} возможных).',
      't.variety.mix': 'Разнообразие сетки: в среднем {p} разных партнёров (из {maxP} возможных противоположного пола) и {o} разных соперников (из {maxO} возможных) на игрока.',
      't.variety.team': 'Разнообразие сетки: в среднем {o} разных пар-соперников на пару (из {max} возможных).',
      't.variety.kotc': 'Разнообразие сетки: в среднем {p} разных партнёров и {o} разных соперников на игрока. Итоговое место определяется кортом и результатом последнего раунда.',

      't.actions.save': '💾 Сохранить турнир',
      't.actions.share': '🔗 Поделиться турниром',
      't.actions.reshuffle': '🔄 Пересобрать сетку (счёт сбросится)',
      't.actions.restart': '🔄 Начать заново (счёт сбросится)',
      't.actions.addRound': '➕ Добавить раунд',
      't.actions.delRound': '➖ Удалить последний раунд',
      't.actions.new': 'Новый турнир',
      't.btn.finish': '🏁 Завершить турнир',
      't.finishModal.title': 'Завершить турнир?',
      't.finishModal.body': 'Турнир переместится в раздел «Завершённые» на главной странице. Результаты сохранятся, и при необходимости вы сможете вернуться и отредактировать их.',
      't.finishModal.confirm': '🏁 Завершить',

      /* поделиться / сохранить */
      'share.copyPrompt': 'Скопируйте ссылку:',
      'share.note': '✅ Ссылка скопирована. Это снимок текущих результатов: по ссылке видны сетка, счёт и таблица лидеров без возможности что-то менять. После новых результатов сгенерируйте ссылку заново.',
      'save.db': '💾 Турнир сохранён в базу (SQLite). Он доступен на главной в разделе «Мои турниры».',
      'save.local': '💾 Турнир сохранён локально в браузере. Он доступен на главной в разделе «Мои турниры». Запустите server.py, чтобы хранить турниры в SQLite.',
      'confirm.reshuffle': 'Пересобрать сетку? Все введённые результаты будут сброшены.',
      'confirm.reshuffleRR': 'Пересобрать сетку (новая жеребьёвка)? Все введённые результаты будут сброшены.',
      'confirm.restart': 'Начать турнир заново? Останется случайный первый раунд, все результаты будут сброшены.',
      'confirm.delRound': 'Удалить последний раунд? Если в нём есть результаты, они будут удалены, а текущая таблица станет итоговой.',

      /* пьедестал */
      'podium.aria': 'Пьедестал победителей',
      'podium.pts': '{pts} очк.',

      /* прогрессивные форматы */
      'prog.played': 'Раунд {n} сыгран ✓',
      'prog.warnCheck': '⚠️ Внимательно проверьте результаты текущего раунда перед генерацией следующего.',
      'prog.genBtn': '⚡ Сгенерировать раунд {n} из {total} →',
      'prog.wait': '⏳ Внесите результаты всех матчей раунда — после этого можно будет сгенерировать раунд {n} из {total} по текущей таблице.',
      'prog.wait.kotc': '⏳ Внесите результаты всех матчей раунда — после этого можно будет сгенерировать раунд {n} из {total} по результатам этого раунда.',
      'prog.regen.info': 'Раунд {n} собран по таблице после раунда {prev}. Если вы исправили результаты предыдущих раундов — пересоберите рассадку, пока результаты этого раунда не внесены.',
      'prog.regen.info.team': 'Раунд собран по таблице после предыдущего раунда. Если вы исправили результаты — пересоберите рассадку, пока результаты этого раунда не внесены.',
      'prog.regen.info.kotc': 'Раунд {n} собран по результатам раунда {prev}. Если вы исправили результаты — пересоберите рассадку, пока результаты этого раунда не внесены.',
      'prog.regen.btn': '🔄 Пересобрать раунд {n} по актуальной таблице',
      'prog.regen.btn.kotc': '🔄 Пересобрать раунд {n} по результатам',
      'prog.next.mexicano': 'Следующий раунд будет собран по текущей таблице: на первом корте — места 1–4 (1-й с 4-м против 2-го с 3-м), дальше места 5–8 и т.д.',
      'prog.next.teamMexicano': 'Следующий раунд будет собран по таблице пар: на первом корте — пары с 1-го и 2-го мест, дальше 3-е и 4-е и т.д.',
      'prog.next.mixicano': 'Следующий раунд будет собран по таблице: лучшие двое мужчин и лучшие две женщины — на первом корте (кросс-пары: 1-й мужчина со 2-й женщиной против 2-го мужчины с 1-й женщиной), дальше следующая четвёрка и т.д.',
      'prog.next.kotc': 'Победители поднимутся на корт выше, проигравшие спустятся ниже, пары внутри кортов перемешаются.',
      'kotc.noDraw': '⚠️ В King of the Court ничьи не допускаются — без победителя нельзя распределить игроков по кортам. Скорректируйте счёт.',

      /* round robin */
      'rr.info': 'Круговой турнир: каждая пара сыграет с каждой ровно один раз ({opp} соперников).',

      /* карточка игрока / пары (кликабельные имена в таблице) */
      'card.linkTitle': 'Открыть карточку игрока',
      'card.linkTitlePair': 'Открыть карточку пары',
      'card.closeTitle': 'Закрыть',
      'card.summary': 'Очков: {pts} · Побед: {wins} · Матчей: {games} · Место: {rank}',
      'card.roundsTitle': 'По раундам',
      'card.th.round': 'Раунд',
      'card.th.court': 'Корт',
      'card.th.partner': 'Партнёр',
      'card.th.opponents': 'Соперники',
      'card.th.score': 'Счёт',
      'card.th.result': 'Итог',
      'card.th.points': 'Очки',
      'card.result.win': 'Победа',
      'card.result.loss': 'Поражение',
      'card.result.draw': 'Ничья',
      'card.rest': 'Отдых',
      'card.notPlayed': '—'
    },

    /* ------------------------------- EN ------------------------------- */
    en: {
      'nav.home': 'Home',
      'crumb.new': 'New tournament',
      'badge.tournaments': 'Tournaments',
      'common.cancel': 'Cancel',
      'common.delete': '🗑 Delete',
      'common.save': '💾 Save',

      'index.title': 'Tournaments — Padelmesh',
      'index.h1': 'Create your <em>padel tournament</em> in a minute',
      'index.subtitle': 'Pick a format, add players — and get ready-made draws for every court and round. Scoring, leaderboard, and a spectator link are built in.',
      'index.newT': 'New tournament',
      'index.name.ph': 'e.g. Friday Americano at Padel Club (optional)',
      'index.type.label': 'Tournament type',
      'index.type.hint': 'Pick the date, number of players and courts on the next step',
      'index.btn.create': 'Create tournament →',
      'index.soon': '· soon',
      'index.tag.progressive': 'round by round',
      'index.tag.upfront': 'full draw upfront',
      'index.next.progressive': "The next round's draw is generated after the current round's results are entered.",
      'index.next.upfront': 'All rounds are generated at once when you start.',
      'index.err.notReady': 'The «{name}» format generator is in development. Classic Americano is available — give it a try!',
      'index.menu.create': '🎾 Create tournament',
      'index.menu.clubs': '🏟️ My clubs',
      'index.menu.tournaments': '🏆 My tournaments',

      'index.clubs.h1': 'My clubs',
      'index.clubs.subtitle': 'Clubs where you run tournaments. Their names appear as suggestions in the «Club» field when creating a tournament. In production this section will move to your account.',
      'index.clubs.new': 'New club',
      'index.clubs.ph': 'Club name',
      'index.clubs.add': '+ Add',
      'index.clubs.none': 'No clubs yet — add your first one.',
      'index.clubs.dupErr': 'This club is already in the list.',
      'index.clubs.emptyErr': "The name can't be empty.",
      'index.clubs.editLabel': 'Club name',
      'index.clubs.cardMeta': 'Available as a suggestion when creating a tournament',
      'index.clubs.edit': '✏️ Edit',
      'index.clubs.delTitle': 'Delete club?',
      'index.clubs.delMsg': '«{name}» will disappear from the list and from tournament creation suggestions.',

      'index.tour.h1': 'My tournaments',
      'index.tour.subtitle': 'Tournaments are saved automatically — you can come back and continue any time. In production this section will move to your account.',
      'index.tour.current': 'In progress',
      'index.tour.finished': 'Finished',
      'index.tour.none': 'No saved tournaments yet — create your first one in «Create tournament».',
      'index.card.finishedStatus': '🏁 Finished',
      'index.card.playedStatus': 'Matches played: {filled} of {total}',
      'index.card.delTitle': 'Delete tournament?',
      'index.card.delMsg': '«{name}» will be permanently deleted along with all results.',

      'setup.name.label': 'Tournament name',
      'setup.name.ph': 'e.g. Friday {format} at Padel Club (optional)',
      'setup.date': 'Date',
      'setup.time': 'Start time',
      'setup.club': 'Club',
      'setup.club.ph': 'Club name (optional)',
      'setup.club.hint': 'Coming soon — pick from «My clubs»',
      'setup.payLink.label': 'Payment link',
      'setup.payLink.ph': 'e.g. a Tikkie or PayPal link (optional)',
      'setup.payLink.hint': 'Optional. Visible to anyone who has the tournament link.',
      't.payLink.button': '💳 Pay the entry',
      'setup.players': 'Players',
      'setup.pairs': 'Pairs',
      'setup.rounds': 'Rounds',
      'setup.matchPoints': 'Points per match',
      'setup.matchPoints.hint': 'Combined points of both teams in each match',
      'setup.matchPoints.hintPairs': 'Combined points of both pairs in each match',
      'setup.step1': 'Tournament settings',
      'setup.step2.players': 'Player names',
      'setup.step2.pairs': 'Pair line-ups',
      'setup.step2.hint': 'Optional — empty fields get sequential numbers (Player 1, Player 2…)',
      'setup.step2.hintPairs': 'Two players per pair. Optional — empty fields get sequential numbers',
      'setup.step2.hintMix': 'Optional — empty fields get sequential numbers (Man 1, Woman 1…)',
      'setup.step3.courts': 'Court names',
      'setup.step3.hint': 'Optional — courts will be numbered in order',
      'setup.step3.hintKotc': "Optional — courts will be numbered in order. The first court is the king's court 👑, the last is the bottom one",
      'setup.btn.toNames': 'Next: player names →',
      'setup.btn.toPairs': 'Next: pair line-ups →',
      'setup.btn.back': '← Back',
      'setup.btn.start': 'Generate draw →',
      'setup.courtsHint': 'Courts: {courts}',
      'setup.courtsHint.rest': ' · sitting out each round: {rest}',
      'setup.mix.men': '♂ Men',
      'setup.mix.women': '♀ Women',
      'setup.mix.man': 'Man',
      'setup.mix.woman': 'Woman',
      'setup.mix.balancedHint': 'Equal men and women',
      'setup.mix.count': '{men} M + {women} W',

      'default.player': 'Player {n}',
      'default.man': 'Man {n}',
      'default.woman': 'Woman {n}',
      'default.court': 'Court {n}',
      'default.pair': 'Pair {n}',

      'err.dupNames': 'Player names must not repeat.',
      'err.mixBalance': 'You need an equal number of men and women.',

      't.defaultTitle': '{format} tournament',
      'sub.players': '{n} players',
      'sub.pairs': '{n} pairs',
      'sub.courtsN': 'courts: {n}',
      'sub.courtsWord': '{n} courts',
      'sub.rounds': '{n} rounds',
      'sub.matchTo': 'match to {mp} points (combined)',
      'sub.mixCount': '{men} M + {women} W',
      'sub.finished': '🏁 tournament finished',
      'sub.allDone': '✅ all results entered',
      'sub.readOnly': '🔒 view-only mode',

      't.tab.round': 'Round {n}',
      't.tab.final': '🏆 Final results',
      't.showResults': '🏆 Show results',
      't.delRoundModal.title': 'Remove the last round?',
      't.delRoundModal.ok': '➖ Remove round',
      't.final.h2': 'Final results',
      't.final.finished': 'tournament finished',
      't.final.allDone': 'all results entered',
      't.final.lbTitle': 'Final standings',
      't.lb.title': '🏆 Leaderboard',
      't.lb.th.player': 'Player',
      't.lb.th.pair': 'Pair',
      't.lb.th.pay': 'Paid',
      't.lb.th.matches': 'Matches',
      't.lb.th.wins': 'Wins',
      't.lb.th.points': 'Points',
      't.lb.payTitle': 'Payment mark — visible only to the organizer',
      't.lb.payCheck': 'Paid the entry',
      't.lb.payCheckPair': 'Pair paid the entry',

      't.resting.title': '😴 Sitting out this round',
      't.resting.note': '{names} — once the round is complete they get {pts} points (the average team score per round).',
      't.variety': 'Draw variety: on average {p} different partners and {o} different opponents per player (out of {max} possible).',
      't.variety.mix': 'Draw variety: on average {p} different partners (out of {maxP} possible of the opposite sex) and {o} different opponents (out of {maxO} possible) per player.',
      't.variety.team': 'Draw variety: on average {o} different opponent pairs per pair (out of {max} possible).',
      't.variety.kotc': 'Draw variety: on average {p} different partners and {o} different opponents per player. The final place is decided by court and the result of the last round.',

      't.actions.save': '💾 Save tournament',
      't.actions.share': '🔗 Share tournament',
      't.actions.reshuffle': '🔄 Rebuild the draw (scores reset)',
      't.actions.restart': '🔄 Start over (scores reset)',
      't.actions.addRound': '➕ Add a round',
      't.actions.delRound': '➖ Remove last round',
      't.actions.new': 'New tournament',
      't.btn.finish': '🏁 Finish tournament',
      't.finishModal.title': 'Finish tournament?',
      't.finishModal.body': 'The tournament will move to «Finished» on the home page. Results are saved, and you can come back and edit them if needed.',
      't.finishModal.confirm': '🏁 Finish',

      'share.copyPrompt': 'Copy the link:',
      'share.note': "✅ Link copied. It's a snapshot of the current results: the link shows the draw, scores and leaderboard with no editing. After new results, generate the link again.",
      'save.db': "💾 Tournament saved to the database (SQLite). It's available under «My tournaments» on the home page.",
      'save.local': "💾 Tournament saved locally in the browser. It's available under «My tournaments» on the home page. Run server.py to store tournaments in SQLite.",
      'confirm.reshuffle': 'Rebuild the draw? All entered results will be reset.',
      'confirm.reshuffleRR': 'Rebuild the draw (new draw)? All entered results will be reset.',
      'confirm.restart': 'Start the tournament over? A random first round remains, all results are reset.',
      'confirm.delRound': 'Remove the last round? Any results in it will be deleted and the current standings become final.',

      'podium.aria': "Winners' podium",
      'podium.pts': '{pts} pts',

      'prog.played': 'Round {n} played ✓',
      'prog.warnCheck': "⚠️ Double-check the current round's results before generating the next one.",
      'prog.genBtn': '⚡ Generate round {n} of {total} →',
      'prog.wait': '⏳ Enter all match results for the round — then you can generate round {n} of {total} from the current standings.',
      'prog.wait.kotc': "⏳ Enter all match results for the round — then you can generate round {n} of {total} from this round's results.",
      'prog.regen.info': 'Round {n} was built from the standings after round {prev}. If you fixed earlier results, rebuild the seeding while this round has no scores.',
      'prog.regen.info.team': 'The round was built from the standings after the previous round. If you fixed results, rebuild the seeding while this round has no scores.',
      'prog.regen.info.kotc': "Round {n} was built from round {prev}'s results. If you fixed results, rebuild the seeding while this round has no scores.",
      'prog.regen.btn': '🔄 Rebuild round {n} from the current standings',
      'prog.regen.btn.kotc': '🔄 Rebuild round {n} from the results',
      'prog.next.mexicano': 'The next round is built from the current standings: court 1 gets places 1–4 (1st with 4th vs 2nd with 3rd), then places 5–8, and so on.',
      'prog.next.teamMexicano': 'The next round is built from the pair standings: court 1 gets the 1st- and 2nd-placed pairs, then 3rd and 4th, and so on.',
      'prog.next.mixicano': 'The next round is built from the standings: the top two men and top two women meet on court 1 (cross pairs: 1st man with 2nd woman vs 2nd man with 1st woman), then the next four, and so on.',
      'prog.next.kotc': 'Winners move up a court, losers move down, and pairs within each court are reshuffled.',
      'kotc.noDraw': "⚠️ Draws aren't allowed in King of the Court — without a winner players can't be moved between courts. Adjust the score.",

      'rr.info': 'Round robin: every pair plays every other exactly once ({opp} opponents).',

      'card.linkTitle': 'Open player card',
      'card.linkTitlePair': 'Open pair card',
      'card.closeTitle': 'Close',
      'card.summary': 'Points: {pts} · Wins: {wins} · Matches: {games} · Place: {rank}',
      'card.roundsTitle': 'Round by round',
      'card.th.round': 'Round',
      'card.th.court': 'Court',
      'card.th.partner': 'Partner',
      'card.th.opponents': 'Opponents',
      'card.th.score': 'Score',
      'card.th.result': 'Result',
      'card.th.points': 'Points',
      'card.result.win': 'Win',
      'card.result.loss': 'Loss',
      'card.result.draw': 'Draw',
      'card.rest': 'Rest',
      'card.notPlayed': '—'
    },

    /* ------------------------------- ES ------------------------------- */
    es: {
      'nav.home': 'Inicio',
      'crumb.new': 'Nuevo torneo',
      'badge.tournaments': 'Torneos',
      'common.cancel': 'Cancelar',
      'common.delete': '🗑 Eliminar',
      'common.save': '💾 Guardar',

      'index.title': 'Torneos — Padelmesh',
      'index.h1': 'Crea tu <em>torneo de pádel</em> en un minuto',
      'index.subtitle': 'Elige un formato, añade jugadores y obtén cuadros listos para cada pista y ronda. Marcador, clasificación y enlace para espectadores ya incluidos.',
      'index.newT': 'Nuevo torneo',
      'index.name.ph': 'p. ej.: Americano del viernes en Padel Club (opcional)',
      'index.type.label': 'Tipo de torneo',
      'index.type.hint': 'Elige la fecha, el número de jugadores y pistas en el siguiente paso',
      'index.btn.create': 'Crear torneo →',
      'index.soon': '· pronto',
      'index.tag.progressive': 'ronda a ronda',
      'index.tag.upfront': 'cuadro completo',
      'index.next.progressive': 'El cuadro de la siguiente ronda se genera tras introducir los resultados de la actual.',
      'index.next.upfront': 'Todas las rondas se generan de una vez al empezar.',
      'index.err.notReady': 'El generador del formato «{name}» está en desarrollo. Classic Americano ya está disponible: ¡pruébalo!',
      'index.menu.create': '🎾 Crear torneo',
      'index.menu.clubs': '🏟️ Mis clubes',
      'index.menu.tournaments': '🏆 Mis torneos',

      'index.clubs.h1': 'Mis clubes',
      'index.clubs.subtitle': 'Clubes donde organizas torneos. Sus nombres aparecen como sugerencias en el campo «Club» al crear un torneo. En producción esta sección se moverá a tu cuenta.',
      'index.clubs.new': 'Nuevo club',
      'index.clubs.ph': 'Nombre del club',
      'index.clubs.add': '+ Añadir',
      'index.clubs.none': 'Aún no hay clubes: añade el primero.',
      'index.clubs.dupErr': 'Ese club ya está en la lista.',
      'index.clubs.emptyErr': 'El nombre no puede estar vacío.',
      'index.clubs.editLabel': 'Nombre del club',
      'index.clubs.cardMeta': 'Disponible como sugerencia al crear un torneo',
      'index.clubs.edit': '✏️ Editar',
      'index.clubs.delTitle': '¿Eliminar club?',
      'index.clubs.delMsg': '«{name}» desaparecerá de la lista y de las sugerencias al crear torneos.',

      'index.tour.h1': 'Mis torneos',
      'index.tour.subtitle': 'Los torneos se guardan automáticamente: puedes volver y continuar cuando quieras. En producción esta sección se moverá a tu cuenta.',
      'index.tour.current': 'En curso',
      'index.tour.finished': 'Finalizados',
      'index.tour.none': 'Aún no hay torneos guardados: crea el primero en «Crear torneo».',
      'index.card.finishedStatus': '🏁 Finalizado',
      'index.card.playedStatus': 'Partidos jugados: {filled} de {total}',
      'index.card.delTitle': '¿Eliminar torneo?',
      'index.card.delMsg': '«{name}» se eliminará permanentemente junto con todos los resultados.',

      'setup.name.label': 'Nombre del torneo',
      'setup.name.ph': 'p. ej.: {format} del viernes en Padel Club (opcional)',
      'setup.date': 'Fecha',
      'setup.time': 'Hora de inicio',
      'setup.club': 'Club',
      'setup.club.ph': 'Nombre del club (opcional)',
      'setup.club.hint': 'Próximamente: elige de «Mis clubes»',
      'setup.payLink.label': 'Enlace de pago',
      'setup.payLink.ph': 'p. ej., un enlace de Tikkie o PayPal (opcional)',
      'setup.payLink.hint': 'Opcional. Visible para cualquiera que tenga el enlace del torneo.',
      't.payLink.button': '💳 Pagar la inscripción',
      'setup.players': 'Jugadores',
      'setup.pairs': 'Parejas',
      'setup.rounds': 'Rondas',
      'setup.matchPoints': 'Puntos por partido',
      'setup.matchPoints.hint': 'Suma de puntos de los dos equipos en cada partido',
      'setup.matchPoints.hintPairs': 'Suma de puntos de las dos parejas en cada partido',
      'setup.step1': 'Ajustes del torneo',
      'setup.step2.players': 'Nombres de jugadores',
      'setup.step2.pairs': 'Composición de parejas',
      'setup.step2.hint': 'Opcional: los campos vacíos reciben números correlativos (Jugador 1, Jugador 2…)',
      'setup.step2.hintPairs': 'Dos jugadores por pareja. Opcional: los campos vacíos reciben números correlativos',
      'setup.step2.hintMix': 'Opcional: los campos vacíos reciben números correlativos (Hombre 1, Mujer 1…)',
      'setup.step3.courts': 'Nombres de pistas',
      'setup.step3.hint': 'Opcional: las pistas se numerarán en orden',
      'setup.step3.hintKotc': 'Opcional: las pistas se numerarán en orden. La primera pista es la del rey 👑, la última es la más baja',
      'setup.btn.toNames': 'Siguiente: nombres →',
      'setup.btn.toPairs': 'Siguiente: parejas →',
      'setup.btn.back': '← Atrás',
      'setup.btn.start': 'Generar cuadro →',
      'setup.courtsHint': 'Pistas: {courts}',
      'setup.courtsHint.rest': ' · descansan cada ronda: {rest}',
      'setup.mix.men': '♂ Hombres',
      'setup.mix.women': '♀ Mujeres',
      'setup.mix.man': 'Hombre',
      'setup.mix.woman': 'Mujer',
      'setup.mix.balancedHint': 'Igual número de hombres y mujeres',
      'setup.mix.count': '{men} H + {women} M',

      'default.player': 'Jugador {n}',
      'default.man': 'Hombre {n}',
      'default.woman': 'Mujer {n}',
      'default.court': 'Pista {n}',
      'default.pair': 'Pareja {n}',

      'err.dupNames': 'Los nombres de jugadores no deben repetirse.',
      'err.mixBalance': 'Hace falta el mismo número de hombres y mujeres.',

      't.defaultTitle': 'Torneo {format}',
      'sub.players': '{n} jugadores',
      'sub.pairs': '{n} parejas',
      'sub.courtsN': 'pistas: {n}',
      'sub.courtsWord': '{n} pistas',
      'sub.rounds': '{n} rondas',
      'sub.matchTo': 'partido a {mp} puntos (en total)',
      'sub.mixCount': '{men} H + {women} M',
      'sub.finished': '🏁 torneo finalizado',
      'sub.allDone': '✅ todos los resultados introducidos',
      'sub.readOnly': '🔒 modo solo lectura',

      't.tab.round': 'Ronda {n}',
      't.tab.final': '🏆 Resultados finales',
      't.showResults': '🏆 Ver resultados',
      't.delRoundModal.title': '¿Quitar la última ronda?',
      't.delRoundModal.ok': '➖ Quitar ronda',
      't.final.h2': 'Resultados finales',
      't.final.finished': 'torneo finalizado',
      't.final.allDone': 'todos los resultados introducidos',
      't.final.lbTitle': 'Clasificación final',
      't.lb.title': '🏆 Clasificación',
      't.lb.th.player': 'Jugador',
      't.lb.th.pair': 'Pareja',
      't.lb.th.pay': 'Pago',
      't.lb.th.matches': 'Partidos',
      't.lb.th.wins': 'Victorias',
      't.lb.th.points': 'Puntos',
      't.lb.payTitle': 'Marca de pago: visible solo para el organizador',
      't.lb.payCheck': 'Ha pagado la inscripción',
      't.lb.payCheckPair': 'La pareja ha pagado la inscripción',

      't.resting.title': '😴 Descansan esta ronda',
      't.resting.note': '{names}: al terminar la ronda reciben {pts} puntos (la media de puntos de equipo por ronda).',
      't.variety': 'Variedad del cuadro: de media {p} compañeros distintos y {o} rivales distintos por jugador (de {max} posibles).',
      't.variety.mix': 'Variedad del cuadro: de media {p} compañeros distintos (de {maxP} posibles del sexo opuesto) y {o} rivales distintos (de {maxO} posibles) por jugador.',
      't.variety.team': 'Variedad del cuadro: de media {o} parejas rivales distintas por pareja (de {max} posibles).',
      't.variety.kotc': 'Variedad del cuadro: de media {p} compañeros distintos y {o} rivales distintos por jugador. El puesto final lo deciden la pista y el resultado de la última ronda.',

      't.actions.save': '💾 Guardar torneo',
      't.actions.share': '🔗 Compartir torneo',
      't.actions.reshuffle': '🔄 Regenerar el cuadro (se borra el marcador)',
      't.actions.restart': '🔄 Empezar de nuevo (se borra el marcador)',
      't.actions.addRound': '➕ Añadir ronda',
      't.actions.delRound': '➖ Quitar última ronda',
      't.actions.new': 'Nuevo torneo',
      't.btn.finish': '🏁 Finalizar torneo',
      't.finishModal.title': '¿Finalizar torneo?',
      't.finishModal.body': 'El torneo se moverá a «Finalizados» en la página principal. Los resultados se guardan y podrás volver a editarlos si hace falta.',
      't.finishModal.confirm': '🏁 Finalizar',

      'share.copyPrompt': 'Copia el enlace:',
      'share.note': '✅ Enlace copiado. Es una instantánea de los resultados actuales: el enlace muestra el cuadro, el marcador y la clasificación sin poder editar. Tras nuevos resultados, genera el enlace de nuevo.',
      'save.db': '💾 Torneo guardado en la base de datos (SQLite). Está disponible en «Mis torneos» en la página principal.',
      'save.local': '💾 Torneo guardado localmente en el navegador. Está disponible en «Mis torneos» en la página principal. Ejecuta server.py para guardar los torneos en SQLite.',
      'confirm.reshuffle': '¿Regenerar el cuadro? Se borrarán todos los resultados introducidos.',
      'confirm.reshuffleRR': '¿Regenerar el cuadro (nuevo sorteo)? Se borrarán todos los resultados introducidos.',
      'confirm.restart': '¿Empezar el torneo de nuevo? Se mantiene una primera ronda aleatoria y se borran todos los resultados.',
      'confirm.delRound': '¿Quitar la última ronda? Los resultados que tenga se eliminarán y la clasificación actual será la definitiva.',

      'podium.aria': 'Podio de ganadores',
      'podium.pts': '{pts} pts',

      'prog.played': 'Ronda {n} jugada ✓',
      'prog.warnCheck': '⚠️ Revisa con atención los resultados de la ronda actual antes de generar la siguiente.',
      'prog.genBtn': '⚡ Generar ronda {n} de {total} →',
      'prog.wait': '⏳ Introduce todos los resultados de la ronda: después podrás generar la ronda {n} de {total} según la clasificación actual.',
      'prog.wait.kotc': '⏳ Introduce todos los resultados de la ronda: después podrás generar la ronda {n} de {total} según los resultados de esta ronda.',
      'prog.regen.info': 'La ronda {n} se armó según la clasificación tras la ronda {prev}. Si corregiste resultados anteriores, regenera el emparejamiento mientras esta ronda no tenga marcador.',
      'prog.regen.info.team': 'La ronda se armó según la clasificación tras la ronda anterior. Si corregiste resultados, regenera el emparejamiento mientras esta ronda no tenga marcador.',
      'prog.regen.info.kotc': 'La ronda {n} se armó según los resultados de la ronda {prev}. Si corregiste resultados, regenera el emparejamiento mientras esta ronda no tenga marcador.',
      'prog.regen.btn': '🔄 Regenerar la ronda {n} según la clasificación actual',
      'prog.regen.btn.kotc': '🔄 Regenerar la ronda {n} según los resultados',
      'prog.next.mexicano': 'La siguiente ronda se arma según la clasificación actual: la pista 1 reúne los puestos 1–4 (1º con 4º contra 2º con 3º), luego 5–8, etc.',
      'prog.next.teamMexicano': 'La siguiente ronda se arma según la clasificación de parejas: la pista 1 reúne las parejas 1ª y 2ª, luego 3ª y 4ª, etc.',
      'prog.next.mixicano': 'La siguiente ronda se arma según la clasificación: los dos mejores hombres y las dos mejores mujeres en la pista 1 (parejas cruzadas: 1º hombre con 2ª mujer contra 2º hombre con 1ª mujer), luego el siguiente grupo de cuatro, etc.',
      'prog.next.kotc': 'Los ganadores suben una pista, los perdedores bajan y las parejas de cada pista se reorganizan.',
      'kotc.noDraw': '⚠️ En King of the Court no se permiten empates: sin ganador no se puede distribuir a los jugadores por pistas. Ajusta el marcador.',

      'rr.info': 'Round robin: cada pareja juega contra todas las demás exactamente una vez ({opp} rivales).',

      'card.linkTitle': 'Abrir ficha del jugador',
      'card.linkTitlePair': 'Abrir ficha de la pareja',
      'card.closeTitle': 'Cerrar',
      'card.summary': 'Puntos: {pts} · Victorias: {wins} · Partidos: {games} · Puesto: {rank}',
      'card.roundsTitle': 'Ronda a ronda',
      'card.th.round': 'Ronda',
      'card.th.court': 'Pista',
      'card.th.partner': 'Compañero',
      'card.th.opponents': 'Rivales',
      'card.th.score': 'Marcador',
      'card.th.result': 'Resultado',
      'card.th.points': 'Puntos',
      'card.result.win': 'Victoria',
      'card.result.loss': 'Derrota',
      'card.result.draw': 'Empate',
      'card.rest': 'Descanso',
      'card.notPlayed': '—'
    }
  };

  /* ============================== ФОРМАТЫ ============================== */
  /* Названия форматов — общие для всех языков (собственные имена). */
  var FORMAT_NAMES = {
    'classic-americano': 'Classic Americano',
    'team-americano': 'Team Americano',
    'mix-americano': 'Mix Americano',
    'mexicano': 'Classic Mexicano',
    'team-mexicano': 'Team Mexicano',
    'mixicano': 'Mixicano',
    'king-of-the-court': 'King of the Court',
    'round-robin': 'Round Robin'
  };

  /* Описания форматов: subtitle / info (HTML) / rules (для index) / meta. */
  var FORMATS = {
    ru: {
      'classic-americano': {
        subtitle: 'Классический формат для игры каждый с каждым',
        info: '<b>Как проходит классическое Americano.</b> Все участники играют в каждом раунде — матчи 2×2, состав пар и соперники меняются от раунда к раунду так, чтобы каждый сыграл с максимальным числом разных игроков. Матч идёт до фиксированной суммы очков (например, 24): подаёт каждый по 4 раза, счёт может быть 15:9, 20:4 и т.п. Очки — <b>личные</b>: оба игрока команды записывают себе результат своей команды. Побеждает тот, кто наберёт больше всех очков за турнир.',
        rules: 'Классика социального падела: каждый играет сам за себя. Партнёры и соперники меняются каждый раунд случайным образом — так, чтобы за турнир сыграть с максимумом разных игроков. Матч идёт до фиксированной суммы очков (например, 24): подаёт каждый по 4 раза, счёт может быть 15:9 или 20:4. Оба игрока команды записывают себе очки своей команды. Побеждает игрок с наибольшей суммой очков за все раунды.',
        meta: 'Личный зачёт · от 4 игроков, кратно 4'
      },
      'team-americano': {
        subtitle: 'Americano для постоянных пар',
        info: '<b>Как проходит Team Americano.</b> Вы играете с одним и тем же партнёром весь турнир. Расписание сводит каждую пару с максимальным числом разных соперников. Матч идёт до фиксированной суммы очков (например, 24), результат записывается паре. Побеждает пара с наибольшей суммой очков за все раунды.',
        rules: 'Americano для постоянных пар: вы играете с одним и тем же партнёром весь турнир. Расписание составляется сразу и сводит каждую пару с максимальным числом разных соперников. Матчи до фиксированной суммы очков, результат записывается паре. Побеждает пара с наибольшей суммой очков. Идеально, когда игроки приходят «своими двойками».',
        meta: 'Командный зачёт · от 8 игроков (4 пары), кратно 4'
      },
      'mix-americano': {
        subtitle: 'Americano со смешанными парами: мужчина + женщина',
        info: '<b>Как проходит Mix Americano.</b> Все участники играют в каждом раунде — матчи 2×2, но в каждой команде обязательно мужчина и женщина. Партнёры и соперники меняются от раунда к раунду: каждый раз у вас новый партнёр противоположного пола и новые соперники. Матч идёт до фиксированной суммы очков (например, 24). Очки — <b>личные</b>: оба игрока команды записывают себе результат своей команды. Побеждает тот, кто наберёт больше всех очков за турнир. Требуется равное количество мужчин и женщин.',
        rules: 'Americano со смешанными парами: в каждой команде обязательно играют мужчина и женщина. Ротация партнёров случайная, но с учётом пола — каждый раунд у вас новый партнёр противоположного пола и новые соперники. Очки личные, как в классике: оба игрока записывают себе результат команды. Требуется равное количество мужчин и женщин.',
        meta: 'Личный зачёт · равное число М и Ж · от 4 игроков'
      },
      'mexicano': {
        subtitle: 'Пары каждого раунда собираются по текущей таблице',
        info: '<b>Как проходит классическое Mexicano.</b> Первый раунд играется со случайными парами, а дальше расписание строит таблица: на первом корте встречаются места 1–4 (1-й играет с 4-м против 2-го с 3-м), на втором — места 5–8, и так далее. Сильные играют с сильными — матчи получаются равными, а интрига сохраняется до конца. Матч идёт до фиксированной суммы очков, очки — <b>личные</b>: оба игрока команды записывают себе результат своей команды. <b>Сетка следующего раунда генерируется после ввода всех результатов текущего.</b>',
        rules: 'Умная версия Americano: первый раунд играется случайно, а дальше пары собираются по текущей таблице. На первом корте встречаются места 1–4 (1-й с 4-м против 2-го с 3-м), на втором — места 5–8, и так далее. Сильные играют с сильными, слабые со слабыми — матчи получаются равными, а интрига сохраняется до последнего раунда. Сетка нового раунда генерируется после ввода всех результатов текущего.',
        meta: 'Личный зачёт · от 4 игроков, кратно 4'
      },
      'team-mexicano': {
        subtitle: 'Mexicano для постоянных пар: соперников назначает таблица',
        info: '<b>Как проходит Team Mexicano.</b> Вы играете с одним и тем же партнёром весь турнир, а соперников на каждый раунд назначает таблица. Первый раунд играется случайно, дальше пары ранжируются по очкам: 1-я пара играет со 2-й, 3-я с 4-й, и так далее — чем дальше турнир, тем ближе по силе соперники. Матч идёт до фиксированной суммы очков, результат записывается паре. <b>Сетка следующего раунда генерируется после ввода всех результатов текущего.</b>',
        rules: 'Mexicano для постоянных пар: играете фиксированной двойкой, а соперников на каждый раунд назначает таблица. После каждого раунда пары ранжируются по очкам: 1-я пара играет со 2-й, 3-я с 4-й, и так далее. Чем дальше турнир, тем ближе по силе соперники. Результат записывается паре, побеждает двойка с наибольшей суммой очков.',
        meta: 'Командный зачёт · от 8 игроков (4 пары), кратно 4'
      },
      'mixicano': {
        subtitle: 'Mexicano со смешанными парами: мужчина + женщина, рассадка по таблице',
        info: '<b>Как проходит Mixicano.</b> Матчи 2×2, в каждой команде обязательно мужчина и женщина. Первый раунд играется случайно, дальше пары собирает таблица: лучшие двое мужчин и лучшие две женщины встречаются на первом корте — 1-й мужчина играет со 2-й женщиной против 2-го мужчины с 1-й женщиной, следующая четвёрка на втором корте и так далее. Очки — <b>личные</b>: оба игрока команды записывают себе результат своей команды. <b>Сетка следующего раунда генерируется после ввода всех результатов текущего.</b> Требуется равное количество мужчин и женщин.',
        rules: 'Mexicano со смешанными парами: пары каждого раунда собираются по таблице, но всегда из мужчины и женщины. Например, лучший мужчина играет с лучшей женщиной против второй смешанной пары рейтинга. Личный зачёт, равные матчи и микс-составы — всё в одном формате. Следующий раунд появляется после ввода результатов. Требуется равное количество мужчин и женщин.',
        meta: 'Личный зачёт · равное число М и Ж · от 4 игроков'
      },
      'king-of-the-court': {
        subtitle: 'Победители поднимаются, проигравшие спускаются — доберись до королевского корта',
        info: '<b>Как проходит King of the Court.</b> Корты ранжированы: первый — «королевский» 👑, последний — нижний. Первый раунд играется со случайной рассадкой. После каждого раунда победители поднимаются на корт выше, проигравшие спускаются ниже (с королевского корта победители не уходят, с нижнего проигравшие не опускаются), а пары внутри корта перемешиваются. Очки — <b>личные</b> и копятся в таблице, но итоговое место определяется кортом и результатом последнего раунда. Ничьи не допускаются.',
        rules: 'Корты ранжированы от нижнего до верхнего — «королевского». После каждого раунда победители поднимаются на корт выше, проигравшие спускаются ниже, а пары внутри корта перемешиваются. Цель — пробиться на королевский корт и удержаться там до финального свистка: итоговое место определяется кортом и результатом последнего раунда. Азартный формат с постоянным движением.',
        meta: 'Личный зачёт · от 8 игроков, кратно 4'
      },
      'round-robin': {
        subtitle: 'Классический круговой турнир: каждая пара играет с каждой',
        info: '<b>Как проходит Round Robin.</b> Постоянные пары, и каждая пара играет против каждой ровно один раз. Полное расписание известно сразу: количество раундов равно числу пар минус один (при 4 парах — 3 раунда, при 8 — 7). Матч идёт до фиксированной суммы очков, результат записывается паре. Самый честный формат: итоговое место зависит только от ваших результатов, без элемента случайности в расписании.',
        rules: 'Классический круговой турнир: постоянные пары, и каждая пара играет против каждой. Полное расписание известно сразу — количество раундов равно числу пар минус один (при 4 парах — 3 раунда). Матчи можно играть на счёт по очкам или по геймам. Самый честный формат: итоговое место зависит только от ваших результатов, без элемента случайности в расписании.',
        meta: 'Командный зачёт · от 8 игроков (4 пары), кратно 4'
      }
    },
    en: {
      'classic-americano': {
        subtitle: 'The classic play-with-everyone format',
        info: "<b>How classic Americano works.</b> Everyone plays every round — 2v2 matches where partners and opponents change round to round so each player meets as many others as possible. A match runs to a fixed points total (say 24): everyone serves 4 times and the score can be 15:9, 20:4, etc. Points are <b>individual</b>: both players on a team record their team's score. Whoever scores the most points across the tournament wins.",
        rules: "Social padel classic: everyone plays for themselves. Partners and opponents change randomly each round so you meet as many different players as possible over the tournament. A match runs to a fixed points total (say 24): everyone serves 4 times and the score can be 15:9 or 20:4. Both players on a team record their team's points. The player with the most points across all rounds wins.",
        meta: 'Individual scoring · 4+ players, multiple of 4'
      },
      'team-americano': {
        subtitle: 'Americano for fixed pairs',
        info: '<b>How Team Americano works.</b> You play with the same partner the whole tournament. The schedule pairs you against as many different opponents as possible. A match runs to a fixed points total (say 24) and the result is recorded for the pair. The pair with the most points across all rounds wins.',
        rules: 'Americano for fixed pairs: you play with the same partner all tournament. The schedule is set upfront and pairs you against as many different opponents as possible. Matches run to a fixed points total, recorded for the pair. The pair with the most points wins. Ideal when players come in their own duos.',
        meta: 'Team scoring · 8+ players (4 pairs), multiple of 4'
      },
      'mix-americano': {
        subtitle: 'Americano with mixed pairs: man + woman',
        info: "<b>How Mix Americano works.</b> Everyone plays every round — 2v2 matches, but each team always has a man and a woman. Partners and opponents change round to round: each time you get a new partner of the opposite sex and new opponents. A match runs to a fixed points total (say 24). Points are <b>individual</b>: both players on a team record their team's score. Whoever scores the most points across the tournament wins. An equal number of men and women is required.",
        rules: "Americano with mixed pairs: each team must have a man and a woman. Partner rotation is random but gender-aware — each round you get a new partner of the opposite sex and new opponents. Points are individual, like the classic: both players record their team's result. An equal number of men and women is required.",
        meta: 'Individual scoring · equal men & women · 4+ players'
      },
      'mexicano': {
        subtitle: "Each round's pairs are set by the current standings",
        info: "<b>How classic Mexicano works.</b> The first round uses random pairs; after that the standings build the schedule: court 1 gets places 1–4 (1st plays with 4th vs 2nd with 3rd), court 2 gets places 5–8, and so on. Strong players meet strong ones — matches stay even and the suspense lasts to the end. A match runs to a fixed points total; points are <b>individual</b>: both players on a team record their team's score. <b>The next round's draw is generated after all the current round's results are entered.</b>",
        rules: 'The smart version of Americano: the first round is random, then pairs are formed from the current standings. Court 1 gets places 1–4 (1st with 4th vs 2nd with 3rd), court 2 gets places 5–8, and so on. Strong play strong, weaker play weaker — matches stay even and the suspense lasts to the final round. Each new round is generated after all the current results are entered.',
        meta: 'Individual scoring · 4+ players, multiple of 4'
      },
      'team-mexicano': {
        subtitle: 'Mexicano for fixed pairs: opponents set by the standings',
        info: "<b>How Team Mexicano works.</b> You play with the same partner all tournament, and the standings assign your opponents each round. The first round is random; after that pairs are ranked by points: 1st pair plays 2nd, 3rd plays 4th, and so on — the further the tournament goes, the closer in level your opponents. A match runs to a fixed points total and the result is recorded for the pair. <b>The next round's draw is generated after all the current round's results are entered.</b>",
        rules: 'Mexicano for fixed pairs: you play as a set duo while the standings assign your opponents each round. After every round pairs are ranked by points: 1st pair plays 2nd, 3rd plays 4th, and so on. The further the tournament goes, the closer in level your opponents. The result is recorded for the pair; the duo with the most points wins.',
        meta: 'Team scoring · 8+ players (4 pairs), multiple of 4'
      },
      'mixicano': {
        subtitle: 'Mexicano with mixed pairs: man + woman, seeded by the standings',
        info: "<b>How Mixicano works.</b> 2v2 matches, each team always a man and a woman. The first round is random; after that the standings form the pairs: the top two men and top two women meet on court 1 — the 1st man plays with the 2nd woman against the 2nd man with the 1st woman, the next four on court 2, and so on. Points are <b>individual</b>: both players on a team record their team's score. <b>The next round's draw is generated after all the current round's results are entered.</b> An equal number of men and women is required.",
        rules: 'Mexicano with mixed pairs: each round’s pairs come from the standings but always a man and a woman. For example, the top man plays with the top woman against the second mixed pair in the ranking. Individual scoring, even matches and mixed line-ups — all in one format. The next round appears after results are entered. An equal number of men and women is required.',
        meta: 'Individual scoring · equal men & women · 4+ players'
      },
      'king-of-the-court': {
        subtitle: "Winners move up, losers move down — reach the king's court",
        info: "<b>How King of the Court works.</b> Courts are ranked: the first is the «king's» court 👑, the last is the bottom one. The first round uses a random layout. After each round winners move up a court and losers move down (winners never leave the king's court, losers never drop below the bottom one), and pairs within a court are reshuffled. Points are <b>individual</b> and accumulate in the standings, but the final placing is decided by your court and the result of the last round. Draws are not allowed.",
        rules: "Courts are ranked from the bottom up to the «king's» court. After each round winners move up a court, losers move down, and pairs within a court are reshuffled. The goal is to break through to the king's court and hold it to the final whistle: your final place is decided by your court and the result of the last round. A thrilling format with constant movement.",
        meta: 'Individual scoring · 8+ players, multiple of 4'
      },
      'round-robin': {
        subtitle: 'Classic round robin: every pair plays every other',
        info: '<b>How Round Robin works.</b> Fixed pairs, and every pair plays every other exactly once. The full schedule is known upfront: the number of rounds equals the number of pairs minus one (4 pairs — 3 rounds, 8 — 7). A match runs to a fixed points total and the result is recorded for the pair. The fairest format: your final place depends only on your results, with no randomness in the schedule.',
        rules: 'Classic round robin: fixed pairs, and every pair plays every other. The full schedule is known upfront — the number of rounds equals the number of pairs minus one (4 pairs — 3 rounds). Matches can be scored by points or by games. The fairest format: your final place depends only on your results, with no randomness in the schedule.',
        meta: 'Team scoring · 8+ players (4 pairs), multiple of 4'
      }
    },
    es: {
      'classic-americano': {
        subtitle: 'El formato clásico para jugar con todos',
        info: '<b>Cómo funciona el Americano clásico.</b> Todos juegan cada ronda: partidos 2 contra 2 en los que compañeros y rivales cambian ronda a ronda para que cada jugador coincida con el mayor número posible de personas. El partido llega a una suma fija de puntos (por ejemplo, 24): cada uno saca 4 veces y el marcador puede ser 15:9, 20:4, etc. Los puntos son <b>individuales</b>: ambos jugadores del equipo se anotan el resultado de su equipo. Gana quien más puntos sume en todo el torneo.',
        rules: 'El clásico del pádel social: cada uno juega para sí mismo. Compañeros y rivales cambian al azar cada ronda para que coincidas con el mayor número posible de jugadores durante el torneo. El partido llega a una suma fija de puntos (por ejemplo, 24): cada uno saca 4 veces y el marcador puede ser 15:9 o 20:4. Ambos jugadores del equipo se anotan los puntos de su equipo. Gana el jugador con más puntos en todas las rondas.',
        meta: 'Puntuación individual · 4+ jugadores, múltiplo de 4'
      },
      'team-americano': {
        subtitle: 'Americano para parejas fijas',
        info: '<b>Cómo funciona el Team Americano.</b> Juegas con el mismo compañero todo el torneo. El calendario enfrenta a cada pareja con el mayor número posible de rivales distintos. El partido llega a una suma fija de puntos (por ejemplo, 24) y el resultado se anota a la pareja. Gana la pareja con más puntos en todas las rondas.',
        rules: 'Americano para parejas fijas: juegas con el mismo compañero todo el torneo. El calendario se fija de antemano y te enfrenta al mayor número posible de rivales distintos. Los partidos llegan a una suma fija de puntos, que se anota a la pareja. Gana la pareja con más puntos. Ideal cuando los jugadores vienen en sus propios dúos.',
        meta: 'Puntuación por equipos · 8+ jugadores (4 parejas), múltiplo de 4'
      },
      'mix-americano': {
        subtitle: 'Americano con parejas mixtas: hombre + mujer',
        info: '<b>Cómo funciona el Mix Americano.</b> Todos juegan cada ronda: partidos 2 contra 2, pero cada equipo tiene siempre un hombre y una mujer. Compañeros y rivales cambian ronda a ronda: cada vez tienes un nuevo compañero del sexo opuesto y nuevos rivales. El partido llega a una suma fija de puntos (por ejemplo, 24). Los puntos son <b>individuales</b>: ambos jugadores del equipo se anotan el resultado de su equipo. Gana quien más puntos sume en el torneo. Se requiere el mismo número de hombres y mujeres.',
        rules: 'Americano con parejas mixtas: cada equipo debe tener un hombre y una mujer. La rotación de compañeros es aleatoria pero respeta el sexo: cada ronda tienes un nuevo compañero del sexo opuesto y nuevos rivales. Los puntos son individuales, como en el clásico: ambos jugadores se anotan el resultado del equipo. Se requiere el mismo número de hombres y mujeres.',
        meta: 'Puntuación individual · igual de hombres y mujeres · 4+ jugadores'
      },
      'mexicano': {
        subtitle: 'Las parejas de cada ronda se forman según la clasificación actual',
        info: '<b>Cómo funciona el Mexicano clásico.</b> La primera ronda usa parejas aleatorias; después la clasificación arma el calendario: la pista 1 reúne los puestos 1–4 (1º juega con 4º contra 2º con 3º), la pista 2 los puestos 5–8, etc. Los fuertes juegan con los fuertes: los partidos quedan igualados y la emoción dura hasta el final. El partido llega a una suma fija de puntos; los puntos son <b>individuales</b>: ambos jugadores del equipo se anotan el resultado de su equipo. <b>El cuadro de la siguiente ronda se genera tras introducir todos los resultados de la actual.</b>',
        rules: 'La versión inteligente del Americano: la primera ronda es aleatoria y luego las parejas se forman según la clasificación actual. La pista 1 reúne los puestos 1–4 (1º con 4º contra 2º con 3º), la pista 2 los puestos 5–8, etc. Los fuertes con los fuertes y los flojos con los flojos: los partidos quedan igualados y la emoción dura hasta la última ronda. El cuadro de cada nueva ronda se genera tras introducir todos los resultados de la actual.',
        meta: 'Puntuación individual · 4+ jugadores, múltiplo de 4'
      },
      'team-mexicano': {
        subtitle: 'Mexicano para parejas fijas: los rivales los marca la clasificación',
        info: '<b>Cómo funciona el Team Mexicano.</b> Juegas con el mismo compañero todo el torneo y la clasificación asigna los rivales cada ronda. La primera ronda es aleatoria; después las parejas se ordenan por puntos: la 1ª juega contra la 2ª, la 3ª contra la 4ª, etc.; cuanto más avanza el torneo, más parejos son los rivales. El partido llega a una suma fija de puntos y el resultado se anota a la pareja. <b>El cuadro de la siguiente ronda se genera tras introducir todos los resultados de la actual.</b>',
        rules: 'Mexicano para parejas fijas: juegas como dúo fijo mientras la clasificación asigna los rivales cada ronda. Tras cada ronda las parejas se ordenan por puntos: la 1ª juega contra la 2ª, la 3ª contra la 4ª, etc. Cuanto más avanza el torneo, más parejos son los rivales. El resultado se anota a la pareja; gana el dúo con más puntos.',
        meta: 'Puntuación por equipos · 8+ jugadores (4 parejas), múltiplo de 4'
      },
      'mixicano': {
        subtitle: 'Mexicano con parejas mixtas: hombre + mujer, emparejado por la clasificación',
        info: '<b>Cómo funciona el Mixicano.</b> Partidos 2 contra 2, cada equipo siempre con un hombre y una mujer. La primera ronda es aleatoria; después la clasificación forma las parejas: los dos mejores hombres y las dos mejores mujeres coinciden en la pista 1 — el 1º hombre juega con la 2ª mujer contra el 2º hombre con la 1ª mujer, el siguiente grupo de cuatro en la pista 2, etc. Los puntos son <b>individuales</b>: ambos jugadores del equipo se anotan el resultado de su equipo. <b>El cuadro de la siguiente ronda se genera tras introducir todos los resultados de la actual.</b> Se requiere el mismo número de hombres y mujeres.',
        rules: 'Mexicano con parejas mixtas: las parejas de cada ronda salen de la clasificación pero siempre con un hombre y una mujer. Por ejemplo, el mejor hombre juega con la mejor mujer contra la segunda pareja mixta del ranking. Puntuación individual, partidos igualados y parejas mixtas: todo en un formato. La siguiente ronda aparece tras introducir los resultados. Se requiere el mismo número de hombres y mujeres.',
        meta: 'Puntuación individual · igual de hombres y mujeres · 4+ jugadores'
      },
      'king-of-the-court': {
        subtitle: 'Los ganadores suben, los perdedores bajan: llega a la pista del rey',
        info: '<b>Cómo funciona el King of the Court.</b> Las pistas están jerarquizadas: la primera es la pista del «rey» 👑, la última es la más baja. La primera ronda usa una distribución aleatoria. Tras cada ronda los ganadores suben una pista y los perdedores bajan (los ganadores no dejan la pista del rey y los perdedores no bajan de la última), y las parejas de cada pista se reorganizan. Los puntos son <b>individuales</b> y se acumulan en la clasificación, pero el puesto final lo deciden tu pista y el resultado de la última ronda. No se permiten empates.',
        rules: 'Las pistas se jerarquizan de la más baja a la más alta, la pista del «rey». Tras cada ronda los ganadores suben una pista, los perdedores bajan y las parejas de cada pista se reorganizan. El objetivo es abrirse paso hasta la pista del rey y mantenerse allí hasta el pitido final: tu puesto final lo deciden tu pista y el resultado de la última ronda. Un formato emocionante y en constante movimiento.',
        meta: 'Puntuación individual · 8+ jugadores, múltiplo de 4'
      },
      'round-robin': {
        subtitle: 'Round robin clásico: cada pareja juega contra todas',
        info: '<b>Cómo funciona el Round Robin.</b> Parejas fijas, y cada pareja juega contra todas las demás exactamente una vez. El calendario completo se conoce desde el principio: el número de rondas es el de parejas menos uno (4 parejas — 3 rondas, 8 — 7). El partido llega a una suma fija de puntos y el resultado se anota a la pareja. El formato más justo: tu puesto final depende solo de tus resultados, sin azar en el calendario.',
        rules: 'Round robin clásico: parejas fijas, y cada pareja juega contra todas las demás. El calendario completo se conoce desde el principio: el número de rondas es el de parejas menos uno (4 parejas — 3 rondas). Los partidos pueden puntuarse por puntos o por juegos. El formato más justo: tu puesto final depende solo de tus resultados, sin azar en el calendario.',
        meta: 'Puntuación por equipos · 8+ jugadores (4 parejas), múltiplo de 4'
      }
    }
  };

  /* ============================== РАНТАЙМ ============================== */
  function t(key, vars) {
    var d = DICT[lang] || DICT.ru;
    var s = (d[key] != null) ? d[key] : (DICT.ru[key] != null ? DICT.ru[key] : key);
    if (vars) {
      s = s.replace(/\{(\w+)\}/g, function (m, k) { return (vars[k] != null) ? vars[k] : m; });
    }
    return s;
  }

  function formatName(id) { return FORMAT_NAMES[id] || id; }
  function format(id, field) {
    var byLang = FORMATS[lang] || FORMATS.ru;
    var f = byLang[id] || (FORMATS.ru[id] || {});
    return f[field] != null ? f[field] : '';
  }

  function apply(root) {
    root = root || document;
    var els, i;
    els = root.querySelectorAll('[data-i18n]');
    for (i = 0; i < els.length; i++) els[i].textContent = t(els[i].getAttribute('data-i18n'));
    els = root.querySelectorAll('[data-i18n-html]');
    for (i = 0; i < els.length; i++) els[i].innerHTML = t(els[i].getAttribute('data-i18n-html'));
    els = root.querySelectorAll('[data-i18n-ph]');
    for (i = 0; i < els.length; i++) els[i].setAttribute('placeholder', t(els[i].getAttribute('data-i18n-ph')));
    els = root.querySelectorAll('[data-i18n-title]');
    for (i = 0; i < els.length; i++) els[i].setAttribute('title', t(els[i].getAttribute('data-i18n-title')));
  }

  function localeTag() { return { ru: 'ru-RU', en: 'en-GB', es: 'es-ES' }[lang] || 'ru-RU'; }
  function formatDate(iso) {
    if (!iso) return '';
    try { return new Date(iso + 'T00:00:00').toLocaleDateString(localeTag(), { day: 'numeric', month: 'long', year: 'numeric' }); }
    catch (e) { return iso; }
  }

  function renderSwitchers() {
    var conts = document.querySelectorAll('[data-lang-switch]');
    for (var c = 0; c < conts.length; c++) {
      var cont = conts[c];
      cont.className = (cont.className.indexOf('lang-switch') < 0 ? (cont.className + ' lang-switch').trim() : cont.className);
      cont.innerHTML = '';
      for (var i = 0; i < LANGS.length; i++) {
        (function (l) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'lang-btn' + (l === lang ? ' active' : '');
          b.textContent = l.toUpperCase();
          b.addEventListener('click', function () { setLang(l); });
          cont.appendChild(b);
        })(LANGS[i]);
      }
    }
  }

  function setLang(l) {
    if (LANGS.indexOf(l) < 0 || l === lang) return;
    lang = l;
    try { localStorage.setItem(STORE, l); } catch (e) {}
    document.documentElement.setAttribute('lang', l);
    apply();
    renderSwitchers();
    window.dispatchEvent(new CustomEvent('pm:langchange', { detail: { lang: l } }));
  }

  function injectCSS() {
    if (document.getElementById('pm-i18n-css')) return;
    var st = document.createElement('style');
    st.id = 'pm-i18n-css';
    st.textContent =
      '.lang-switch{display:inline-flex;gap:3px;background:var(--color-black-3,rgba(32,33,38,.03));border:1px solid var(--color-black-10,rgba(32,33,38,.1));border-radius:14px;padding:3px;}' +
      '.lang-btn{border:none;background:none;cursor:pointer;font-family:inherit;font-size:12.5px;font-weight:600;color:var(--color-black-40,rgba(32,33,38,.4));padding:5px 10px;border-radius:11px;transition:background .15s,color .15s;line-height:1;}' +
      '.lang-btn:hover{color:var(--color-black-60,rgba(32,33,38,.6));}' +
      '.lang-btn.active{background:var(--color-orange,#ff5734);color:#fff;}' +
      /* кликабельные имена в таблице лидеров */
      '.lb-link{background:none;border:none;padding:0;margin:0;font:inherit;color:var(--color-blue,#2d3eca);cursor:pointer;text-align:left;border-bottom:1px dashed rgba(45,62,202,.4);transition:color .15s;}' +
      '.lb-link:hover{color:var(--color-orange,#ff5734);border-bottom-color:var(--color-orange,#ff5734);}' +
      /* карточка игрока/пары */
      '.player-modal{max-width:600px;width:100%;text-align:left;max-height:88vh;overflow-y:auto;position:relative;}' +
      '.player-modal h3{font-size:19px;font-weight:600;margin-bottom:6px;padding-right:28px;}' +
      '.player-summary{font-size:13px;color:var(--color-black-60,rgba(32,33,38,.6));margin-bottom:16px;}' +
      '.player-modal .modal-close{position:absolute;top:14px;right:16px;background:none;border:none;font-size:20px;line-height:1;color:var(--color-black-40,rgba(32,33,38,.4));cursor:pointer;padding:4px;border-radius:8px;transition:color .15s,background .15s;}' +
      '.player-modal .modal-close:hover{color:var(--color-black,#202126);background:var(--color-black-5,rgba(32,33,38,.05));}' +
      '.player-rounds{width:100%;border-collapse:collapse;font-size:13px;}' +
      '.player-rounds th{text-align:left;font-size:10.5px;text-transform:uppercase;letter-spacing:.5px;color:var(--color-black-60,rgba(32,33,38,.6));padding:7px 8px;border-bottom:1px solid var(--color-black-10,rgba(32,33,38,.1));font-weight:500;white-space:nowrap;}' +
      '.player-rounds td{padding:8px;border-bottom:1px solid var(--color-black-10,rgba(32,33,38,.1));vertical-align:top;}' +
      '.player-rounds tr:last-child td{border-bottom:none;}' +
      '.player-rounds .rp-pts{font-weight:600;color:var(--color-orange,#ff5734);text-align:right;white-space:nowrap;}' +
      '.player-rounds .rp-win{color:var(--color-dark-green,#00695b);font-weight:600;}' +
      '.player-rounds .rp-loss{color:var(--color-black-40,rgba(32,33,38,.4));}' +
      '.player-rounds .rp-rest{color:var(--color-black-40,rgba(32,33,38,.4));font-style:italic;}' +
      /* кнопка-ссылка «Оплатить участие» */
      'a.paylink-btn{text-decoration:none;margin:2px 0 20px;}' +
      '.paylink-btn.hidden{display:none;}' +
      /* кнопка «Показать результаты» — справа в ряду вкладок раундов */
      '.show-results-tab{margin-left:auto;}';
    document.head.appendChild(st);
  }

  function init() {
    injectCSS();
    document.documentElement.setAttribute('lang', lang);
    apply();
    renderSwitchers();
  }

  // Стилевое модальное подтверждение — использует классы .modal-overlay/.modal страницы,
  // поэтому выглядит как остальные модалки. Возвращает Promise<boolean>.
  function confirmDialog(opts) {
    opts = opts || {};
    return new Promise(function (resolve) {
      var ov = document.createElement('div');
      ov.className = 'modal-overlay';
      ov.style.zIndex = '200';
      var modal = document.createElement('div');
      modal.className = 'modal';
      modal.innerHTML =
        '<div class="modal-icon">' + (opts.icon || '⚠️') + '</div>' +
        '<h3></h3><p></p>' +
        '<div class="modal-actions">' +
        '<button class="btn secondary" data-act="cancel"></button>' +
        '<button class="btn" data-act="ok"></button>' +
        '</div>';
      modal.querySelector('h3').textContent = opts.title || '';
      modal.querySelector('p').textContent = opts.message || '';
      modal.querySelector('[data-act="cancel"]').textContent = opts.cancel || t('common.cancel');
      modal.querySelector('[data-act="ok"]').textContent = opts.ok || 'OK';
      ov.appendChild(modal);
      function close(v) {
        if (ov.parentNode) ov.parentNode.removeChild(ov);
        document.removeEventListener('keydown', onKey);
        resolve(v);
      }
      function onKey(e) { if (e.key === 'Escape') close(false); }
      ov.addEventListener('click', function (e) { if (e.target === ov) close(false); });
      modal.querySelector('[data-act="cancel"]').addEventListener('click', function () { close(false); });
      modal.querySelector('[data-act="ok"]').addEventListener('click', function () { close(true); });
      document.addEventListener('keydown', onKey);
      document.body.appendChild(ov);
    });
  }

  window.PMI18N = {
    t: t,
    confirm: confirmDialog,
    apply: apply,
    setLang: setLang,
    formatDate: formatDate,
    localeTag: localeTag,
    renderSwitchers: renderSwitchers,
    formatName: formatName,
    format: format,
    get lang() { return lang; },
    LANGS: LANGS
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
