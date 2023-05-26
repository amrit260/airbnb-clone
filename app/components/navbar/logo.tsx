'use client';
import { useRouter } from 'next/navigation'
import Image from 'next/image'
const Logo = () => {
    const router = useRouter()

    return (
        <Image
            onClick={() => router.push('/')}
            alt='logo'
            className='md:block cursor-pointer'
            width='100'
            height='100'
            src='/images/logo.png'
        />
    );
};

export default Logo;