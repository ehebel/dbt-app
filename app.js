// DBT App Logic - Terapia Dialéctico-Conductual
import { 
  DBT_MODULES, 
  DBT_SKILLS, 
  EMOTIONS_LIST, 
  PROBLEM_BEHAVIORS_LIST, 
  INITIAL_DIARY_RECORDS, 
  DEFAULT_USER 
} from './data.js';

// Estado global de la aplicación
const state = {
  currentView: 'home-view',
  currentUser: null,
  diaryRecords: [],
  currentSkillIndex: 0,
  temporaryEntry: {
    date: '2026-10-24',
    dayLabel: 'Sáb',
    emotions: {
      ansiedad: 3,
      tristeza: 2,
      enojo: 1,
      verguenza: 1,
      culpa: 1,
      asco: 0,
      alegria: 3
    },
    behaviors: {
      autolesion: { scale: 0, performed: false },
      suicidio: { scale: 0, performed: false },
      atracon: { scale: 1, performed: false },
      drogas: { scale: 0, performed: false },
      alcohol: { scale: 0, performed: false },
      otras: { scale: 1, performed: false, detail: 'Inquietud' }
    },
    notes: 'Sentí ansiedad antes de la reunión, pero apliqué respiración pausada (TIPP) y Mente Sabia.',
    skillsUsed: ['5.6']
  },
  waterTimer: {
    intervalId: null,
    secondsLeft: 30
  }
};

// Generador de tono sereno con Web Audio API (cuenco tibetano suave)
function playGentleChime(freq = 528) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 1.9);
  } catch (e) {
    // Audio opcional silencioso si el navegador bloquea autoplay
  }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  initStorage();
  initTheme();
  initRouter();
  renderHomeData();
  renderStep1Form();
  renderStep2Form();
  renderSkillsAccordion();
  renderTherapistView();
  initEventListeners();
  initPWA();
});

// Almacenamiento Local
function initStorage() {
  const savedUser = localStorage.getItem('dbt_user');
  state.currentUser = savedUser ? JSON.parse(savedUser) : { ...DEFAULT_USER };

  const savedRecords = localStorage.getItem('dbt_records');
  if (savedRecords) {
    state.diaryRecords = JSON.parse(savedRecords);
  } else {
    state.diaryRecords = [...INITIAL_DIARY_RECORDS];
    localStorage.setItem('dbt_records', JSON.stringify(state.diaryRecords));
  }
}

function saveRecordsToStorage() {
  localStorage.setItem('dbt_records', JSON.stringify(state.diaryRecords));
  localStorage.setItem('dbt_user', JSON.stringify(state.currentUser));
}

// Enrutador y Navegación entre Vistas
function navigateTo(viewId) {
  state.currentView = viewId;

  // Ocultar todas las vistas
  document.querySelectorAll('.view').forEach(view => {
    view.classList.remove('active');
  });

  // Mostrar la vista activa
  const targetView = document.getElementById(viewId);
  if (targetView) {
    targetView.classList.add('active');
  }

  // Actualizar clases activas en navegación
  document.querySelectorAll('.nav-pill').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.target === viewId);
  });
  document.querySelectorAll('.bottom-nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.target === viewId);
  });

  // Si navega a vista terapeuta, refrescar gráficos
  if (viewId === 'therapist-view') {
    renderTherapistCharts();
  }

  // Scroll suave al inicio
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function initRouter() {
  // Manejo de clicks en desktop y mobile nav
  document.querySelectorAll('[data-target]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.getAttribute('data-target');
      if (target) navigateTo(target);
    });
  });

  // Marca logo
  document.getElementById('brand-home-btn').addEventListener('click', () => {
    navigateTo('home-view');
  });

  // Toggle sesión
  document.getElementById('session-toggle-btn').addEventListener('click', () => {
    if (state.currentView === 'login-view') {
      navigateTo('home-view');
      document.getElementById('session-toggle-btn').textContent = 'Cerrar sesión';
    } else {
      navigateTo('login-view');
      document.getElementById('session-toggle-btn').textContent = 'Iniciar sesión';
      showToast('Sesión cerrada');
    }
  });

  // Botones de acción directa en Home (Multiline buttons de Balsamiq)
  document.querySelectorAll('[data-action]').forEach(el => {
    el.addEventListener('click', () => {
      const action = el.dataset.action;
      if (action === 'go-register') navigateTo('step1-view');
      if (action === 'go-skills') navigateTo('skills-view');
      if (action === 'go-crisis') navigateTo('crisis-view');
    });
  });

  // Enlaces rápidos desde Inicio de Sesión
  document.getElementById('quick-sos-btn').addEventListener('click', () => {
    navigateTo('crisis-view');
  });
  document.getElementById('quick-therapist-btn').addEventListener('click', () => {
    navigateTo('therapist-view');
  });
  document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    playGentleChime(440);
    showToast('Bienvenida de nuevo, María 🌿');
    navigateTo('home-view');
    document.getElementById('session-toggle-btn').textContent = 'Cerrar sesión';
  });

  // Enlaces Home adicionales
  document.getElementById('home-to-therapist-btn').addEventListener('click', () => {
    navigateTo('therapist-view');
  });
  document.getElementById('home-logout-btn').addEventListener('click', () => {
    navigateTo('login-view');
    document.getElementById('session-toggle-btn').textContent = 'Iniciar sesión';
  });
  document.getElementById('skills-back-home-btn').addEventListener('click', () => {
    navigateTo('home-view');
  });
  document.getElementById('crisis-back-home-btn').addEventListener('click', () => {
    navigateTo('home-view');
  });
  document.getElementById('therapist-back-home-btn').addEventListener('click', () => {
    navigateTo('home-view');
  });
  document.getElementById('therapist-go-record-btn').addEventListener('click', () => {
    navigateTo('step1-view');
  });

  // Inicializar en home
  navigateTo('home-view');
}

// Mostrar Notificación Toast
function showToast(message, duration = 3000) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>🍃</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px) scale(0.9)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Renderizado de Home Data
function renderHomeData() {
  document.getElementById('home-streak-days').textContent = state.currentUser.streakDays;
  document.getElementById('home-completed-records').textContent = state.diaryRecords.length;
  document.getElementById('home-most-used-skill').textContent = state.currentUser.mostUsedSkill;
  document.getElementById('home-next-session').textContent = state.currentUser.nextSession;
}

// ==========================================
// REGISTRO DIARIO - PASO 1 (Emociones e Impulsos)
// ==========================================
function renderStep1Form() {
  // Selector de Fechas
  const dateSelect = document.getElementById('step1-date-select');
  dateSelect.innerHTML = '';
  
  const dates = [
    { value: '2026-10-24', label: 'Hoy: Sábado 24 Oct' },
    { value: '2026-10-25', label: 'Domingo 25 Oct' },
    { value: '2026-10-23', label: 'Viernes 23 Oct' },
    { value: '2026-10-22', label: 'Jueves 22 Oct' }
  ];

  dates.forEach(d => {
    const opt = document.createElement('option');
    opt.value = d.value;
    opt.textContent = d.label;
    dateSelect.appendChild(opt);
  });

  // Contenedor de Sliders de Emociones
  const container = document.getElementById('emotions-sliders-container');
  container.innerHTML = '';

  EMOTIONS_LIST.forEach(emo => {
    const currentVal = state.temporaryEntry.emotions[emo.id] || 0;
    const sliderBox = document.createElement('div');
    sliderBox.className = 'slider-group';

    sliderBox.innerHTML = `
      <div class="slider-header">
        <span class="slider-name" style="color: ${emo.color};">
          <span>●</span>
          <span>${emo.name}:</span>
        </span>
        <span class="slider-value-pill" id="val-${emo.id}">${currentVal}/5</span>
      </div>
      <input type="range" class="range-slider" id="range-${emo.id}" min="0" max="5" step="1" value="${currentVal}">
      <div class="slider-ticks">
        <span>0 (Nada)</span>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5 (Máximo)</span>
      </div>
    `;

    const range = sliderBox.querySelector(`#range-${emo.id}`);
    const pill = sliderBox.querySelector(`#val-${emo.id}`);
    range.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      pill.textContent = `${val}/5`;
      state.temporaryEntry.emotions[emo.id] = val;
    });

    container.appendChild(sliderBox);
  });

  // Contenedor de Conductas Problema (EVA 0/5 + ¿Realizada?)
  const behaviorsContainer = document.getElementById('behaviors-container');
  behaviorsContainer.innerHTML = '';

  PROBLEM_BEHAVIORS_LIST.forEach(beh => {
    const behState = state.temporaryEntry.behaviors[beh.id] || { scale: 0, performed: false };
    const row = document.createElement('div');
    row.className = 'behavior-row';

    row.innerHTML = `
      <div class="behavior-info">
        <div class="behavior-title">${beh.name}</div>
      </div>
      <div class="behavior-controls">
        <div class="rating-chips" id="chips-${beh.id}">
          ${[0, 1, 2, 3, 4, 5].map(num => `
            <button type="button" class="chip-btn ${behState.scale === num ? 'active' : ''}" data-val="${num}">
              ${num}
            </button>
          `).join('')}
        </div>
        <button type="button" class="toggle-realizada-btn ${behState.performed ? 'realizada' : ''}" id="toggle-realizada-${beh.id}">
          <span>${behState.performed ? '✓ Realizada' : 'No realizada'}</span>
        </button>
      </div>
    `;

    // Manejo de chips de escala
    const chipBtns = row.querySelectorAll('.chip-btn');
    chipBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const val = parseInt(btn.dataset.val, 10);
        chipBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.temporaryEntry.behaviors[beh.id].scale = val;
      });
    });

    // Manejo del botón realizada
    const toggleBtn = row.querySelector(`#toggle-realizada-${beh.id}`);
    toggleBtn.addEventListener('click', () => {
      const isNowPerformed = !state.temporaryEntry.behaviors[beh.id].performed;
      state.temporaryEntry.behaviors[beh.id].performed = isNowPerformed;
      toggleBtn.classList.toggle('realizada', isNowPerformed);
      toggleBtn.querySelector('span').textContent = isNowPerformed ? '⚠️ Realizada' : 'No realizada';
    });

    behaviorsContainer.appendChild(row);
  });

  // Notas
  const notesArea = document.getElementById('step1-notes');
  notesArea.value = state.temporaryEntry.notes;
  notesArea.addEventListener('input', (e) => {
    state.temporaryEntry.notes = e.target.value;
  });

  // Botón Siguiente (Paso 1 -> Paso 2)
  document.getElementById('step1-form').addEventListener('submit', (e) => {
    e.preventDefault();
    navigateTo('step2-view');
  });

  document.getElementById('step1-cancel-btn').addEventListener('click', () => {
    navigateTo('home-view');
  });
}

// ==========================================
// REGISTRO DIARIO - PASO 2 (Habilidades Usadas)
// ==========================================
function renderStep2Form() {
  const container = document.getElementById('step2-modules-container');
  container.innerHTML = '';

  DBT_MODULES.forEach(mod => {
    const modBox = document.createElement('div');
    modBox.style.marginBottom = '20px';

    const header = document.createElement('h3');
    header.style.fontSize = '1.05rem';
    header.style.fontWeight = '700';
    header.style.color = 'var(--text-main)';
    header.style.marginBottom = '12px';
    header.style.display = 'flex';
    header.style.alignItems = 'center';
    header.style.gap = '8px';
    header.innerHTML = `
      <span class="pill-badge" style="background: ${mod.bgSoft}; color: ${mod.color};">${mod.badge}</span>
      <span>${mod.title}</span>
    `;
    modBox.appendChild(header);

    const skillsInMod = DBT_SKILLS.filter(s => s.moduleId === mod.id);
    skillsInMod.forEach(skill => {
      const isChecked = state.temporaryEntry.skillsUsed.includes(skill.id);
      const item = document.createElement('div');
      item.className = `custom-checkbox-item ${isChecked ? 'checked' : ''}`;
      item.dataset.skillId = skill.id;

      item.innerHTML = `
        <div class="custom-check-box">${isChecked ? '✓' : ''}</div>
        <div class="checkbox-text">
          <h4>${skill.name}</h4>
          <p>${skill.summary}</p>
        </div>
      `;

      item.addEventListener('click', () => {
        const currentChecked = item.classList.contains('checked');
        const nextChecked = !currentChecked;
        item.classList.toggle('checked', nextChecked);
        item.querySelector('.custom-check-box').textContent = nextChecked ? '✓' : '';

        if (nextChecked) {
          if (!state.temporaryEntry.skillsUsed.includes(skill.id)) {
            state.temporaryEntry.skillsUsed.push(skill.id);
          }
        } else {
          state.temporaryEntry.skillsUsed = state.temporaryEntry.skillsUsed.filter(id => id !== skill.id);
        }
      });

      modBox.appendChild(item);
    });

    container.appendChild(modBox);
  });

  // Botón Volver a Paso 1
  document.getElementById('step2-back-btn').addEventListener('click', () => {
    navigateTo('step1-view');
  });

  // Guardar y Finalizar
  document.getElementById('step2-form').addEventListener('submit', (e) => {
    e.preventDefault();

    // Determinar emoción máxima
    let maxEmo = 'Ansiedad';
    let maxVal = -1;
    for (const [key, val] of Object.entries(state.temporaryEntry.emotions)) {
      if (val > maxVal) {
        maxVal = val;
        const found = EMOTIONS_LIST.find(em => em.id === key);
        maxEmo = found ? found.name.split(' / ')[0] : key;
      }
    }

    // Determinar impulso máximo
    let maxImpulse = 0;
    let impulseLabel = 'Ninguno (0)';
    for (const [key, beh] of Object.entries(state.temporaryEntry.behaviors)) {
      if (beh.scale > maxImpulse) {
        maxImpulse = beh.scale;
        const found = PROBLEM_BEHAVIORS_LIST.find(b => b.id === key);
        impulseLabel = `${found ? found.name.replace('Ideas de ', '').replace('Idea de ', '') : key} (${beh.scale})`;
      }
    }

    // Habilidades etiqueta
    const skillNames = state.temporaryEntry.skillsUsed.map(id => {
      const s = DBT_SKILLS.find(sk => sk.id === id);
      return s ? s.name.split(' (')[0].replace('Habilidades ', '').replace('Habilidad ', '') : id;
    });

    const newRecord = {
      id: `rec-${state.temporaryEntry.date}-${Date.now()}`,
      date: state.temporaryEntry.date,
      dayLabel: state.temporaryEntry.dayLabel,
      fullDateLabel: `Sábado 24 Oct`,
      emotions: { ...state.temporaryEntry.emotions },
      maxEmotion: `${maxEmo} (${maxVal}/5)`,
      impulseLevel: maxImpulse,
      impulseLabel: impulseLabel,
      behaviors: JSON.parse(JSON.stringify(state.temporaryEntry.behaviors)),
      performedAny: Object.values(state.temporaryEntry.behaviors).some(b => b.performed),
      notes: state.temporaryEntry.notes,
      skillsUsed: [...state.temporaryEntry.skillsUsed],
      skillsLabel: skillNames.slice(0, 2).join(' / ') || 'Ninguna registrada'
    };

    // Actualizar o agregar registro
    const existingIndex = state.diaryRecords.findIndex(r => r.date === newRecord.date);
    if (existingIndex >= 0) {
      state.diaryRecords[existingIndex] = newRecord;
    } else {
      state.diaryRecords.push(newRecord);
    }

    state.currentUser.streakDays = Math.max(state.currentUser.streakDays, 6);
    saveRecordsToStorage();
    renderHomeData();
    renderTherapistView();

    playGentleChime(660);
    showToast('✓ ¡Registro diario guardado con éxito! Muy bien hecho 🌿', 3500);

    navigateTo('home-view');
  });
}

// ==========================================
// MÓDULO DE HABILIDADES (Acordeón de 4 módulos)
// ==========================================
function renderSkillsAccordion() {
  const container = document.getElementById('modules-accordion-container');
  container.innerHTML = '';

  DBT_MODULES.forEach((mod, index) => {
    const acc = document.createElement('div');
    acc.className = `accordion-module ${index === 0 ? 'open' : ''}`;
    acc.id = `accordion-${mod.id}`;

    acc.innerHTML = `
      <div class="accordion-header">
        <div class="accordion-title">
          <span class="module-badge" style="background: ${mod.bgSoft}; color: ${mod.color};">
            ${mod.badge}
          </span>
          <span style="font-weight: 700; font-size: 1.05rem; color: var(--text-main);">
            ${mod.title}
          </span>
        </div>
        <div class="accordion-arrow">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </div>
      <div class="accordion-content">
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 12px;">
          ${mod.description}
        </p>
        <div class="skills-btn-group">
          <!-- Botones de Habilidad -->
        </div>
      </div>
    `;

    // Toggle Acordeón
    const header = acc.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      acc.classList.toggle('open');
    });

    // Rellenar botones de habilidad
    const btnGroup = acc.querySelector('.skills-btn-group');
    const skills = DBT_SKILLS.filter(s => s.moduleId === mod.id);
    skills.forEach(skill => {
      const btn = document.createElement('button');
      btn.className = 'skill-list-btn';
      btn.innerHTML = `
        <span style="display: flex; align-items: center; gap: 8px;">
          <span style="color: ${mod.color}; font-size: 1.1rem;">•</span>
          <span>${skill.name}</span>
        </span>
        <span style="font-size: 0.8rem; color: var(--text-muted);">Ver resumen →</span>
      `;

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openSkillDetail(skill.id);
      });

      btnGroup.appendChild(btn);
    });

    container.appendChild(acc);
  });

  // Filtro de búsqueda de habilidades
  const searchInput = document.getElementById('skills-search-input');
  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    document.querySelectorAll('.accordion-module').forEach(acc => {
      let hasVisible = false;
      acc.querySelectorAll('.skill-list-btn').forEach(btn => {
        const text = btn.textContent.toLowerCase();
        if (!term || text.includes(term)) {
          btn.style.display = 'flex';
          hasVisible = true;
        } else {
          btn.style.display = 'none';
        }
      });

      if (term) {
        acc.classList.toggle('open', hasVisible);
      }
    });
  });
}

// Abrir Detalle de Habilidad (5.1 a 5.17)
function openSkillDetail(skillId) {
  const index = DBT_SKILLS.findIndex(s => s.id === skillId);
  if (index === -1) return;
  state.currentSkillIndex = index;
  const skill = DBT_SKILLS[index];

  const mod = DBT_MODULES.find(m => m.id === skill.moduleId);
  const badge = document.getElementById('skill-detail-module-badge');
  badge.textContent = skill.moduleName;
  if (mod) {
    badge.style.background = mod.bgSoft;
    badge.style.color = mod.color;
  }

  document.getElementById('skill-detail-title').textContent = skill.fullName;
  document.getElementById('skill-detail-what').textContent = skill.whatIs;
  document.getElementById('skill-detail-steps-title').textContent = skill.stepsTitle || 'Paso a paso:';

  const stepsList = document.getElementById('skill-detail-steps-list');
  stepsList.innerHTML = '';
  skill.steps.forEach(step => {
    const p = document.createElement('div');
    p.style.padding = '8px 12px';
    p.style.background = 'var(--bg-card-subtle)';
    p.style.borderRadius = 'var(--radius-sm)';
    p.style.border = '1px solid var(--border-subtle)';
    p.textContent = step;
    stepsList.appendChild(p);
  });

  document.getElementById('skill-detail-when').textContent = skill.when;

  // Herramienta interactiva específica para la habilidad
  renderSkillInteractiveTool(skill);

  navigateTo('skill-detail-view');
}

function renderSkillInteractiveTool(skill) {
  const slot = document.getElementById('skill-interactive-tool-slot');
  slot.innerHTML = '';

  if (skill.id === '5.1') {
    // Mente Sabia: Herramienta de reflexión
    slot.innerHTML = `
      <div style="background: var(--color-lavender-soft); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--color-lavender-light);">
        <h5 style="font-weight: 700; color: var(--color-lavender); margin-bottom: 6px;">🧘 Ejercicio guiado de Mente Sabia</h5>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 10px;">
          Cierra los ojos un momento, inhala hacia tu centro y pregúntate: "¿Qué me dice mi sabiduría interna en este momento?".
        </p>
        <button type="button" class="btn btn-sm btn-outline" id="btn-wise-mind-chime">
          🔔 Tocar campana de pausa
        </button>
      </div>
    `;
    slot.querySelector('#btn-wise-mind-chime').addEventListener('click', () => {
      playGentleChime(528);
      showToast('Pausa consciente iniciada. Inhala y siente tu centro.');
    });
  } else if (skill.id === '5.4') {
    // STOP
    slot.innerHTML = `
      <div style="background: var(--color-peach-soft); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--color-peach-light); text-align: center;">
        <h5 style="font-weight: 700; color: var(--color-peach); margin-bottom: 6px;">🛑 Botón de Pausa STOP</h5>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 10px;">
          Presiona para congelar cualquier acción impulsiva durante 10 segundos.
        </p>
        <button type="button" class="btn btn-sm btn-primary" id="btn-stop-pause">
          Congelar acción (Pausa de 10s)
        </button>
      </div>
    `;
    slot.querySelector('#btn-stop-pause').addEventListener('click', () => {
      playGentleChime(396);
      showToast('🛑 DETENTE. Suelta las manos. Respira hondo.');
    });
  }
}

// Navegación en detalle de habilidad
document.getElementById('skill-detail-close-btn').addEventListener('click', () => {
  navigateTo('skills-view');
});

document.getElementById('skill-prev-btn').addEventListener('click', () => {
  const nextIdx = (state.currentSkillIndex - 1 + DBT_SKILLS.length) % DBT_SKILLS.length;
  openSkillDetail(DBT_SKILLS[nextIdx].id);
});

document.getElementById('skill-next-btn').addEventListener('click', () => {
  const nextIdx = (state.currentSkillIndex + 1) % DBT_SKILLS.length;
  openSkillDetail(DBT_SKILLS[nextIdx].id);
});

document.getElementById('skill-mark-used-btn').addEventListener('click', () => {
  const currentSkill = DBT_SKILLS[state.currentSkillIndex];
  if (!state.temporaryEntry.skillsUsed.includes(currentSkill.id)) {
    state.temporaryEntry.skillsUsed.push(currentSkill.id);
  }
  playGentleChime(587);
  showToast(`Habilidad "${currentSkill.name}" agregada a tu registro de hoy ✓`);
});

// ==========================================
// PLAN DE CRISIS Y SOS (Mockup 6)
// ==========================================
function initEventListeners() {
  // Checkbox de SOS
  document.querySelectorAll('#crisis-view .custom-checkbox-item').forEach(item => {
    item.addEventListener('click', (e) => {
      // Ignorar si se presiona el botón de temporizador
      if (e.target.closest('button')) return;
      item.classList.toggle('checked');
    });
  });

  // Temporizador de Agua Fría (30 segundos)
  const startTimerBtn = document.getElementById('btn-start-water-timer');
  const timerBox = document.getElementById('water-timer-box');
  const timerDisplay = document.getElementById('water-timer-display');
  const cancelTimerBtn = document.getElementById('btn-cancel-water-timer');

  startTimerBtn.addEventListener('click', () => {
    timerBox.style.display = 'block';
    state.waterTimer.secondsLeft = 30;
    timerDisplay.textContent = '30s';
    playGentleChime(440);

    clearInterval(state.waterTimer.intervalId);
    state.waterTimer.intervalId = setInterval(() => {
      state.waterTimer.secondsLeft--;
      timerDisplay.textContent = `${state.waterTimer.secondsLeft}s`;

      if (state.waterTimer.secondsLeft <= 0) {
        clearInterval(state.waterTimer.intervalId);
        playGentleChime(660);
        showToast('✓ 30 segundos completados. Muy bien.');
        timerDisplay.textContent = '¡Listo!';
        document.getElementById('tipp-water-item').classList.add('checked');
      }
    }, 1000);
  });

  cancelTimerBtn.addEventListener('click', () => {
    clearInterval(state.waterTimer.intervalId);
    timerBox.style.display = 'none';
  });

  // Botones de llamada en Crisis
  document.getElementById('call-therapist-btn').addEventListener('click', () => {
    showToast('Iniciando llamada a Dra. Sofía Valenzuela (+56 9 8765 4321)...');
    window.location.href = 'tel:+56987654321';
  });
  document.getElementById('call-support-btn').addEventListener('click', () => {
    showToast('Iniciando llamada a contacto de apoyo Carlos (+56 9 1234 5678)...');
    window.location.href = 'tel:+56912345678';
  });
  document.getElementById('call-crisis-line-btn').addEventListener('click', () => {
    showToast('Conectando con Línea de Prevención del Suicidio *4141...');
    window.location.href = 'tel:*4141';
  });

  // Modal de Detalle de Día
  document.getElementById('modal-day-close-btn').addEventListener('click', () => {
    document.getElementById('day-detail-modal').classList.remove('active');
  });
  document.getElementById('modal-day-ok-btn').addEventListener('click', () => {
    document.getElementById('day-detail-modal').classList.remove('active');
  });

  // Impresión de Reporte
  document.getElementById('btn-print-report').addEventListener('click', () => {
    window.print();
  });
}

// ==========================================
// VISTA TERAPEUTA: GRÁFICOS Y TABLA (Mockup 7)
// ==========================================
function renderTherapistView() {
  renderTherapistTable();
  renderTherapistCharts();
}

function renderTherapistTable() {
  const tbody = document.getElementById('therapist-table-body');
  tbody.innerHTML = '';

  state.diaryRecords.forEach(rec => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${rec.dayLabel}</strong> <span style="font-size:0.75rem; color:var(--text-muted);">${rec.date.slice(5)}</span></td>
      <td><span class="pill-badge pill-badge-orange">${rec.maxEmotion}</span></td>
      <td>${rec.impulseLabel}</td>
      <td>
        <span class="pill-badge ${rec.performedAny ? 'pill-badge-red' : 'pill-badge-green'}">
          ${rec.performedAny ? 'Sí' : 'No'}
        </span>
      </td>
      <td><span class="pill-badge pill-badge-purple">${rec.skillsLabel}</span></td>
      <td class="no-print">
        <button class="btn btn-sm btn-outline view-note-btn" data-record-id="${rec.id}">
          Ver nota
        </button>
      </td>
    `;

    tr.querySelector('.view-note-btn').addEventListener('click', () => {
      openDayDetailModal(rec);
    });

    tbody.appendChild(tr);
  });
}

function openDayDetailModal(record) {
  document.getElementById('modal-day-title').textContent = `Registro: ${record.fullDateLabel} (${record.date})`;
  const body = document.getElementById('modal-day-body');

  body.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 14px;">
      <div style="background: var(--color-primary-subtle); padding: 12px 16px; border-radius: var(--radius-md);">
        <strong>Emociones sentidas:</strong>
        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 6px;">
          ${Object.entries(record.emotions).map(([k, v]) => `
            <span class="pill-badge pill-badge-green">${k}: ${v}/5</span>
          `).join('')}
        </div>
      </div>

      <div style="background: var(--color-peach-soft); padding: 12px 16px; border-radius: var(--radius-md);">
        <strong>Impulsos y conductas problema:</strong>
        <p style="margin-top: 4px; font-size: 0.9rem;">
          Impulso principal: <strong>${record.impulseLabel}</strong> • ¿Realizada?: <strong>${record.performedAny ? 'Sí' : 'No'}</strong>
        </p>
      </div>

      <div style="background: var(--color-lavender-soft); padding: 12px 16px; border-radius: var(--radius-md);">
        <strong>Habilidades DBT aplicadas:</strong>
        <p style="margin-top: 4px; font-size: 0.9rem;">
          ${record.skillsLabel}
        </p>
      </div>

      <div style="padding: 12px 16px; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
        <strong>Notas / Evento desencadenante:</strong>
        <p style="margin-top: 6px; font-size: 0.9rem; color: var(--text-main); font-style: italic;">
          "${record.notes || 'Sin notas registradas'}"
        </p>
      </div>
    </div>
  `;

  document.getElementById('day-detail-modal').classList.add('active');
}

// Renderizado de Gráficos SVG Interactivos Suaves
function renderTherapistCharts() {
  renderEmotionsChart();
  renderImpulsesSkillsChart();
}

function renderEmotionsChart() {
  const svg = document.getElementById('emotions-weekly-chart');
  if (!svg) return;

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const gridColor = isDark ? '#2B3A33' : '#E2ECE7';
  const labelColor = isDark ? '#9BB3A7' : '#647B70';
  const subtleColor = isDark ? '#6F867B' : '#8FA49A';

  const width = 700;
  const height = 220;
  const padLeft = 40;
  const padRight = 30;
  const padTop = 20;
  const padBottom = 35;

  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const records = state.diaryRecords;
  if (!records.length) return;

  const numPoints = Math.max(records.length, 7);
  const stepX = chartW / (numPoints - 1);

  // Colores suaves para las 4 líneas principales según Mockup 7
  const series = [
    { key: 'ansiedad', color: '#F6BD60', name: 'Ansiedad/Miedo', width: 3 },
    { key: 'tristeza', color: '#8DA9C4', colorDash: '5,5', name: 'Tristeza', width: 2.5 },
    { key: 'enojo', color: '#E29578', colorDash: '3,3', name: 'Enojo', width: 2 },
    { key: 'alegria', color: '#84A59D', name: 'Alegría', width: 2.5 }
  ];

  let svgContent = '';

  // Líneas de fondo horizontales (Escala 0 a 5)
  for (let val = 0; val <= 5; val++) {
    const y = padTop + chartH - (val / 5) * chartH;
    svgContent += `
      <line x1="${padLeft}" y1="${y}" x2="${width - padRight}" y2="${y}" stroke="${gridColor}" stroke-width="1" stroke-dasharray="2,2"/>
      <text x="${padLeft - 10}" y="${y + 4}" font-size="11" font-weight="600" fill="${subtleColor}" text-anchor="end">${val}</text>
    `;
  }

  // Etiquetas de días en X (Lun a Dom)
  records.forEach((rec, i) => {
    const x = padLeft + i * stepX;
    svgContent += `
      <text x="${x}" y="${height - 10}" font-size="12" font-weight="700" fill="${labelColor}" text-anchor="middle">${rec.dayLabel}</text>
    `;
  });

  // Trazar series
  series.forEach(serie => {
    const points = records.map((rec, i) => {
      const val = rec.emotions ? (rec.emotions[serie.key] || 0) : 0;
      const x = padLeft + i * stepX;
      const y = padTop + chartH - (val / 5) * chartH;
      return { x, y, val, day: rec.dayLabel };
    });

    // Curva suave Beziér
    let pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const mx = (p0.x + p1.x) / 2;
      pathD += ` C ${mx} ${p0.y}, ${mx} ${p1.y}, ${p1.x} ${p1.y}`;
    }

    svgContent += `
      <path d="${pathD}" fill="none" stroke="${serie.color}" stroke-width="${serie.width}" 
            ${serie.colorDash ? `stroke-dasharray="${serie.colorDash}"` : ''} stroke-linecap="round"/>
    `;

    // Puntos interactivos
    points.forEach(p => {
      svgContent += `
        <circle cx="${p.x}" cy="${p.y}" r="4.5" fill="${isDark ? '#1B2420' : '#FFFFFF'}" stroke="${serie.color}" stroke-width="2.5" class="chart-point">
          <title>${serie.name} (${p.day}): ${p.val}/5</title>
        </circle>
      `;
    });
  });

  svg.innerHTML = svgContent;
}

function renderImpulsesSkillsChart() {
  const svg = document.getElementById('impulses-skills-chart');
  if (!svg) return;

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const gridColor = isDark ? '#2B3A33' : '#E2ECE7';
  const labelColor = isDark ? '#9BB3A7' : '#647B70';
  const subtleColor = isDark ? '#6F867B' : '#8FA49A';

  const width = 700;
  const height = 220;
  const padLeft = 40;
  const padRight = 30;
  const padTop = 20;
  const padBottom = 35;

  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const records = state.diaryRecords;
  if (!records.length) return;

  const numPoints = Math.max(records.length, 7);
  const stepX = chartW / numPoints;

  let svgContent = '';

  // Líneas de fondo horizontales (Escala 0 a 5)
  for (let val = 0; val <= 5; val++) {
    const y = padTop + chartH - (val / 5) * chartH;
    svgContent += `
      <line x1="${padLeft}" y1="${y}" x2="${width - padRight}" y2="${y}" stroke="${gridColor}" stroke-width="1" stroke-dasharray="2,2"/>
      <text x="${padLeft - 10}" y="${y + 4}" font-size="11" font-weight="600" fill="${subtleColor}" text-anchor="end">${val}</text>
    `;
  }

  // Barras de Impulso y Habilidades
  records.forEach((rec, i) => {
    const centerX = padLeft + i * stepX + stepX / 2;
    const barWidth = 18;

    // Barra 1: Impulso (0 a 5)
    const impulseVal = rec.impulseLevel || 0;
    const barH1 = (impulseVal / 5) * chartH;
    const y1 = padTop + chartH - barH1;

    // Barra 2: Cantidad de Habilidades Usadas
    const skillsCount = Math.min((rec.skillsUsed || []).length, 5);
    const barH2 = (skillsCount / 5) * chartH;
    const y2 = padTop + chartH - barH2;

    svgContent += `
      <!-- Barra Impulso -->
      <rect x="${centerX - barWidth - 2}" y="${y1}" width="${barWidth}" height="${barH1}" 
            fill="#E29578" rx="4" opacity="0.9">
        <title>Nivel de Impulso (${rec.dayLabel}): ${impulseVal}/5</title>
      </rect>

      <!-- Barra Habilidades -->
      <rect x="${centerX + 2}" y="${y2}" width="${barWidth}" height="${barH2}" 
            fill="${isDark ? '#2C4337' : '#C8DFD4'}" stroke="#76A992" stroke-width="1.5" rx="4">
        <title>Habilidades usadas (${rec.dayLabel}): ${skillsCount}</title>
      </rect>

      <!-- Día label -->
      <text x="${centerX}" y="${height - 10}" font-size="12" font-weight="700" fill="${labelColor}" text-anchor="middle">${rec.dayLabel}</text>
    `;
  });

  svg.innerHTML = svgContent;
}

// ==========================================
// PWA (Progressive Web App) & Service Worker
// ==========================================
let deferredInstallPrompt = null;

function initPWA() {
  // 1. Registrar Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => {
          console.log('Service Worker registrado correctamente:', reg.scope);
        })
        .catch(err => {
          console.warn('Registro de Service Worker fallido:', err);
        });
    });
  }

  const pwaInstallBtn = document.getElementById('pwa-install-btn');
  const iosGuideBtn = document.getElementById('ios-guide-btn');
  const iosModal = document.getElementById('ios-install-modal');

  // Comprobar si ya está corriendo en modo standalone (instalada)
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches 
    || window.navigator.standalone === true 
    || document.referrer.includes('android-app://');

  if (isStandalone) {
    if (pwaInstallBtn) pwaInstallBtn.style.display = 'none';
    if (iosGuideBtn) iosGuideBtn.style.display = 'none';
    return;
  }

  // 2. Capturar evento beforeinstallprompt (Chromium, Edge, Chrome Android)
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevenir el banner automático del navegador
    e.preventDefault();
    // Almacenar el evento en memoria para dispararlo bajo demanda
    deferredInstallPrompt = e;

    // Mostrar el botón de instalación únicamente cuando sea instalable
    if (pwaInstallBtn) {
      pwaInstallBtn.style.display = 'inline-flex';
    }
  });

  // 3. Manejar clic en el botón de instalación
  if (pwaInstallBtn) {
    pwaInstallBtn.addEventListener('click', async () => {
      if (!deferredInstallPrompt) {
        return;
      }

      // Disparar el prompt nativo de instalación
      deferredInstallPrompt.prompt();

      // Manejar la promesa userChoice
      try {
        const choiceResult = await deferredInstallPrompt.userChoice;
        if (choiceResult.outcome === 'accepted') {
          playGentleChime(660);
          showToast('✓ Instalando Mi Compañero DBT...');
        } else {
          console.log('El usuario postergó la instalación.');
        }
      } catch (err) {
        console.warn('Error en prompt de instalación:', err);
      }

      // Limpiar el evento diferido y ocultar el botón
      deferredInstallPrompt = null;
      pwaInstallBtn.style.display = 'none';
    });
  }

  // 4. Escuchar evento appinstalled para limpiar estado
  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    if (pwaInstallBtn) pwaInstallBtn.style.display = 'none';
    if (iosGuideBtn) iosGuideBtn.style.display = 'none';
    playGentleChime(784);
    showToast('🎉 ¡Mi Compañero DBT instalado con éxito!');
  });

  // 5. Compatibilidad: Detectar iOS Safari (sin soporte de beforeinstallprompt)
  const userAgent = window.navigator.userAgent.toLowerCase();
  const isIos = /iphone|ipad|ipod/.test(userAgent);
  const isSafari = userAgent.includes('safari') && !userAgent.includes('crios') && !userAgent.includes('fxios');

  if (isIos && isSafari && !isStandalone) {
    if (iosGuideBtn) {
      iosGuideBtn.style.display = 'inline-flex';
      iosGuideBtn.addEventListener('click', () => {
        if (iosModal) iosModal.classList.add('active');
      });
    }
  }

  // Cerrar modal de guía iOS
  const iosCloseBtn = document.getElementById('modal-ios-close-btn');
  const iosOkBtn = document.getElementById('modal-ios-ok-btn');

  if (iosCloseBtn && iosModal) {
    iosCloseBtn.addEventListener('click', () => {
      iosModal.classList.remove('active');
    });
  }
  if (iosOkBtn && iosModal) {
    iosOkBtn.addEventListener('click', () => {
      iosModal.classList.remove('active');
    });
  }
}

// ==========================================
// MODO OSCURO / CLARO Y DETECCIÓN AUTOMÁTICA
// ==========================================
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function applyTheme(theme, save = false) {
    document.documentElement.setAttribute('data-theme', theme);
    if (save) {
      localStorage.setItem('dbt_theme', theme);
    }

    // Actualizar meta theme-color para navegadores móviles y standalone
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', theme === 'dark' ? '#121915' : '#5A8F76');
    }

    // Actualizar título accesible del botón
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('title', theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    }

    // Si la vista terapeuta está visible, redibujar gráficos para adaptar contraste
    if (state.currentView === 'therapist-view') {
      renderTherapistCharts();
    }
  }

  // 1. Determinar tema inicial (Preferencia manual guardada o detección del sistema)
  const savedTheme = localStorage.getItem('dbt_theme');
  if (savedTheme) {
    applyTheme(savedTheme, false);
  } else {
    // Detección automática según el modo del equipo
    applyTheme(mediaQuery.matches ? 'dark' : 'light', false);
  }

  // 2. Escuchar cambios automáticos en el sistema operativo del usuario
  mediaQuery.addEventListener('change', (e) => {
    const currentManual = localStorage.getItem('dbt_theme');
    // Si el usuario no ha forzado un modo manualmente, adaptarse al cambio del sistema
    if (!currentManual) {
      applyTheme(e.matches ? 'dark' : 'light', false);
    }
  });

  // 3. Manejar clic en el botón de cambio de tema
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme, true);
      playGentleChime(newTheme === 'dark' ? 396 : 528);
      showToast(newTheme === 'dark' ? '🌙 Modo oscuro activado' : '☀️ Modo claro activado', 2200);
    });
  }
}
