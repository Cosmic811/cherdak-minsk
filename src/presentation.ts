import type {MenuCategory} from './data';

// Editable flavour studies for the pitch. These are not drinks or dishes available at the bar.
// Never supply invented prices or servings here. Approved assortment belongs in data.ts.
export const presentationMenu: MenuCategory[] = [
 {id:'cocktails',title:'Коктейли',description:'От свежих нот к более глубоким.',items:[
  {id:'citrus-herbs',name:'Цитрус и травы',detail:'Лимон · розмарин · лёгкая горчинка',profile:'Свежий / сухой',volume:null,price:null},
  {id:'cherry-cocoa',name:'Вишня и какао',detail:'Тёмные ягоды · какао · пряный акцент',profile:'Насыщенный / мягкий',volume:null,price:null},
  {id:'apple-spice',name:'Яблоко и пряности',detail:'Зелёное яблоко · корица · цитрусовая цедра',profile:'Фруктовый / пряный',volume:null,price:null},
  {id:'pear-flower',name:'Груша и цветы',detail:'Спелая груша · цветочные ноты · свежий финиш',profile:'Лёгкий / ароматный',volume:null,price:null}
 ]},
 {id:'soft',title:'Без алкоголя',description:'Ягоды, фрукты и свежие акценты.',items:[
  {id:'pear-rosemary',name:'Груша и розмарин',detail:'Груша · травяные ноты · цитрус',profile:'Фруктовый / свежий',volume:null,price:null},
  {id:'berry-mint',name:'Ягоды и мята',detail:'Красные ягоды · мята · лимон',profile:'Ягодный / прохладный',volume:null,price:null},
  {id:'tea-orange',name:'Чай и апельсин',detail:'Чёрный чай · апельсиновая цедра · специи',profile:'Терпкий / тёплый',volume:null,price:null},
  {id:'apple-ginger',name:'Яблоко и имбирь',detail:'Яблоко · имбирь · лайм',profile:'Свежий / острый',volume:null,price:null}
 ]},
 {id:'table',title:'К столу',description:'Текстуры и сочетания.',items:[
  {id:'cheese-fruit',name:'Сыр и фрукты',detail:'Солёное · сладкое · спелые ноты',profile:'Контраст',volume:null,price:null},
  {id:'bread-herbs',name:'Хлеб и травы',detail:'Хрустящая корочка · зелень · мягкая текстура',profile:'Текстура',volume:null,price:null},
  {id:'vegetables-spice',name:'Овощи и специи',detail:'Сладость овощей · пряность · лёгкая острота',profile:'Баланс',volume:null,price:null},
  {id:'olives-citrus',name:'Оливки и цитрус',detail:'Солёные ноты · лимонная цедра · травы',profile:'Акцент',volume:null,price:null}
 ]}
];

export type EventStudy = {id:string;title:string;description:string;serial:string;tone:'olive'|'copper'};
// Independent editorial studies, with no dates, artists or claim that an event is scheduled.
export const presentationEvents: EventStudy[] = [
 {id:'atmosphere-study',title:'Своя атмосфера',description:'Ритм, разговоры и новые сочетания.',serial:'I',tone:'olive'},
 {id:'night-study',title:'Ближе к ночи',description:'Город меняет тон. Разговор продолжается.',serial:'II',tone:'copper'}
];
