const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3456;
const ROOT = path.resolve(__dirname, '..');
const ADMIN_DIR = __dirname;
const ASSETS_DIR = path.join(ROOT, 'assets', 'images');
const DATA_JS = path.join(ROOT, 'js', 'data.js');

// Ensure upload dirs
[path.join(ASSETS_DIR, 'rolex'), path.join(ASSETS_DIR, 'uploads')].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
};

function serveFile(res, filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    const data = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  } catch(e) {
    res.writeHead(404);
    res.end('Not found');
  }
}

function parseBody(req) {
  return new Promise((resolve) => {
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => {
      const raw = Buffer.concat(chunks);
      const ct = req.headers['content-type'] || '';
      if (ct.includes('multipart/form-data')) {
        const boundary = ct.split('boundary=')[1];
        if (!boundary) return resolve(null);
        const parts = raw.toString('binary').split('--' + boundary);
        const result = { fields: {}, files: [] };
        for (const part of parts) {
          if (!part.includes('Content-Disposition')) continue;
          const headerEnd = part.indexOf('\r\n\r\n');
          if (headerEnd < 0) continue;
          const header = part.substring(0, headerEnd);
          const body = part.substring(headerEnd + 4, part.endsWith('\r\n') ? part.length - 2 : part.length);
          
          const nameMatch = header.match(/name="([^"]+)"/);
          const filenameMatch = header.match(/filename="([^"]+)"/);
          
          if (filenameMatch) {
            result.files.push({ name: nameMatch?.[1] || 'file', filename: filenameMatch[1], data: Buffer.from(body, 'binary') });
          } else if (nameMatch) {
            result.fields[nameMatch[1]] = body.trim();
          }
        }
        resolve(result);
      } else {
        try { resolve(JSON.parse(raw.toString())); } catch(e) { resolve(null); }
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;

  // API: Get products
  if (pathname === '/api/products' && req.method === 'GET') {
    try {
      const content = fs.readFileSync(DATA_JS, 'utf-8');
      const match = content.match(/const products = (\[[\s\S]*?\]);/);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(match ? eval(match[1]) : []));
    } catch(e) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end('[]');
    }
    return;
  }

  // API: Save products
  if (pathname === '/api/products' && req.method === 'POST') {
    const body = await parseBody(req);
    if (!body || !Array.isArray(body)) {
      res.writeHead(400); res.end(JSON.stringify({ error: 'Invalid data' })); return;
    }
    const lines = body.map(p => {
      const coupon = p.coupon ? 'true' : 'false';
      const original = p.original || '0';
      const discount = p.discount ? `'${p.discount}'` : "''";
      const linkPart = p.link ? `, link:'${p.link}'` : '';
      return `  { id:${p.id}, brand:'${(p.brand||'').replace(/'/g,"\\'")}', name:'${(p.name||'').replace(/'/g,"\\'")}', price:${p.price||0}, original:${original}, discount:${discount}, coupon:${coupon}, img:'${(p.img||'').replace(/'/g,"\\'")}', cat:'${p.cat||'watches'}'${linkPart} }`;
    });
    const js = `// JOXOZP Product Data\nconst products = [\n${lines.join(',\n')}\n];\n`;
    fs.writeFileSync(DATA_JS, js, 'utf-8');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, count: body.length }));
    return;
  }

  // API: Upload image
  if (pathname === '/api/upload' && req.method === 'POST') {
    const body = await parseBody(req);
    if (!body || !body.files.length) {
      res.writeHead(400); res.end(JSON.stringify({ error: 'No file' })); return;
    }
    const file = body.files[0];
    let ext = path.extname(file.filename).toLowerCase();
    if (!['.jpg','.jpeg','.png','.webp','.gif','.svg'].includes(ext)) ext = '.jpg';
    const safeName = 'upload_' + Date.now() + ext;
    const uploadPath = path.join(ASSETS_DIR, 'uploads', safeName);
    fs.writeFileSync(uploadPath, file.data);
    const imgPath = 'assets/images/uploads/' + safeName;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, path: imgPath }));
    return;
  }

  // API: List images
  if (pathname === '/api/images' && req.method === 'GET') {
    const list = [];
    function scan(dir, prefix) {
      try {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
          if (entry.isDirectory()) scan(path.join(dir, entry.name), prefix + entry.name + '/');
          else if (/\.(jpg|jpeg|png|webp|gif|svg)$/i.test(entry.name)) {
            const full = path.join(dir, entry.name);
            const stat = fs.statSync(full);
            list.push({ path: 'assets/images/' + prefix + entry.name, size: stat.size, mtime: stat.mtimeMs });
          }
        }
      } catch(e) {}
    }
    scan(ASSETS_DIR, '');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(list.sort((a,b) => (a.path.includes('uploads') ? -1 : 1))));
    return;
  }

  // API: Deploy to Netlify
  if (pathname === '/api/deploy' && req.method === 'POST') {
    const { exec } = require('child_process');
    exec('netlify deploy --dir="' + ROOT + '" --prod', { cwd: ROOT, timeout: 60000 }, (err, stdout, stderr) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      if (err) {
        res.end(JSON.stringify({ ok: false, error: stderr || err.message }));
      } else {
        res.end(JSON.stringify({ ok: true, output: stdout }));
      }
    });
    return;
  }

  // Static files
  if (pathname === '/' || pathname === '') {
    serveFile(res, path.join(ADMIN_DIR, 'index.html'));
    return;
  }
  
  // Try admin dir first, then root
  let filePath = path.join(ADMIN_DIR, pathname.replace(/^\/admin\//, ''));
  if (!fs.existsSync(filePath)) {
    filePath = path.join(ROOT, pathname);
  }
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    serveFile(res, filePath);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log('JOXOZP Admin Server running at http://localhost:' + PORT);
  console.log('Root: ' + ROOT);
  console.log('Assets: ' + ASSETS_DIR);
});
