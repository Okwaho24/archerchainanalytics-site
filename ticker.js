(function () {
  'use strict';
  // Native assets of the chain families Archer Chain Analytics lists, plus the largest EVM networks. CoinGecko ids.
  var COINS = [
    ['BTC','bitcoin'],['ETH','ethereum'],['SOL','solana'],['XRP','ripple'],['BNB','binancecoin'],['ADA','cardano'],
    ['AVAX','avalanche-2'],['DOT','polkadot'],['TRX','tron'],['TON','the-open-network'],['NEAR','near'],['ATOM','cosmos'],
    ['ALGO','algorand'],['APT','aptos'],['SUI','sui'],['STRK','starknet'],['HBAR','hedera-hashgraph'],['KAS','kaspa'],
    ['EGLD','elrond-erd-2'],['LTC','litecoin'],['DOGE','dogecoin'],['BCH','bitcoin-cash'],['DASH','dash'],['ZEC','zcash'],
    ['RVN','ravencoin'],['DGB','digibyte'],['KSM','kusama'],['TIA','celestia'],['INJ','injective-protocol'],['SEI','sei-network'],
    ['KAVA','kava'],['OSMO','osmosis'],['AKT','akash-network'],['SCRT','secret'],['RUNE','thorchain'],['FET','fetch-ai'],
    ['STARS','stargaze'],['XAH','xahau'],['ACA','acala'],['GLMR','moonbeam'],['POL','polygon-ecosystem-token'],
    ['ETC','ethereum-classic'],['CRO','crypto-com-chain'],['CELO','celo'],['ASTR','astar'],['MNT','mantle'],
    ['FLR','flare-networks'],['CFX','conflux-token'],['XDC','xdce-crowd-sale'],['S','sonic-3'],['OAS','oasys'],
    ['QKC','quark-chain'],['FIL','filecoin'],['TAO','bittensor'],['MOVE','movement'],['VOI','voi-network'],
    ['BERA','berachain-bera'],['IOTA','iota'],['ONE','harmony'],['ROSE','oasis-network'],['GNO','gnosis'],
    ['CHZ','chiliz'],['ZIL','zilliqa'],['EOS','eos'],['XLM','stellar']
  ];
  var KEY = 'aca_ticker_v1', FRESH_MS = 300000;
  var SPEED = 60; // scroll speed in pixels per second (raise to go faster)
  var box = document.getElementById('price-ticker');
  if (!box) return;
  var wrap = box.parentNode;
  function fmt(p) {
    if (p >= 1000) return '$' + p.toLocaleString('en-US', { maximumFractionDigits: 0 });
    if (p >= 10) return '$' + p.toFixed(2);
    if (p >= 1) return '$' + p.toFixed(3);
    return '$' + p.toPrecision(3);
  }
  function item(sym, price, chg) {
    var d = document.createElement('div'); d.className = 'ticker-item';
    var s = document.createElement('span'); s.className = 'symbol'; s.textContent = sym;
    var p = document.createElement('span'); p.className = 'price'; p.textContent = price;
    d.appendChild(s); d.appendChild(p);
    if (typeof chg === 'number') {
      var c = document.createElement('span'); c.className = 'change ' + (chg >= 0 ? 'up' : 'down');
      c.textContent = (chg >= 0 ? '\u25B2 ' : '\u25BC ') + Math.abs(chg).toFixed(2) + '%'; d.appendChild(c);
    }
    return d;
  }
  function render(data) {
    var items = [];
    COINS.forEach(function (c) {
      var d = data[c[1]];
      if (d && typeof d.usd === 'number') items.push(item(c[0], fmt(d.usd), d.usd_24h_change));
    });
    if (!items.length) return false;
    items.push(item('PRICES', 'COINGECKO'));
    while (box.firstChild) box.removeChild(box.firstChild);
    items.forEach(function (n) { box.appendChild(n); });
    items.forEach(function (n) { box.appendChild(n.cloneNode(true)); });
    wrap.style.display = '';
    box.style.width = 'max-content';
    requestAnimationFrame(function () {
      // One loop = one full copy of the items, so the restart is seamless at any screen width.
      box.style.animationDuration = Math.max(10, (box.scrollWidth / 2) / SPEED) + 's';
    });
    return true;
  }
  function read() { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } }
  function write(d) { try { localStorage.setItem(KEY, JSON.stringify({ t: Date.now(), d: d })); } catch (e) {} }
  var cached = read();
  if (cached && cached.d && Date.now() - cached.t < FRESH_MS && render(cached.d)) return;
  var url = 'https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&include_24h_change=true&ids=' +
    COINS.map(function (c) { return c[1]; }).join(',');
  fetch(url).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (data) { if (render(data)) write(data); else throw new Error('empty'); })
    .catch(function () {
      // Never show invented prices: use the last real fetch if there is one, otherwise hide the bar.
      if (!(cached && cached.d && render(cached.d))) wrap.style.display = 'none';
    });
})();
