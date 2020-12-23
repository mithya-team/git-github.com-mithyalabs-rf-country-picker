import React from "react";
import { TextFieldProps } from "@material-ui/core";
import { IFieldProps } from "react-forms";
export interface IMUICountryPickerProps extends IFieldProps {
    renderInputProps?: TextFieldProps;
    name: string;
}
export interface MUICountryPickerProps extends IFieldProps {
    fieldProps?: IMUICountryPickerProps;
}
export declare const MUICountryPicker: React.FC<MUICountryPickerProps>;
export default MUICountryPicker;
