/*
 * Padelmesh — общий модуль экспорта результатов турнира в PDF.
 *
 * Подключение:  <script src="pdf-export.js"></script>  (после i18n.js)
 * Использование на странице турнира:
 *   PMPDF.bind('btn-pdf', buildReport)
 * где buildReport() возвращает объект:
 * {
 *   fileName:  'tournament.pdf',
 *   badge:     'Classic Americano',            // название формата
 *   title:     'Пятничный турнир',
 *   subtitle:  'Клуб · дата · 8 игроков · …',
 *   playerTh:  'Игрок' | 'Пара',               // заголовок колонки участника
 *   top3:      [{ name, pts }],                // топ-3 по финальным местам
 *   standings: [{ name, games, wins, pts }],   // финальная таблица по порядку мест
 *   rounds: [{                                 // результаты по раундам
 *     title:   'Раунд 1',
 *     resting: 'Имя, Имя' | '',                // отдыхающие (если есть)
 *     rows: [{ court, left, right, score, leftWon, rightWon, note }]
 *   }],
 *   footer: 'Сгенерировано в Padelmesh · дата'
 * }
 *
 * html2pdf.js (html2canvas + jsPDF) грузится с CDN по клику — кириллица и эмодзи
 * рендерятся браузером, поэтому шрифты в jsPDF встраивать не нужно.
 */
(function () {
  'use strict';

  var H2P_URL = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
  var GRAY = 'rgba(32,33,38,0.6)';
  var LINE = 'border-bottom:1px solid rgba(32,33,38,0.15);';

  // Кнопка «Скачать PDF» — акцентная оранжевая (как основные кнопки)
  var style = document.createElement('style');
  style.textContent =
    '#btn-pdf { background: var(--color-orange, #ff5734); color: var(--color-white, #ffffff); font-weight: 600; }' +
    '#btn-pdf:hover { opacity: .85; }';
  document.head.appendChild(style);

  function T(k, v) { return window.PMI18N ? PMI18N.t(k, v) : k; }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  function loadLib() {
    return new Promise(function (resolve, reject) {
      if (window.html2pdf) return resolve();
      var s = document.createElement('script');
      s.src = H2P_URL;
      s.onload = resolve;
      s.onerror = function () { reject(new Error('cdn load failed')); };
      document.head.appendChild(s);
    });
  }

  function th(txt, align) {
    return '<th style="text-align:' + (align || 'left') + ';font-size:10px;text-transform:uppercase;letter-spacing:.5px;color:' + GRAY + ';padding:6px 8px;' + LINE + 'font-weight:500;">' + txt + '</th>';
  }
  function td(txt, align, extra) {
    return '<td style="text-align:' + (align || 'left') + ';font-size:12px;padding:6px 8px;' + LINE + (extra || '') + '">' + txt + '</td>';
  }

  function buildDom(rep) {
    var h = '<div style="font-family:Poppins,system-ui,sans-serif;color:#202126;width:700px;background:#fff;padding:8px 4px;">';
    h += '<div style="font-size:22px;font-weight:600;">Padel<span style="color:#ff5734;">Mesh</span>' + (rep.badge ? ' · ' + esc(rep.badge) : '') + '</div>';
    h += '<div style="font-size:20px;font-weight:600;margin-top:10px;">' + esc(rep.title) + '</div>';
    h += '<div style="font-size:11.5px;color:' + GRAY + ';margin:4px 0 18px;">' + esc(rep.subtitle) + '</div>';

    // Топ-3
    if (rep.top3 && rep.top3.length) {
      h += '<div style="font-size:15px;font-weight:600;margin:0 0 8px;">' + esc(T('t.final.h2')) + '</div>';
      var medals = ['🥇', '🥈', '🥉'];
      rep.top3.forEach(function (s, i) {
        h += '<div style="font-size:13.5px;padding:2px 0;">' + medals[i] + ' <b>' + esc(s.name) + '</b> — ' + esc(T('podium.pts', { pts: s.pts })) + '</div>';
      });
    }

    // Итоговая таблица
    h += '<div style="font-size:15px;font-weight:600;margin:18px 0 6px;">' + esc(T('t.final.lbTitle')) + '</div>';
    h += '<table style="width:100%;border-collapse:collapse;">';
    h += '<tr>' + th('#') + th(esc(rep.playerTh || T('t.lb.th.player'))) + th(esc(T('t.lb.th.matches')), 'right') + th(esc(T('t.lb.th.wins')), 'right') + th(esc(T('t.lb.th.points')), 'right') + '</tr>';
    (rep.standings || []).forEach(function (s, i) {
      h += '<tr>' + td(i + 1) + td(esc(s.name)) + td(s.games, 'right') + td(s.wins, 'right') + td('<b>' + s.pts + '</b>', 'right') + '</tr>';
    });
    h += '</table>';

    // Результаты по раундам
    if (rep.rounds && rep.rounds.length) {
      h += '<div style="font-size:15px;font-weight:600;margin:20px 0 4px;">' + esc(T('pdf.roundsTitle')) + '</div>';
      rep.rounds.forEach(function (round) {
        h += '<div style="page-break-inside:avoid;">';
        h += '<div style="font-size:13px;font-weight:600;margin:12px 0 4px;">' + esc(round.title) + '</div>';
        h += '<table style="width:100%;border-collapse:collapse;">';
        round.rows.forEach(function (m) {
          var score = '<b style="white-space:nowrap;">' + esc(m.score) + '</b>';
          if (m.note) score += ' <span style="font-size:10px;color:' + GRAY + ';white-space:nowrap;">' + esc(m.note) + '</span>';
          h += '<tr>' +
            td(esc(m.court), 'left', 'color:' + GRAY + ';width:120px;') +
            td(m.leftWon ? '<b>' + esc(m.left) + '</b>' : esc(m.left), 'right') +
            td(score, 'center', 'width:120px;') +
            td(m.rightWon ? '<b>' + esc(m.right) + '</b>' : esc(m.right), 'left') +
            '</tr>';
        });
        h += '</table>';
        if (round.resting) {
          h += '<div style="font-size:11px;color:' + GRAY + ';margin-top:4px;">' + esc(T('t.resting.title')) + ': ' + esc(round.resting) + '</div>';
        }
        h += '</div>';
      });
    }

    h += '<div style="font-size:10.5px;color:' + GRAY + ';margin-top:18px;">' + esc(rep.footer || '') + '</div>';
    h += '</div>';

    var holder = document.createElement('div');
    holder.style.cssText = 'position:absolute;left:-9999px;top:0;';
    holder.innerHTML = h;
    return holder;
  }

  function download(rep) {
    var holder = buildDom(rep);
    document.body.appendChild(holder);
    return window.html2pdf().set({
      margin: [10, 10, 12, 10],
      filename: rep.fileName || 'tournament.pdf',
      image: { type: 'jpeg', quality: 0.95 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'] }
    }).from(holder.firstChild).save().then(
      function () { holder.remove(); },
      function (e) { holder.remove(); throw e; }
    );
  }

  function fileName(name, date) {
    var base = String(name || 'tournament')
      .replace(/[\\/:*?"<>|#%&{}]+/g, ' ').trim().replace(/\s+/g, '_');
    return (base || 'tournament') + (date ? '_' + date : '') + '.pdf';
  }

  window.PMPDF = {
    fileName: fileName,
    bind: function (btnId, buildReport) {
      var btn = document.getElementById(btnId);
      if (!btn) return;
      btn.addEventListener('click', function () {
        btn.disabled = true;
        btn.textContent = T('pdf.generating');
        Promise.resolve()
          .then(loadLib)
          .then(function () { return download(buildReport()); })
          .catch(function () { alert(T('pdf.error')); })
          .then(function () {
            btn.disabled = false;
            btn.textContent = T('pdf.btn');
          });
      });
    }
  };
})();
