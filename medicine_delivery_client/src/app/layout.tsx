import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import React from 'react';
import Header from '@/components/Header';

import { Provider } from 'react-redux';
import StoreProvider from '@/app/StoreProvider';

const space_grotesk = Space_Grotesk({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-space-grotesk',
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className={`${space_grotesk.variable} scroll-smooth`}>
			<body className={'bg-blue-500 mx-4 md:mx-10 lg:mx-32 my-10'}>
				<Header />
				<StoreProvider>
					<main className='pt-10'>{children}</main>
				</StoreProvider>
			</body>
		</html>
	);
}
