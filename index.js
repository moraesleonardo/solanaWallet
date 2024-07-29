const express = require('express');
const { Connection, PublicKey, Keypair, LAMPORTS_PER_SOL } = require('@solana/web3.js');

const app = express();
const PORT = 3000;
const LOCALNET_URL = 'http://127.0.0.1:8899';
const connection = new Connection(LOCALNET_URL, 'confirmed');

// Gerar um novo par de chaves
const wallet = new Keypair();
const publicKey = wallet.publicKey;
const secretKey = wallet.secretKey;

// Servir arquivos estáticos do diretório 'public'
app.use(express.static('public'));

// Função para obter saldo da carteira
const getWalletBalance = async (publicKey) => {
    try {
        const walletBalance = await connection.getBalance(publicKey);
        console.log(`Wallet balance is ${walletBalance}`);
        return walletBalance;
    } catch (error) {
        console.error('Error getting wallet balance:', error);
        throw error;
    }
};

// Função para solicitar airdrop
const airDropSol = async (publicKey) => {
    try {
        console.log('Requesting airdrop for public key:', publicKey.toBase58());
        const fromAirDropSignature = await connection.requestAirdrop(publicKey, 2 * LAMPORTS_PER_SOL);
        console.log('Airdrop requested, signature:', fromAirDropSignature);
        await connection.confirmTransaction(fromAirDropSignature);
        console.log('Airdrop confirmed');
    } catch (error) {
        console.error('Error during airdrop:', error);
        throw error;
    }
};

// Rota para obter o saldo de uma conta
app.get('/balance/:publicKey', async (req, res) => {
    try {
        const publicKey = new PublicKey(req.params.publicKey);
        const balance = await getWalletBalance(publicKey);
        res.json({ balance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para solicitar airdrop
app.get('/airdrop/:publicKey', async (req, res) => {
    try {
        const publicKey = new PublicKey(req.params.publicKey);
        await airDropSol(publicKey);
        res.json({ message: 'Airdrop successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Função principal para testar localmente (opcional)
const main = async () => {
    console.log('Checking balance for new wallet...');
    await getWalletBalance(publicKey);
};

main();
