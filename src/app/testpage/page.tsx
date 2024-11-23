'use client'

import { useState } from 'react'
import { createOrganization, getOrganizations } from '../../utils/orginizationFactory'

function page() {
    async function handleClick() {
        // const deploy = await createOrganization("chdinesh4128@gmail.com")
        const cont =await getOrganizations()
        console.log(cont)
    }
    return (
        <div>
            <button onClick={handleClick} className='bg-white text-black p-4'>Deploy</button>
        </div>
    )
}

export default page