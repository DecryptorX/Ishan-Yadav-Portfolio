import http from 'http';

const ROUTES = [
  '/',
  '/about',
  '/projects',
  '/experience',
  '/skills',
  '/journey',
  '/contact',
  '/login',
  '/admin', // expect 403 or redirect to login (not 404/500)
  '/privacy',
  '/terms',
  '/gallery',
  '/resume',
  '/dashboard',
  '/uses',
  '/blog'
];

async function checkRoute(route) {
  const port = process.env.PORT || 3000;
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${port}${route}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          route,
          status: res.statusCode,
          hasError: res.statusCode >= 404 && res.statusCode !== 401 && res.statusCode !== 403
        });
      });
    });
    req.on('error', (err) => resolve({ route, status: 0, hasError: true, error: err.message }));
  });
}

async function audit() {
  const port = process.env.PORT || 3000;
  console.log(`Running internal audit on local server (ensure it is running on :${port})...\n`);
  let fails = 0;
  for (const route of ROUTES) {
    const res = await checkRoute(route);
    if (res.hasError) {
      console.error(`❌ FAIL: ${route} (Status: ${res.status})`);
      fails++;
    } else {
      console.log(`✅ PASS: ${route} (Status: ${res.status})`);
    }
  }

  if (fails > 0) {
    console.error(`\nAudit failed with ${fails} errors.`);
    process.exit(1);
  } else {
    console.log('\nAudit complete. No 404s/500s detected.');
    process.exit(0);
  }
}

audit();
