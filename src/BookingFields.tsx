export type VisitSelection = {date:string;guests:string;time:string};
export function BookingFields({prefix,value,minDate,onChange}:{prefix:string;value:VisitSelection;minDate:string;onChange:(patch:Partial<VisitSelection>)=>void}) {
 return <>
  <label className="visit-field" htmlFor={prefix+'-date'}><span>Дата</span><input id={prefix+'-date'} type="date" name="date" required min={minDate} value={value.date} onInput={e=>onChange({date:e.currentTarget.value})} onChange={e=>onChange({date:e.currentTarget.value})}/></label>
  <label className="visit-field" htmlFor={prefix+'-guests'}><span>Гостей</span><select id={prefix+'-guests'} name="guests" value={value.guests} onChange={e=>onChange({guests:e.currentTarget.value})}>{['1','2','3','4','5','6','Больше 6'].map(n=><option key={n} value={n}>{n}</option>)}</select></label>
  <label className="visit-field" htmlFor={prefix+'-time'}><span>Время</span><input id={prefix+'-time'} type="time" name="time" required step="60" value={value.time} onInput={e=>onChange({time:e.currentTarget.value})} onChange={e=>onChange({time:e.currentTarget.value})}/></label>
 </>;
}
