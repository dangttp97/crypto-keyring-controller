import { Hex, Json, Keyring, KeyringClass } from '@metamask/utils'
import { normalize as normalizeToHex } from '@metamask/eth-sig-util'

/**
 * Get builder function for `Keyring`
 *
 * Returns a builder function for `Keyring` with a `type` property.
 *
 * @param KeyringConstructor - The Keyring class for the builder.
 * @returns A builder function for the given Keyring.
 */
export const keyringBuilderFactory = (
  KeyringConstructor: KeyringClass<Json>,
) => {
  const builder = () => new KeyringConstructor()

  builder.type = KeyringConstructor.type

  return builder
}

/**
 * Display For Keyring
 *
 * Is used for adding the current keyrings to the state object.
 *
 * @param keyring - The keyring to display.
 * @returns A keyring display object, with type and accounts properties.
 */
export const displayForKeyring = async (
  keyring: Keyring<Json>,
): Promise<{ type: string; accounts: string[] }> => {
  const accounts = await keyring.getAccounts()

  return {
    type: keyring.type,
    // Cast to `Hex[]` here is safe here because `addresses` has no nullish
    // values, and `normalizeToHex` returns `Hex` unless given a nullish value
    accounts: accounts.map(normalizeToHex) as Hex[],
  }
}
