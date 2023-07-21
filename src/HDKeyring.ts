import EventEmitter from 'events'
import { Account, KeyringProps, SignOptions } from './types'

export abstract class HDKeyring<T> extends EventEmitter {
  static hdPath: string

  type: string | undefined
  opts: KeyringProps | undefined
  mnemonic: string | undefined
  wallets: T[] = []

  constructor(opts?: KeyringProps) {
    super()
    this.deserialize(opts)
  }

  /**
   *
   * Add new accounts
   *
   * @param numberOfAccounts
   */
  abstract serialize(): KeyringProps

  /**
   *
   * Add new accounts
   *
   * @param opts
   */
  abstract deserialize(opts?: KeyringProps): any

  /**
   * This function generate {publicKey,privateKey} based accountIndex
   * It related to definition about Hierarchical Deterministic (HD) Wallet
   * Read here for more info https://www.gemini.com/cryptopedia/hd-crypto-wallets-hierachichal-deterministic
   * Or search google: What is HD wallet?
   * @param accountIndex
   * @returns
   */
  abstract addAccount(accountIndex: number): {
    address: string | undefined
    accountIndex: number
  }

  /**
   * This function will auto detect last account index then plus 1 for next account index
   * @returns {address : string; accountIndex:number}
   */
  abstract addNewAccount(): {
    address: string | undefined
    accountIndex: number
  }

  // /**
  //  * This function help us to remove account from keyring by account index
  //  * @param accountIndex
  //  * @returns Promise<string>
  //  */
  // abstract removeAccount(accountIndex: number): Promise<string>

  /**
   * This function help us to remove last account from keyring by account index
   * @returns Promise<string>
   */
  abstract removeLastAccount(): Promise<boolean>

  /**
   * This function will return list account from keyring
   * @returns Promise<Account[]>
   */
  abstract getAccounts(): Promise<Account[]>

  /**
   *
   * tx is an instance of the ethereumjs-transaction class.
   *
   * @param address
   * @param tx
   * @param opts
   */
  abstract signTransaction(address: string, tx: any, opts: any): Promise<any>

  /**
   *
   *  For eth_sign, we need to sign arbitrary data:
   *
   * @param address
   * @param data
   * @param opts
   */
  abstract signMessage(address: string, data: any, opts: any): Promise<any>

  /**
   *
   * For personal_sign, we need to prefix the message:
   *
   * @param address
   * @param msgHex
   * @param opts
   */
  abstract signPersonalMessage(
    address: string,
    msgHex: any,
    opts: any,
  ): Promise<string>

  /**
   *
   * personal_signTypedData, signs data along with the schema
   *
   * @param withAccount
   * @param typedData
   * @param opts
   */
  abstract signTypedData(
    withAccount: string,
    typedData: any,
    opts: any,
  ): Promise<string>

  /**
   *
   * For eth_decryptMessage:
   *
   * @param withAccount
   * @param encryptedData
   */
  abstract decryptMessage(
    withAccount: string,
    encryptedData: any,
  ): Promise<string>

  /**
   *
   * Get public key for nacl
   *
   * @param withAccount
   * @param opt
   */
  abstract getEncryptionPublicKey(
    withAccount: string,
    opt?: SignOptions,
  ): Promise<string>

  /**
   *
   * Returns an address specific to an app
   *
   * @param address
   * @param opts
   * @returns
   */
  abstract getAppKeyAddress(
    address: string,
    origin: string,
  ): Promise<string | undefined>

  /**
   *
   * Should return a hex-encoded private key
   *
   * @param address
   * @param opts
   * @returns hex-encoded private key
   */
  abstract exportAccount(address: string, opt?: SignOptions): Promise<string>
}
