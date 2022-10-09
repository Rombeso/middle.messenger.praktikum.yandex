import Block from 'core/Block';
import { validateForm, ValidateType } from 'helpers/validateForm';
import './login.scss';
import ControlledInput from 'components/ControlledInput/ControlledInput';

type IncomingSigninProps = {
  inputs: Array<{ text: string; type: string }>;
};

type SigninProps = IncomingSigninProps & {
  onSubmit: (event: SubmitEvent) => void;
  onInput: (event: FocusEvent) => void;
  onFocus: (event: FocusEvent) => void;
};

type SigninRefs = {
  [key: string]: ControlledInput;
};

interface SubmitEvent extends Event {
  submitter: HTMLElement;
}

export type RefsObject = {
  [key: string]: HTMLInputElement;
};
export default class SigninPage extends Block<SigninProps, SigninRefs> {
  static componentName = 'SigninPage';

  constructor() {
    super();

    this.setProps({
      onSubmit: () => {
        const refs = Object.entries(this.refs).reduce((acc, [key, value]) => {
          acc[key] = value.getRefs()[key].getContent() as HTMLInputElement;
          return acc;
        }, {} as RefsObject);

        const { login, password } = refs;

        const errors = validateForm([
          { type: ValidateType.Login, value: login.value },
          { type: ValidateType.Password, value: password.value },
        ]);

        if (Object.keys(errors).length !== 0) {
          for (const key in errors) {
            this.refs[key].getRefs().errorRef.setProps({ error: errors[key] });
          }
        } else {
          console.log({
            login: login.value,
            password: password.value,
          });

          for (const key in errors) {
            this.refs[key].getRefs().errorRef.setProps({ error: '' });
          }
        }
      },
      onInput: (event: FocusEvent) => {
        const target = event.target as HTMLInputElement;
        const errors = validateForm([{ type: target.name as ValidateType, value: target.value }]);

        this.refs[target.name].getRefs().errorRef.setProps({ error: errors[target.name] });
      },
      onFocus: (event: FocusEvent) => {
        const target = event.target as HTMLInputElement;
        const errors = validateForm([{ type: target.name as ValidateType, value: target.value }]);

        this.refs[target.name].getRefs().errorRef.setProps({ error: errors[target.name] });
      },
    });
  }

  render() {
    // language=hbs
    return `
<main class="main">
    <form class="loginForm" action="/">
        <div class="loginForm__block">
        <h3>Sign in</h3>
            {{{ControlledInput
                    onInput=onInput
                    onFocus=onFocus
                    type="text"
                    inputName="login"
                    ref="login"
                    childInputRef="login"
                    error=error
                    value=''
                    placeholder="login"
            }}}

            {{{ControlledInput
                    onInput=onInput
                    onFocus=onFocus
                    onBlur=onBlur
                    type="password"
                    inputName="password"
                    error=error
                    value=''
                    ref="password"
                    childInputRef="password"
                    placeholder="password"
            }}}
            
        </div>
        <div class="loginForm__bottom">
            {{{Button title="Sign In" onClick=onSubmit}}}
            {{{Link class="link" text="Create account" path="./signUp"}}}
        </div>
    </form>
        <a href="../" class="backLink">Вернуться в меню</a>
</main>
`;
  }
}
