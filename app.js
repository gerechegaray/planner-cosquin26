(function () {
  'use strict';

  // Datos: [escenario, horaInicio, horaFin (estimada), banda]. Se ordenan por hora después.
  const BANDAS_DIA1_RAW = [
    // Norte
    ['Norte','14:30','15:20','Kill Flora'],['Norte','15:20','16:10','Eruca Sativa'],['Norte','16:30','17:20','El Zar'],['Norte','17:50','18:40','Turf'],['Norte','19:30','20:20','Dillom'],['Norte','21:20','22:10','Babasónicos'],['Norte','23:20','00:10','Lali'],['Norte','00:40','01:30','Caligaris'],
    // Sur
    ['Sur','14:30','15:20','Fantasmagoría'],['Sur','15:20','16:10','La Mississippi'],['Sur','16:30','17:20','EMI'],['Sur','17:50','18:40','Cruzando el Charco'],['Sur','19:40','20:30','Ciro y los Persas'],['Sur','21:40','22:30','La Vela Puerca'],['Sur','23:20','00:10','Las Pelotas'],['Sur','00:40','01:30','Viejas Locas / Jóvenes Pordioseros'],
    // Montaña
    ['Montaña','14:15','15:05','Chechi de Marcos'],['Montaña','15:00','15:50','Ryan'],['Montaña','15:50','16:40','Bersuit Vergarabat'],['Montaña','17:10','18:00','Marilina Bertoldi'],['Montaña','18:40','19:30','El Kuelgue'],['Montaña','20:40','21:30','Cuarteto de Nos'],['Montaña','22:40','23:30','Franz Ferdinand'],['Montaña','00:00','00:50','The Chemical Brothers (DJ Set)'],['Montaña','02:00','02:50','Victoria Whynot'],
    // Boomerang
    ['Boomerang','14:10','15:00','Microtul'],['Boomerang','14:50','15:40','1915'],['Boomerang','15:40','16:30','Un Muerto Más'],['Boomerang','16:30','17:20','Girl Ultra'],['Boomerang','17:20','18:10','Hermanos Gutiérrez'],['Boomerang','18:20','19:10','Indios'],['Boomerang','19:20','20:10','Estelares'],['Boomerang','20:40','21:30','Abel Pintos'],['Boomerang','21:50','22:40','La Franela'],['Boomerang','23:10','00:00','Coti'],['Boomerang','00:30','01:20','Amigo de Artistas'],
    // Casita del Blues
    ['Casita del Blues','14:15','15:05','Golo\'s Band'],['Casita del Blues','15:05','15:55','Los Mentidores'],['Casita del Blues','15:55','16:45','Las Witches'],['Casita del Blues','16:35','17:25','Le Dracs'],['Casita del Blues','17:45','18:35','Perro Suizo'],['Casita del Blues','18:40','19:30','Misty Soul Choir'],['Casita del Blues','19:35','20:25','Tango & Roll'],['Casita del Blues','20:30','21:20','Wayra Iglesias'],['Casita del Blues','21:25','22:15','Los Espíritus'],['Casita del Blues','22:30','23:20','Piti Fernández'],['Casita del Blues','23:35','00:25','Les Diabolettes'],
  ];
  const BANDAS_DIA2_RAW = [
    // Norte
    ['Norte','14:30','15:20','Sofi Mora'],['Norte','15:20','16:10','Blair'],['Norte','16:30','17:20','Gauchito Club'],['Norte','17:50','18:40','Bándalos Chinos'],['Norte','19:10','20:00','Fito Páez'],['Norte','20:55','21:45','Airbag'],['Norte','23:00','23:50','YSY A'],['Norte','00:20','01:10','Caras Extrañas'],
    // Sur
    ['Sur','14:20','15:10','Ainda'],['Sur','15:10','16:00','Kapanga'],['Sur','16:25','17:15','Pappo x Juanse'],['Sur','17:45','18:35','El Plan de la Mariposa'],['Sur','19:40','20:30','Divididos'],['Sur','21:30','22:20','Trueno'],['Sur','23:10','00:00','Guasones'],['Sur','00:50','01:40','Louta'],
    // Montaña
    ['Montaña','14:30','15:20','Renzo Leali'],['Montaña','15:00','15:50','Beats Modernos'],['Montaña','15:50','16:40','Gustavo Cordera'],['Montaña','17:00','17:50','Los Pericos'],['Montaña','18:30','19:20','Silvestre y la Naranja'],['Montaña','20:20','21:10','Morat'],['Montaña','22:20','23:10','Las Pastillas del Abuelo'],['Montaña','00:00','00:50','Peces Raros'],['Montaña','01:00','01:50','Mariano Mellino'],['Montaña','02:00','02:50','Franky Wah'],
    // Boomerang
    ['Boomerang','14:20','15:10','Wanda Jael'],['Boomerang','15:10','16:00','TGK'],['Boomerang','16:10','17:00','Malandro'],['Boomerang','17:20','18:10','Gauchos of the Pampa'],['Boomerang','18:20','19:10','Devendra Banhart'],['Boomerang','19:30','20:20','Dum Chica'],['Boomerang','20:30','21:20','Marky Ramone'],['Boomerang','21:35','22:25','David Ellefson'],['Boomerang','22:35','23:25','CTM'],['Boomerang','23:35','00:25','Six Sex'],['Boomerang','00:45','01:35','El Club de la Serpiente'],
    // Casita del Blues
    ['Casita del Blues','14:15','15:05','Rosy Gomeez'],['Casita del Blues','15:05','15:55','Labios de Sal'],['Casita del Blues','15:55','16:45','Rudy'],['Casita del Blues','16:50','17:40','Bulldozer Blues Band'],['Casita del Blues','17:45','18:35','Cordelia\'s Blues'],['Casita del Blues','18:40','19:30','Grasshopper\'s'],['Casita del Blues','19:35','20:25','Gisa Londero & Toyo Bagoso'],['Casita del Blues','20:40','21:30','Crystal Thomas & Luca Giordano'],['Casita del Blues','21:45','22:35','Nina Portela'],['Casita del Blues','22:40','23:30','Xime Monzón'],['Casita del Blues','23:35','00:25','Loretta Sorbello'],
  ];
  const BANDAS_DIA1 = BANDAS_DIA1_RAW.map(([e, hi, hf, b]) => ({ escenario: e, horaInicio: hi, horaFin: hf, banda: b }));
  const BANDAS_DIA2 = BANDAS_DIA2_RAW.map(([e, hi, hf, b]) => ({ escenario: e, horaInicio: hi, horaFin: hf, banda: b }));

  // Ordenar por hora (minutos desde 00:00, pasando medianoche como +24h)
  function sortKey(b) {
    const [h1, m1] = b.horaInicio.split(':').map(Number);
    const h = h1 < 12 ? h1 + 24 : h1;
    return h * 60 + m1;
  }
  BANDAS_DIA1.sort((a, b) => sortKey(a) - sortKey(b));
  BANDAS_DIA2.sort((a, b) => sortKey(a) - sortKey(b));

  // Duración estimada por artista (minutos). Se usa para conflictos y "llega a tiempo".
  const DURACION_ARTISTA_MIN = 50;

  // Matriz de tiempos de traslado (minutos). Escenarios: Norte, Sur, Montaña, Boomerang, Casita del Blues
  const ESCENARIOS = ['Norte', 'Sur', 'Montaña', 'Boomerang', 'Casita del Blues'];
  const TIEMPOS = {
    Norte:  { Norte: 0, Sur: 15, Montaña: 10, Boomerang: 10, 'Casita del Blues': 12 },
    Sur:    { Norte: 15, Sur: 0, Montaña: 10, Boomerang: 20, 'Casita del Blues': 12 },
    Montaña: { Norte: 10, Sur: 10, Montaña: 0, Boomerang: 12, 'Casita del Blues': 8 },
    Boomerang: { Norte: 10, Sur: 20, Montaña: 12, Boomerang: 0, 'Casita del Blues': 15 },
    'Casita del Blues': { Norte: 12, Sur: 12, Montaña: 8, Boomerang: 15, 'Casita del Blues': 0 },
  };

  function minutosDesde14(horaStr) {
    const [h, m] = horaStr.split(':').map(Number);
    let total = h * 60 + m;
    if (total < 14 * 60) total += 24 * 60;
    return total - 14 * 60;
  }

  // Suma minutos a una hora "HH:MM" y devuelve "HH:MM" (pasa de medianoche si hace falta).
  function horaMasMinutos(horaStr, minutos) {
    const [h, m] = horaStr.split(':').map(Number);
    let total = (h * 60 + m + minutos) % (24 * 60);
    if (total < 0) total += 24 * 60;
    const h2 = Math.floor(total / 60);
    const m2 = total % 60;
    return (h2 < 10 ? '0' : '') + h2 + ':' + (m2 < 10 ? '0' : '') + m2;
  }

  function seSuperponen(inicio1, fin1, inicio2, fin2) {
    return inicio1 < fin2 && fin1 > inicio2;
  }

  // Minutos de superposición entre dos intervalos (para nivel de conflicto).
  function minutosSuperposicion(inicio1, fin1, inicio2, fin2) {
    if (!seSuperponen(inicio1, fin1, inicio2, fin2)) return 0;
    return Math.min(fin1, fin2) - Math.max(inicio1, inicio2);
  }

  const CONFLICTO_LIMITE_MIN = 15; // ≤15 min → conflicto menor (amarillo), >15 min → conflicto (rojo)

  function getTransfer(esc1, esc2) {
    return TIEMPOS[esc1] && TIEMPOS[esc1][esc2] != null ? TIEMPOS[esc1][esc2] : 0;
  }

  let diaActual = 1;
  let ordenLista = 'escenario'; // 'escenario' | 'horario' — solo para la lista izquierda
  const seleccion = { 1: {}, 2: {} }; // dia -> { index: true }
  const ORDEN_ESCENARIOS = ['Norte', 'Sur', 'Montaña', 'Boomerang', 'Casita del Blues'];

  function getBandasDia(dia) {
    return dia === 1 ? BANDAS_DIA1 : BANDAS_DIA2;
  }

  function renderBandList() {
    const bandas = getBandasDia(diaActual);
    const ul = document.getElementById('band-list');
    ul.innerHTML = '';

    if (ordenLista === 'horario') {
      // Lista plana ordenada por horario
      const conIndice = bandas.map((b, i) => ({ ...b, index: i })).sort((a, b) => sortKey(a) - sortKey(b));
      conIndice.forEach(({ escenario, horaInicio, horaFin, banda, index }) => {
        const li = document.createElement('li');
        li.className = 'band-item band-item-horario';
        const id = 'cb-' + diaActual + '-' + index;
        const checked = seleccion[diaActual][index] ? ' checked' : '';
        li.innerHTML =
          '<label class="band-label">' +
          '<input type="checkbox" class="band-cb" data-day="' + diaActual + '" data-index="' + index + '" id="' + id + '"' + checked + '>' +
          '<span class="band-time">' + horaInicio + '</span> ' +
          '<span class="band-name">' + banda + '</span> ' +
          '<span class="band-escenario-inline esc-badge esc-' + escenario.replace(/\s/g, '') + '">' + escenario + '</span>' +
          '</label>';
        ul.appendChild(li);
      });
    } else {
      // Agrupado por escenario (por defecto)
      const escenarios = {};
      bandas.forEach((b, i) => {
        if (!escenarios[b.escenario]) escenarios[b.escenario] = [];
        escenarios[b.escenario].push({ ...b, index: i });
      });
      const order = ['Norte', 'Sur', 'Montaña', 'Boomerang', 'Casita del Blues'].filter(e => escenarios[e]);
      order.forEach(esc => {
        const liEsc = document.createElement('li');
        liEsc.className = 'escenario-group';
        liEsc.innerHTML = '<span class="escenario-name">' + esc + '</span>';
        const ulBand = document.createElement('ul');
        ulBand.className = 'band-sublist';
        escenarios[esc].forEach(({ escenario, horaInicio, horaFin, banda, index }) => {
          const li = document.createElement('li');
          li.className = 'band-item';
          const id = 'cb-' + diaActual + '-' + index;
          const checked = seleccion[diaActual][index] ? ' checked' : '';
          li.innerHTML =
            '<label class="band-label">' +
            '<input type="checkbox" class="band-cb" data-day="' + diaActual + '" data-index="' + index + '" id="' + id + '"' + checked + '>' +
            '<span class="band-time">' + horaInicio + '</span> ' +
            '<span class="band-name">' + banda + '</span>' +
            '</label>';
          ulBand.appendChild(li);
        });
        liEsc.appendChild(ulBand);
        ul.appendChild(liEsc);
      });
    }

    ul.querySelectorAll('.band-cb').forEach(cb => {
      cb.addEventListener('change', onSelectionChange);
    });
  }

  function onSelectionChange(e) {
    const day = parseInt(e.target.dataset.day, 10);
    const index = parseInt(e.target.dataset.index, 10);
    seleccion[day][index] = e.target.checked;
    renderCronograma();
  }

  // El cronograma siempre se muestra ordenado por horario.
  function renderCronograma() {
    const bandas = getBandasDia(diaActual);
    let selected = bandas
      .map((b, i) => ({ ...b, index: i }))
      .filter((_, i) => seleccion[diaActual][i]);
    selected = selected.sort((a, b) => sortKey(a) - sortKey(b));

    const tbody = document.getElementById('cronograma-body');
    const empty = document.getElementById('empty-cronograma');
    tbody.innerHTML = '';
    if (selected.length === 0) {
      empty.style.display = 'block';
      return;
    }
    empty.style.display = 'none';

    // Duración estimada 50 min por artista para conflictos y traslados
    const minInicio = selected.map(b => minutosDesde14(b.horaInicio));
    const minFin = selected.map((b, idx) => minInicio[idx] + DURACION_ARTISTA_MIN);

    selected.forEach((b, r) => {
      const partes = [];
      let maxOverlap = 0;
      for (let j = 0; j < selected.length; j++) {
        if (j !== r && seSuperponen(minInicio[r], minFin[r], minInicio[j], minFin[j])) {
          const otra = selected[j];
          const overlap = minutosSuperposicion(minInicio[r], minFin[r], minInicio[j], minFin[j]);
          if (overlap > maxOverlap) maxOverlap = overlap;
          partes.push(otra.banda + ' (' + otra.escenario + ', ' + otra.horaInicio + ') — ' + overlap + ' min');
        }
      }
      let conflicto = '';
      let rowConflictoClass = '';
      if (partes.length > 0) {
        const horaFinEstimada = horaMasMinutos(b.horaInicio, DURACION_ARTISTA_MIN);
        conflicto = partes.join(' · ') + ' (termina ' + horaFinEstimada + ')';
        rowConflictoClass = maxOverlap <= CONFLICTO_LIMITE_MIN ? 'row-conflicto-menor' : 'row-conflicto';
      }
      let recomendacion = '—';
      if (partes.length > 0) {
        if (maxOverlap <= CONFLICTO_LIMITE_MIN) {
          recomendacion = r < selected.length - 1
            ? 'Si te vas antes llegás a ' + selected[r + 1].banda
            : '—';
        } else {
          recomendacion = 'Difícil que veas ambos, recomiendo elegir uno.';
        }
      } else if (r > 0) {
        const trans = getTransfer(selected[r - 1].escenario, b.escenario);
        if (minInicio[r] < minFin[r - 1] + trans) {
          recomendacion = 'Salí antes de ' + selected[r - 1].banda + ' para llegar a tiempo';
        }
      }
      const tr = document.createElement('tr');
      tr.className = rowConflictoClass;
      tr.innerHTML =
        '<td><span class="esc-badge esc-' + b.escenario.replace(/\s/g, '') + '">' + b.escenario + '</span></td>' +
        '<td>' + b.horaInicio + '</td>' +
        '<td>' + b.banda + '</td>' +
        '<td class="cell-conflicto">' + (conflicto || '—') + '</td>' +
        '<td class="cell-recomendacion">' + recomendacion + '</td>';
      tbody.appendChild(tr);
    });
  }

  function switchDay(day) {
    diaActual = day;
    document.querySelectorAll('.day-btn').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.day, 10) === day);
    });
    renderBandList();
    renderCronograma();
  }

  function setOrdenLista(orden) {
    ordenLista = orden;
    document.querySelectorAll('.btn-orden-lista').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.orden === orden);
    });
    renderBandList();
  }

  function switchTab(tabId) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    const tab = document.querySelector('.tab[data-tab="' + tabId + '"]');
    const panel = document.getElementById(tabId);
    if (tab) tab.classList.add('active');
    if (panel) panel.classList.add('active');
  }

  function getCronogramaDataForDay(dia) {
    const bandas = getBandasDia(dia);
    const selected = bandas
      .map((b, i) => ({ ...b, index: i }))
      .filter((_, i) => seleccion[dia][i])
      .sort((a, b) => sortKey(a) - sortKey(b));
    if (selected.length === 0) return [];
    const minInicio = selected.map(b => minutosDesde14(b.horaInicio));
    const minFin = selected.map((b, idx) => minInicio[idx] + DURACION_ARTISTA_MIN);
    return selected.map((b, r) => {
      const partes = [];
      let maxOverlap = 0;
      for (let j = 0; j < selected.length; j++) {
        if (j !== r && seSuperponen(minInicio[r], minFin[r], minInicio[j], minFin[j])) {
          const otra = selected[j];
          const overlap = minutosSuperposicion(minInicio[r], minFin[r], minInicio[j], minFin[j]);
          if (overlap > maxOverlap) maxOverlap = overlap;
          partes.push(otra.banda + ' (' + otra.escenario + ', ' + otra.horaInicio + ') — ' + overlap + ' min');
        }
      }
      let conflicto = '';
      let recomendacion = '—';
      if (partes.length > 0) {
        const horaFinEstimada = horaMasMinutos(b.horaInicio, DURACION_ARTISTA_MIN);
        conflicto = partes.join(' · ') + ' (termina ' + horaFinEstimada + ')';
        if (maxOverlap <= CONFLICTO_LIMITE_MIN) {
          recomendacion = r < selected.length - 1 ? 'Si te vas antes llegás a ' + selected[r + 1].banda : '—';
        } else {
          recomendacion = 'Difícil que veas ambos, recomiendo elegir uno.';
        }
      } else if (r > 0) {
        const trans = getTransfer(selected[r - 1].escenario, b.escenario);
        if (minInicio[r] < minFin[r - 1] + trans) {
          recomendacion = 'Salí antes de ' + selected[r - 1].banda + ' para llegar a tiempo';
        }
      }
      return {
        escenario: b.escenario,
        hora: b.horaInicio,
        banda: b.banda,
        conflicto: conflicto || '—',
        recomendacion: recomendacion,
      };
    });
  }

  function exportMiCronograma() {
    const data1 = getCronogramaDataForDay(1);
    const data2 = getCronogramaDataForDay(2);
    if (data1.length === 0 && data2.length === 0) {
      alert('No hay bandas seleccionadas. Marcá al menos una banda en Día 1 o Día 2.');
      return;
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    const margen = 14;
    const ancho = doc.internal.pageSize.getWidth() - margen * 2;
    let y = 15;

    const colorTexto = [30, 30, 30];
    doc.setFontSize(18);
    doc.setTextColor(...colorTexto);
    doc.text('Cosquín Rock 2026 – Mi cronograma', margen, y);
    y += 8;
    doc.setFontSize(9);
    doc.setTextColor(50, 50, 50);
    doc.text('Se estima una duración de 50 minutos por artista. Los horarios son de inicio.', margen, y);
    y += 12;

    const head = [['Escenario', 'Hora', 'Banda', 'Conflicto', 'Recomendación']];
    const colorNaranja = [232, 93, 4];
    const colorFondoDia = [245, 245, 245];

    let yaRendereDia1 = false;
    [1, 2].forEach((dia, idx) => {
      const data = dia === 1 ? data1 : data2;
      if (data.length === 0) return;

      // Página nueva para Día 2 solo si Día 1 tuvo contenido
      if (idx === 1 && yaRendereDia1) {
        doc.addPage('landscape', 'a4');
        y = 15;
      }
      if (idx === 0 && data.length > 0) yaRendereDia1 = true;

      // Encabezado de día (fondo gris claro, texto destacado)
      doc.setFillColor(...colorFondoDia);
      doc.rect(margen, y, ancho, 10, 'F');
      doc.setDrawColor(232, 93, 4);
      doc.setLineWidth(0.5);
      doc.line(margen, y, margen + ancho, y);
      doc.line(margen, y + 10, margen + ancho, y + 10);
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(...colorTexto);
      doc.text('DÍA ' + dia, margen + 4, y + 7);
      doc.setFont(undefined, 'normal');
      y += 14;

      const body = data.map(row => [row.escenario, row.hora, row.banda, row.conflicto, row.recomendacion]);
      doc.autoTable({
        startY: y,
        head: head,
        body: body,
        theme: 'grid',
        styles: { fontSize: 8, textColor: colorTexto },
        headStyles: { fillColor: colorNaranja, textColor: [255, 255, 255] },
        margin: { left: margen, right: margen },
      });
      y = doc.lastAutoTable.finalY + 20;
    });

    doc.save('CosquinRock2026_mi_cronograma.pdf');
  }

  function exportGrillaPorHorario() {
    exportGrillaCompleta('horario');
  }

  function exportGrillaPorEscenario() {
    exportGrillaCompleta('escenario');
  }

  function exportGrillaCompleta(orden) {
    const margen = 14;
    const anchoPag = 297;
    const ancho = anchoPag - margen * 2;
    const colorNaranja = [232, 93, 4];
    const colorFondoDia = [245, 245, 245];
    const colorTexto = [30, 30, 30];
    const orderEsc = ['Norte', 'Sur', 'Montaña', 'Boomerang', 'Casita del Blues'];

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

    function prepararDiaPorHorario(bandas) {
      return [...bandas].sort((a, b) => sortKey(a) - sortKey(b));
    }
    function prepararDiaPorEscenario(bandas) {
      const porEsc = {};
      bandas.forEach(b => {
        if (!porEsc[b.escenario]) porEsc[b.escenario] = [];
        porEsc[b.escenario].push(b);
      });
      const out = [];
      orderEsc.forEach(esc => {
        if (porEsc[esc]) {
          porEsc[esc].sort((a, b) => sortKey(a) - sortKey(b));
          out.push({ escenario: esc, bandas: porEsc[esc] });
        }
      });
      return out;
    }

    [1, 2].forEach((dia, idx) => {
      const bandasRaw = dia === 1 ? BANDAS_DIA1 : BANDAS_DIA2;
      if (idx === 1) doc.addPage('landscape', 'a4');

      let y = 15;

      doc.setFontSize(18);
      doc.setTextColor(...colorTexto);
      doc.text('Cosquín Rock 2026 – Grilla completa', margen, y);
      y += 7;
      doc.setFontSize(9);
      doc.setTextColor(50, 50, 50);
      doc.text('Se estima una duración de 50 minutos por artista. Los horarios son de inicio.', margen, y);
      doc.text('Orden: ' + (orden === 'horario' ? 'por horario' : 'por escenario') + '.', margen, y + 5);
      y += 18;

      doc.setFillColor(...colorFondoDia);
      doc.rect(margen, y, ancho, 10, 'F');
      doc.setDrawColor(232, 93, 4);
      doc.setLineWidth(0.5);
      doc.line(margen, y, margen + ancho, y);
      doc.line(margen, y + 10, margen + ancho, y + 10);
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(...colorTexto);
      doc.text('DÍA ' + dia, margen + 4, y + 7);
      doc.setFont(undefined, 'normal');
      y += 14;

      const stylesBase = { fontSize: 8, textColor: colorTexto };

      if (orden === 'horario') {
        const bandas = prepararDiaPorHorario(bandasRaw);
        const body = bandas.map(b => [b.escenario, b.horaInicio, b.banda]);
        doc.autoTable({
          startY: y,
          head: [['Escenario', 'Hora', 'Banda']],
          body: body,
          theme: 'grid',
          styles: stylesBase,
          headStyles: { fillColor: colorNaranja, textColor: [255, 255, 255] },
          margin: { left: margen, right: margen },
        });
      } else {
        const grupos = prepararDiaPorEscenario(bandasRaw);
        grupos.forEach(g => {
          doc.setFontSize(10);
          doc.setFont(undefined, 'bold');
          doc.setTextColor(...colorTexto);
          doc.text(g.escenario.toUpperCase(), margen, y + 5);
          doc.setFont(undefined, 'normal');
          y += 8;

          const body = g.bandas.map(b => [b.horaInicio, b.banda]);
          doc.autoTable({
            startY: y,
            head: [['Hora', 'Banda']],
            body: body,
            theme: 'grid',
            styles: stylesBase,
            headStyles: { fillColor: colorNaranja, textColor: [255, 255, 255] },
            margin: { left: margen, right: margen },
          });
          y = doc.lastAutoTable.finalY + 12;
        });
      }
    });

    doc.save('CosquinRock2026_grilla_' + orden + '.pdf');
  }

  function initMapa() {
    const key = 'cosquin-planner-mapa';
    const img = document.getElementById('mapa-img');
    const placeholder = document.querySelector('.mapa-placeholder');
    const stored = localStorage.getItem(key);
    if (stored) {
      img.src = stored;
      img.style.display = 'block';
      if (placeholder) placeholder.style.display = 'none';
    }
    document.getElementById('mapa-file').addEventListener('change', function () {
      const file = this.files[0];
      if (!file || !file.type.startsWith('image/')) return;
      const r = new FileReader();
      r.onload = function () {
        img.src = r.result;
        img.style.display = 'block';
        if (placeholder) placeholder.style.display = 'none';
        localStorage.setItem(key, r.result);
      };
      r.readAsDataURL(file);
    });
  }

  function init() {
    document.querySelectorAll('.day-btn').forEach(btn => {
      btn.addEventListener('click', () => switchDay(parseInt(btn.dataset.day, 10)));
    });
    document.querySelectorAll('.tab').forEach(btn => {
      btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });
    document.querySelectorAll('.btn-orden-lista').forEach(btn => {
      btn.addEventListener('click', () => setOrdenLista(btn.dataset.orden));
    });
    document.getElementById('export-cronograma').addEventListener('click', exportMiCronograma);
    document.getElementById('export-grilla-horario').addEventListener('click', exportGrillaPorHorario);
    document.getElementById('export-grilla-escenario').addEventListener('click', exportGrillaPorEscenario);
    renderBandList();
    renderCronograma();
    initMapa();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
