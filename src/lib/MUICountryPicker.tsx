import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { COUNTRY_LIST } from "react-forms";
import { TextField, TextFieldProps } from "@material-ui/core";
import { IFieldProps } from "react-forms";
import { FormikValues } from "formik";
import { get } from "lodash";

export interface IMUICountryPickerProps extends IFieldProps {
  renderInputProps?: TextFieldProps;
  name: string;
}

export interface MUICountryPickerProps extends IFieldProps {
  fieldProps?: IMUICountryPickerProps;
}

export const MUICountryPicker: React.FC<MUICountryPickerProps> = (
  props: MUICountryPickerProps
) => {
  const {
    fieldProps = {} as IMUICountryPickerProps,
    formikProps = {} as FormikValues,
  } = props;
  const { renderInputProps, name } = fieldProps;
  let value = get(formikProps, `values.${name}`);

  if (typeof value === "object" && (!value.name || !value.code)) {
    value =
      COUNTRY_LIST.filter(
        (country) => value.dial_code === country.dial_code
      )?.[0] || {};
  } else if (typeof value === "string") {
    value =
      COUNTRY_LIST.filter((country) => value === country.dial_code)?.[0] || {};
  }

  const handleChange = (event: any) => {
    formikProps.setFieldValue(name, event.currentTarget.innerText);
  };

  return (
    <Autocomplete
      value={value}
      options={COUNTRY_LIST}
      getOptionLabel={(option) => (option as Record<string, string>).name}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField {...params} label="Country" {...renderInputProps} />
      )}
    />
  );
};


export default MUICountryPicker;