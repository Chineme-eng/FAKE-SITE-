/* =============================================
   HANGOUT — Teen Social Discovery Site
   app.js
   ============================================= */

'use strict';

// ── STATE ────────────────────────────────────────
const state = {
  theme: localStorage.getItem('hg-theme') || 'light',
  currentPage: 'discover',
  activeChat: 0,
  myProfile: {
    name: 'Alex Rivera',
    handle: '@alexr',
    age: 17,
    avatar: '🦋',
    banner: 'linear-gradient(135deg, #ff4d6d, #6c63ff)',
    status: '✨ currently obsessed with lo-fi beats',
    bio: 'just a kid who likes making stuff. into music, digital art, and long convos about literally anything.',
    tags: ['🎵 Music', '🎨 Art', '🎮 Gaming', '📚 Books', '🌙 Night Owl'],
    nowPlaying: { song: 'Snowflake', artist: 'beabadoobee' },
    stats: { friends: 47, vibes: 312, joined: "'23" },
    top8: [
      { name: 'Mia', avatar: '🌸' },
      { name: 'Jordan', avatar: '🎸' },
      { name: 'Sam', avatar: '🦊' },
      { name: 'Quinn', avatar: '🌿' },
      { name: 'Lily', avatar: '🍄' },
      { name: 'Zoe', avatar: '⚡' },
      { name: 'Kai', avatar: '🌊' },
      { name: 'Rio', avatar: '🌺' },
    ],
    qa: [
      { q: 'Describe your vibe in 3 words', a: 'chaotic, soft, curious' },
      { q: 'Current obsession?', a: 'I\'ve been teaching myself Blender for the past month and my brain is melting but in the best way' },
      { q: 'Ideal hangout?', a: 'late night drive, windows down, playing music neither of us has heard before' },
      { q: 'Hot take?', a: 'brown noise > white noise and I will not be taking questions' },
    ],
  },
};

// ── DATA ────────────────────────────────────────
const profiles = [
  {
    id: 1, name: 'Mia Chen', handle: '@mia.draws', age: 16,
    avatar: '🌸', banner: 'linear-gradient(135deg,#ffd6e0,#ffb3c6)',
    vibe: 'currently: spiraling about my sketchbook',
    tags: ['🎨 Art', '🎵 Music', '🐱 Cat Person'],
    online: true,
  },
  {
    id: 2, name: 'Jordan Lee', handle: '@jrdnl', age: 17,
    avatar: '🎸', banner: 'linear-gradient(135deg,#d0e8ff,#93c5fd)',
    vibe: 'band practice or i dont exist',
    tags: ['🎵 Music', '🎤 Singing', '🏄 Outdoors'],
    online: true,
  },
  {
    id: 3, name: 'Sam Walker', handle: '@samwlkr', age: 15,
    avatar: '🦊', banner: 'linear-gradient(135deg,#fde68a,#fbbf24)',
    vibe: 'speedrunning my homework rn',
    tags: ['🎮 Gaming', '💻 Coding', '🎲 Board Games'],
    online: false,
  },
  {
    id: 4, name: 'Quinn Torres', handle: '@quinnt', age: 17,
    avatar: '🌿', banner: 'linear-gradient(135deg,#a7f3d0,#34d399)',
    vibe: 'plant parent of 23 succulents',
    tags: ['🌱 Plants', '📚 Books', '🎵 Music'],
    online: true,
  },
  {
    id: 5, name: 'Lily Park', handle: '@lilyp', age: 16,
    avatar: '🍄', banner: 'linear-gradient(135deg,#ddd6fe,#c4b5fd)',
    vibe: 'rewatching midsommar for the 4th time',
    tags: ['🎬 Film', '🎨 Art', '🌙 Night Owl'],
    online: false,
  },
  {
    id: 6, name: 'Zoe Kim', handle: '@zoek', age: 18,
    avatar: '⚡', banner: 'linear-gradient(135deg,#fecaca,#f87171)',
    vibe: 'writing a novel that may never be finished',
    tags: ['✍️ Writing', '📚 Books', '☕ Coffee'],
    online: true,
  },
  {
    id: 7, name: 'Kai Nakamura', handle: '@kainks', age: 16,
    avatar: '🌊', banner: 'linear-gradient(135deg,#bae6fd,#38bdf8)',
    vibe: 'skatepark? skatepark.',
    tags: ['🛹 Skating', '🎵 Music', '📸 Photos'],
    online: false,
  },
  {
    id: 8, name: 'Rio Diaz', handle: '@riodiaz', age: 17,
    avatar: '🌺', banner: 'linear-gradient(135deg,#fed7aa,#fb923c)',
    vibe: 'cooking something experimental tonight',
    tags: ['🍳 Cooking', '🎨 Art', '🌍 Travel'],
    online: true,
  },
];

const conversations = [
  {
    id: 0, name: 'Mia Chen', avatar: '🌸', online: true,
    lastMsg: 'omg yes that song is SO good', time: '2m',
    unread: 2,
    messages: [
      { from: 'them', text: 'hey!! do you listen to girl in red?', time: '4:10 PM' },
      { from: 'me',   text: 'YES she\'s literally everything', time: '4:11 PM' },
      { from: 'them', text: 'okay good we are now best friends', time: '4:11 PM' },
      { from: 'me',   text: 'haha i\'m listening to chapter 2 rn', time: '4:13 PM' },
      { from: 'them', text: 'omg yes that song is SO good', time: '4:14 PM' },
    ],
  },
  {
    id: 1, name: 'Jordan Lee', avatar: '🎸', online: true,
    lastMsg: 'wanna hear the demo?', time: '1h',
    unread: 0,
    messages: [
      { from: 'me',   text: 'how was band practice??', time: '2:00 PM' },
      { from: 'them', text: 'actually really good!! we finally nailed the bridge', time: '2:05 PM' },
      { from: 'them', text: 'wanna hear the demo?', time: '2:05 PM' },
    ],
  },
  {
    id: 2, name: 'Sam Walker', avatar: '🦊', online: false,
    lastMsg: 'gg ez lol', time: '3h',
    unread: 0,
    messages: [
      { from: 'them', text: 'mario kart tonight?', time: '11:00 AM' },
      { from: 'me',   text: 'oh you are going DOWN', time: '11:02 AM' },
      { from: 'them', text: 'gg ez lol', time: '12:30 PM' },
      { from: 'me',   text: '😭 rematch tomorrow', time: '12:31 PM' },
    ],
  },
  {
    id: 3, name: 'Quinn Torres', avatar: '🌿', online: true,
    lastMsg: 'she just knocked over ANOTHER pot', time: '5h',
    unread: 1,
    messages: [
      { from: 'them', text: 'my cat discovered the plants shelf', time: '9:00 AM' },
      { from: 'me',   text: 'oh no..', time: '9:15 AM' },
      { from: 'them', text: 'she just knocked over ANOTHER pot', time: '9:16 AM' },
    ],
  },
];

const notifications = [
  { id: 1, icon: '👋', text: '<strong>Mia Chen</strong> sent you a hey!', time: '2 min ago', unread: true },
  { id: 2, icon: '❤️', text: '<strong>Jordan Lee</strong> vibed with your profile', time: '10 min ago', unread: true },
  { id: 3, icon: '✉️', text: '<strong>Quinn Torres</strong> sent you a message', time: '1 hr ago', unread: true },
  { id: 4, icon: '👥', text: '<strong>Sam Walker</strong> accepted your friend request', time: '3 hr ago', unread: false },
  { id: 5, icon: '🎉', text: 'You got <strong>5 new profile views</strong> today!', time: '5 hr ago', unread: false },
  { id: 6, icon: '👋', text: '<strong>Lily Park</strong> sent you a hey!', time: 'Yesterday', unread: false },
  { id: 7, icon: '❤️', text: '<strong>Zoe Kim</strong> vibed with your profile', time: 'Yesterday', unread: false },
];

// ── INIT ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(state.theme);
  renderAll();
  bindNav();
  bindThemeToggle();
  bindModalClose();
  navigateTo('discover');
});

// ── THEME ─────────────────────────────────────────
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function bindThemeToggle() {
  document.getElementById('themeToggle')?.addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('hg-theme', state.theme);
    applyTheme(state.theme);
  });
}

// ── NAVIGATION ───────────────────────────────────
function bindNav() {
  document.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', () => navigateTo(el.dataset.page));
  });
}

function navigateTo(page) {
  state.currentPage = page;

  // Update pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(`page-${page}`)?.classList.add('active');

  // Update nav links
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.page === page);
  });

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── RENDER ALL ───────────────────────────────────
function renderAll() {
  renderDiscover();
  renderProfile();
  renderMessages();
  renderConnections();
  renderNotifications();
}

// ── DISCOVER PAGE ────────────────────────────────
function renderDiscover() {
  const grid = document.getElementById('profilesGrid');
  if (!grid) return;
  grid.innerHTML = profiles.map(p => profileCardHTML(p)).join('');

  // Filter chips
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', function () {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      const filter = this.dataset.filter;
      filterProfiles(filter);
    });
  });
}

function profileCardHTML(p) {
  const tagsHTML = p.tags.slice(0, 3).map(t => `<span class="tag">${t}</span>`).join('');
  const onlineDot = p.online ? '<span class="online-dot"></span>' : '';
  return `
    <div class="profile-card" onclick="openProfileModal(${p.id})">
      <div class="profile-card-banner">
        <div class="profile-card-banner-inner" style="background:${p.banner}"></div>
        <div class="profile-card-avatar">${p.avatar}</div>
        ${onlineDot}
      </div>
      <div class="profile-card-body">
        <div class="profile-card-name">${p.name}</div>
        <div class="profile-card-handle">${p.handle}, ${p.age}</div>
        <div class="profile-card-vibe">"${p.vibe}"</div>
        <div class="profile-card-tags">${tagsHTML}</div>
        <div class="profile-card-actions">
          <button class="btn btn-primary btn-sm" onclick="event.stopPropagation();sendHey('${p.name}')">👋 Hey!</button>
          <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation();openProfileModal(${p.id})">View</button>
        </div>
      </div>
    </div>
  `;
}

function filterProfiles(filter) {
  const grid = document.getElementById('profilesGrid');
  if (!grid) return;
  const filtered = filter === 'all'
    ? profiles
    : profiles.filter(p => p.tags.some(t => t.toLowerCase().includes(filter.toLowerCase())));
  grid.innerHTML = filtered.length
    ? filtered.map(p => profileCardHTML(p)).join('')
    : `<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-icon">🔍</div><div class="empty-state-text">No profiles match that filter yet!</div></div>`;
}

// ── PROFILE MODAL ────────────────────────────────
function openProfileModal(id) {
  const p = profiles.find(x => x.id === id);
  if (!p) return;

  document.getElementById('modalProfileName').textContent = p.name;
  document.getElementById('modalProfileHandle').textContent = `${p.handle} · ${p.age}`;
  document.getElementById('modalProfileAvatar').textContent = p.avatar;
  document.getElementById('modalProfileBanner').style.background = p.banner;
  document.getElementById('modalProfileVibe').textContent = `"${p.vibe}"`;
  document.getElementById('modalProfileTags').innerHTML = p.tags.map(t => `<span class="tag">${t}</span>`).join('');
  document.getElementById('modalHeyBtn').onclick = () => { sendHey(p.name); closeModal('profileModal'); };
  document.getElementById('modalMsgBtn').onclick = () => { closeModal('profileModal'); navigateTo('messages'); };

  openModal('profileModal');
}

// ── MY PROFILE PAGE ──────────────────────────────
function renderProfile() {
  const p = state.myProfile;

  setEl('myName', p.name);
  setEl('myHandle', `${p.handle} · ${p.age}`);
  setEl('myAvatar', p.avatar);
  setEl('myStatus', p.status);
  setEl('myBio', p.bio);
  setEl('myStatFriends', p.stats.friends);
  setEl('myStatVibes', p.stats.vibes);
  setEl('myStatJoined', p.stats.joined);
  setEl('myNowSong', p.nowPlaying.song);
  setEl('myNowArtist', p.nowPlaying.artist);

  const banner = document.getElementById('myBanner');
  if (banner) banner.style.background = p.banner;

  // Tags
  const tagsEl = document.getElementById('myTags');
  if (tagsEl) tagsEl.innerHTML = p.tags.map(t => `<span class="tag">${t}</span>`).join('');

  // Top 8
  const top8El = document.getElementById('myTop8');
  if (top8El) top8El.innerHTML = p.top8.map(f => `
    <div class="top8-item">
      <div class="top8-avatar">${f.avatar}</div>
      <div class="top8-name">${f.name}</div>
    </div>
  `).join('');

  // Q&A
  const qaEl = document.getElementById('myQA');
  if (qaEl) qaEl.innerHTML = p.qa.map(item => `
    <div class="qa-item">
      <div class="qa-q">${item.q}</div>
      <div class="qa-a">${item.a}</div>
    </div>
  `).join('');
}

// ── MESSAGES PAGE ─────────────────────────────────
function renderMessages() {
  const list = document.getElementById('convoList');
  if (!list) return;

  list.innerHTML = conversations.map((c, i) => `
    <div class="convo-item ${i === state.activeChat ? 'active' : ''}" onclick="selectChat(${i})">
      <div class="convo-avatar">
        ${c.avatar}
        ${c.online ? '<div class="convo-online"></div>' : ''}
      </div>
      <div class="convo-info">
        <div class="convo-name">${c.name}</div>
        <div class="convo-last">${c.lastMsg}</div>
      </div>
      <div class="convo-meta">
        <div class="convo-time">${c.time}</div>
        ${c.unread ? `<div class="unread-badge">${c.unread}</div>` : ''}
      </div>
    </div>
  `).join('');

  renderChat(state.activeChat);
}

function selectChat(i) {
  state.activeChat = i;
  conversations[i].unread = 0;
  renderMessages();
}

function renderChat(i) {
  const c = conversations[i];
  const win = document.getElementById('chatWindow');
  if (!win) return;

  win.innerHTML = `
    <div class="chat-header">
      <div class="chat-header-avatar">${c.avatar}</div>
      <div>
        <div class="chat-header-name">${c.name}</div>
        <div class="chat-header-status">${c.online ? '● online' : '○ offline'}</div>
      </div>
      <div class="chat-header-actions">
        <button class="btn btn-ghost btn-icon" title="View profile" onclick="openProfileModal(${c.id})">👤</button>
        <button class="btn btn-ghost btn-icon" title="Report" onclick="showToast('User reported')">🚩</button>
      </div>
    </div>
    <div class="chat-messages" id="chatMessages">
      ${c.messages.map(m => messageBubbleHTML(m, c)).join('')}
    </div>
    <div class="chat-input-bar">
      <input class="chat-input" id="chatInput" placeholder="say something..." onkeydown="handleChatKey(event, ${i})">
      <button class="chat-send" onclick="sendMessage(${i})">➤</button>
    </div>
  `;

  // Scroll to bottom
  const msgs = document.getElementById('chatMessages');
  if (msgs) msgs.scrollTop = msgs.scrollHeight;
}

function messageBubbleHTML(m, c) {
  const isMe = m.from === 'me';
  return `
    <div class="msg ${isMe ? 'msg-out' : 'msg-in'}">
      ${!isMe ? `<div class="msg-avatar-sm">${c.avatar}</div>` : ''}
      <div>
        <div class="msg-bubble">${m.text}</div>
        <div class="msg-time">${m.time}</div>
      </div>
    </div>
  `;
}

function handleChatKey(e, i) {
  if (e.key === 'Enter') sendMessage(i);
}

function sendMessage(i) {
  const input = document.getElementById('chatInput');
  if (!input || !input.value.trim()) return;
  const text = input.value.trim();
  input.value = '';

  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  conversations[i].messages.push({ from: 'me', text, time });
  conversations[i].lastMsg = text;
  conversations[i].time = 'now';

  renderMessages();

  // Simulate reply after delay
  setTimeout(() => {
    const replies = [
      'haha that\'s so real',
      'omg same tho',
      'wait no way',
      'lol okay fair',
      'i was JUST thinking about that',
      'tell me more 👀',
    ];
    const reply = replies[Math.floor(Math.random() * replies.length)];
    const replyTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    conversations[i].messages.push({ from: 'them', text: reply, time: replyTime });
    conversations[i].lastMsg = reply;
    renderMessages();
  }, 1200 + Math.random() * 800);
}

// ── CONNECTIONS PAGE ──────────────────────────────
function renderConnections() {
  const grid = document.getElementById('connectionsGrid');
  if (!grid) return;

  const connected = profiles.slice(0, 6); // first 6 are "connections"
  grid.innerHTML = connected.map(p => `
    <div class="connection-card" onclick="openProfileModal(${p.id})">
      <div class="connection-avatar" style="position:relative">
        ${p.avatar}
        ${p.online ? '<div class="online-dot" style="bottom:-2px;right:-2px"></div>' : ''}
      </div>
      <div class="connection-info">
        <div class="connection-name">${p.name}</div>
        <div class="connection-handle">${p.handle}</div>
        <div class="connection-tags">
          ${p.tags.slice(0, 2).map(t => `<span class="tag" style="font-size:0.72rem;padding:2px 8px">${t}</span>`).join('')}
        </div>
      </div>
      <button class="btn btn-ghost btn-icon" onclick="event.stopPropagation();showToast('Message sent!')">✉️</button>
    </div>
  `).join('');
}

// ── NOTIFICATIONS PAGE ────────────────────────────
function renderNotifications() {
  const list = document.getElementById('notifList');
  if (!list) return;

  list.innerHTML = notifications.map(n => `
    <div class="notif-item ${n.unread ? 'unread' : ''}">
      <div class="notif-icon">${n.icon}</div>
      <div class="notif-text">${n.text}</div>
      <div class="notif-time">${n.time}</div>
    </div>
  `).join('');
}

// ── MODALS ────────────────────────────────────────
function openModal(id) {
  document.getElementById(id)?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(id)?.classList.remove('open');
  document.body.style.overflow = '';
}

function bindModalClose() {
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeModal(overlay.id);
    });
  });

  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) closeModal(modal.id);
    });
  });
}

// ── TOAST ─────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

// ── UTILS ─────────────────────────────────────────
function setEl(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

// ── HEY BUTTON ────────────────────────────────────
function sendHey(name) {
  showToast(`👋 Hey sent to ${name}!`);
}

// ── SEARCH ────────────────────────────────────────
document.addEventListener('input', e => {
  if (e.target.id === 'discoverSearch') {
    const q = e.target.value.toLowerCase().trim();
    const grid = document.getElementById('profilesGrid');
    if (!grid) return;
    if (!q) { renderDiscover(); return; }
    const filtered = profiles.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.handle.toLowerCase().includes(q) ||
      p.vibe.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
    grid.innerHTML = filtered.length
      ? filtered.map(p => profileCardHTML(p)).join('')
      : `<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-icon">🔍</div><div class="empty-state-text">No results for "${q}"</div></div>`;
  }
});
