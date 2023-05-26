'use client'
import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../../inputs/Input';
import Button from '../button';
import { signIn } from 'next-auth/react';
import useLoginModal from '@/app/hooks/useLoginModal';
const RegisterModal = () => {
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })
    const toogle = useCallback(() => {
        loginModal.onOpen()
        registerModal.onClose()

    }, [loginModal, registerModal])
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        axios.post('/api/register', data).then(() => {
            toast.success('registered successfully')
            registerModal.onClose();
        }).catch(error => {
            toast.error('something went wrong')
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Create a new account' subtitle='welcome to hell' />
            <Input type='text' id='name' label='Name' disabled={isLoading} register={register} errors={errors} />
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
                        Already have an account?
                    </div>
                    <div onClick={toogle} className='text-blue-500 cursor-pointer hover:underline'>
                        Log in
                    </div>
                </div>

            </div>
        </div>
    )

    return (
        <Modal
            disabled={false}
            isOpen={registerModal.isOpen}
            title={'Register'}
            actionLabel='Continue'
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}

        />
    );
};

export default RegisterModal;