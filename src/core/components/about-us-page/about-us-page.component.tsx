import { Button, TextField } from 'common/components';
import { feedbackTransport } from 'common/transports';
import { LayoutFull } from 'core/components/layout-full';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import './about-us.styles'

export function AboutUsPage(): JSX.Element  {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const isAllowedToSend = !name || !email || !message;

    const onSendFeedbackClickHandler = useCallback(async () => {
        try {
            await feedbackTransport.sendFeedback(name, email, message);

            setName(() => '');
            setEmail(() => '');
            setMessage(() => '');

            toast('Обратная связь успешно отправлена', { type: 'success' });
        } catch (error) {
            console.error(error);
            toast('Произошла ошибка при отправке обратной связи', { type: 'error' });
        }
    }, [name, email, message]);

    return(
        <>
            <div className="about-us">
                <div className="about-us__info">
                    <div className="about-us__info-title">История проекта</div>

                    ООО «Placeholder» было зарегистрировано 14 Мая 2020г.<br />
                    Основным видом деятельности ООО «Placeholder» является розничная (95-97%) и оптовая (3-5%) продажа электроники, бытовой и компьютерной техники через сеть магазинов в Приднестровье.<br />
                    Главный офис компании находится по адресу <b>г. Тирасполь, ул. Советская 121</b>.<br />
                    <br />
                    На данный момент у фирмы 14 собственных магазинов.<br />
                    <br />
                    Весь товар хранится на собственных складах фирмы площадью 10 000 кв.м.<br />
                    На фирме работают более 300 сотрудников; бесперебойную работу магазинов обеспечивают более 30 автомобилей.<br />
                    На сегодняшний день мы являемся дилерами LG electronics, Samsung Electronics, INDESIT company (Indesit, Hotpoint-Ariston, Whirlpool), ELECTROLUX group (AEG,  Electrolux, Zanussi), Panasonic, Karcher, Ariston-Thermo, SEB group (Tefal, Moulinex, Rowenta , Krups), Termex, Zelmer, BSHG (Bosch-Siemens), Sven, Delonghi и др.<br />
                    Дополнительно фирма занимается сервисным гарантийным и послегарантийным обслуживанием техники.<br />
                    <br />
                    На данный момент в Приднестровье действуют девять сервисных центров фирмы «Placeholder».<br />
                    Сервисные центры авторизированы по таким брендам как: SAMSUNG electronics, LG electronics, INDESIT company, ELECTROLUX group, TERMEX , Panasonic, Karcher, Sven и др.<br />
                    ООО "Placeholder"  уже не первый год входит в двадцатку крупнейших налогоплательщиков, а также является добропорядочным участником внешне-экономической деятельности.Также компания регулярно принимает участие во всевозможных конкурсах, где занимает призовые места. Кроме того и сотрудники компании также регулярно принимают участие во многочисленных тренингах и семинарах.Благодаря прямым контрактам и поставкам нам удается поддерживать самый большой в Приднестровье ассортимент по привлекательным ценам.<br />
                </div>

                <div className="about-us__info">
                    <div className="about-us__info-title">О доставке товаров</div>

                    Доставка осуществляется во все населенные пункты Приднестровья.<br />
                    В города и пригороды (Суклея, Ближний Хутор) доставка, как правило, осуществляется в день заказа или на следующий день. Сроки доставки могут изменяться в праздничные и предпраздничные дни.<br />
                    <br />
                    Если товара в вашем городе нет, на доставку такого товара может понадобиться на 1-3 дня больше, в отдельных случаях более 3-х дней.<br />
                    В остальные населенные пункты доставка осуществляется в течение трех дней, в случае перемещения товара из другого города в течение трех дней по прибытию товара в ближайший магазин.<br />
                    <br />
                    Доставка заказа до 1500р. стоит 35р.<br />
                    Доставка заказа на 1500р. и дороже осуществляется бесплатно.<br />
                    Доставка габаритных товаров отдела мебели, а также собранной или требующей сборки мебели также осуществляется бесплатно.<br />
                    Доставка мелкогабаритных товаров в период праздников может быть ограничена.<br />
                    <br />
                    Работники службы доставки заносят товар по адресу в помещение (коридор). Дополнительная плата за подъем на этаж не взымается.<br />
                </div>

                <div className="about-us__feedback">
                    <span className="about-us__feedback-title">Обратная связь</span>

                    <div>
                        <TextField
                            className="about-us__feedback-field"
                            label="ФИО"
                            name="name"
                            placeholder="Иван Иванович Иванов"
                            onChange={setName}
                            value={name}
                        />

                        <TextField
                            className="about-us__feedback-field"
                            label="Email"
                            name="email"
                            placeholder="test@example.com"
                            onChange={setEmail}
                            value={email}
                        />

                        <TextField
                            className="about-us__feedback-field"
                            label="Сообщение"
                            name="comment"
                            placeholder="Ваше сообщение"
                            onChange={setMessage}
                            value={message}
                            textArea
                        />

                        <Button disabled={isAllowedToSend} onClick={onSendFeedbackClickHandler}>Отправить</Button>
                    </div>
                </div>

            </div>
        </>
    );
}
