import { useConnect,useAccount,useDisconnect,useEnsName,useEnsAvatar} from 'wagmi';
import SendTransaction from './SendTransaction';

export default function Profile() {
    const {address,connector,isConnected} = useAccount();
    const {data: ensAvatar} = useEnsAvatar({addressOrName: address});
    const {data: ensName} = useEnsName({address});
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect();

    const {disconnect} = useDisconnect();

    if(isConnected){
        return(
            <div>
                <img src={ensAvatar} alt="Ens Avatar" />
                <div>{ensName? `${ensName} (${address})`: address}</div>
                <div>Connected to {connector.name}</div>
                <button onClick={disconnect}>Disconnect</button>

                <SendTransaction/>
            </div>
        )
    }

    return (
        <div>
            {
                connectors.map((connector) => (
                    <button
                        disabled={!connector.ready}
                        key={connector.id}
                        onClick={() => connect({ connector })}
                    >
                        {connector.name}
                        {!connector.ready && '(unsupported)'}
                        {isLoading && connector.id === pendingConnector?.id && '(connecting)'}
                       
                    </button>
                ))
            }
            {error && <div>
                {error.message}
                </div>}
        </div>
    )
}