import React, { useState } from 'react';
import classNames from '@/utils/classNames';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface ISortProps {
	setSortBy: React.Dispatch<React.SetStateAction<string>>;
}

const Sort = ({ setSortBy }: ISortProps) => {
	const [sortOptions, setSortOptions] = useState([
		{ id: 1, name: 'Price: Low to High', current: true },
		{ id: 2, name: 'Price: High to Low', current: false },
	]);

	const handleSort = (option: {
		id: number;
		name: string;
		current: boolean;
	}) => {
		const updatedOptions = sortOptions.map(sortOption => {
			if (sortOption.id === option.id) {
				return { ...sortOption, current: true };
			} else {
				return { ...sortOption, current: false };
			}
		});
		setSortOptions(updatedOptions);
		setSortBy(option.name);
	};

	return (
		<div className='flex items-center justify-end pt-4 px-4'>
			<Menu as='div' className='relative inline-block text-left'>
				<div>
					<Menu.Button className='group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900'>
						Sort
						<ChevronDownIcon
							className='-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
							aria-hidden='true'
						/>
					</Menu.Button>
				</div>

				<Transition
					as={Fragment}
					enter='transition ease-out duration-100'
					enterFrom='transform opacity-0 scale-95'
					enterTo='transform opacity-100 scale-100'
					leave='transition ease-in duration-75'
					leaveFrom='transform opacity-100 scale-100'
					leaveTo='transform opacity-0 scale-95'
				>
					<Menu.Items className='absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none'>
						<div className='py-1'>
							{sortOptions.map(option => (
								<Menu.Item key={option.name}>
									{({ active }) => (
										<button
											onClick={() => handleSort(option)}
											className={classNames(
												option.current
													? 'font-medium text-gray-900'
													: 'text-gray-500',
												active ? 'bg-gray-100' : '',
												'block px-4 py-2 text-sm',
											)}
										>
											{option.name}
										</button>
									)}
								</Menu.Item>
							))}
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	);
};

export default Sort;
