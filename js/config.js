/* Everything you edit lives in this file. The other scripts are logic, leave them alone. */

/* 1 of 4. Contact email. Use an address you own and check often. */
var EMAIL='hello@ebukalabs.com';

/* 2 of 4. Social links. Paste full https:// addresses. Empty buttons stay greyed out. */
var LINKS={substack:'',linkedin:'',github:''};

/* 3 of 4. About photo. A path such as media/ebuka.jpg, or empty for the placeholder. */
var PHOTO='media/ebuka.jpg';

/* 4 of 4. Products. */
/* EDIT HERE. status: 0 = Concept, 1 = In development, 2 = Available.
   url: the product's landing page. Empty sends visitors back to this home page for now.
   media: path to a screenshot, GIF or video in your repo, e.g. media/notes.mp4 or media/notes.png. Empty shows the placeholder mockup. */
var WORK=[
{name:'Notes & Reminders',cat:'Mobile app',status:1,kind:'phone',url:'',media:'',mock:'notes',desc:'For anyone whose best ideas show up at the worst time. Write it down once and get a nudge when it matters, in one calm place instead of two apps.'},
{name:'Kyberdive',cat:'Product',status:1,kind:'web',url:'',media:'',mock:'kyber',desc:'Something new is taking shape. Full details arrive with its landing page.'},
{name:'Critical Thinking platform',cat:'Web app',status:0,kind:'web',url:'',media:'',mock:'think',desc:'For families who want to ask better questions together. A game about weighing claims and spotting weak arguments. Still an idea on paper.'}];
