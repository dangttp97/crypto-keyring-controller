import { SignTypedDataVersion } from '@metamask/eth-sig-util'

export type KeyringProps = {
  mnemonic?: string
  activeAccountIndexes?: number[]
  xpriv?: string
  hdPath?: string
  passphrase?: string
}

export type Account = {
  accountIndex: number
  address: string
}

export interface HDWallet {
  accountIndex: number
  wallet: {
    publicKey: any
    privateKey: Buffer
  }
}

export type SignOptions = {
  withAppKeyOrigin?: string
  version?: SignTypedDataVersion
}
