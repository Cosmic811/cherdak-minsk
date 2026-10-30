// Only confirmed content belongs in this file. Presentation content lives separately.
export type MenuItem = {
 id:string;
 name:string;
 detail:string;
 volume:string|null;
 price:string|null;
 profile?:string;
};
export type MenuCategory = {id:string;title:string;description:string;items:MenuItem[]};
export const approvedMenu: MenuCategory[] = [];

export type BarEvent = {
 id:string;title:string;date:string;time:string;format:string;
 description:string;entry:string;detailsUrl?:string;
};
export const events: BarEvent[] = [];

export type GalleryPhoto = {src:string;alt:string;caption:string;rightsConfirmed:true};
export const gallery: GalleryPhoto[] = [];
export const contacts: {
 address:string;map:string;instagram:string;instagramConfirmed:boolean;
 phone:string|null;hours:string|null;bookingChannel:{label:string;url:string}|null;
} = {
 address:'Минск, Зыбицкая, 9',map:'https://yandex.by/maps/org/cherdak/1401572004/',
 instagram:'https://www.instagram.com/cherdakbar_minsk/',instagramConfirmed:false,
 phone:null,hours:null,bookingChannel:null
};
