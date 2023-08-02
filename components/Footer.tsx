import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <div className='paddingPage w-full h-[200px]'>
            <div>
                <Image
                    src='/logo.svg'
                    width={115}
                    height={38}
                    alt='logo'
                />
            </div>
            <div className='mt-5 flex justify-around flex-wrap'>
                <div className='m-2 text-center'>
                    <p>Address: street 131, kv 5</p>
                    <p>Opening hours 10am - 6pm</p>
                </div>
                <div className='m-2 text-center'>
                    <p><Link href={'mailto:info@mail.com'}>info@mail.com</Link></p>
                    <p><Link href='tel: +38 095 67 67 444'>+38 095 67 67 444</Link></p>
                </div>
                <div className='m-2'>
                    <p className='text-center'>Follow</p>
                    <div className='w-[200px] flex justify-around'>
                        <p><Link href={'https://instagram.com'}>Instagram</Link></p>
                        <p><Link href={'https://facebook.com'}>Facebook</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
