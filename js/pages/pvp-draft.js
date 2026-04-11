document.getElementById('modal-next-game-btn').addEventListener('click', async () => {
  const result = await pvpDraftManager.nextGame();
  if (result.success) gameCompleteModal.classList.add('hidden');
});

document.getElementById('modal-end-match-btn').addEventListener('click', async () => {
  const winner = prompt('ใครชนะเกมนี้? (blue/red/draw)');
  if (winner && ['blue', 'red', 'draw'].includes(winner)) {
    await pvpDraftManager.endMatch(winner);
    gameCompleteModal.classList.add('hidden');
  }
});

document.getElementById('rematch-btn').addEventListener('click', async () => {
  const result = await pvpManager.requestRematch();
  if (result.success) {
    window.location.href = `lobby.html?room=${result.newRoomId}`;
  } else {
    showToast(result.error, 'error');
  }
});

document.getElementById('back-to-lobby-btn').addEventListener('click', () => {
  window.location.href = 'lobby.html';
});

init();

window.addEventListener('beforeunload', () => {
  pvpManager.stopListening();
  pvpDraftManager?.cleanup();
});
