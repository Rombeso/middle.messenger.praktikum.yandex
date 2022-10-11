import Block from 'core/Block';
import 'components/User/User.scss';
import 'pages/profile/profile.scss';
// import 'pages/start/start.scss';
import { ProfileProps } from '../profile/profile';
import { RefsObject } from 'pages/changePassword/changePassword';
import { validateForm, ValidateType } from 'helpers/validateForm';
import InputData from 'components/InputData/InputData';
// @ts-ignore
import avatar from '../../assets/default-avatar.png';

export type ChangeProfileProps = ProfileProps & {
  onSubmit: (event: SubmitEvent) => void;
};

type ChangeUserPasswordRefs = {
  [key: string]: InputData;
};

export default class ChangeProfile extends Block<ChangeProfileProps, ChangeUserPasswordRefs> {
  static componentName: string = 'ChangeUserData';

  constructor({ profileData }: ProfileProps) {
    super({
      profileData,
      onClick: () => {
        window.location.pathname = './profileData';
      },

      onSubmit: () => {
        const refs = Object.entries(this.refs).reduce((acc, [key, value]) => {
          acc[key] = value.getRefs()[key].getContent() as HTMLInputElement;
          return acc;
        }, {} as RefsObject);

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
                {{{ReturnButton class="arrow" onClick=onClick}}}

                <section class='profile__container'>
                    <form class='user' action="/">
                        {{{Avatar name="Oleg" imageSrc="${avatar}" isEditable=false}}}

                        <div class='user__data'>
                            {{#each profileData}}
                                {{#with this}}
                                    {{{InputData ref=name childRef=name name=name data=data type=type inputName=name}}}
                                {{/with}}
                            {{/each}}
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
