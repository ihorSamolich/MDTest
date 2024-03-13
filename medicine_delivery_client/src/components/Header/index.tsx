'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import classNames from '@/utils/classNames';

const navigation = [
	{ name: 'Shop', href: '/' },
	{ name: 'Shopping Cart', href: '/shopping-cart' },
	{ name: 'History', href: '/history' },
];

const Header = () => {
	const pathName = usePathname();

	return (
		<div className='sm:inline-flex'>
			{navigation.map((item, index) => (
				<div className='flex' key={index}>
					<Link
						href={item.href}
						className={classNames(
							item.href === pathName
								? 'font-bold bg-blue-400 text-black'
								: 'text-black hover:bg-blue-300',
							'block rounded-md px-3 py-2 text-base font-medium',
						)}
						aria-current={item.href === pathName ? 'page' : undefined}
					>
						{item.name}
					</Link>
					<div className='hidden sm:flex items-center mx-4'>
						{index + 1 !== navigation.length ? ' | ' : ''}
					</div>
				</div>
			))}
		</div>
	);
};

export default Header;
