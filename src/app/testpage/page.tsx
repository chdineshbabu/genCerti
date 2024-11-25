"use client"
import React, { useState } from 'react'
import { deploy } from '../api/contract/deploy'

function Page() {
  const [contractAddress, setContractAddress] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleButton() {
    setLoading(true)
    try {
      const contract = await deploy()
      console.log(contract.contractAddress)
      setContractAddress(contract?.contractAddress)
    } catch (error) {
      console.error("Deployment failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button onClick={handleButton} disabled={loading}>
        {loading ? 'Deploying...' : 'Click to Deploy the Contract'}
      </button>

      {contractAddress && (
        <div>
          <p>Contract deployed at: {contractAddress}</p>
        </div>
      )}
    </div>
  )
}

export default Page
