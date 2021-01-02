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

  // if (typeof value === "object" && (!value.name || !value.code)) {
  //     value =
  //         COUNTRY_LIST.filter(
  //             (country) => value.dial_code === country.dial_code
  //         )?.[0] || {};
  // } else if (typeof value === "string") {
  //     value =
  //         COUNTRY_LIST.filter((country) => value === country.dial_code)?.[0] || {};
  // }

  const handleChange = (_event: React.ChangeEvent<{}>, value: string | string[] | null) => {
    formikProps.setFieldValue(name, value);
  };
  const helperText = getFieldError(name, formikProps);
  const error = !!helperText;
  return (
    <Autocomplete<string>
      value={value}
      options={COUNTRY_LIST.map(i => i.name)}
      getOptionLabel={(o) => o}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField {...params} label="Country" {...renderInputProps}
          inputProps={{
            ...params.inputProps,
            ...renderInputProps?.inputProps,
            autoComplete: 'nope',
          }}
          error={error}
          helperText={helperText}
        />
      )}
    />
  );
};

const getFieldError = (fieldName: string, formikProps: FormikValues) => {
  const fieldError = get(formikProps, `errors.${fieldName}`);
  const isTouched = get(formikProps, `touched.${fieldName}`);
  if (!isTouched && formikProps.submitCount < 1)
    return '';
  return fieldError;
}
export default MUICountryPicker;