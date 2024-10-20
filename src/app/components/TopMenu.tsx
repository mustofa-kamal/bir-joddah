// TopMenu.tsx
import React from 'react';

import Image from 'next/image';


interface TopMenuProps {
    view: 'list' | 'analytics';
    setView: React.Dispatch<React.SetStateAction<'list' | 'analytics'>>;
}

const TopMenu: React.FC<TopMenuProps> = ({ view, setView }) => {
    return (
        <div
            style={{ height: '100px', width: '100%', backgroundColor: 'white', paddingLeft: '300px'}}
            className="flex items-center justify-start p-4"
        >
            {/* Image acting as a button */}
            <button
                onClick={() => setView('list')}
                className="focus:outline-none flex flex-col items-center group" style={{paddingTop:"16px"}}
            >
                <Image
                    src="/images/IOU.jpeg"
                    alt="IOU"
                    title="IOU"
                    width={50}
                    height={50}
                    className="object-contain rounded-3xl"
                />
                <span className="text-blue-500 font-bold group-hover:text-blue-700">IOU</span>
            </button>

            {/* Analytics Button */}
            <button
                onClick={() => setView('analytics')}
                style={{ marginLeft: '100px' }}
                className={`p-2 ${view === 'analytics' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                    } rounded-md hover:bg-blue-600`}
            >
                Analytics
            </button>
        </div>
    );
};

export default TopMenu;
