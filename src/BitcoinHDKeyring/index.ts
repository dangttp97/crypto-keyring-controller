import * as bitcoin from 'bitcoinjs-lib'
import { ECPairInterface } from 'ecpair'
import bitcore from 'bitcore-lib'
import { HDKeyring } from '../HDKeyring'
import { BitcoinHDWallet } from './BitcoinHDWallet'
import { KeyringProps, Account, SignOptions } from '../types'
import { KeyringPath } from '../constants'
import { normalize as normalizeHexAddress } from '@metamask/eth-sig-util'

const type = 'Bitcoin HD Key Tree'

export class BitcoinHDKeyring extends HDKeyring<BitcoinHDWallet> {
  hdPath: string = KeyringPath.btc
  type = type
  mnemonic: string | undefined = undefined
  xpriv: string | undefined = undefined
  passphrase: string | undefined = undefined
  network: bitcoin.Network = bitcoin.networks.bitcoin
  root: bitcore.HDPrivateKey = null
  hdWallet?: any
  wallets: ECPairInterface[] = []
  activeIndexes: number[] = []
  page = 0
  perPage = 5

  constructor(opts?: KeyringProps) {
    super(opts)
    this.deserialize(opts)
  }

  serialize(): KeyringProps {
    return {
      mnemonic: this.mnemonic,
      xpriv: this.xpriv,
      activeAccountIndexes: this.activeIndexes,
      hdPath: KeyringPath.btc,
      passphrase: this.passphrase,
    }
  }
  async deserialize(opts?: KeyringProps | undefined) {
    if (this.root) {
      throw new Error('Btc-Hd-Keyring: Secret recovery phrase already provided')
    }
    this.wallets = []
    this.mnemonic = undefined
    this.xpriv = undefined
    this.root = null

    this.hdPath = opts?.hdPath || KeyringPath.btc

    if (opts?.passphrase) {
      this.passphrase = opts.passphrase
    }

    if (opts?.mnemonic) {
      this.initFromMnemonic(opts.mnemonic)
    } else if (opts?.xpriv) {
      this.initFromXpriv(opts.xpriv)
    }

    if (opts?.activeAccountIndexes) {
      this.activeAccounts(opts.activeAccountIndexes)
    }
  }
  async addAccount(accountIndex: number): Promise<{
    address: string | undefined
    accountIndex: number
  }> {
    throw new Error('Method not implemented.')
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
    const normAddress = normalizeHexAddress(address)
    if (!this.#addressToWallet[normAddress]) {
      throw new Error('Address not found!')
    }
    return this.#addressToWallet[normAddress].signTransaction(transaction)
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
