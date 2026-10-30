import type {BarEvent} from './data';
import type {EventStudy} from './presentation';

export type EventEntry = {kind:'event';content:BarEvent}|{kind:'study';content:EventStudy};

export function EventCard({entry,onOpen}:{entry:EventEntry;onOpen:(entry:EventEntry)=>void}) {
 const isStudy=entry.kind==='study';
 const tone=isStudy?entry.content.tone:'olive';
 return <article className={'programme-card programme-card-'+tone}>
  <div className="programme-meta">
   {entry.kind==='study'?<span className="programme-serial" aria-label={'Эскиз '+entry.content.serial}>{entry.content.serial}</span>:<time dateTime={entry.content.date}>{new Intl.DateTimeFormat('ru-RU',{day:'numeric',month:'short'}).format(new Date(entry.content.date+'T12:00:00'))}<small>{entry.content.time}</small></time>}
   <span>{isStudy?'ЧЕРДАК':entry.content.format}</span>
  </div>
  <h3>{entry.content.title}</h3>
  <div className="programme-bottom"><p>{entry.content.description}</p><button onClick={()=>onOpen(entry)} aria-label={(isStudy?'Рассмотреть: ':'Подробнее: ')+entry.content.title}>{isStudy?'Рассмотреть':'Подробнее'} <span aria-hidden="true">→</span></button></div>
 </article>;
}
