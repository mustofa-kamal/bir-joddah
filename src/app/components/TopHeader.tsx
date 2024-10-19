
import React from 'react';


type TopHeaderProps = {
    text: string
}

const TopHeader: React.FC<TopHeaderProps> = ({ text }) => {
    return (
        <div className="bg-gray-900 flex items-center justify-center p-1">
            <p className="text-white font-bold">{text}</p>
        </div>
    );
};

export default TopHeader;
