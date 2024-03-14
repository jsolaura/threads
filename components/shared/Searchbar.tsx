'use client';
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';

const Searchbar = ({ routeType } : { routeType: string}) => {
    const router = useRouter();
    const [search, setSearch] = useState<string>('');
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if(search) {
                router.push(`/${routeType}?q=${search}`);
            } else {
                router.push(`/${routeType}`);
            }
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [routeType, search]);
    
    return (
        <div className='searchbar'>
            <Image
                src='/assets/search-gray.svg'
                alt='search'
                width={24}
                height={24}
                className='object-contain'
            />
            <Input
                id='text'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={routeType !== "search" ? "Search communities" : "Search creators"}
                className='no-focus searchbar_input'
            />
        </div>
    )
}

export default Searchbar