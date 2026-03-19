import { NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rateLimit';
import {
  sanitizeInput,
  validatePhone,
  validateName,
  validateBusinessType,
  validateEmployeeCount,
} from '@/lib/sanitize';

const API_URL = process.env.API_URL || 'http://localhost:4010';
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'http://localhost:4012,https://cliento.uz')
  .split(',')
  .map((o) => o.trim());

/**
 * POST /api/demo — Xavfsiz proxy
 *
 * Himoya choralari:
 * 1. Rate limiting (3 so'rov/daqiqa per IP)
 * 2. Origin tekshiruv (CSRF himoya)
 * 3. Input sanitizatsiya (XSS/injection)
 * 4. Server-side validatsiya
 * 5. Xato xabarlari foydalanuvchiga xavfsiz ko'rinishda
 */
export async function POST(request) {
  // 1. Rate limiting
  const { success, remaining, resetIn } = rateLimit(request, {
    windowMs: 60000, // 1 daqiqa
    max: 3,          // 3 so'rov
  });

  if (!success) {
    return NextResponse.json(
      { message: "Juda ko'p so'rov. Iltimos, biroz kuting." },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil(resetIn / 1000)),
          'X-RateLimit-Remaining': '0',
        },
      }
    );
  }

  // 2. Origin tekshiruv
  const origin = request.headers.get('origin');
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.json(
      { message: "Ruxsat etilmagan manba." },
      { status: 403 }
    );
  }

  // 3. Body olish va parse qilish
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Noto'g'ri so'rov formati." },
      { status: 400 }
    );
  }

  const { businessType, name, phone, companyName, employeeCount, selectedPlan } = body;

  // 4. Validatsiya
  if (!validateBusinessType(businessType)) {
    return NextResponse.json(
      { message: "Noto'g'ri biznes turi." },
      { status: 400 }
    );
  }

  if (!validateName(name)) {
    return NextResponse.json(
      { message: "Ism kamida 2 belgidan iborat bo'lishi kerak." },
      { status: 400 }
    );
  }

  if (!validatePhone(phone)) {
    return NextResponse.json(
      { message: "Noto'g'ri telefon raqam formati." },
      { status: 400 }
    );
  }

  if (employeeCount && !validateEmployeeCount(employeeCount)) {
    return NextResponse.json(
      { message: "Noto'g'ri xodimlar soni." },
      { status: 400 }
    );
  }

  // 5. Input sanitizatsiya
  const sanitizedData = {
    businessType,
    name: sanitizeInput(name, 100),
    phone: sanitizeInput(phone, 20),
    companyName: companyName ? sanitizeInput(companyName, 200) : '',
    employeeCount: employeeCount || '1-5',
    selectedPlan: selectedPlan ? sanitizeInput(selectedPlan, 100) : undefined,
  };

  // 6. Backend API ga forward qilish
  try {
    const response = await fetch(`${API_URL}/api/v1/demo/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sanitizedData),
    });

    const data = await response.json();

    if (!response.ok) {
      // Backend xatosini foydalanuvchiga xavfsiz ko'rsatish
      return NextResponse.json(
        { message: data.message || "Xatolik yuz berdi. Qayta urinib ko'ring." },
        {
          status: response.status,
          headers: { 'X-RateLimit-Remaining': String(remaining) },
        }
      );
    }

    return NextResponse.json(data, {
      headers: { 'X-RateLimit-Remaining': String(remaining) },
    });
  } catch {
    return NextResponse.json(
      { message: "Server bilan aloqa o'rnatib bo'lmadi." },
      { status: 502 }
    );
  }
}
