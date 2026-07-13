/* In-memory visitor store — persists within a Node.js process. */

export type AccessEvent = {
  page: string;
  action: string;
  timestamp: string;
};

export type Visitor = {
  id: string;
  createdAt: string;
  source: 'linkedin' | 'form' | 'direct' | 'anonymous';
  name: string;
  email: string;
  phone?: string;
  linkedinId?: string;
  linkedinImage?: string;
  ip?: string;
  userAgent?: string;
  browser?: string;
  os?: string;
  device?: 'desktop' | 'mobile';
  referrer?: string;
  country?: string;
  resolution?: string;
  themePref?: string;
  events: AccessEvent[];
};

// Global in-memory map
const visitors = new Map<string, Visitor>();

export function saveVisitor(data: Omit<Visitor, 'id' | 'createdAt' | 'events'> & { id?: string }): Visitor {
  const id = data.id || generateId();
  const visitor: Visitor = { 
    ...data, 
    id, 
    createdAt: new Date().toISOString(), 
    events: [] 
  };
  visitors.set(id, visitor);
  return visitor;
}

export function getVisitorById(id: string): Visitor | undefined {
  return visitors.get(id);
}

export function getOrCreateByEmail(email: string, data: Omit<Visitor, 'id' | 'createdAt' | 'events'>): Visitor {
  for (const v of visitors.values()) {
    if (v.email === email) return v;
  }
  return saveVisitor(data);
}

export function logEvent(visitorId: string, page: string, action: string): void {
  const v = visitors.get(visitorId);
  if (v) {
    v.events.push({ page, action, timestamp: new Date().toISOString() });
  }
}

export function getAllVisitors(): Visitor[] {
  return [...visitors.values()].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getStats() {
  const all = getAllVisitors();
  
  // Aggregate stats profiles
  const deviceCount = { desktop: 0, mobile: 0 };
  const browserCount: Record<string, number> = {};
  const countryCount: Record<string, number> = {};
  const pageViewsCount: Record<string, number> = {};
  const referrerCount: Record<string, number> = {};

  all.forEach(v => {
    if (v.device) deviceCount[v.device]++;
    if (v.browser) browserCount[v.browser] = (browserCount[v.browser] || 0) + 1;
    if (v.country) countryCount[v.country] = (countryCount[v.country] || 0) + 1;
    if (v.referrer) referrerCount[v.referrer] = (referrerCount[v.referrer] || 0) + 1;
    v.events.forEach(e => {
      if (e.action === 'page_view') {
        pageViewsCount[e.page] = (pageViewsCount[e.page] || 0) + 1;
      }
    });
  });

  return {
    total: all.length,
    linkedin: all.filter((v) => v.source === 'linkedin').length,
    form: all.filter((v) => v.source === 'form').length,
    direct: all.filter((v) => v.source === 'direct').length,
    anonymous: all.filter((v) => v.source === 'anonymous').length,
    totalEvents: all.reduce((s, v) => s + v.events.length, 0),
    devices: deviceCount,
    browsers: Object.entries(browserCount).map(([name, count]) => ({ name, count })),
    countries: Object.entries(countryCount).map(([name, count]) => ({ name, count })),
    pages: Object.entries(pageViewsCount).map(([name, count]) => ({ name, count })),
    referrers: Object.entries(referrerCount).map(([name, count]) => ({ name, count }))
  };
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}
