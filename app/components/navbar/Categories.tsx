'use client'
import React from 'react';
import Container from '../container';
import { BiCloudSnow } from 'react-icons/bi';
import { IoDiamond } from 'react-icons/io5'
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForest, GiIsland, GiWindmill } from 'react-icons/gi'
import { FaSkiing } from 'react-icons/fa'
import { MdOutlineVilla } from 'react-icons/md'
import CategoryBox from '../CategoryBox';
import { usePathname, useSearchParams } from 'next/navigation';
export const categories = [
    {
        label: "Beach",
        icon: TbBeach,
        description: 'This property is close to beach'
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description: 'this property has windmills!'

    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'this property has modern things!'

    },
    {
        label: 'Mountain',
        icon: TbMountain,
        description: 'this property in country side'

    },
    {
        label: 'Pools',
        icon: TbPool,
        description: 'this property has a pool'

    }
    ,
    {
        label: 'Islands',
        icon: GiIsland,
        description: 'this property is on an island'

    }
    ,
    {
        label: 'Lake',
        icon: GiBoatFishing,
        description: 'this property is close to a lake'

    }
    ,
    {
        label: 'Skiing',
        icon: FaSkiing,
        description: 'this property has skiing activities'

    },
    {
        label: 'Castles',
        icon: GiCastle,
        description: 'this property has castle'
    },
    {
        label: 'Camping',
        icon: GiForest,
        description: 'enjoy camping on this property'
    },
    {
        label: 'Arctic',
        icon: BiCloudSnow,
        description: 'very cold here'
    },
    {
        label: 'Cave',
        icon: GiCaveEntrance,
        description: 'cave !!!!!!!'
    },
    {
        label: 'Desert',
        icon: GiCactus,
        description: 'this property is in the desert'
    },
    {
        label: 'Barns',
        icon: GiBarn,
        description: 'this property is in the barn'
    },
    {
        label: 'Lux',
        icon: IoDiamond,
        description: 'this property is luxrious'
    }
]
const Categories = () => {

    const params = useSearchParams()
    const pathname = usePathname()
    const category = params?.get('category')

    const isMainPage = pathname === '/'

    if (!isMainPage) {
        return null
    }


    return (
        <Container>
            <div className="pt4 flex flex-row items-center justify-between overflow-x-auto">
                {

                    categories.map(item => (
                        <CategoryBox
                            key={item.label}
                            label={item.label}
                            Icon={item.icon}
                            selected={category === item.label}
                        />
                    ))
                }
            </div>
        </Container>
    );
};

export default Categories;