import VideoPlayer from "@/components/VideoPlayer";
import { Image } from "antd";


export default async function MyApp() {
  return (
    <div className="flex flex-col z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      <h1 className="text-3xl md:text-4xl pt-4 px-2">Новоград Павлино</h1>
      <div className="flex flex-col gap-4 justify-center items-center mt-8">
        <div className="flex flex-col gap-4 p-3">
          <h2 className="text-2xl font-bold">Новости</h2>
          <div className="flex flex-col gap-4">
            <h3>
              <strong>Март 2025.</strong> "Самолет" выложил новое видео о ходе
              строительства новостроек
            </h3>
            <VideoPlayer url="https://media.samolet.ru/video/%D0%9D%D0%BE%D0%B2%D0%BE%D0%B3%D1%80%D0%B0%D0%B4%20%D0%9F%D0%B0%D0%B2%D0%BB%D0%B8%D0%BD%D0%BE%20%D0%BC%D0%B0%D1%80%D1%82%202025.mp4" />
          </div>
          <div className="flex flex-col gap-4">
            <h3>
              <strong>11.03.2025</strong> Реконструкция улицы Бояринова и
              соединение ее с а/д ЮЛА запланировано на 2027 год
            </h3>
            <div className="flex flex-col gsp-4">
              <div className="relative max-w-[640px]">
                <Image
                  alt="map"
                  fill
                  objectFit="contain"
                  src={"/image/photo_2025-03-11_09-54-30.jpg"}
                />
              </div>
              <p>
                «Сейчас идет конкурс по подбору подрядчиков. Проектом будет
                предусмотрена реконструкция ул. Бояринова– 600 м + Строительство
                примыкания к Южно-лыткаринской автомобильной дороге – 70 м.
                Планируется 4 полосы по 3,5м шириной каждая. Кроме того,
                запланировано обустройство тротуаров шириной 2,25 метра с обеих
                сторон проезжей части. Стоимость проектных и монтажных работ 468
                746 163,21 руб. Сроки реализации проекта: до конца 2027 года».
              </p>
            </div>
          </div>          
          <div className="flex flex-col gap-4">
            <h3>
              <strong>20.02.2025</strong> "Самолет" выложил новое видео о ходе
              строительства новостроек
            </h3>
            <VideoPlayer url="https://media.samolet.ru/video/%D0%9D%D0%BE%D0%B2%D0%BE%D0%B3%D1%80%D0%B0%D0%B4%20%D0%9F%D0%B0%D0%B2%D0%BB%D0%B8%D0%BD%D0%BE%20%D1%84%D0%B5%D0%B2%D1%80%D0%B0%D0%BB%D1%8C%202025.mp4" />
          </div>
          <div className="flex flex-col gap-4">
            <h3>
              <strong>23.02.2025</strong> Видео одного из будущих жильцов.
              Корпус 6.
            </h3>
            <VideoPlayer url="/video/IMG_4270.MP4" />
          </div>
        </div>
      </div>
    </div>
  );
}
