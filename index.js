const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require('@solana/web3.js')

const wallet = new Keypair()
const publicKey = new PublicKey(wallet._keypair.publicKey)
const secretKey = wallet._keypair.secretKey



const getWalletBalance = async() => {
    try {
        const connection = new Connection('http://127.0.0.1:8899', 'confirmed')
        //const connection = new Connection(clusterApiUrl('testnet', 'confirmed'))
        //const connection = new Connection(clusterApiUrl('devnet', 'confirmed'))
        const walletBalance = await connection.getBalance(publicKey)
        console.log(`Wallet balance is ${walletBalance}`)
        
    } catch(error){
        console.log(error)
    }
}

const airDropSol = async() => {
    try {
        const connection = new Connection('http://127.0.0.1:8899', 'confirmed')
        //const connection = new Connection(clusterApiUrl('testnet', 'confirmed'))
        //const connection = new Connection(clusterApiUrl('devnet', 'confirmed'))
        const walletBalance = await connection.getBalance(publicKey)
        const fromAirDropSignature = await connection.requestAirdrop(publicKey, 2* LAMPORTS_PER_SOL)
        await connection.confirmTransaction(fromAirDropSignature)
        
    } catch (error) {
        console.log(error)
    }
}

const main = async() => {
    
    //console.log('Starting balance check for new wallet...');
    //await getWalletBalance();
    //console.log('Starting airdrop for new wallet...');
    //await airDropSol();
    console.log('Checking balance after airdrop for new wallet...');
    await getWalletBalance();
    
}

main()