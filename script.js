const rows = document.querySelectorAll("#bd div.row");

rows.forEach((row) => {
  const length = row.children.length;
});

const layout = document.querySelectorAll("[id*=splitBody]");

const layouts = [
  "100",
  "50/50",
  "33/33/33",
  "25/25/25/25",
  "50/25/25",
  "25/25/50",
  "66/33",
  "33/66",
  "75/25",
  "25/75",
];

let str = "";

layout.forEach((row) => {
  str = `${str}${layouts[row.value - 1]}-`;
});

str = `_Admin-${str}`;

console.log(str);
