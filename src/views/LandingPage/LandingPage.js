import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import DialogLink from 'components/DialogLink';
import AutocompleteSearch from 'components/AutocompleteSearch';
import LandingSection from 'components/LandingSection';
import CompanyPreview from 'components/CompanyPreview';
import Comment from 'components/Comment';

import styles from './styles.scss';

const LandingPage = ({ categoriesList, newCompanies, comments }) => (
  <React.Fragment>
    <section className={styles.banner}>
      <div className="container">
        <h1 className={styles.bannerHeader}>
          База компаній громадської ініціативи <q>И так поймут</q>
        </h1>
        <p className={styles.info}>
          Тут ви можете перевірити, чи компанія використовує виключно українську мову, обслуговуючи своїх клієнтів в Україні.
        </p>
        {categoriesList && <AutocompleteSearch categories={categoriesList} />}
      </div>
    </section>
    <div className={styles.pattern}>
      <div className="container">
        <section className={styles.description}>
          <h1 className={styles.title}>
            <q className="standalone-quote">И так поймут</q> Каталог <abbr title="Засоби масової інформації">ЗМІ</abbr> та бізнесу
          </h1>
          <p className={styles.text}>
            Це сервіс, де можна перевірити, чи компанія обслуговує своїх клієнтів українською мовою: чи має україномовний сайт, інструкції, етикетки, різні супровідні документи та навіть сторінки у соцмережах.
          </p>
        </section>
        <section className={styles.nameSearch}>
          <h1 className={styles.title}>
            Шукайте компанії за назвою
          </h1>
          <p className={styles.text}>
            Якщо ви знаєте назву компанії і хочете перевірити її лояльність, скористайтесь пошуком за назвою компанії. Для цього введіть у поле пошуку кілька перших букв назви й оберіть потрібну компанію із запропонованих нашим розумним пошуком варіантів.
          </p>
          <Link className="page__button" to="/companies">
            Шукати за назвою
          </Link>
        </section>
        <section className={styles.categorySearch}>
          <h1 className={styles.title}>
            Шукайте компанії за сферою діяльності
          </h1>
          <p className={styles.text}>
            Хочете скористатись послугами певної компанії, та не знаєте, яка з плеяди представлених на ринку лояльна до україномовного споживача? Скористайтесь нашим пошуком по сферах. Оберіть сферу послуг, що вас цікавить, серед списку зліва на сторінці <q>Всі компанії</q> або у стрічці пошуку на головній сторінці.
          </p>
          <Link className="page__button" to="/companies">
            Шукати за сферою
          </Link>
        </section>
        <section className={styles.addCompany}>
          <h1 className={styles.title}>
            Додавайте компанії до нашої бази
          </h1>
          <p className={styles.text}>
            Допоможіть нам стати кращими, пропонуючи компанії, яких ще немає у базі. Ми зацікавлені у тому, аби наш сервіс представляв якомога більшу кількість різноманітних компаній - як лояльних до української мови, так і порушників. Зазначимо, що ви тільки пропонуєте компанію на розгляд. Після того її затверджує модератор, і система сама присвоює компанії статус лояльної/порушника на основі наявності/відсутності порушень.
          </p>
          <DialogLink
            dialogType="/dialog/create-company"
            className="page__button"
          >
            Запропонувати компанію
          </DialogLink>
        </section>
        {newCompanies &&
          <LandingSection title="Нові компанії">
            <ul className={styles.newCompanies}>
              {newCompanies.map(item => (
                <li key={item._id}>
                  <CompanyPreview company={item}/>
                </li>
              ))}
            </ul>
          </LandingSection>
        }
        {comments &&
          <LandingSection title="Останні коментарі">
            <ul className={styles.comments}>
              {comments.map(item => (
                <li key={item._id}>
                  <Comment comment={item} company={item._company} />
                </li>
              ))}
            </ul>
          </LandingSection>
        }
      </div>
    </div>
  </React.Fragment>
);

LandingPage.propTypes = {
  categoriesList: PropTypes.array,
  newCompanies: PropTypes.array,
  comments: PropTypes.array,
};

export default LandingPage;
