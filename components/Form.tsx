import { useState } from "react";

export type ButtonItem = {
  function(): void;
  isSubmit: boolean;
  content: string;
};

export type FormInput = {
  desc: string;
  name: string;
  maxChar: number;
  hideChar: boolean;
};

interface Props {
  formInputs: FormInput[];
  buttons: ButtonItem[];
  errorMessage: string;
  onSubmitForm(atributes: string[]): void;
}

interface InputProps {
  formInput: FormInput;
  onChangeInput(n: string): void;
}

export const Form = ({
  formInputs,
  buttons,
  errorMessage,
  onSubmitForm,
}: Props) => {
  const [inputs, setInputs] = useState(
    Array.from({ length: formInputs.length }, () => "")
  );
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmitForm(inputs);
  }
  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      {formInputs.map(({ desc, name, maxChar, hideChar }, index) => (
        <FormInput
          key={index}
          formInput={{ desc, name, maxChar, hideChar } as FormInput}
          onChangeInput={(n) => {
            let tempArray = inputs;
            tempArray[index] = n;
            setInputs(tempArray);
          }}
        ></FormInput>
      ))}
      <div className="button_space" key="1">
        {buttons.map(({ function: f, isSubmit, content }, index) => (
          <button
            key={index}
            type={isSubmit ? "submit" : undefined}
            onClick={isSubmit ? undefined : f}
          >
            {content}
          </button>
        ))}
      </div>
      <p className="err">{errorMessage}</p>
    </form>
  );
};

export const FormInput = ({ formInput, onChangeInput }: InputProps) => {
  return (
    <label>
      {formInput.desc}:
      <input
        type={formInput.hideChar ? "password" : "text"}
        name={formInput.name}
        maxLength={formInput.maxChar}
        onChange={(event) => onChangeInput(event.target.value)}
      />
    </label>
  );
};
