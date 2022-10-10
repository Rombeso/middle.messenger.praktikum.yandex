import Block from 'core/Block';
import { ProfileItemProps } from 'components/ProfileItem/ProfileItem';
import Input from 'components/Input/Input';
import './InputData.scss';
import ErrorMessage from 'components/Error/Error';
import { validateForm, ValidateType } from 'helpers/validateForm';

type IncomingInputDataProps = ProfileItemProps & {
  childRef: string;
  inputName: string;
  error?: string;
};

type InputDataProps = IncomingInputDataProps & {
  onInput?: (event: FocusEvent) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
};

type InputDataRefs = {
  [key: string]: Input | ErrorMessage;
};

export default class InputData extends Block<InputDataProps, InputDataRefs> {
  static componentName: string = 'InputData';

  constructor({ name, data, type, childRef, error = '', inputName }: IncomingInputDataProps) {
    super({
      name,
      data,
      type,
      childRef,
      error,
      inputName,
      onInput: (event: FocusEvent) => {
        const target = event.target as HTMLInputElement;

        const error = validateForm([
          { type: inputName.toLowerCase() as ValidateType, value: target.value },
        ])[inputName.toLowerCase()];

        this.refs.errorRef.setProps({ error: error });
      },
      onFocus: (event: FocusEvent) => {
        const target = event.target as HTMLInputElement;

        const error = validateForm([
          { type: inputName.toLowerCase() as ValidateType, value: target.value },
        ])[inputName.toLowerCase()];

        this.refs.errorRef.setProps({ error: error });
      },
      onBlur: (event: FocusEvent) => {
        const target = event.target as HTMLInputElement;

        const error = validateForm([
          { type: inputName.toLowerCase() as ValidateType, value: target.value },
        ])[inputName.toLowerCase()];

        this.refs.errorRef.setProps({ error: error });
      },
    });
  }

  render() {
    // language=hbs
    return `
            <div class='dataItem'>
                <div class='dataItem__title'>{{name}}</div>
                {{{Input
                    ref=childRef
                    type=type
                    placeholder=' '
                    inputName=inputName
                    value=data
                    class='dataItem__input'
                    onInput=onInput
                    onFocus=onFocus
                    onBlur=onBlur
                }}}
              </div>
                
              {{{ErrorMessage ref="errorRef"}}}
            </div>
        `;
  }
}
