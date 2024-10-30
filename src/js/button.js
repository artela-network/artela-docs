// src/js/button.js
import React from 'react';

const AddArtelaNetwork = () => {
    const handleAddNetwork = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: '0x2e2c',
                            chainName: 'Artela',
                            rpcUrls: ['https://betanet-rpc1.artela.network/'],
                            nativeCurrency: {
                                name: 'Artela',
                                symbol: 'ART',
                                decimals: 18,
                            },
                            blockExplorerUrls: ['https://art-scan.artela.network/'],
                        },
                    ],
                });
                alert('Artela network has been added!');
            } catch (error) {
                console.error(error);
                alert('An error occurred while adding the network: ' + error.message);
            }
        } else {
            alert('Please MetaMask！');
        }
    };

    const buttonStyle = {
        padding: '12px 24px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };

    return (
        <button
            style={buttonStyle}
            onClick={handleAddNetwork}
        >
            Add Artela Network
        </button>
    );
};

export default AddArtelaNetwork;
