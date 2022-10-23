import Block from 'core/Block';
import 'components/User/User.scss';
import 'pages/profile/profile.scss';
// import 'pages/start/start.scss';
import UserDataInput from 'components/InputData/InputData';
import { validateForm, ValidateType } from 'helpers/validateForm';
import { ChangeProfileProps } from 'pages/changeProfile/changeProfile';
// @ts-ignore
import avatar from '../../assets/default-avatar.png';

type ChangeUserPasswordRefs = {
  [key: string]: UserDataInput;
};

export type RefsObject = {
  [key: string]: HTMLInputElement;
};
export default class ChangePassword extends Block<ChangeProfileProps, ChangeUserPasswordRefs> {
  static componentName: string = 'ChangeUserPassword';

  constructor() {
    super();

    this.setProps({
      onClick: () => (window.location.pathname = './profile'),
      onSubmit: () => {
        const refs = Object.entries(this.refs).reduce((acc, [key, value]) => {
          acc[key] = value.getRefs()[key].getContent() as HTMLInputElement;
          return acc;
        }, {} as RefsObject);

        const { newPassword, repeatNewPassword } = refs;
        const errors = Object.entries(refs).reduce((acc, [key, input]) => {
          const errorMessage = validateForm([{ type: ValidateType.Password, value: input.value }])[
            ValidateType.Password
          ];

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

        if (newPassword.value !== repeatNewPassword.value) {
          Object.values(this.refs).forEach(value => {
            value.getRefs().errorRef.setProps({ error: 'Passwords do not match' });
          });

          return;
        }

        console.log('New password', newPassword.value);

        Object.values(this.refs).forEach(value => {
          value.getRefs().errorRef.setProps({ error: '' });
        });
      },
    });
  }

  render() {
    // language=hbs
    return `
<main class='main'>
    <div class='profile'>
        {{{ReturnButton class="arrow" onClick=onClick}}}

        <section class='profile__container'>
            <form class='user' action="/">
                <div class='user__avatar'>
                    {{{Avatar name="Oleg" imageSrc="${avatar}" isEditable=false}}}
                </div>

                <div class='user__data'>
                    {{{InputData name="Current password" type="password" data='' inputName='password'}}}
                    {{{InputData ref="newPassword" childRef="newPassword" name="New password" type="password" inputName='password'}}}
                    {{{InputData ref="repeatNewPassword" childRef="repeatNewPassword" name="Repeat new password" type="password" inputName='password'}}}
                </div>

                <div class="loginForm__bottom">
                    {{{ Button title='Save' class='button' onClick=onSubmit}}}
                </div>
            </form>
        </section>
    </div>
    <a href="./" class="backLink">Вернуться назад</a>
</main>
              `;
  }
}
