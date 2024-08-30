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
    function showPage(pageToShow) {
     const pages = document.querySelectorAll('.box');
        pages.forEach(page => {
            if (page === pageToShow) {
                page.classList.remove('hd');
            } else {
                page.classList.add('hd');
            }
        });
    }
function resetGame() {
        cl.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('oc');
        });
        cp = 'X';
        ti.textContent = 'Current Player: X';
        msg.textContent = '';
        ti.style.display = 'block';
    }
    function checkWin() {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (cl[a].textContent && cl[a].textContent === cl[b].textContent && cl[a].textContent === cl[c].textContent) {
                msg.textContent = `${cl[a].textContent} wins!`;
                ti.style.display = 'none';
                return true;
            }
        }
  if ([...cl].every(cell => cell.textContent)) {
            msg.textContent = 'The game ends in a draw!';
            ti.style.display = 'none';
            return true;
        }

        return false;
    }
   function handleCellClick(event) {
        const cell = event.target;

        if (cell.classList.contains('oc') || msg.textContent) return;

        cell.textContent = cp;
        cell.classList.add('oc');

        if (checkWin()) return;

        cp = cp === 'X' ? 'O' : 'X';
        ti.textContent = `Current Player: ${cp}`;

        if (gm === 'ai' && cp === 'O') {
            setTimeout(aiMove, 500);
        }
    }
  function aiMove() {
        const emptyCells = [...cl].filter(cell => !cell.classList.contains('oc'));
        if (emptyCells.length === 0) return;

        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        randomCell.textContent = 'O';
        randomCell.classList.add('oc');

        if (!checkWin()) {
            cp = 'X';
            ti.textContent = 'Current Player: X';
        }
    }
    sg.addEventListener('click', () => {
        showPage(mp);
    });
    pwf.addEventListener('click', () => {
        gm = 'friend';
        resetGame();
        showPage(gp);
    });
    pwa.addEventListener('click', () => {
        gm = 'ai';
        resetGame();
        showPage(gp);
    });
    bk.addEventListener('click', () => {
        showPage(wp);
    });
 rt.addEventListener('click', () => {
        resetGame();
    });
    cl.forEach(cell => cell.addEventListener('click', handleCellClick));
    showPage(wp);
});
