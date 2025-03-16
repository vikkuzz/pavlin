export default async function sendMessageToTelegram(userInput) {
  const { name, email, message, id_mess } = userInput;
  const text = `
    Сообщение: ${message}
    Email: ${email} 
    Отправлено с https://www.ngpavlino.ru/ads/${id_mess}
  `;
  const telegramUrl = `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID}&text=${text}`;
  try {
    // Send the message via the Telegram Bot API
    const response = await fetch(telegramUrl, {
      method: "POST",
      mode: "no-cors",
      body: text,
    });
  } catch (error) {
    console.error("Error sending message to Telegram:", error);
  }
}
