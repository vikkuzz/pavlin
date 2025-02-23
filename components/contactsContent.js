const ContactsContent = () => {
  return (
    <div className="flex flex-col z-10 w-full h-full items-center justify-between font-mono text-sm lg:flex p-3">
      <h1 className="text-3xl md:text-4xl">Новоград Павлино | Объявления</h1>
      <p>
        <a
          href="https://t.me/vikkuzz"
          className="flex gap-2 items-center justify-center">
          <div className="relative w-6 h-6">
            <Image alt="logo" fill src="/image/logo_telegram"></Image>
          </div>
          <span>Ссылка на телеграмм-контакт</span>
        </a>
      </p>
    </div>
  );
};

export default ContactsContent;
