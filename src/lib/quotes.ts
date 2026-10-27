import { Quote, QuoteCustomer, QuoteItem } from './types';
import fs from 'fs';
import path from 'path';

const QUOTES_FILE = path.join(process.cwd(), 'src', 'lib', 'quotes-db.json');

// Memory cache fallback for serverless
const memoryQuotes = new Map<string, Quote>();

// Safe encode quote to Base64URL for universal cross-device loading
export function encodeQuoteToken(quote: Quote): string {
  try {
    const jsonStr = JSON.stringify(quote);
    return Buffer.from(jsonStr, 'utf-8').toString('base64url');
  } catch (e) {
    console.error('Error encoding quote token:', e);
    return '';
  }
}

// Safe decode quote from Base64URL
export function decodeQuoteToken(token: string): Quote | null {
  try {
    const jsonStr = Buffer.from(token, 'base64url').toString('utf-8');
    const parsed = JSON.parse(jsonStr);
    if (parsed && parsed.quoteNumber && parsed.items) {
      return parsed as Quote;
    }
    return null;
  } catch (e) {
    console.error('Error decoding quote token:', e);
    return null;
  }
}

// Read all stored quotes from JSON file
export function getStoredQuotes(): Record<string, Quote> {
  try {
    if (fs.existsSync(QUOTES_FILE)) {
      const data = fs.readFileSync(QUOTES_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.warn('Could not read quotes file, using memory cache:', e);
  }
  const memObj: Record<string, Quote> = {};
  memoryQuotes.forEach((v, k) => {
    memObj[k] = v;
  });
  return memObj;
}

// Save a quote
export function saveQuote(quote: Quote): Quote {
  const quoteWithToken = {
    ...quote,
    token: encodeQuoteToken(quote),
  };

  memoryQuotes.set(quote.id, quoteWithToken);

  try {
    const quotes = getStoredQuotes();
    quotes[quote.id] = quoteWithToken;
    fs.writeFileSync(QUOTES_FILE, JSON.stringify(quotes, null, 2), 'utf-8');
  } catch (e) {
    console.warn('Could not persist quote to file, saved in memory:', e);
  }

  return quoteWithToken;
}

// Retrieve quote by ID
export function getQuoteById(id: string, token?: string): Quote | null {
  if (token) {
    const decoded = decodeQuoteToken(token);
    if (decoded) return decoded;
  }

  if (memoryQuotes.has(id)) {
    return memoryQuotes.get(id)!;
  }

  const quotes = getStoredQuotes();
  if (quotes[id]) {
    return quotes[id];
  }

  return null;
}

// Helper to create a new quote
export function createNewQuote(
  customer: QuoteCustomer,
  items: QuoteItem[],
  includeTax: boolean = true
): Quote {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const now = new Date();
  const valid = new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000); // 15 days

  const id = `RP-COT-${randomSuffix}`;
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const tax = includeTax ? Number((subtotal * 0.07).toFixed(2)) : 0;
  const total = Number((subtotal + tax).toFixed(2));

  const quote: Quote = {
    id,
    quoteNumber: `RP-COT-2026-${randomSuffix}`,
    createdAt: now.toISOString(),
    validUntil: valid.toISOString(),
    customer,
    items,
    subtotal: Number(subtotal.toFixed(2)),
    tax,
    total,
    status: 'PENDIENTE',
  };

  return saveQuote(quote);
}
