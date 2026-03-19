/**
 * In-memory rate limiter for API routes.
 * IP-based, configurable window and max requests.
 *
 * Xavfsizlik: forma spamni oldini oladi (miner/bot hujumlaridan himoya).
 */

const rateLimitMap = new Map();

// Har 10 daqiqada eskirgan entrylarni tozalash
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now - value.firstRequest > value.windowMs * 2) {
      rateLimitMap.delete(key);
    }
  }
}, 10 * 60 * 1000);

/**
 * @param {Request} request
 * @param {Object} options
 * @param {number} options.windowMs - Vaqt oynasi (ms). Default: 60000 (1 min)
 * @param {number} options.max - Maksimal so'rovlar soni. Default: 3
 * @returns {{ success: boolean, remaining: number, resetIn: number }}
 */
export function rateLimit(request, { windowMs = 60000, max = 3 } = {}) {
  // IP ni olish
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
  const key = `${ip}`;

  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now - entry.firstRequest > windowMs) {
    // Yangi window boshlash
    rateLimitMap.set(key, { count: 1, firstRequest: now, windowMs });
    return { success: true, remaining: max - 1, resetIn: windowMs };
  }

  entry.count++;

  if (entry.count > max) {
    const resetIn = windowMs - (now - entry.firstRequest);
    return { success: false, remaining: 0, resetIn };
  }

  return { success: true, remaining: max - entry.count, resetIn: windowMs - (now - entry.firstRequest) };
}
