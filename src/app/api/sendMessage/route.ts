import { NextRequest, NextResponse } from 'next/server';

// Інтерфейс для даних форми
interface FormData {
  name: string;
  phone: string;
}

// Функція для форматування телефону
function formatPhoneNumber(phone: string): string {
  // Очищаємо від зайвих символів
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  
  // Додаємо +38 якщо немає
  if (!cleaned.startsWith('+')) {
    return cleaned.startsWith('38') ? `+${cleaned}` : `+38${cleaned}`;
  }
  
  return cleaned;
}

// Функція для відправки повідомлення в Telegram
async function sendToTelegram(data: FormData): Promise<{ success: boolean; error?: string }> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  console.log('Environment check:', {
    hasToken: !!token,
    hasChatId: !!chatId,
    tokenLength: token?.length || 0,
    chatId: chatId // Тимчасово для дебагу - приберіть це в продакшені
  });

  if (!token || !chatId) {
    console.error('Telegram credentials not configured');
    return { 
      success: false, 
      error: 'Telegram credentials not configured' 
    };
  }

  // Форматуємо повідомлення
  const formattedPhone = formatPhoneNumber(data.phone);
  const message = `🔔 <b>Новий запит на зворотний дзвінок!</b>

👤 <b>Ім'я:</b> ${data.name}
📱 <b>Телефон:</b> ${formattedPhone}
📅 <b>Час:</b> ${new Date().toLocaleString('uk-UA', {
    timeZone: 'Europe/Kiev',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })}

<a href="tel:${formattedPhone}">📞 Зателефонувати зараз</a>`;

  const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
  
  console.log('Sending to Telegram:', {
    url: telegramUrl.replace(token, 'BOT_TOKEN_HIDDEN'),
    chatId,
    messageLength: message.length
  });

  try {
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    const result = await response.json();
    
    console.log('Telegram API response:', {
      status: response.status,
      ok: response.ok,
      result: result
    });

    if (!response.ok || !result.ok) {
      console.error('Telegram API error:', result);
      return { 
        success: false, 
        error: result.description || 'Telegram API error' 
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

// POST метод для обробки запитів
export async function POST(req: NextRequest) {
  console.log('API route called at:', new Date().toISOString());
  
  try {
    // Перевіряємо Content-Type
    const contentType = req.headers.get('content-type');
    console.log('Request content-type:', contentType);

    if (!contentType?.includes('application/json')) {
      console.error('Invalid content-type:', contentType);
      return NextResponse.json(
        { error: 'Invalid content-type. Expected application/json' },
        { status: 400 }
      );
    }

    // Парсимо дані з тіла запиту
    let data: FormData;
    
    try {
      data = await req.json();
      console.log('Parsed data:', { name: data.name, phone: data.phone?.slice(0, 5) + '***' });
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON data' },
        { status: 400 }
      );
    }

    // Валідація даних
    if (!data.name || !data.phone) {
      console.error('Missing required fields:', { hasName: !!data.name, hasPhone: !!data.phone });
      return NextResponse.json(
        { error: 'Необхідно заповнити всі поля' },
        { status: 400 }
      );
    }

    // Валідація імені
    const nameRegex = /^[a-zA-Zа-яА-ЯіІїЇєЄ'\-\s]{2,50}$/;
    if (!nameRegex.test(data.name.trim())) {
      console.error('Invalid name format:', data.name);
      return NextResponse.json(
        { error: 'Некоректне ім\'я' },
        { status: 400 }
      );
    }

    // Валідація телефону
    const phoneRegex = /^(\+?38)?[0-9]{10}$/;
    const cleanPhone = data.phone.replace(/[\s\-\(\)]/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      console.error('Invalid phone format:', cleanPhone);
      return NextResponse.json(
        { error: 'Некоректний номер телефону' },
        { status: 400 }
      );
    }

    // Відправляємо в Telegram
    console.log('Attempting to send to Telegram...');
    const result = await sendToTelegram(data);

    if (result.success) {
      console.log('Successfully sent to Telegram');
      return NextResponse.json(
        { message: 'Дані успішно відправлено' },
        { status: 200 }
      );
    } else {
      console.error('Failed to send to Telegram:', result.error);
      return NextResponse.json(
        { error: `Помилка при відправці: ${result.error}` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { 
        error: 'Внутрішня помилка сервера',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// OPTIONS метод для CORS
export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { 
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}