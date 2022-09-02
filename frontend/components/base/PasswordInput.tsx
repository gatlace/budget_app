import React from "react";
import formStyles from "styles/Form.module.scss";
import Button from "./Button";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
};

const PasswordInput = (props: Props) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className={formStyles.inputField}>
      <label htmlFor="password" className="w-full text-center">{props.label ? props.label + ":" : "Password"}</label>
      <input
        type={showPassword ? "text" : "password"}
        id="password"
        className={formStyles.input}
        value={props.value}
        onChange={props.onChange}
      />
      {props.value.length > 0 && (
        <Button
          onClick={() => setShowPassword(!showPassword)}
          className={formStyles.button}
        >
          {showPassword ? (
            <i className="fa-solid fa-eye fa-lg" />
          ) : (
            <i className="fa-solid fa-eye-slash fa-lg" />
          )}
        </Button>
      )}




    </div>
  );
};

export default PasswordInput;