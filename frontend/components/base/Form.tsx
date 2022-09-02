import React from "react";
import Button from "../base/Button";
import formStyles from "styles/pages/Form.module.scss";
import pageStyles from "styles/Page.module.scss";
import PasswordInput from "./PasswordInput";

type Props = {
  title?: string;
  fields: {
    label: string;
    name: string;
    value: string | number;
    type: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }[];
  onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  submitText: string;
  isLoading: boolean;
  error: string;
};

const Form = (props: Props) => {
  const { fields, onSubmit, error, submitText, isLoading, title } = props;
  const isError = error !== "";

  const fieldsJSX = fields.map(
    ({ name, value, type, onChange, label }, index) => {
      if (type === "password") {
        return (
          <PasswordInput
            value={value as string}
            onChange={onChange}
            label={label}
            key={index}
          />
        );
      } else {
        return (
          <div className={formStyles.inputField} key={index}>
            <label htmlFor={name}>{label}:</label>
            <input
              className={formStyles.input}
              type={type}
              id={name}
              value={value}
              onChange={onChange}
            />
          </div>
        );
      }
    }
  );

  return (
    <div className="flex grow-1 flex-col items-center m-2">
      <div className={formStyles.loginForm}>
        <h1 className={pageStyles.pageHeader}>{title}</h1>
        {fieldsJSX}
        {isError && <div className={pageStyles.error}>{error}</div>}
        <Button onClick={onSubmit} className={formStyles.input}>
          {isLoading ? "Loading..." : submitText}
        </Button>
      </div>
    </div>
  );
};

export default Form;
