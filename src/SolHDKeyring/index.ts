import { Keypair } from '@solana/web3.js'
import { HDKeyring } from '../HDKeyring'
import { KeyringProps, Account, SignOptions } from '../types'
import { SolHDWallet } from './SolHDWallet'
import bip39 from 'bip39'
import { derivePath } from 'ed25519-hd-key'
import { KeyringPath } from '../constants'

const type = 'Solana HD Key Tree'

export class SolHDKeyring extends HDKeyring<SolHDWallet> {
  serialize(): KeyringProps {
    return {
      mnemonic: this.mnemonic,
      activeAccountIndexes: this.wallets.map(x => x.accountIndex),
    }
  }
  deserialize(opts?: KeyringProps | undefined) {
    this.type = type
    this.opts = opts || {}
    this.mnemonic = undefined
    this.wallets = []

    if (opts && opts.mnemonic) {
      this.mnemonic = opts.mnemonic
    }

    opts &&
      opts.activeAccountIndexes &&
      opts.activeAccountIndexes.forEach(accountIndex => {
        this.addAccount(accountIndex)
      })
  }
  addAccount(accountIndex: number): {
    address: string | undefined
    accountIndex: number
  } {
    if (!this.mnemonic) throw new Error('Mnemonic not found')

    const seed: Buffer = bip39.mnemonicToSeed(this.mnemonic)
    const derivedSeed = derivePath(
      KeyringPath.sol.replace('index', accountIndex.toString()),
      seed.toString('hex'),
    ).key

    const keypair = Keypair.fromSeed(derivedSeed)
    this.wallets.push({
      accountIndex,
      wallet: {
        privateKey: Buffer.from(keypair.secretKey),
        publicKey: keypair.publicKey,
      },
    })
    return {
      address: keypair.publicKey.toBase58(),
      accountIndex: accountIndex,
    }
  }
  addNewAccount(): { address: string | undefined; accountIndex: number } {
    throw new Error('Method not implemented.')
  }
  removeLastAccount(): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  getAccounts(): Promise<Account[]> {
    throw new Error('Method not implemented.')
  }
  signTransaction(address: string, tx: any, opts: any): Promise<any> {
    throw new Error('Method not implemented.')
  }
  signMessage(address: string, data: any, opts: any): Promise<any> {
    throw new Error('Method not implemented.')
  }
  signPersonalMessage(
    address: string,
    msgHex: any,
    opts: any,
  ): Promise<string> {
    throw new Error('Method not implemented.')
  }
  signTypedData(
    withAccount: string,
    typedData: any,
    opts: any,
  ): Promise<string> {
    throw new Error('Method not implemented.')
  }
  decryptMessage(withAccount: string, encryptedData: any): Promise<string> {
    throw new Error('Method not implemented.')
  }
  getEncryptionPublicKey(
    withAccount: string,
    opt?: SignOptions | undefined,
  ): Promise<string> {
    throw new Error('Method not implemented.')
  }
  getAppKeyAddress(
    address: string,
    origin: string,
  ): Promise<string | undefined> {
    throw new Error('Method not implemented.')
  }
  exportAccount(
    address: string,
    opt?: SignOptions | undefined,
  ): Promise<string> {
    throw new Error('Method not implemented.')
  }
}
