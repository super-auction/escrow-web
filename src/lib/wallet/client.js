import { createClient } from 'wagmi'
import { configChains } from './connectors'

const { provider } = configChains()

export const client = createClient({
    autoConnect: true,
    provider
})
