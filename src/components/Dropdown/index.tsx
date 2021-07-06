import React from 'react';
import { AiFillCaretDown } from 'react-icons/ai';

/** TODO:
 * 1. Add Interface Props
 * 2. Remove Undwanted CODE
 *
 */
export const DropDown: React.FC<any> = ({
  children,
  dropDownTitle,
  showDropDown,
  handleShowDropDown,
}) => {
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className=" border border-gray-300 bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center w-full rounded-md  px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
          id="options-menu"
          onClick={handleShowDropDown}>
          {dropDownTitle}
          <AiFillCaretDown />
        </button>
      </div>
      <div
        className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 ${
          showDropDown ? '' : 'hidden'
        }`}>
        {children}
      </div>
    </div>
  );
};
