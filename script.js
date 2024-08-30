document.addEventListener('DOMContentLoaded', () => {
    const sg = document.getElementById('sg');
    const wp = document.getElementById('wp');
    const mp = document.getElementById('mp');
    const gp = document.getElementById('gp');
    const pwf = document.getElementById('pwf');
    const pwa = document.getElementById('pwa');
    const bk = document.getElementById('bk');
    const rt = document.getElementById('rt');
    const cl = document.querySelectorAll('.cl');
    const ti = document.getElementById('ti');
    const msg = document.getElementById('msg');
    let gm = '';
    let cp = 'X';
    function sp(pg) {
      const ps = document.querySelectorAll('.box');
      ps.forEach(p => {
        if (p === pg) {
          p.classList.remove('hd');
        } else {
          p.classList.add('hd');
        }
      });
    }
  function rg() {
      cl.forEach(c => {
        c.textContent = '';
        c.classList.remove('occupied');
      });
      cp = 'X';
      ti.textContent = 'Current Player: X';
      msg.textContent = '';
    }
   function cw() {
      const wc = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
  
      for (const c of wc) {
        const [a, b, d] = c;
        if (cl[a].textContent && cl[a].textContent === cl[b].textContent && cl[a].textContent === cl[d].textContent) {
          msg.textContent = `${cl[a].textContent} wins!`;
          return true;
        }
      }
  
      if ([...cl].every(c => c.textContent)) {
        msg.textContent = 'The game ends in a draw!';
        return true;
      }
  
      return false;
    }
   function hc(e) {
      const c = e.target;
  
      if (c.classList.contains('occupied') || msg.textContent) return;
  
      c.textContent = cp;
      c.classList.add('occupied');
  
      if (cw()) return;
  
      cp = cp === 'X' ? 'O' : 'X';
      ti.textContent = `Current Player: ${cp}`;
  
      if (gm === 'ai' && cp === 'O') {
        setTimeout(am, 500);
      }
    }
   function am() {
      const ec = [...cl].filter(c => !c.classList.contains('occupied'));
      if (ec.length === 0) return;
  
      const rc = ec[Math.floor(Math.random() * ec.length)];
      rc.textContent = 'O';
      rc.classList.add('occupied');
  
      if (!cw()) {
        cp = 'X';
        ti.textContent = 'Current Player: X';
      }
    }
  
    sg.addEventListener('click', () => {
      sp(mp);
    });
  
    pwf.addEventListener('click', () => {
      gm = 'friend';
      rg();
      sp(gp);
    });
  
    pwa.addEventListener('click', () => {
      gm = 'ai';
      rg();
      sp(gp);
    });
  
    bk.addEventListener('click', () => {
      sp(wp);
    });
  
    rt.addEventListener('click', () => {
      rg();
    });
  
    cl.forEach(c => c.addEventListener('click', hc));
  
    sp(wp);
});
