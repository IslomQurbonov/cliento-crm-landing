/**
 * Input sanitizatsiya — XSS, injection hujumlardan himoya.
 * Barcha foydalanuvchi kiritgan ma'lumotlar bu funksiyalar orqali o'tkaziladi.
 */

/**
 * HTML taglarni olib tashlash
 */
export function stripHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>/g, '').trim();
}

/**
 * Matn uzunligini cheklash
 */
export function limitLength(str, maxLength = 255) {
  if (typeof str !== 'string') return '';
  return str.slice(0, maxLength).trim();
}

/**
 * Xavfli belgilarni escape qilish (SQL injection, XSS)
 */
export function escapeSpecialChars(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[<>]/g, '') // HTML tags
    .replace(/javascript:/gi, '') // JS protocol
    .replace(/on\w+=/gi, '') // Event handlers (onclick=, onerror=, etc.)
    .replace(/data:/gi, '') // Data URIs
    .replace(/vbscript:/gi, '') // VBScript
    .trim();
}

/**
 * O'zbek telefon raqamini validatsiya qilish
 * Format: 9 raqam (998 prefikssiz)
 */
export function validatePhone(phone) {
  if (typeof phone !== 'string') return false;
  // Faqat raqamlarni olish
  const digits = phone.replace(/\D/g, '');
  // 998 prefix olib tashlash
  const cleaned = digits.startsWith('998') ? digits.slice(3) : digits;
  // 9 raqam bo'lishi kerak
  return /^\d{9}$/.test(cleaned);
}

/**
 * Ism validatsiya
 */
export function validateName(name) {
  if (typeof name !== 'string') return false;
  const cleaned = stripHtml(name);
  return cleaned.length >= 2 && cleaned.length <= 100;
}

/**
 * Barcha inputlarni sanitize qilish
 */
export function sanitizeInput(str, maxLength = 255) {
  return limitLength(escapeSpecialChars(stripHtml(str)), maxLength);
}

/**
 * Business type validatsiya
 */
const VALID_BUSINESS_TYPES = [
  'smm', 'beauty', 'education', 'auto', 'restaurant',
  'spa_fitness', 'travel', 'language', 'advertising', 'photo_event', 'other'
];

export function validateBusinessType(type) {
  return typeof type === 'string' && VALID_BUSINESS_TYPES.includes(type);
}

/**
 * Employee count validatsiya
 */
const VALID_EMPLOYEE_COUNTS = ['1-5', '6-15', '16-50', '50+'];

export function validateEmployeeCount(count) {
  return typeof count === 'string' && VALID_EMPLOYEE_COUNTS.includes(count);
}
