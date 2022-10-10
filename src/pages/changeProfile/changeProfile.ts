import Block from 'core/Block';
import 'components/User/User.scss';
import 'pages/profile/profile.scss';
// import 'pages/start/start.scss';
import { ProfileProps } from '../profile/profile';
//import { refsObject } from 'pages/changeUserPassword/changeUserPassword';
import { validateForm, ValidateType } from 'helpers/validateForm';
import InputData from 'components/InputData/InputData';

export type ChangeProfileProps = ProfileProps & {
  onSubmit: (event: SubmitEvent) => void;
};

type changeUserPasswordRefs = {
  [key: string]: InputData;
};

export default class ChangeUserData extends Block<ChangeProfileProps, changeUserPasswordRefs> {
  static componentName: string = 'ChangeUserData';

  constructor({ userData }: ProfileProps) {
    super({
      userData,
      onClick: () => {
        window.location.pathname = './profileData';
      },

      onSubmit: () => {
        const refs = Object.entries(this.refs).reduce((acc, [key, value]) => {
          acc[key] = value.getRefs()[key].getContent() as HTMLInputElement;
          return acc;
        }, {} as refsObject);

        const errors = Object.entries(refs).reduce((acc, [key, input]) => {
          const errorMessage = validateForm([
            { type: key.toLowerCase() as ValidateType, value: input.value },
          ])[key.toLowerCase()];

          if (errorMessage) {
            acc[key] = errorMessage;
          }

          return acc;
        }, {} as { [key: string]: string });

        if (Object.entries(errors).length !== 0) {
          Object.entries(errors).forEach(([key, value]) =>
            this.refs[key].getRefs().errorRef.setProps({ error: value })
          );

          return;
        }

        Object.values(this.refs).forEach(value => {
          value.getRefs().errorRef.setProps({ error: '' });
        });

        const newData = Object.entries(refs).reduce((acc, [key, input]) => {
          acc[key] = input.value;
          return acc;
        }, {} as { [key: string]: string });

        console.log(newData);
      },
    });
  }

  render() {
    // language=hbs
    return `
<main class='main'>
    <div class='profile'>
        {{> profileReturnButton/profileReturnButton path=""}}

        <section class='profile__container'>
            <form class='user' action="/">
                <div class='user__avatar'>
                    <img
                            src='./../../assets/default-avatar.png'
                            alt='avatar'
                            class='user__image'
                    />
                </div>

                <div class='user__data'>
                    {{#each profile}}
                        {{#with this}}
                            {{{InputData ref=title childRef=title title=title data=data type=type inputName=title}}}
                        {{/with}}
                    {{/each}}
                    {{#each profile}}
                        {{> 'inputItem/inputItem' this}}
                    {{/each}}
                </div>

                <div class="loginForm__bottom">
                    {{> 'button/button' button-title='Save' button-class='button'}}
                </div>
            </form>
        </section>
    </div>
    <a href="../first/first.ts" class="backLink">Вернуться назад</a>
</main>
              `;
  }
}
