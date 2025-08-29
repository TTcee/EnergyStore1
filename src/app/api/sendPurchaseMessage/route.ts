import { NextRequest, NextResponse } from 'next/server';

// Інтерфейс для даних форми
interface PurchaseFormData {
  name: string;
  phone: string;
  productDetails: {
    model: string;
    voltage: string;
    capacity: string;
    hailong: string;
    price: number;
  };
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

// Функція для відправки замовлення в конкретний чат Telegram
async function sendPurchaseToTelegramChat(data: PurchaseFormData, chatId: string, token: string): Promise<{ success: boolean; error?: string }> {
  // Форматуємо повідомлення для замовлення
  const formattedPhone = formatPhoneNumber(data.phone);
  const { productDetails } = data;
  
  const message = `🛒 <b>НОВЕ ЗАМОВЛЕННЯ!</b>

👤 <b>Клієнт:</b> ${data.name}
📱 <b>Телефон:</b> ${formattedPhone}

🔋 <b>ТОВАР: Hailong акумулятор</b>
• <b>Хімія:</b> ${productDetails.model}
• <b>Напруга:</b> ${productDetails.voltage}
• <b>Ємність:</b> ${productDetails.capacity}
• <b>Модель:</b> ${productDetails.hailong}
💰 <b>Ціна:</b> ${productDetails.price} ₴

📅 <b>Час замовлення:</b> ${new Date().toLocaleString('uk-UA', {
    timeZone: 'Europe/Kiev',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })}

<a href="tel:${formattedPhone}"></a>`;

  const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

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

    if (!response.ok || !result.ok) {
      console.error(`Telegram API error for purchase in chat ${chatId}:`, result);
      return { 
        success: false, 
        error: result.description || 'Telegram API error' 
      };
    }

    return { success: true };
  } catch (error) {
    console.error(`Error sending purchase to Telegram chat ${chatId}:`, error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

// Функція для відправки повідомлення про замовлення в Telegram (в особисті та групу)
async function sendPurchaseToTelegram(data: PurchaseFormData): Promise<{ success: boolean; error?: string }> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const personalChatId = process.env.TELEGRAM_CHAT_ID;
  const groupChatId = process.env.TELEGRAM_GROUP_CHAT_ID;

  console.log('Purchase Environment check:', {
    hasToken: !!token,
    hasPersonalChatId: !!personalChatId,
    hasGroupChatId: !!groupChatId,
    tokenLength: token?.length || 0,
    personalChatId: personalChatId, // Тимчасово для дебагу - приберіть це в продакшені
    groupChatId: groupChatId // Тимчасово для дебагу - приберіть це в продакшені
  });

  if (!token) {
    console.error('Telegram bot token not configured');
    return { 
      success: false, 
      error: 'Telegram bot token not configured' 
    };
  }

  if (!personalChatId && !groupChatId) {
    console.error('No Telegram chat IDs configured');
    return { 
      success: false, 
      error: 'No Telegram chat IDs configured' 
    };
  }

  const results = [];
  let hasError = false;
  let errorMessages = [];

  // Відправляємо в особисті повідомлення (якщо налаштовано)
  if (personalChatId) {
    console.log('Sending purchase order to personal chat:', personalChatId);
    const personalResult = await sendPurchaseToTelegramChat(data, personalChatId, token);
    results.push({ type: 'personal', ...personalResult });
    
    if (!personalResult.success) {
      hasError = true;
      errorMessages.push(`Personal chat: ${personalResult.error}`);
    }
  }

  // Відправляємо в групу (якщо налаштовано)
  if (groupChatId) {
    console.log('Sending purchase order to group chat:', groupChatId);
    const groupResult = await sendPurchaseToTelegramChat(data, groupChatId, token);
    results.push({ type: 'group', ...groupResult });
    
    if (!groupResult.success) {
      hasError = true;
      errorMessages.push(`Group chat: ${groupResult.error}`);
    }
  }

  console.log('Telegram purchase sending results:', results);

  // Якщо всі відправки провалилися
  if (hasError && results.every(r => !r.success)) {
    return {
      success: false,
      error: errorMessages.join('; ')
    };
  }

  // Якщо хоча б одна відправка успішна
  if (results.some(r => r.success)) {
    if (hasError) {
      console.warn('Partial success in Telegram purchase sending:', errorMessages);
    }
    return { success: true };
  }

  return {
    success: false,
    error: 'Unknown error in Telegram purchase sending'
  };
}

// POST метод для обробки запитів на покупку
export async function POST(req: NextRequest) {
  console.log('Purchase API route called at:', new Date().toISOString());
  
  try {
    // Перевіряємо Content-Type
    const contentType = req.headers.get('content-type');
    console.log('Purchase request content-type:', contentType);

    if (!contentType?.includes('application/json')) {
      console.error('Invalid content-type:', contentType);
      return NextResponse.json(
        { error: 'Invalid content-type. Expected application/json' },
        { status: 400 }
      );
    }

    // Парсимо дані з тіла запиту
    let data: PurchaseFormData;
    
    try {
      data = await req.json();
      console.log('Parsed purchase data:', { 
        name: data.name, 
        phone: data.phone?.slice(0, 5) + '***',
        productDetails: data.productDetails
      });
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON data' },
        { status: 400 }
      );
    }

    // Валідація основних даних
    if (!data.name || !data.phone) {
      console.error('Missing required fields:', { hasName: !!data.name, hasPhone: !!data.phone });
      return NextResponse.json(
        { error: 'Необхідно заповнити всі поля' },
        { status: 400 }
      );
    }

    // Валідація деталей товару
    if (!data.productDetails || !data.productDetails.model || !data.productDetails.voltage || 
        !data.productDetails.capacity || !data.productDetails.hailong || !data.productDetails.price) {
      console.error('Missing product details:', data.productDetails);
      return NextResponse.json(
        { error: 'Відсутні дані про товар' },
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

    // Валідація ціни
    if (typeof data.productDetails.price !== 'number' || data.productDetails.price <= 0) {
      console.error('Invalid price:', data.productDetails.price);
      return NextResponse.json(
        { error: 'Некоректна ціна товару' },
        { status: 400 }
      );
    }

    // Відправляємо замовлення в Telegram
    console.log('Attempting to send purchase order to Telegram...');
    const result = await sendPurchaseToTelegram(data);

    if (result.success) {
      console.log('Successfully sent purchase order to Telegram');
      return NextResponse.json(
        { message: 'Замовлення успішно оформлено' },
        { status: 200 }
      );
    } else {
      console.error('Failed to send purchase order to Telegram:', result.error);
      return NextResponse.json(
        { error: `Помилка при оформленні замовлення: ${result.error}` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Purchase API route error:', error);
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