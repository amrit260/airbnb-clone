'use client'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../../inputs/Input';
import Button from '../button';
import useLoginModal from '@/app/hooks/useLoginModal';
import RegisterModal from './RegisterModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
const LoginModal = () => {
    const router = useRouter()
    const loginModal = useLoginModal()
    let registerModal = useRegisterModal()
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })
    const toogle = useCallback(() => {
        loginModal.onClose()
        registerModal.onOpen()

    }, [loginModal, registerModal])

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        signIn('credentials', { ...data, redirect: false }).then(callback => {
            setIsLoading(false);
            if (callback?.ok) {
                toast.success('logged in');
                loginModal.onClose()
                router.refresh()
            }
            if (callback?.error) {
                toast.error(callback.error)
            }
        })
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading center title='Welcome back' subtitle='Please enter you email and password' />
            <Input type='email' id='email' label='Email' disabled={isLoading} register={register} errors={errors} required />
            <Input type='password' id='password' label='Password' disabled={isLoading} register={register} errors={errors} required />
        </div>
    )

    const footerContent = (
        <div className='
        flex flex-col gap-4 mt-3
        '>
            <hr />
            <Button
                outline
                label='Continue with google'
                Icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <Button
                outline
                label='Continue with github'
                Icon={AiFillGithub}
                onClick={() => signIn('github')}
            />
            <div className='
            text-neutral-500 text-center mt-4 font-light'>
                <div className='justify-center flex flex-row items-center gap-2'>
                    <div>
                        Do not have an account?
                    </div>
                    <div onClick={toogle} className='text-blue-500 cursor-pointer hover:underline'>
                        Register
                    </div>
                </div>

            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title={'Login'}
            actionLabel='Login'
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}

        />
    );
};

export default LoginModal;