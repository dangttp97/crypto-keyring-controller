import { HDWallet } from '../types'

export interface BitcoinHDWallet extends HDWallet {
  wallet: {
    publicKey: any
    privateKey: Buffer
  }
}
