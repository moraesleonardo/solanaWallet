async function getBalance() {
    const publicKey = document.getElementById('publicKey').value;
    const response = await fetch(`/balance/${publicKey}`);
    const data = await response.json();
    const balanceInSol = Math.round(data.balance / 1000000000); // Converte para SOL e arredonda para o número inteiro mais próximo
    document.getElementById('balance').textContent = `Balance: ${balanceInSol} SOL`;
}

async function requestAirdrop() {
    const publicKey = document.getElementById('publicKey').value;
    const response = await fetch(`/airdrop/${publicKey}`);
    const data = await response.json();
    document.getElementById('airdropStatus').textContent = data.message || data.error;
}
