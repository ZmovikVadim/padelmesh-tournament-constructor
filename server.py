#!/usr/bin/env python3
"""
Простейший локальный сервер для тестов системы турниров Padelmesh.

Что нужно: только Python 3 (на macOS уже установлен). Никаких зависимостей.

Запуск:   python3 server.py          (порт 8000)
          python3 server.py 9000     (свой порт)
Открыть:  http://localhost:8000/index.html

Турниры хранятся в SQLite-файле padelmesh.db рядом с этим скриптом.
Страницы автоматически используют этот API, когда открыты через сервер
(и откатываются на localStorage, если сервер не запущен).

API:
  GET    /api/tournaments        — все турниры: {id: {...}, ...}
  GET    /api/tournaments/<id>   — один турнир
  PUT    /api/tournaments/<id>   — создать/обновить (JSON в теле)
  DELETE /api/tournaments/<id>   — удалить
"""
import http.server
import json
import os
import re
import sqlite3
import sys
import threading

BASE = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE, 'padelmesh.db')
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
_lock = threading.Lock()


def db():
    conn = sqlite3.connect(DB_PATH)
    conn.execute(
        'CREATE TABLE IF NOT EXISTS tournaments ('
        '  id TEXT PRIMARY KEY,'
        '  data TEXT NOT NULL,'
        '  updated_at INTEGER DEFAULT 0'
        ')'
    )
    return conn


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE, **kwargs)

    def log_message(self, fmt, *args):  # тише в консоли
        if '/api/' in (args[0] if args else ''):
            return
        super().log_message(fmt, *args)

    def _cors(self):
        # позволяет работать и со страницы, открытой как file://
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')

    def _json(self, code, obj):
        body = json.dumps(obj, ensure_ascii=False).encode('utf-8')
        self.send_response(code)
        self._cors()
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _api_match(self):
        return re.fullmatch(r'/api/tournaments(?:/([\w-]+))?', self.path.split('?')[0])

    def do_OPTIONS(self):
        self.send_response(204)
        self._cors()
        self.end_headers()

    def do_GET(self):
        m = self._api_match()
        if not m:
            return super().do_GET()
        with _lock, db() as conn:
            if m.group(1):
                row = conn.execute(
                    'SELECT data FROM tournaments WHERE id = ?', (m.group(1),)
                ).fetchone()
                if row:
                    self._json(200, json.loads(row[0]))
                else:
                    self._json(404, {'error': 'not found'})
            else:
                rows = conn.execute('SELECT id, data FROM tournaments').fetchall()
                self._json(200, {r[0]: json.loads(r[1]) for r in rows})

    def do_PUT(self):
        m = self._api_match()
        if not (m and m.group(1)):
            return self._json(404, {'error': 'bad path'})
        try:
            length = int(self.headers.get('Content-Length', 0))
            data = json.loads(self.rfile.read(length))
        except (ValueError, json.JSONDecodeError):
            return self._json(400, {'error': 'invalid JSON'})
        with _lock, db() as conn:
            conn.execute(
                'INSERT INTO tournaments (id, data, updated_at) VALUES (?, ?, ?) '
                'ON CONFLICT(id) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at',
                (m.group(1), json.dumps(data, ensure_ascii=False), int(data.get('updatedAt', 0)))
            )
        self._json(200, {'ok': True})

    def do_DELETE(self):
        m = self._api_match()
        if not (m and m.group(1)):
            return self._json(404, {'error': 'bad path'})
        with _lock, db() as conn:
            conn.execute('DELETE FROM tournaments WHERE id = ?', (m.group(1),))
        self._json(200, {'ok': True})


if __name__ == '__main__':
    server = http.server.ThreadingHTTPServer(('127.0.0.1', PORT), Handler)
    print(f'Padelmesh dev server:  http://localhost:{PORT}/index.html')
    print(f'База данных SQLite:    {DB_PATH}')
    print('Остановить: Ctrl+C')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
