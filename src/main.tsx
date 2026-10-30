import React, {useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {approvedMenu, contacts, events, gallery, type MenuItem} from './data';
import {presentationEvents, presentationMenu} from './presentation';
import {EventCard, type EventEntry} from './EventCard';
import {BookingFields, type VisitSelection} from './BookingFields';
import './style.css';
import './editorial.css';

const Arrow=()=> <span aria-hidden="true">↗</span>;
function Mark(){return <svg aria-hidden="true" viewBox="0 0 48 48"><path d="M7 24 24 8 41 24M13 19v21h22V19M24 26v14" fill="none" stroke="currentColor" strokeWidth="3"/></svg>}
function Roof(){return <svg className="roof" viewBox="0 0 1200 420" fill="none" preserveAspectRatio="none" aria-hidden="true"><path className="roof-plane" d="M20 395 600 18l580 377-110-9L600 90 130 386Z"/><path className="roof-main" d="M20 395 600 18l580 377M130 386 600 90l470 296"/><path className="roof-detail" d="M600 18v72M310 205l48 40M890 205l-48 40M130 386v34m940-34v34M20 395h1160"/><path className="roof-depth" d="M20 395v-48L600 0l580 347v48M600 0v18"/></svg>}

const publishedMenu=approvedMenu.filter(category=>category.items.length>0);
const isPresentation=publishedMenu.length===0;
const menu=isPresentation?presentationMenu:publishedMenu;
const eventEntries: EventEntry[]=events.length?events.map(content=>({kind:'event',content})):presentationEvents.map(content=>({kind:'study',content}));
const hasEventStudies=events.length===0;
const formatDate=(date:string)=>new Intl.DateTimeFormat('ru-RU',{day:'numeric',month:'long'}).format(new Date(date+'T12:00:00'));
function SectionLabel({number,children}:{number:string;children:string}) {return <p className="section-label"><span className="section-number">{number}</span>{children}</p>}
function MenuRows({items,nested=false}:{items:MenuItem[];nested?:boolean}) {
 const Heading=nested?'h4':'h3';
 return <ul className="menu-rows">{items.map(item=><li className="menu-row" key={item.id}>
  <div className="menu-item-copy"><Heading>{item.name}</Heading><p>{item.detail}</p></div>
  <div className="menu-item-meta">{item.volume&&<span className="volume">{item.volume}</span>}{item.price?<span className="price">{item.price}</span>:item.profile&&<span className="flavour-profile">{item.profile}</span>}</div>
 </li>)}</ul>;
}
function App() {
 const [navOpen,setNavOpen]=useState(false);
 const [categoryId,setCategoryId]=useState(menu[0].id);
 const category=menu.find(item=>item.id===categoryId)??menu[0];
 const [modal,setModal]=useState<'menu'|'events'|'event'|'booking'|'booking-info'|null>(null);
 const [activeEvent,setActiveEvent]=useState<EventEntry|null>(null);
 const [visit,setVisit]=useState<VisitSelection>({date:'',guests:'2',time:''});
 const [feedback,setFeedback]=useState(false);
 const dialog=useRef<HTMLDialogElement>(null);
 const menuToggle=useRef<HTMLButtonElement>(null);
 const now=new Date();
 const minDate=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
 function openModal(next:Exclude<typeof modal,null>) {setModal(next);setFeedback(false);if(dialog.current?.open)dialog.current.querySelector<HTMLButtonElement>('.dialog-close')?.focus();else dialog.current?.showModal()}
 function closeModal() {dialog.current?.close()}
 function updateVisit(patch:Partial<VisitSelection>) {setVisit(previous=>({...previous,...patch}));setFeedback(false)}
 function readVisit(form:HTMLFormElement):VisitSelection {const values=new FormData(form);return {date:String(values.get('date')??''),guests:String(values.get('guests')??'2'),time:String(values.get('time')??'')}}
 function openEvent(entry:EventEntry) {setActiveEvent(entry);openModal('event')}
 const photos=gallery.filter(photo=>photo.rightsConfirmed);
 return <><a className="skip" href="#main">Перейти к содержимому</a>
  <header className="header" onKeyDown={e=>{if(e.key==='Escape'){setNavOpen(false);menuToggle.current?.focus()}}}>
   <a className="brand" href="#main" aria-label="Чердак — начало"><Mark/><span>ЧЕРДАК</span></a>
   <button ref={menuToggle} className="nav-toggle" aria-expanded={navOpen} aria-controls="navigation" onClick={()=>setNavOpen(!navOpen)}>{navOpen?'Закрыть ×':'Меню ≡'}</button>
   <nav id="navigation" className={navOpen?'open':''} aria-label="Основная навигация">{[['atmosphere','О баре'],['menu','Меню'],['events','Афиша'],['contacts','Контакты']].map(([id,text])=><a key={id} href={'#'+id} onClick={()=>setNavOpen(false)}>{text}</a>)}</nav>
   <a className="header-book" href="#booking">Бронирование <Arrow/></a>
  </header>
  <main id="main">
   <section className="hero" aria-labelledby="hero-title">
    <div className="hero-meta"><p>Бар на Зыбицкой</p><span>Минск <span aria-hidden="true">/</span> 18+</span></div>
    <div className="loft-stage"><Roof/><h1 id="hero-title">ЧЕРДАК</h1></div>
    <div className="hero-bottom"><p className="hero-line">Город подождёт.<br/><em>Этот вечер — твой.</em></p><div className="hero-actions"><a className="button primary" href="#menu">Посмотреть меню <Arrow/></a><a className="button secondary" href="#booking">Забронировать стол <span aria-hidden="true">→</span></a></div></div>
    <div className="hero-foot"><a href={contacts.map} target="_blank" rel="noreferrer">Зыбицкая, 9 <Arrow/></a><span>Меню, вечера и встречи</span><a href="#atmosphere" aria-label="Далее — о баре">Далее <span aria-hidden="true">↓</span></a></div>
   </section>
   <div className="editorial-bridge">
    <section id="atmosphere" className="atmosphere section" aria-labelledby="about-title">
     <SectionLabel number="01">О баре</SectionLabel><h2 id="about-title">Бар «Чердак»<br/>на Зыбицкой, 9.</h2>
     <p className="about-copy">Знакомство начинается с меню. Афиша и детали визита — чуть ниже.</p>
     <div className="about-location"><p>Минск<br/>Зыбицкая, 9</p><a className="text-link" href={contacts.map} target="_blank" rel="noreferrer">Найти на карте <Arrow/></a></div>
     {photos.length>0&&<div className="photo-gallery">{photos.map(photo=><figure key={photo.src}><img src={photo.src} alt={photo.alt} loading="lazy"/><figcaption>{photo.caption}</figcaption></figure>)}</div>}
    </section>
    <section id="menu" className="menu section" aria-labelledby="menu-title">
     <div className="menu-heading"><SectionLabel number="02">Меню</SectionLabel><h2 id="menu-title">{isPresentation?'Карта вкусов.':'Барная карта.'}</h2>{isPresentation&&<p className="menu-context">Вкусовой эскиз. <br/>Не меню для заказа.</p>}</div>
     <div className="categories" role="group" aria-label="Категории карты">{menu.map(item=><button key={item.id} aria-pressed={category.id===item.id} aria-controls="menu-chapter" onClick={()=>setCategoryId(item.id)}><span>{item.title}</span><span className="category-arrow" aria-hidden="true">→</span></button>)}</div>
     <div className="menu-content"><div id="menu-chapter" aria-live="polite"><div className="menu-transition" key={category.id}><div className="menu-chapter-heading"><h3>{category.title}</h3><span aria-hidden="true">0{menu.findIndex(item=>item.id===category.id)+1} / 0{menu.length}</span></div><MenuRows items={category.items.slice(0,3)} nested/></div></div><div className="menu-bottom"><button className="text-link" onClick={()=>openModal('menu')}>{isPresentation?'Все сочетания':'Смотреть всё меню'} <span aria-hidden="true">→</span></button></div></div>
    </section>
   </div>

   <section id="events" className="events section" aria-labelledby="events-title">
    <div className="events-intro"><SectionLabel number="03">Афиша</SectionLabel><h2 id="events-title">Ближайшие <br/>события.</h2><p>{hasEventStudies?'Визуальные эскизы, не анонсы.':'Программа, даты и поводы заглянуть.'}</p><button className="text-link" onClick={()=>openModal('events')}>{hasEventStudies?'Смотреть эскизы':'Все события'} <span aria-hidden="true">→</span></button></div>
    <div className="programme-list" data-count={Math.min(eventEntries.length,2)}>{eventEntries.slice(0,2).map(entry=><EventCard key={entry.content.id} entry={entry} onOpen={openEvent}/>)}</div>
   </section>

   <section id="booking" className="booking section" aria-labelledby="booking-title">
    <SectionLabel number="04">Бронирование</SectionLabel><div className="booking-heading"><h2 id="booking-title">Собираемся <br/>в «Чердаке»?</h2><p>Выбери дату, время <br/>и количество гостей.</p></div>
    <div className="booking-controls"><form className="booking-inline" onSubmit={e=>{e.preventDefault();setVisit(readVisit(e.currentTarget));openModal('booking')}}><BookingFields prefix="booking" value={visit} minDate={minDate} onChange={updateVisit}/><button type="submit" className="button primary">Продолжить <span aria-hidden="true">→</span></button></form><button className="booking-help text-link" onClick={()=>openModal('booking-info')}>О предварительном выборе <span aria-hidden="true">→</span></button></div>
   </section>

   <section id="contacts" className="contacts section" aria-labelledby="contacts-title">
    <div className="contact-location"><SectionLabel number="05">Контакты</SectionLabel><h2 id="contacts-title">Зыбицкая, 9<span className="address-dot">.</span></h2><p>Минск, Беларусь</p></div>
    <div className="contact-details"><a className="text-link route-link" href={contacts.map} target="_blank" rel="noreferrer"><span>Построить маршрут<br/><small>в Яндекс Картах</small></span><Arrow/></a>
     {(contacts.hours||contacts.phone||contacts.instagramConfirmed||contacts.bookingChannel)&&<dl className="contact-list">{contacts.hours&&<div><dt>Часы работы</dt><dd>{contacts.hours}</dd></div>}{contacts.phone&&<div><dt>Телефон</dt><dd><a href={'tel:'+contacts.phone.replace(/[^+0-9]/g,'')}>{contacts.phone}</a></dd></div>}{contacts.instagramConfirmed&&<div><dt>Instagram</dt><dd><a href={contacts.instagram} target="_blank" rel="noreferrer">@cherdakbar_minsk <Arrow/></a></dd></div>}{contacts.bookingChannel&&<div><dt>Бронирование</dt><dd><a href={contacts.bookingChannel.url}>{contacts.bookingChannel.label} <Arrow/></a></dd></div>}</dl>}
    </div>
   </section>
  </main>
  <footer><a className="brand" href="#main"><Mark/><span>ЧЕРДАК</span></a><p>Неофициальный концепт</p><a className="back-top" href="#main" aria-label="Наверх">↑</a></footer>

  <dialog ref={dialog} aria-labelledby="dialog-title" className={modal==='menu'?'full-menu-dialog':modal==='events'?'programme-dialog':''} onClose={()=>setModal(null)} onClick={e=>{if(e.target===e.currentTarget)closeModal()}}>
   <button className="dialog-close" aria-label="Закрыть окно" onClick={closeModal}>×</button>
   {modal==='menu'&&<><span className="dialog-overline">{isPresentation?'Вкусовой эскиз':'Меню'}</span><h2 id="dialog-title">{isPresentation?'Все сочетания':'Карта бара'}</h2>{isPresentation&&<p className="dialog-intro">Сочетания для знакомства с форматом карты. Это не действующее меню бара.</p>}{menu.map((item,index)=><section className="full-menu-category" key={item.id}><h3><span aria-hidden="true">0{index+1}</span>{item.title}</h3><MenuRows items={item.items} nested/></section>)}</>}
   {modal==='events'&&<><span className="dialog-overline">Афиша</span><h2 id="dialog-title">{hasEventStudies?'Эскизы афиши':'Все события'}</h2>{hasEventStudies&&<p className="dialog-intro">Редакционные композиции для будущей программы. Мероприятия и даты не объявлены.</p>}<div className="programme-list" data-count={eventEntries.length}>{eventEntries.map(entry=><EventCard key={entry.content.id} entry={entry} onOpen={openEvent}/>)}</div></>}
   {modal==='event'&&activeEvent&&<><span className="dialog-overline">{activeEvent.kind==='study'?'Эскиз афиши':activeEvent.content.format}</span><h2 id="dialog-title">{activeEvent.content.title}</h2>{activeEvent.kind==='study'?<><p className="dialog-intro">Это визуальный эскиз, а не анонс мероприятия. Здесь нет действующей даты, программы или условий входа.</p><button className="text-link" onClick={()=>openModal('events')}>Вернуться к эскизам <span aria-hidden="true">←</span></button></>:<><p className="event-modal-date">{formatDate(activeEvent.content.date)} · {activeEvent.content.time}</p><p>{activeEvent.content.description}</p><p>{activeEvent.content.entry}</p>{activeEvent.content.detailsUrl&&<a className="text-link" href={activeEvent.content.detailsUrl} target="_blank" rel="noreferrer">Открыть подробности <Arrow/></a>}</>}</>}
   {modal==='booking-info'&&<><span className="dialog-overline">План визита</span><h2 id="dialog-title">Сначала — детали.</h2><p className="dialog-intro">Выбери дату, время и гостей, затем проверь их в окне. Этот сценарий не отправляет заявку и не проверяет наличие столиков.</p><button className="button secondary" onClick={closeModal}>Вернуться к выбору <span aria-hidden="true">←</span></button></>}
   {modal==='booking'&&<><span className="dialog-overline">План визита</span><h2 id="dialog-title">Проверим детали.</h2><p className="dialog-intro" id="booking-description">Это предварительный выбор. Заявка не отправляется, столик не резервируется.</p><form aria-describedby="booking-description" onSubmit={e=>{e.preventDefault();setVisit(readVisit(e.currentTarget));setFeedback(true)}}><div className="booking-fields"><BookingFields prefix="visit" value={visit} minDate={minDate} onChange={updateVisit}/></div><button type="submit" className="button primary">Посмотреть выбранное <span aria-hidden="true">→</span></button><div className="form-feedback" role="status">{feedback&&<><p className="selection-summary">{formatDate(visit.date)} · {visit.time}<span>Гостей: {visit.guests}</span></p><p>Столик не забронирован. Выбраны только параметры визита.</p>{contacts.bookingChannel?<a className="text-link" href={contacts.bookingChannel.url}>{contacts.bookingChannel.label} <Arrow/></a>:<a className="text-link" href="#contacts" onClick={closeModal}>Перейти к адресу <span aria-hidden="true">→</span></a>}</>}</div></form></>}
  </dialog>
 </>;
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
