(()=>{"use strict";var e={515:function(e,t,a){var r=a(893),n=a(294),s=a(745),o=a(210),i=a(621);let l=class{static formatDate(e){if(!(e instanceof Date)||isNaN(e))throw Error("Invalid date");return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}static parseDate(e){let[t,a,r]=e.split("-").map(Number);if(!t||!a||!r||a<1||a>12||r<1||r>31)throw Error(`Invalid date string: ${e}`);let n=new Date(t,a-1,r);if(isNaN(n))throw Error(`Invalid date string: ${e}`);return n}static isValidDate(e){try{return this.parseDate(e),!0}catch{return!1}}},d=class{save(){let e=Object.fromEntries(this.data);localStorage.setItem(this.storageKey,JSON.stringify(e))}loadFromStorage(){let e=localStorage.getItem(this.storageKey);if(e){let t=JSON.parse(e);this.data=new Map(Object.entries(t))}}getData(e){let t=l.formatDate(e);return this.data.get(t)||null}setData(e,t){let a=l.formatDate(e);this.data.set(a,t),this.save()}getAll(){return Object.fromEntries(this.data)}clear(){this.data.clear(),this.save()}mergeData(e){Object.entries(e).forEach(e=>{let[t,a]=e;l.isValidDate(t)&&this.validateData(a)&&this.data.set(t,a)}),this.save()}replaceData(e){this.data.clear(),Object.entries(e).forEach(e=>{let[t,a]=e;l.isValidDate(t)&&this.validateData(a)&&this.data.set(t,a)}),this.save()}validateData(e){throw Error("Subclasses must implement validateData")}constructor(e){this.storageKey=e,this.data=new Map,this.loadFromStorage()}},c=class extends d{markAttendance(e,t){this.setData(e,t)}getAttenance(e){return this.getData(e)}validateData(e){return"string"==typeof e&&["present","absent","leave"].includes(e.toLowerCase())}constructor(){super("attendenaceData")}},g=class extends d{addWorklog(e,t){this.setData(e,t)}getWorklog(e){return this.getData(e)}validateData(e){return"string"==typeof e&&e.trim().length>0}constructor(){super("worklogData")}},u=class{static range(e,t){return Array.from({length:t-e+1},(t,a)=>e+a)}static capitalize(e){return e?e.charAt(0).toUpperCase()+e.slice(1):e}static rangeWithLambda(e,t,a){return Array.from({length:t-e+1},(t,r)=>a(e+r))}},h=class{exportData(){try{let e=this.attendanceManager.getAll(),t=this.worklogManager.getAll(),a={attendance:e,worklogs:t,exportedAt:new Date().toISOString()},r=JSON.stringify(a,null,2),n=new Blob([r],{type:"application/json"}),s=URL.createObjectURL(n),o=document.createElement("a");o.href=s,o.download=`calendar-data-${new Date().toISOString().split("T")[0]}.json`,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(s)}catch(e){throw console.error("Error exporting data:",e),Error("Failed to export data")}}importData(e){let t=!(arguments.length>1)||void 0===arguments[1]||arguments[1];return new Promise((a,r)=>{if(!e||"application/json"!==e.type){r(Error("Invalid file type. Please upload a JSON file."));return}let n=new FileReader;n.onload=e=>{try{let r=JSON.parse(e.target.result);if(!r.attendance||!r.worklogs)throw Error("Invalid data format");t&&(this.attendanceManager.clear(),this.worklogManager.clear()),t?(this.attendanceManager.replaceData(r.attendance),this.worklogManager.replaceData(r.worklogs)):(this.attendanceManager.mergeData(r.attendance),this.worklogManager.mergeData(r.worklogs)),a("Data imported successfully")}catch(e){console.error("Error importing data:",e),r(Error("Failed to import data: "+e.message))}},n.onerror=()=>{r(Error("Error reading file"))},n.readAsText(e)})}constructor(e,t){this.attendanceManager=e,this.worklogManager=t}},m=class{getDaysInMonth(e,t){return new Date(e,t+1,0).getDate()}getFirstDayOfMonth(e,t){return new Date(e,t,1).getDay()}markAttendance(e,t){this.attendanceManager.markAttendance(e,t)}addWorklog(e,t){this.worklogManager.addWorklog(e,t)}getAttendance(e){return this.attendanceManager.getAttenance(e)}getWorklog(e){return this.worklogManager.getWorklog(e)}getMonthData(e,t){let a=this.getDaysInMonth(e,t),r=this.getFirstDayOfMonth(e,t),n=[];return u.rangeWithLambda(0,r-1,()=>n.push(null)),u.rangeWithLambda(1,a,a=>{let r=new Date(e,t,a),s=0===r.getDay()||6===r.getDay();n.push({date:r,worklog:this.getWorklog(r),attendance:this.getAttendance(r),isWeekend:s})}),n}getAttendanceSummary(e,t){let a=this.getDaysInMonth(e,t),r=0,n=0,s=0;return u.rangeWithLambda(1,a,a=>{let o=new Date(e,t,a),i=this.getAttendance(o);"present"===i?r++:"absent"===i?n++:"leave"===i&&s++}),{presentDays:r,absentDays:n,leaveDays:s}}exportData(){this.dataImporterExporter.exportData()}importData(e){let t=!(arguments.length>1)||void 0===arguments[1]||arguments[1];return this.dataImporterExporter.importData(e,t)}constructor(){this.currentDate=new Date,this.attendanceManager=new c,this.worklogManager=new g,this.dataImporterExporter=new h(this.attendanceManager,this.worklogManager)}};var p=a(305),x=a(208),f=a(26),v=a(19);function b(){for(var e=arguments.length,t=Array(e),a=0;a<e;a++)t[a]=arguments[a];return(0,v.m6)((0,f.W)(t))}let j=(0,x.j)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",{variants:{variant:{default:"bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",destructive:"bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",outline:"border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",secondary:"bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2 has-[>svg]:px-3",sm:"h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",lg:"h-10 rounded-md px-6 has-[>svg]:px-4",icon:"size-9"}},defaultVariants:{variant:"default",size:"default"}});function y(e){let{className:t,variant:a,size:n,asChild:s=!1,...o}=e,i=s?p.g7:"button";return(0,r.jsx)(i,{"data-slot":"button",className:b(j({variant:a,size:n,className:t})),...o})}let w=e=>{let{currentDate:t,onPrevMonth:a,onNextMonth:n}=e;return(0,r.jsxs)("div",{className:"calendar-header flex items-center justify-between mb-4",children:[(0,r.jsx)(y,{onClick:a,variant:"outline",children:"Previous"}),(0,r.jsxs)("h2",{className:"text-2xl font-semibold",children:[t.toLocaleString("default",{month:"long"})," ",t.getFullYear()]}),(0,r.jsx)(y,{onClick:n,variant:"outline",children:"Next"})]})},k=e=>{let{monthData:t,onDateClick:a}=e;return(0,r.jsxs)("div",{className:"grid grid-cols-7 gap-[2px] bg-gray-100",children:[["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(e=>(0,r.jsx)("div",{className:"calendar-day-header bg-gray-800 text-white p-2 text-center text-sm",children:e},e)),t.map((e,t)=>(0,r.jsx)("div",{className:`calendar-day min-h-[80px] p-2 text-center cursor-pointer
                        ${e?"bg-slate-50 hover:bg-blue-200":"bg-gray-200"}
                        ${(null==e?void 0:e.attendance)?`status-${e.attendance}`:""}
                        ${(null==e?void 0:e.isWeekend)?"bg-slate-200 hover:bg-slate-300":""}`,onClick:()=>a(e),children:e?e.date.getDate():""},t))]})};function D(e){let{className:t,...a}=e;return(0,r.jsx)("div",{"data-slot":"card",className:b("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",t),...a})}function N(e){let{className:t,...a}=e;return(0,r.jsx)("div",{"data-slot":"card-header",className:b("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-[data-slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",t),...a})}function M(e){let{className:t,...a}=e;return(0,r.jsx)("div",{"data-slot":"card-title",className:b("leading-none font-semibold",t),...a})}function O(e){let{className:t,...a}=e;return(0,r.jsx)("div",{"data-slot":"card-content",className:b("px-6",t),...a})}function S(e){let{className:t,...a}=e;return(0,r.jsx)("textarea",{"data-slot":"textarea",className:b("border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",t),...a})}let A=e=>{let{selectedDate:t,onMarkAttendance:a,onAddWorklog:n,getAttendance:s,getWorklog:o}=e;return(0,r.jsxs)(D,{className:"mt-4",children:[(0,r.jsx)(N,{children:(0,r.jsx)(M,{children:t.toDateString()})}),(0,r.jsxs)(O,{children:[(0,r.jsxs)("div",{className:"attendance-controls mb-4",children:[(0,r.jsx)("h4",{className:"text-lg font-semibold mb-2",children:"Mark Attendance"}),(0,r.jsxs)("div",{className:"space-x-2",children:[(0,r.jsx)(y,{onClick:()=>a("present"),variant:"default",children:u.capitalize("present")}),(0,r.jsx)(y,{onClick:()=>a("absent"),variant:"destructive",children:u.capitalize("absent")}),(0,r.jsx)(y,{onClick:()=>a("leave"),variant:"secondary",children:u.capitalize("leave")})]})]}),(0,r.jsxs)("div",{className:"worklog-controls mb-4",children:[(0,r.jsx)("h4",{className:"text-lg font-semibold mb-2",children:"Add Worklog"}),(0,r.jsxs)("form",{onSubmit:e=>{e.preventDefault();let t=e.target.worklog.value;t&&(n(t),e.target.worklog.value="")},children:[(0,r.jsx)(S,{name:"worklog",placeholder:"Enter worklog...",className:"mb-2"}),(0,r.jsx)(y,{type:"submit",children:"Add Worklog"})]})]}),(0,r.jsxs)("div",{className:"day-details",children:[(0,r.jsx)("h4",{className:"text-lg font-semibold mb-2",children:"Details"}),(0,r.jsxs)("p",{className:"text-sm",children:["Attendance:"," ",u.capitalize(s(t))||"Not marked"]}),(0,r.jsxs)("p",{className:"text-sm",children:["Worklog: ",o(t)||"No worklog"]})]})]})]})};var E=a(589);function W(e){let{className:t,...a}=e;return(0,r.jsx)(E.f,{"data-slot":"label",className:b("flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",t),...a})}var I=a(665),C=a(514);function F(e){let{...t}=e;return(0,r.jsx)(I.fC,{"data-slot":"dialog",...t})}function _(e){let{...t}=e;return(0,r.jsx)(I.xz,{"data-slot":"dialog-trigger",...t})}function z(e){let{...t}=e;return(0,r.jsx)(I.h_,{"data-slot":"dialog-portal",...t})}function P(e){let{className:t,...a}=e;return(0,r.jsx)(I.aV,{"data-slot":"dialog-overlay",className:b("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",t),...a})}function L(e){let{className:t,children:a,...n}=e;return(0,r.jsxs)(z,{"data-slot":"dialog-portal",children:[(0,r.jsx)(P,{}),(0,r.jsxs)(I.VY,{"data-slot":"dialog-content",className:b("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",t),...n,children:[a,(0,r.jsxs)(I.x8,{className:"ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",children:[(0,r.jsx)(C.Z,{}),(0,r.jsx)("span",{className:"sr-only",children:"Close"})]})]})]})}function $(e){let{className:t,...a}=e;return(0,r.jsx)("div",{"data-slot":"dialog-header",className:b("flex flex-col gap-2 text-center sm:text-left",t),...a})}function T(e){let{className:t,...a}=e;return(0,r.jsx)(I.Dx,{"data-slot":"dialog-title",className:b("text-lg leading-none font-semibold",t),...a})}function Y(e){let{className:t,...a}=e;return(0,r.jsx)(I.dk,{"data-slot":"dialog-description",className:b("text-muted-foreground text-sm",t),...a})}function J(e){let{className:t,type:a,...n}=e;return(0,r.jsx)("input",{type:a,"data-slot":"input",className:b("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm","focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]","aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",t),...n})}let R=!1,V=e=>{let{calendarManager:t,onImportSuccess:a}=e,n=async e=>{let a=e.target.files[0];a&&i.Am.promise(new Promise(async(e,r)=>{try{await new Promise(e=>setTimeout(e,500));let r=await t.importData(a,!0);e(r)}catch(e){r(e.message)}}),{loading:"Processing...",success:"Data imported successfully",error:e=>e,position:"top-center"})};return(0,r.jsxs)(D,{className:"mb-4",children:[(0,r.jsx)(N,{children:(0,r.jsx)(M,{children:"Import/Export Data"})}),(0,r.jsx)(O,{children:(0,r.jsxs)("div",{className:"flex space-x-4 mb-4",children:[(0,r.jsx)(y,{onClick:()=>{R||i.Am.promise(new Promise(async(e,a)=>{R=!0,await new Promise(e=>setTimeout(e,500));try{t.exportData(),e()}catch(e){a(e.message)}}),{loading:"Exporting...",success:"Data exported successfully",error:e=>e,position:"top-center",finally(){R=!1}})},children:"Export Data"}),(0,r.jsxs)(F,{children:[(0,r.jsx)(_,{asChild:!0,children:(0,r.jsx)(y,{variant:"outline",children:"Import Data"})}),(0,r.jsxs)(L,{className:"sm:max-w-[425px]",children:[(0,r.jsxs)($,{children:[(0,r.jsx)(T,{children:"Import Data"}),(0,r.jsx)(Y,{children:"Do not enter any file, select valid json file."})]}),(0,r.jsx)("div",{className:"grid gap-4 py-4",children:(0,r.jsxs)("div",{className:"grid w-full max-w-sm items-center gap-1.5",children:[(0,r.jsx)(W,{htmlFor:"jsonFile",className:"text-right",children:"Data File (JSON)"}),(0,r.jsx)(J,{id:"jsonFile",type:"file",onChange:n,accept:"application/json"})]})})]})]})]})})]})},U=()=>{let[e]=(0,n.useState)(new m),[t,a]=(0,n.useState)(new Date),[s,o]=(0,n.useState)([]),[i,l]=(0,n.useState)(null);(0,n.useEffect)(()=>{d()},[t]);let d=()=>{let a=t.getFullYear(),r=t.getMonth();o(e.getMonthData(a,r))},{presentDays:c,absentDays:g,leaveDays:u}=e.getAttendanceSummary(t.getFullYear(),t.getMonth());return(0,r.jsxs)("div",{className:"calender-container w-full max-w-xl",children:[(0,r.jsx)(w,{currentDate:t,onPrevMonth:()=>{a(new Date(t.getFullYear(),t.getMonth()-1))},onNextMonth:()=>{a(new Date(t.getFullYear(),t.getMonth()+1))}}),(0,r.jsx)(V,{calendarManager:e,onImportSuccess:d}),(0,r.jsxs)(D,{className:"attendance-summary mb-4",children:[(0,r.jsx)(N,{children:(0,r.jsx)(M,{children:"Monthly Attendance Summary"})}),(0,r.jsxs)(O,{children:[(0,r.jsxs)("p",{children:["Present: ",c]}),(0,r.jsxs)("p",{children:["Absent: ",g]}),(0,r.jsxs)("p",{children:["Leave: ",u]})]})]}),(0,r.jsx)(k,{monthData:s,onDateClick:e=>{e&&l(e.date)}}),i&&(0,r.jsx)(A,{selectedDate:i,onMarkAttendance:t=>{i&&(e.markAttendance(i,t),d())},onAddWorklog:t=>{i&&(e.addWorklog(i,t),d())},getAttendance:e.getAttendance.bind(e),getWorklog:e.getWorklog.bind(e)})]})};s.createRoot(document.getElementById("root")).render((0,r.jsxs)(n.StrictMode,{children:[(0,r.jsx)(()=>(0,r.jsxs)("div",{className:"min-h-screen bg-gray-100 flex flex-col items-center p-4",children:[(0,r.jsx)("h1",{className:"text-4xl font-bold mb-6",children:"Attendance & Worklog Calendar"}),(0,r.jsx)(U,{})]}),{}),(0,r.jsx)(e=>{let{...t}=e,{theme:a="system"}=(0,o.F)();return(0,r.jsx)(i.x7,{theme:a,className:"toaster group",style:{"--normal-bg":"var(--popover)","--normal-text":"var(--popover-foreground)","--normal-border":"var(--border)"},...t})},{})]}))}},t={};function a(r){var n=t[r];if(void 0!==n)return n.exports;var s=t[r]={exports:{}};return e[r](s,s.exports,a),s.exports}a.m=e,(()=>{var e,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;a.t=function(r,n){if(1&n&&(r=this(r)),8&n||"object"==typeof r&&r&&(4&n&&r.__esModule||16&n&&"function"==typeof r.then))return r;var s=Object.create(null);a.r(s);var o={};e=e||[null,t({}),t([]),t(t)];for(var i=2&n&&r;"object"==typeof i&&!~e.indexOf(i);i=t(i))Object.getOwnPropertyNames(i).forEach(e=>{o[e]=()=>r[e]});return o.default=()=>r,a.d(s,o),s}})(),a.d=(e,t)=>{for(var r in t)a.o(t,r)&&!a.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),a.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.nc=void 0,(()=>{var e=[];a.O=(t,r,n,s)=>{if(r){s=s||0;for(var o=e.length;o>0&&e[o-1][2]>s;o--)e[o]=e[o-1];e[o]=[r,n,s];return}for(var i=1/0,o=0;o<e.length;o++){for(var[r,n,s]=e[o],l=!0,d=0;d<r.length;d++)(!1&s||i>=s)&&Object.keys(a.O).every(e=>a.O[e](r[d]))?r.splice(d--,1):(l=!1,s<i&&(i=s));if(l){e.splice(o--,1);var c=n();void 0!==c&&(t=c)}}return t}})(),a.rv=()=>"1.2.8",(()=>{var e={980:0};a.O.j=t=>0===e[t];var t=(t,r)=>{var n,s,[o,i,l]=r,d=0;if(o.some(t=>0!==e[t])){for(n in i)a.o(i,n)&&(a.m[n]=i[n]);if(l)var c=l(a)}for(t&&t(r);d<o.length;d++)s=o[d],a.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return a.O(c)},r=self.webpackChunkcalendar_app=self.webpackChunkcalendar_app||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})(),a.ruid="bundler=rspack@1.2.8";var r=a.O(void 0,["361","643"],function(){return a(515)});r=a.O(r)})();