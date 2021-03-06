import React from 'react';
import { Helmet } from 'react-helmet';

import styles from './styles.scss';

const AboutPage = () => (
  <React.Fragment>
    <Helmet>
      <title>Про нас</title>
    </Helmet>
    <div className="container">
      <div className={styles.wrapper}>
        <div className={styles.restrict}>
          <section className={styles.section}>
            <h1>Причина створення групи</h1>
            <p>
              Ідея виникла у зв’язку з тим, що багато бізнесів в Україні, які
              пропонують споживачам продукти чи послуги, не вважають за важливе
              супроводжувати їх державною мовою, тим самим позбавляючи
              україномовного споживача отримати повну і вичерпну інформацію про
              товар чи послугу, яку він має бажання придбати.
            </p>
          </section>
          <section className={styles.section}>
            <h1>Завдання групи</h1>
            <p>
              Оскільки один в полі не воїн, то за допомогою гурту однодумців нам
              буде легше звертатися до компаній з вимогою забезпечити нам наші
              права.
            </p>
          </section>
          <section className={styles.section}>
            <h1>Форма та методи впливу</h1>
            <p>
              Звернення, заяви, публікації, інтерв’ю. Жодних агресивних методів,
              що протирічать законам України. Методи впливу: Листи в головні
              офіси компаній, листи в головні офіси в Україні, зустрічі з
              представниками компаній, проведення переговорів з менеджментом
              компаній, фільмування процесу передачі звернень чи переговорів,
              висвітлення процесів які відбуваються на даний момент, подання
              заяв в службу захисту прав споживача,та судові інстанції.
            </p>
          </section>
          <section className={styles.section}>
            <h1>Алгоритм впливу</h1>
            <p>
              Будь-хто подає пропозицію компанії, яка порушує права
              україномовного споживача. Підтверджує пропозицію відповідними
              матеріалами: посиланнями на сайти, копіями переписки, скріншотами,
              відео. Група, що діє у Facebook приступає до вивчення і
              обговорення. Формуємо лист з проханням/вимогою про забезпечення
              прав україномовного споживача в контексті діяльності компанії на
              території України. Чекаємо реакції. За наявності реакції, вона
              публікується, обговорюється і приймається рішення щодо подальших
              дій. За можливості лист в письмовій формі передається в офіс
              компанії в Україні, процес фіксується на відео. У випадку
              ігнорування компанією звернень, публікуємо всі наші звернення,
              запускаємо механізми на зразок causes, і починаємо кожен в міру
              свої сил антипіар бренду. Паралельно подаємо заяву у службу
              захисту прав споживача. Чекаємо реакції служби. Відповідь
              публікуємо, обговорюємо і поширюємо. Якщо не отримуємо результату,
              то подаємо судовий позов про дискримінацію за мовною ознакою. Всі
              процеси максимально висвітлюються як власними силами, так і за
              допомогою <abbr title="Засоби масової інформації">ЗМІ</abbr>, які
              готові будуть нас підтримати.
            </p>
          </section>
        </div>
      </div>
    </div>
  </React.Fragment>
);

export default AboutPage;
