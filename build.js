const fs = require('fs');

const data = JSON.parse(fs.readFileSync('meteo.json', 'utf8'));
const template = fs.readFileSync('index.template.html', 'utf8');

const days = data.daily.time.map((t,i)=>{
  return `
  <div class="day">
    <h3>${new Date(t).toLocaleDateString("fr-FR",{weekday:"short"})}</h3>
    <div class="icon">${data.icons[i]}</div>
    <div class="temp">${data.daily.temperature_2m_max[i]}° / ${data.daily.temperature_2m_min[i]}°</div>
  </div>`;
}).join('');

const heure = data.current;

const html = template
  .replace('{{CARDS}}', days)
  .replace('{{HEURE}}', heure);

fs.writeFileSync('index.html', html);
