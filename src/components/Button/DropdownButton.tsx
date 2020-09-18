import React, { useState, useEffect } from 'react';
import { Button, IButtonProps } from '.';
import { Styles } from './styles';

type IDropDownButton = Omit<IButtonProps, 'dropDownchange'> & {
  dropdownOptions: { id: string; name: string }[];
  dropDownChange?: ({ id, name }: { id: string; name: string }) => any;
  useDefaultName?: boolean;
};

export const DropDownButton: React.FC<IDropDownButton> = (props) => {
  const {
    dropdownOptions,
    dropDownChange,
    children,
    useDefaultName = true,
    style,
    ...rest
  } = props;
  const [name, setName] = useState(dropdownOptions[0].name);
  const [showDropDown, setshowDropDown] = useState(false);

  const toggleDropDown = () => {
    setshowDropDown(!showDropDown);
  };

  useEffect(() => {
    const closeDropDown = () => {
      if (showDropDown) {
        setshowDropDown(false);
      }
    };

    window.addEventListener('click', closeDropDown);

    return () => window.removeEventListener('click', closeDropDown);
  }, [showDropDown]);

  const handleDropdownClick = (selectionName: string, id = '') => {
    setName(selectionName);
    if (dropDownChange) {
      dropDownChange({ id, name: selectionName });
    }
  };

  return (
    <Styles.DropDownStack>
      <Button
        onClick={() => toggleDropDown()}
        style={{
          ...style,
        }}
        {...rest}
      >
        {useDefaultName ? name : children}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className=""
          style={{
            marginLeft: '5%',
            background: ' #ffffff',
            border: '1px solid #efefef',
            borderRadius: '5px',
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </Button>

      {showDropDown && (
        <Styles.DropDownContainer>
          {dropdownOptions?.map(({ id, name: selectedItem }) => {
            return (
              <Styles.DropDownItem
                key={id}
                onClick={() => handleDropdownClick(selectedItem, id)}
                onKeyPress={() => handleDropdownClick(selectedItem, id)}
                role="presentation"
              >
                {selectedItem}
              </Styles.DropDownItem>
            );
          })}
        </Styles.DropDownContainer>
      )}
    </Styles.DropDownStack>
  );
};

DropDownButton.defaultProps = {
  dropDownChange: () => null,
};
