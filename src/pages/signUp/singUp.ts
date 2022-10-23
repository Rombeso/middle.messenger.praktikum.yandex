import Block from 'core/Block';
import 'pages/login/login.scss';
import { validateForm, ValidateType } from 'helpers/validateForm';
import ControlledInput from 'components/ControlledInput/ControlledInput';
import Input from 'components/Input/Input';

type IncomingSignupProps = {
  regInputs: Array<{ text: string; type: string }>;
};

type Props = IncomingSignupProps & {
  onSubmit: (event: SubmitEvent) => void;
  onInput: (event: FocusEvent) => void;
  onFocus: (event: FocusEvent) => void;
};

type SignupRefs = {
  [key: string]: ControlledInput;
};

interface SubmitEvent extends Event {
  submitter: HTMLElement;
}

type RefsObject = {
  [key: string]: HTMLInputElement;
};

export default class SignupPage extends Block<Props, SignupRefs> {
  static componentName: string = 'SignupPage';

  constructor({ regInputs }: IncomingSignupProps) {
    super({
      regInputs,
      onSubmit: () => {
        const refs = Object.entries(this.refs).reduce((acc, [key, value]) => {
          if (value.getRefs()[key] instanceof Input) {
            acc[key.toLowerCase()] = value.getRefs()[key].getContent() as HTMLInputElement;
          }

          return acc;
        }, {} as RefsObject);

        const { login, password, email, firstname, lastname, phone } = refs;

        const errors = validateForm([
          { type: ValidateType.Login, value: login.value },
          { type: ValidateType.Password, value: password.value },
          { type: ValidateType.Email, value: email.value },
          { type: ValidateType.Phone, value: phone.value },
          { type: ValidateType.FirstName, value: firstname.value },
          { type: ValidateType.LastName, value: lastname.value },
        ]);

        if (Object.keys(errors).length !== 0) {
          for (const key in errors) {
            const capitalizedKey = key[0].toUpperCase() + key.slice(1);
            console.log('capitalizedKey', capitalizedKey);
            this.refs[capitalizedKey].getRefs().errorRef.setProps({ error: errors[key] });
          }
        } else {
          console.log({
            login: login.value,
            password: password.value,
            FirstName: firstname.value,
            LastName: lastname.value,
            email: email.value,
            phone: phone.value,
          });

          for (const key in errors) {
            this.refs[key].getRefs().errorRef.setProps({ error: '' });
          }
        }
      },
      onInput: (event: FocusEvent) => {
        const target = event.target as HTMLInputElement;

        const errors = validateForm([
          { type: target.name.toLowerCase() as ValidateType, value: target.value },
        ]);

        this.refs[target.name]
          .getRefs()
          .errorRef.setProps({ error: errors[target.name.toLowerCase()] });
      },
      onFocus: (event: FocusEvent) => {
        const target = event.target as HTMLInputElement;
        const errors = validateForm([
          { type: target.name.toLowerCase() as ValidateType, value: target.value },
        ]);

        this.refs[target.name]
          .getRefs()
          .errorRef.setProps({ error: errors[target.name.toLowerCase()] });
      },
    });
  }

  render() {
    // language=hbs
    return `
<main class="main">
    <form class="loginForm" action="/">
        <div class="loginForm__block">
            <h3>Sign up</h3>

            {{#each regInputs}}
                {{#with this}}
                    {{{ControlledInput
                            onInput=../onInput
                            onFocus=../onFocus
                            type=type
                            inputName=text
                            ref=text
                            childInputRef=text
                            error=error
                            value=''
                            placeholder=text
                    }}}
                {{/with}}
            {{/each}}
        </div>

        <div class="loginForm__bottom">
            {{{Button title="Sign Un" onClick=onSubmit}}}
            {{{Link class="link" text="Login" path="./login"}}}

        </div>
    </form>
    <a href="../" class="backLink">Вернуться в меню</a>
</main>
`;
  }
}
