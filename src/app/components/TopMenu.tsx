// TopMenu.tsx
import React from 'react';

interface TopMenuProps {
  view: 'list' | 'analytics';
  setView: React.Dispatch<React.SetStateAction<'list' | 'analytics'>>;
}

const TopMenu: React.FC<TopMenuProps> = ({ view, setView }) => {
  return (
    <div
      style={{ height: '100px', width: '100%', backgroundColor: 'white', paddingLeft: '170px' }}
      className="flex items-center justify-start p-4"
    >
      {/* Buttons */}
      <button
        onClick={() => setView('list')}
        className={`p-2 ${
          view === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
        } rounded-md hover:bg-blue-600`}
      >
        List All
      </button>
      <button
        onClick={() => setView('analytics')}
        className={`p-2 ml-2 ${
          view === 'analytics' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
        } rounded-md hover:bg-blue-600`}
      >
        Analytics
      </button>
    </div>
  );
};

export default TopMenu;
