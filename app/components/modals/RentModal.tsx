'use client'
import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "@/app/inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "@/app/inputs/CountrySelect";
import { valueContainerCSS } from "react-select/dist/declarations/src/components/containers";
import dynamic from "next/dynamic";
import Head from "next/head";
import Counter from "@/app/inputs/Counter";
import ImageUpload from "@/app/inputs/ImageUpload";
import Input from "@/app/inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5

}
const RentModal = () => {
    const rentModal = useRentModal()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const {

        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }, reset } = useForm<FieldValues>({
            defaultValues: {
                category: '',
                location: null,
                guestCount: 1,
                roomCount: 1,
                bathroomCount: 1,
                imageSrc: '',
                price: 1,
                title: '',
                description: '',
            }
        })

    const category = watch('category')
    const location = watch('location')
    const guestCount = watch('guestCount')
    const roomCount = watch('roomCount')
    const bathroomCount = watch('bathroomCount')
    const imageSrc = watch('imageSrc')

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location])

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const [step, setStep] = useState(STEPS.CATEGORY)

    const onBack = () => {
        setStep((value) => value - 1)
    }
    const onNext = () => {
        setStep((value) => value + 1)
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext()
        }
        setIsLoading(true);

        axios.post('/api/listings', data).then(() => {
            toast.success('listing created')
            router.refresh();
            reset()
            setStep(STEPS.CATEGORY)
            rentModal.onClose()
        }).catch(err => toast.error(err.response.data.message || 'failed to create listings')).finally(() => setIsLoading(false))

    }



    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Create'
        }
        return 'Next'
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined
        }
        return 'Back'
    }

        , [step])

    let bodyContent = (
        < div
            className="flex flex-col gap-8">
            <Heading
                title='Which of these best describes your home?'
                subtitle="Pick a category"
            />
            <div
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-3
                    max-h-[50vh]
                    overflow-y-auto
                    ">
                {
                    categories.map(item => (
                        <div key={item.label} className="col-span-1">
                            <CategoryInput
                                onClick={(category) => {
                                    setCustomValue('category', category,)
                                }}
                                selected={category === item.label}
                                label={item.label}
                                icon={item.icon}

                            />
                        </div>

                    ))
                }
            </div>

        </div>
    )

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where is your place located"
                    subtitle="Help guests find you!"
                />
                <CountrySelect
                    onChange={(value) => setCustomValue('location', value)}
                    value={location}
                />
                <Map center={location?.latlng} />
            </div>)
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Share some basics about your place"
                    subtitle="what amenities do you have?"
                />
                <Counter
                    title="Number of guests"
                    subtitle="How many guests do you want?"
                    value={guestCount}
                    onChange={(value) => setCustomValue('guestCount', value)}
                />
                <hr />
                <Counter
                    title="Number of rooms"
                    subtitle="How many room do you have?"
                    value={roomCount}
                    onChange={(value) => setCustomValue('roomCount', value)}
                />
                <hr />
                <Counter
                    title="Number of bathrooms"
                    subtitle="How many bathrooms do you have?"
                    value={bathroomCount}
                    onChange={(value) => setCustomValue('bathroomCount', value)}
                />
            </div>
        )
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Add a photo of your place"
                    subtitle="Show guests what your place looks like!" />
                <ImageUpload onChange={(val) => setCustomValue('imageSrc', val)} value={imageSrc} />
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title='How would you describe your place'
                    subtitle="Short and sweet works best!"
                />
                <Input id='title' label="Title" required type="text" register={register} disabled={isLoading} errors={errors} />
                <Input id='description' label="Description" required type="text" register={register} disabled={isLoading} errors={errors} />
            </div>
        )
    }
    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title='Now, set your price'
                    subtitle="How much do you charge per night?"
                />
                <Input id='price' label="Price" required type="number" formatPrice register={register} disabled={isLoading} errors={errors} />
            </div>
        )
    }

    return (
        <Modal
            isOpen={rentModal.isOpen}
            title='Airbnb your home!'
            onSubmit={handleSubmit(onSubmit)}
            onClose={rentModal.onClose}
            body={bodyContent}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        />
    );
};

export default RentModal;