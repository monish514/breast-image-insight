
import React from 'react';
import { FileImageIcon } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-4 mb-6 bg-neutral-100 border-b border-neutral-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileImageIcon className="h-8 w-8 text-neutral-600" />
            <div>
              <h1 className="text-2xl font-bold text-neutral-800">Clinical Imaging</h1>
              <p className="text-sm text-neutral-600">Breast Scan Analysis</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
