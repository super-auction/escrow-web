import { chain, configureChains } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

export const configChains = () => {
    const { provider, chains } = configureChains(
        [chain.polygon, chain.polygonMumbai, chain.mainnet],
        [
            jsonRpcProvider({
                rpc: chain => {
                    if (chain.id === 137) return { http: 'https://polygon-rpc.com' }
                    return { http: chain.rpcUrls.default }
                }
            }),
            jsonRpcProvider({
                rpc: chain => {
                    if (chain.id === 80001) return { http: 'https://matic-mumbai.chainstacklabs.com' }
                    return { http: chain.rpcUrls.default }
                }
            }),
        ]
    )
    return { provider, chains }
}

// Set up connectors
const { chains } = configChains()
export const connectorsList = {
	metamask: new MetaMaskConnector({
		chains
	})
}
