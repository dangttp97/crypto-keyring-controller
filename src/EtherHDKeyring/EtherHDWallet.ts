import { HDWallet } from '../types'

export interface EtherHDWallet extends HDWallet {
  wallet: {
    getAddress: () => Buffer
    publicKey: Buffer
    privateKey: Buffer
  }
}
