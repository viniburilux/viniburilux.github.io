(() => {
  'use strict';

  const registryUrl = 'https://luxverso.com/_nav.json';
  const currentUrl = window.location.href.replace(/\/$/, '');

  const style = document.createElement('style');
  style.textContent = `
    .lx-nav-trigger{position:fixed;bottom:22px;right:24px;z-index:1001;display:inline-flex;align-items:center;gap:9px;padding:9px 12px;border:1px solid rgba(214,242,61,.35);border-radius:999px;background:rgba(9,10,9,.9);color:#f1f1e8;font:600 11px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;backdrop-filter:blur(10px)}
    .lx-nav-trigger:hover,.lx-nav-trigger:focus-visible{border-color:#d6f23d;color:#d6f23d;outline:none}
    .lx-nav-trigger .lx-nav-dot{width:6px;height:6px;border-radius:50%;background:#d6f23d;box-shadow:0 0 12px rgba(214,242,61,.7)}
    .lx-nav-panel{position:fixed;inset:0;z-index:1000;display:none;background:rgba(5,7,5,.78);backdrop-filter:blur(12px);padding:76px 24px 28px;overflow:auto}
    .lx-nav-panel.is-open{display:block}
    .lx-nav-shell{width:min(980px,100%);margin:0 auto;padding:26px;border:1px solid #293129;background:#101510;color:#f1f1e8}
    .lx-nav-head{display:flex;justify-content:space-between;align-items:flex-start;gap:20px;padding-bottom:22px;border-bottom:1px solid #293129}
    .lx-nav-brand{font:700 15px/1.2 Inter,system-ui,sans-serif;letter-spacing:.14em}.lx-nav-sub{display:block;margin-top:7px;color:#687066;font:10px/1.2 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.08em;text-transform:uppercase}
    .lx-nav-close{border:0;background:none;color:#a9b0a5;font:12px ui-monospace,SFMono-Regular,Menlo,monospace;cursor:pointer}.lx-nav-close:hover,.lx-nav-close:focus-visible{color:#d6f23d;outline:none}
    .lx-nav-current{padding:18px 0 23px;color:#a9b0a5;font:11px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace}.lx-nav-current strong{color:#f1f1e8;font-weight:500}
    .lx-nav-group{margin-top:23px}.lx-nav-group-label{color:#d6f23d;font:10px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.14em;text-transform:uppercase}
    .lx-nav-items{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1px;margin-top:12px;background:#293129;border:1px solid #293129}.lx-nav-item{display:flex;flex-direction:column;min-height:104px;padding:17px;background:#151a16;color:inherit;text-decoration:none}.lx-nav-item:hover,.lx-nav-item:focus-visible{background:#1c241c;outline:none}.lx-nav-item.is-current{box-shadow:inset 3px 0 #d6f23d}.lx-nav-item-name{font:600 15px/1.25 Inter,system-ui,sans-serif}.lx-nav-item-meta{margin-top:6px;color:#d6f23d;font:10px/1.2 ui-monospace,SFMono-Regular,Menlo,monospace;text-transform:uppercase;letter-spacing:.06em}.lx-nav-item-desc{margin-top:auto;padding-top:13px;color:#a9b0a5;font:12px/1.45 Inter,system-ui,sans-serif}
    @media(max-width:620px){.lx-nav-trigger{bottom:14px;right:12px}.lx-nav-panel{padding:62px 12px 18px}.lx-nav-shell{padding:19px}.lx-nav-items{grid-template-columns:1fr}.lx-nav-item{min-height:92px}}
  `;
  document.head.appendChild(style);

  const trigger = document.createElement('button');
  trigger.className = 'lx-nav-trigger';
  trigger.type = 'button';
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-controls', 'lx-nav-panel');
  trigger.innerHTML = '<span class="lx-nav-dot"></span><span>Ecossistema</span>';

  const panel = document.createElement('div');
  panel.className = 'lx-nav-panel';
  panel.id = 'lx-nav-panel';
  panel.setAttribute('aria-hidden', 'true');
  panel.innerHTML = '<div class="lx-nav-shell"><div class="lx-nav-head"><div class="lx-nav-brand">LUXVERSO<span class="lx-nav-sub">Research &amp; Tech · navegação global</span></div><button class="lx-nav-close" type="button">Fechar ×</button></div><div class="lx-nav-current"></div><div class="lx-nav-content"><p>Carregando o catálogo do ecossistema…</p></div></div>';

  const setOpen = (open) => {
    panel.classList.toggle('is-open', open);
    panel.setAttribute('aria-hidden', String(!open));
    trigger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) panel.querySelector('.lx-nav-close').focus();
    else trigger.focus();
  };

  const makeCurrent = (items) => {
    const current = items.find(item => currentUrl === item.url.replace(/\/$/, '') || currentUrl.startsWith(item.url.replace(/\/$/, '') + '/'));
    return current ? current.name : 'LuxVerso';
  };

  const render = (registry) => {
    const allItems = registry.groups.flatMap(group => group.items);
    panel.querySelector('.lx-nav-current').innerHTML = `Você está em <strong>${makeCurrent(allItems)}</strong>`;
    panel.querySelector('.lx-nav-content').innerHTML = registry.groups.map(group => `
      <section class="lx-nav-group"><div class="lx-nav-group-label">${group.label}</div><div class="lx-nav-items">${group.items.map(item => {
        const isCurrent = currentUrl === item.url.replace(/\/$/, '') || currentUrl.startsWith(item.url.replace(/\/$/, '') + '/');
        return `<a class="lx-nav-item${isCurrent ? ' is-current' : ''}" href="${item.url}"${isCurrent ? ' aria-current="page"' : ''}><span class="lx-nav-item-name">${item.name}</span><span class="lx-nav-item-meta">${item.category}</span><span class="lx-nav-item-desc">${item.description}</span></a>`;
      }).join('')}</div></section>`).join('');
  };

  trigger.addEventListener('click', () => setOpen(!panel.classList.contains('is-open')));
  panel.querySelector('.lx-nav-close').addEventListener('click', () => setOpen(false));
  panel.addEventListener('click', (event) => { if (event.target === panel) setOpen(false); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && panel.classList.contains('is-open')) setOpen(false); });
  document.body.append(trigger, panel);

  fetch(registryUrl, { credentials: 'omit' })
    .then(response => { if (!response.ok) throw new Error('registry unavailable'); return response.json(); })
    .then(render)
    .catch(() => {
      panel.querySelector('.lx-nav-current').textContent = 'Catálogo temporariamente indisponível.';
      panel.querySelector('.lx-nav-content').innerHTML = '<p>Use o botão para retornar ao LuxVerso enquanto o catálogo é atualizado.</p>';
    });
})();
