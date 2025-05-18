
import React from 'react';
import { FileImageIcon } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-4 mb-6 bg-medical-light-blue border-b border-medical-blue/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileImageIcon className="h-8 w-8 text-medical-blue" />
            <div>
              <h1 className="text-2xl font-bold text-medical-dark-blue">Clinical Imaging</h1>
              <p className="text-sm text-medical-blue">Breast Scan Analysis</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
