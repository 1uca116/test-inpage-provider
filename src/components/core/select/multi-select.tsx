import { useMemo } from 'react';
import { BsCheckSquareFill, BsSquare } from 'react-icons/bs';
import Select, {
  components,
  GroupBase,
  MultiValueProps,
  OptionProps,
  StylesConfig,
} from 'react-select';

const MultiSelectOptionComponent = (props: OptionProps<MultiSelectValue>) => {
  return (
    <components.Option {...props}>
      <div className='flex items-center gap-2 cursor-pointer px-2 py-1'>
        <span className='text-success-2 opacity-80'>
          {props.isSelected ? <BsCheckSquareFill /> : <BsSquare />}
        </span>

        {props.data.icon && (
          <img className='w-6 sm:w-5 h-auto' src={props.data.icon} alt='' />
        )}
        <span className='text-primary-1 text-lg sm:text-base opacity-80'>
          {props.data.label}
        </span>
      </div>
    </components.Option>
  );
};

const MultiSelectValueComponent = (
  props: MultiValueProps<MultiSelectValue>
) => {
  return (
    <components.MultiValue {...props}>
      <img className='w-5 h-auto' src={props.data.icon} alt='' />
    </components.MultiValue>
  );
};

export type MultiSelectValue = {
  label: string;
  value: string;
  icon?: string;
};

type MultiSelectProps = {
  className?: string;
  placeholderText?: string;
  noOptionsText?: string;
  options?: MultiSelectValue[];
  value?: MultiSelectValue[];
  isClearable?: boolean;
  isSearchable?: boolean;
  onChange?: (newVal: MultiSelectValue[]) => void;
};

const MultiSelect = (props: MultiSelectProps) => {
  const styles: StylesConfig<
    MultiSelectValue,
    true,
    GroupBase<MultiSelectValue>
  > = useMemo(
    () => ({
      control: (provided: any) => ({
        ...provided,
        background: 'var(--color-select-field-mainBg)',
        color: 'var(--color-select-field-mainText)',
        border: 'none',
        borderRadius: '12px',
        boxShadow: 'none',
        '&:hover': {},
      }),
      input: (provided: any) => ({
        ...provided,
        color: 'var(--color-select-field-inputText)',
        overflow: 'hidden',
      }),
      placeholder: (provided: any) => ({
        ...provided,
        color: 'var(--color-select-field-placeholderText)',
      }),
      menu: (provided: any) => ({
        ...provided,
        background: 'var(--color-select-field-mainBg)',
        color: 'var(--color-select-field-mainText)',
        border: '1px solid var(--color-select-field-menu-border)',
        borderRadius: '5px',
        boxShadow: 'var(--shadow-primary)',
        zIndex: '100',
      }),
      menuList: (provided: any) => ({
        ...provided,
        '::-webkit-scrollbar': {
          width: 'var(--width-scrollThumb)',
        },
        '::-webkit-scrollbar-thumb': {
          background: 'var(--color-scrollThumb)',
        },
        scrollbarWidth: 'thin',
      }),
      option: () => ({}),
      clearIndicator: (provided: any) => ({
        ...provided,
        color: 'var(--color-select-field-mainText)',
        cursor: 'pointer',
        '&:hover': { color: 'var(--color-select-field-mainText)' },
      }),
      dropdownIndicator: (provided: any) => ({
        ...provided,
        color: 'var(--color-select-field-mainText)',
        cursor: 'pointer',
        '&:hover': { color: 'var(--color-select-field-mainText)' },
      }),
      multiValue: () => ({}),
      multiValueRemove: () => ({
        display: 'none',
      }),
    }),
    []
  );

  return (
    <Select
      className={`w-full ${props.className ?? ''}`}
      styles={styles}
      placeholder={props.placeholderText}
      noOptionsMessage={
        props.noOptionsText ? () => props.noOptionsText : undefined
      }
      options={props.options}
      value={props.value ?? null}
      onChange={(newVal: any) => props.onChange?.([...newVal])}
      components={{
        Option: MultiSelectOptionComponent,
        MultiValue: MultiSelectValueComponent,
      }}
      isClearable={props.isClearable}
      isSearchable={props.isSearchable}
      isMulti={true}
      blurInputOnSelect={false}
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
    />
  );
};

export default MultiSelect;
