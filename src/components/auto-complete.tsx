/* eslint-disable no-nested-ternary */
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';

import debounce from 'lodash.debounce';

import { ICity } from '@/interfaces/app.interface';

interface IAutoComplete {
  options: ICity[];
  loading: boolean;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  setWoeId: Dispatch<SetStateAction<number>>;
  requests: (str: string) => Promise<void>;
}

const Autocomplete = ({
  options = [],
  requests,
  loading,
  value,
  setWoeId,
  onChange,
}: IAutoComplete) => {
  const [showOptions, setShowOptions] = useState(false);
  const [cursor, setCursor] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);

  const select = useCallback(
    (option: string = '') => {
      if (option) {
        onChange(option);
        setShowOptions(false);
      }
    },
    [onChange]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetch = useCallback(
    debounce((newValue) => requests(newValue), 1000),
    []
  );

  const handleChange = (text: string) => {
    onChange(text);
    debouncedFetch(text);
    setCursor(-1);
    if (!showOptions) {
      setShowOptions(true);
    }
  };

  const moveCursorDown = useCallback(() => {
    if (cursor < options.length - 1) {
      setCursor((c) => c + 1);
    } else {
      setCursor(0);
    }
  }, [cursor, options.length]);

  const moveCursorUp = useCallback(() => {
    if (cursor > 0) {
      setCursor((c) => c - 1);
    } else {
      setCursor(options.length - 1);
    }
  }, [cursor, options.length]);

  const handleNav = useCallback(
    (e) => {
      switch (e.key) {
        case 'ArrowUp':
          moveCursorUp();
          break;
        case 'ArrowDown':
          moveCursorDown();
          break;
        case 'Enter':
          if (cursor >= 0 && cursor < options.length) {
            if (options) {
              const selected = options[cursor]?.title || '';
              select(selected);
              setWoeId(options[cursor]?.woeId || 0);
            }
          }
          break;
        default:
          break;
      }
    },
    [cursor, moveCursorDown, moveCursorUp, options, select, setWoeId]
  );

  useEffect(() => {
    const listener = (e: any) => {
      if (!ref.current?.contains(e.target)) {
        setShowOptions(false);
        setCursor(-1);
      }
    };

    document.addEventListener('click', listener);
    document.addEventListener('focusin', listener);
    return () => {
      document.removeEventListener('click', listener);
      document.removeEventListener('focusin', listener);
    };
  }, []);

  return (
    <div
      className="relative w-64 -mt-2 h-10  border border-gray-300 focus:ring-indigo-400 focus:border-indigo-400 block shadow-sm sm:text-sm  rounded-md"
      ref={ref}
    >
      <input
        type="text"
        className="w-full border-1 border-gray-300 px-4 py-2   focus:ring-indigo-500 focus:border-indigo-300 block shadow-sm sm:text-sm  rounded-md"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => setShowOptions(true)}
        onKeyDown={handleNav}
      />

      <ul
        className={`absolute w-full bg-white z-10  border-black shadow-2xl ${
          !showOptions && 'hidden'
        } select-none
        origin-top-left z-50 top-5 absolute left-0 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
      >
        {options.length > 0 ? (
          options.map((option, i, arr) => {
            let className = 'px-4 hover:bg-gray-200 ';

            if (i === 0) className += 'pt-2 pb-1';
            else if (i === arr.length) className += 'pt-1 pb-2';
            else className += 'py-1';

            if (cursor === i) {
              className += ' bg-gray-300';
            }

            return (
              <li
                className={className}
                key={`${option.woeId}-${i}`}
                onClick={() => {
                  select(`${option.title}`);
                  setWoeId(option.woeId);
                }}
              >
                {/* {option.title} ({option.latLong}) */}
                {option.title}
              </li>
            );
          })
        ) : loading ? (
          <li className="px-4 py-2 text-gray-500 bg-gray-400">Loading</li>
        ) : value ? (
          <li className="px-4 py-2 text-gray-500">No results</li>
        ) : (
          ''
        )}
      </ul>
    </div>
  );
};

export { Autocomplete };
