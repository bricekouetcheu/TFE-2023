/* eslint-disable react/prop-types */
import React, { useState, useRef } from "react";
import ReactSelect, { components } from "react-select";


const MultiSelect = (props) => {
  const [input, setInput] = useState("");
  const isAllSelected = useRef(false);
  const selectAllLabel = useRef("Selectionner tout");
  const allOption = { value: "*", label: selectAllLabel.current };

  /**
   * sorting option based on input value
   * @param {Array} options - option to filter
   * @param {string} input  - input fot filtering
   * @return {array} - the filtered options
   */
    const filterOptions = (options, input) => {
    return options.filter(({ label }) =>
        label.toLowerCase().includes(input.toLowerCase())
    );
    };
 



  
   
  /***
   * compares two values for sorting
   *  @param {Object} v1 - The first value to compare.
    * @param {Object} v2 - The second value to compare.
    * @returns {number} - The comparison value.
   */
  const comparator = (value1, value2) => {
    return value1.value - value2.value;

  }
   
  



  let filteredOptions = filterOptions(props.options, input);
  let filteredSelectedOptions = [];
  if (props.value !== null) {
    filteredSelectedOptions = filterOptions(props.value, input);
  }

  const onKeyDown = (e) => {
    if ((e.key === " " || e.key === "Enter") && !input)
      e.preventDefault();
  };

  const Option = (props) => (
    <components.Option {...props}>
      {props.value === "*" &&
      !isAllSelected.current &&
      filteredSelectedOptions.length > 0 ? (
        <input
          key={props.value}
          type="checkbox"
          ref={(input) => {
            if (input) input.indeterminate = true;
          }}
        />
      ) : (
        <input
          key={props.value}
          type="checkbox"
          checked={props.isSelected || isAllSelected.current}
          onChange={() => {}}
        />
      )}
      <label style={{ marginLeft: "5px" }}>{props.label}</label>
    </components.Option>
  );

  const Input = (props) => (
    <>
      {input.length === 0 ? (
        <components.Input autoFocus={props.selectProps.menuIsOpen} {...props}>
          {props.children}
        </components.Input>
      ) : (
        <div style={{ border: "1px dotted gray" }}>
          <components.Input autoFocus={props.selectProps.menuIsOpen} {...props}>
            {props.children}
          </components.Input>
        </div>
      )}
    </>
  );

    /**
     * Custom filter option function.
     *
     * @function
     * @name customFilterOption
     * @param {{ value: string, label: string }} option - The option to filter.
     * @param {string} input - The input value to filter with.
     * @returns {boolean} - `true` if the option should be included, `false` otherwise.
     */
    const customFilterOption = ({ value, label }, input) => {
        return (
        (value !== "*" && label.toLowerCase().includes(input.toLowerCase())) ||
        (value === "*" && filteredOptions.length > 0)
        );
    };
    
    /**
     * Handles input change event.
     *
     * @function
     * @name onInputChange
     * @param {string} inputValue - The new input value.
     * @param {{ action: string }} event - The input event object.
     * @returns {void}
     */
    const onInputChange = (inputValue, event) => {
        if (event.action === "input-change") {
        setInput(inputValue);
        } else if (event.action === "menu-close" && input !== "") {
        setInput("");
        }
    };
  
    const customNoOptionsMessage = () => "Aucune entité trouvée";

  const handleChange = (selected) => {
    if (
      selected.length > 0 &&
      !isAllSelected.current &&
      (selected[selected.length - 1].value === allOption.value ||
        JSON.stringify(filteredOptions) ===
          JSON.stringify(selected.sort(comparator)))
    )
      return props.onChange(
        [
          ...(props.value || []),
          ...props.options.filter(
            ({ label }) =>
              label.toLowerCase().includes(input?.toLowerCase()) &&
              (props.value || []).filter((opt) => opt.label === label).length === 0
          ),
        ].sort(comparator)
      );
    else if (
      selected.length > 0 &&
      selected[selected.length - 1].value !== allOption.value &&
      JSON.stringify(selected.sort(comparator)) !== JSON.stringify(filteredOptions)
    )
      return props.onChange(selected);
    else
      return props.onChange([
        ...(props.value?.filter(
          ({ label }) => !label.toLowerCase().includes(input?.toLowerCase())
        )),
      ]);
  };

  const customStyles = {
    multiValueLabel: (def) => ({
      ...def,
      backgroundColor: "lightgray",
    }),
    multiValueRemove: (def) => ({
      ...def,
      backgroundColor: "lightgray",
    }),
    valueContainer: (base) => ({
      ...base,
      maxHeight: "65px",
      overflow: "auto",
    }),
    option: (styles, { isSelected, isFocused }) => {
      return {
        ...styles,
        backgroundColor:
          isSelected && !isFocused
            ? null
            : isFocused && !isSelected
            ? styles.backgroundColor
            : isFocused && isSelected
            ? "#DEEBFF"
            : null,
        color: isSelected ? null : null,
        fontSize: "0.8em", // Réduire la taille de la police
        display: "flex",  // Aligner les options avec les cases à cocher
        alignItems: "center",
      };
    },
    menu: (def) => ({ ...def, zIndex: 9999 }),
  };
  

  if (props.isSelectAll && props.options.length !== 0) {
    isAllSelected.current =
      JSON.stringify(filteredSelectedOptions) === JSON.stringify(filteredOptions);

    if (filteredSelectedOptions.length > 0) {
      if (filteredSelectedOptions.length === filteredOptions.length)
        selectAllLabel.current = `Toutes les (${filteredOptions.length}) entités selectionnées`;
      else
        selectAllLabel.current = `${filteredSelectedOptions.length} / ${filteredOptions.length} selectionné(s)`;
    } else selectAllLabel.current = "Selectionner tout";

    allOption.label = selectAllLabel.current;

    return (
      <ReactSelect
        {...props}
        styles={customStyles}
        noOptionsMessage={customNoOptionsMessage}
        inputValue={input}
        onInputChange={onInputChange}
        options={[allOption, ...props.options]}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        components={{
          Option: Option,
          Input: Input,
          ...props.components,
        }}
        filterOption={customFilterOption}
        menuPlacement={props.menuPlacement ?? "auto"}
        isMulti
        closeMenuOnSelect={false}
        tabSelectsValue={false}
        backspaceRemovesValue={false}
        hideSelectedOptions={false}
        blurInputOnSelect={false}
        placeholder = 'Selectionnez les entités...'
       
      />
    );
  }

  return (
    <ReactSelect
      {...props}
      noOptionsMessage={customNoOptionsMessage}
      inputValue={input}
      onInputChange={onInputChange}
      filterOption={customFilterOption}
      onKeyDown={onKeyDown}
      components={{
        Input: Input,
        ...props.components,
      }}
      menuPlacement={props.menuPlacement ?? "auto"}
      tabSelectsValue={false}
      hideSelectedOptions={true}
      backspaceRemovesValue={false}
      blurInputOnSelect={true}
      placeholder = 'Selectionnez les entités...'
      styles={customStyles}
    />
  );
};

const MultiSelectWithRef = React.forwardRef((props, ref) => {
    return <MultiSelect {...props} forwardedRef={ref} />;
  });

  export default MultiSelectWithRef;