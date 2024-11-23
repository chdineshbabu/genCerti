'use client'

import { useEffect, useState } from 'react'

export default function SetupPage() {
    const [isDeploying, setIsDeploying] = useState(false)
    const [deploymentStatus, setDeploymentStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [contractAddress, setContractAddress] = useState('')
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    useEffect(()=>{
            
    })

    const handleDeploy = async () => {
        setIsDeploying(true)
        setDeploymentStatus('idle')
        

        try {
            await new Promise(resolve => setTimeout(resolve, 2000))
            const fakeContractAddress = '0x' + Math.random().toString(16).substr(2, 40)
            setContractAddress(fakeContractAddress)
            setDeploymentStatus('success')
            setIsDialogOpen(true)
        } catch (error) {
            console.error('Deployment failed:', error)
            setDeploymentStatus('error')
        } finally {
            setIsDeploying(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b  flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="border shadow-md rounded-lg p-6">
                    <div className="text-center">
                        <h2 className="text-lg font-medium text-gray-100">Deploy Certification Contract</h2>
                        <p className="mt-1 text-sm text-gray-400">Click the button below to deploy your organization&apos;s certification contract</p>
                    </div>
                    <div className="mt-6">
                        <button
                            onClick={handleDeploy}
                            disabled={isDeploying}
                            className={`w-full px-4 py-2 font-semibold text-white rounded-md ${isDeploying ? 'bg-gray-400' : 'border  hover:bg-customGreen hover:text-black'} transition duration-150`}
                        >
                            {isDeploying ? 'Deploying...' : 'Deploy Contract'}
                        </button>
                    </div>
                    {deploymentStatus === 'error' && (
                        <div className="mt-4 flex items-center  border-l-4 border-red-400 p-4 rounded-md">
                            <svg className="h-5 w-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <h3 className="text-sm font-semibold text-red-800">Error</h3>
                                <p className="text-sm text-red-700">There was an error deploying your contract. Please try again.</p>
                            </div>
                        </div>
                    )}
                </div>

                {isDialogOpen && (
                    <div className="fixed inset-0 flex items-center bg-black justify-center bg-opacity-75">
                        <div className="bg-black border rounded-lg shadow-lg p-6 w-full max-w-md">
                            <h2 className="text-lg font-medium text-gray-100">Contract Deployed Successfully</h2>
                            <p className="mt-2 text-sm text-gray-400">Your certification contract has been deployed to the blockchain.</p>
                            <div className="mt-4">
                                <p className="text-sm font-medium text-gray-500">Contract Address:</p>
                                <p className="mt-1 text-sm text-gray-100 break-all">{contractAddress}</p>
                            </div>
                            <button
                                onClick={() => setIsDialogOpen(false)}
                                className="mt-4 w-full px-4 py-2 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition duration-150"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
