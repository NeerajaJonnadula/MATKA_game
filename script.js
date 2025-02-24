const symbols = ['🎁','💰','💷','💶','💵','💴','💸','🪙'];
let balance = 0;

function setBalance() {
  const initialBalance = parseInt(document.getElementById('initialBalance').value);
    if (initialBalance > 0) {
      balance = initialBalance;
      document.getElementById('balance').textContent = balance;
      document.querySelector('.balance').style.display = 'block';
      document.querySelector('.bet').style.display = 'block';
      document.querySelector('.reels').style.display = 'flex';
      document.getElementById('spinButton').style.display = 'inline-block';
      document.querySelector('.initial-balance').style.display = 'none';
    } else {
        alert('Please enter a valid positive balance.');
      }
}

function spinReels() {
  const bet = parseInt(document.getElementById('betAmount').value);

  if (bet > balance || bet <= 0) {
    document.getElementById('result').textContent = `Invalid bet. You can bet between $1 and $${balance}.`;
    return;
  }

  const reel1 = symbols[Math.floor(Math.random() * symbols.length)];
  const reel2 = symbols[Math.floor(Math.random() * symbols.length)];
  const reel3 = symbols[Math.floor(Math.random() * symbols.length)];

  document.getElementById('reel1').textContent = reel1;
  document.getElementById('reel2').textContent = reel2;
  document.getElementById('reel3').textContent = reel3;

  let payout = calculatePayout([reel1, reel2, reel3], bet);

  if (payout > 0) {
    document.getElementById('result').textContent = `You won $${payout}!`;
    balance += payout;
  } else {
    document.getElementById('result').textContent = 'You lost!';
    balance -= bet;
  }
  document.getElementById('balance').textContent = balance;

  if (balance <= 0) {
    document.getElementById('result').textContent = 'You are out of money! Game over.';
    setTimeout(() => {
      location.reload();
    }, 5000);
  }
}

function calculatePayout(reels, bet) {
  if (reels[0] === reels[1] && reels[1] === reels[2]) {
    return bet * 10;
  }
  if (reels[0] === reels[1] || reels[0] === reels[2] || reels[1] === reels[2]) {
    return bet * 2;
  }
  return 0;
}