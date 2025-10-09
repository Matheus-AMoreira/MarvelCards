"use client"

import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

interface NavBarProps {
    isLoggedIn: boolean;
}

export default function NavBar({ isLoggedIn }: NavBarProps){
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '');

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        const debounceTimer = setTimeout(() => {
            if (searchTerm) {
                params.set('query', searchTerm);
                params.set('offset', '0');
            } else {
                params.delete('query');
            }
            router.replace(`${pathname}?${params.toString()}`);
        }, 500);

        return () => clearTimeout(debounceTimer);
    }, [searchTerm, router, pathname, searchParams]);
    
    return (
        <header>
            <nav className="flex w-full justify-evenly items-center flex-wrap gap-4 p-4 
            bg-(--navbar-color-lightblack) shadow-lg 
            rounded-b-[60px] border-b-4 border-(--button-red) border-solid">
                <Link href='/'>
                    <svg width={122.222} hanging={44} viewBox="4 4 122.222 44" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#FEFEFE" d="M126.222 40.059v7.906H111.58V4h7.885v36.059zm-62.564-14.5c-.61.294-1.248.44-1.87.442v-14.14h.04c.622-.005 5.264.184 5.264 6.993 0 3.559-1.58 5.804-3.434 6.705M40.55 34.24l2.183-18.799 2.265 18.799zm69.655-22.215V4.007H87.879l-3.675 26.779-3.63-26.78h-8.052l.901 7.15c-.928-1.832-4.224-7.15-11.48-7.15-.047-.002-8.06 0-8.06 0l-.031 39.032-5.868-39.031-10.545-.005-6.072 40.44.002-40.435H21.278L17.64 26.724 14.096 4.006H4v43.966h7.95V26.78l3.618 21.192h4.226l3.565-21.192v21.192h15.327l.928-6.762h6.17l.927 6.762 15.047.008h.01v-.008h.02v-14.27l1.845-.27 3.817 14.55h7.784l-.002-.01h.022l-5.011-17.048c2.538-1.88 5.406-6.644 4.643-11.203v-.002C74.894 19.777 79.615 48 79.615 48l9.256-.027 6.327-39.85v39.85h15.007v-7.908h-7.124v-10.08h7.124v-8.03h-7.124v-9.931h7.124z"/>
                    </svg>
                </Link>
                <input 
                    className="bg-transparent border-4 border-white rounded-lg text-xl p-2 text-center w-[340px] text-white focus:text-stone-900 focus:bg-white"
                    placeholder="Buscar personagens..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className='flex'>
                    {isLoggedIn ? (
                        <>
                            <Link href='/favorites' className='marvel-button'>
                                Meus Favoritos
                            </Link>
                            <button className='marvel-button'>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href='/login' className='marvel-button'>
                                Login
                            </Link>
                            <Link href='/register' className='marvel-button'>
                                Cadastrar
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    )
}