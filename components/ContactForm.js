"use client";
import { useState } from "react";

function ContactForm() {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = userInput;

    const text = `
        Отправлено с https://www.ngpavlino.ru 
        Новое сообщение от ${name} 
        Email: ${email} 
        Сообщение: ${message}
      `;
    const telegramUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${process.env.TELEGRAM_CHAT_ID}&text=${text}`;
    try {
      // Send the message via the Telegram Bot API
      const response = await fetch(telegramUrl, {
        method: "POST",
        mode: "no-cors",
        body: text,
      });

      if (response.data.ok) {
        return res
          .status(200)
          .json({ success: true, message: "Message sent successfully!" });
      } else {
        return res
          .status(500)
          .json({ success: false, message: "Failed to send message." });
      }
    } catch (error) {
      console.error("Error sending message to Telegram:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Имя:</label>
        <input
          type="text"
          name="name"
          value={userInput.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Почта:</label>
        <input
          type="email"
          name="email"
          value={userInput.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Сообщение:</label>
        <textarea
          name="message"
          value={userInput.message}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Отправить</button>
    </form>
  );
}

export default ContactForm;
