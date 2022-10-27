import Block from 'core/Block';
import 'components/User/User.scss';
import 'pages/profile/profile.scss';
import 'pages/start/start.scss';
import { ProfileProps } from '../profile/profile';
import InputData from 'components/InputData/InputData';
import { getChildInputRefs } from 'helpers/getChildInputRefs';
import { getErrorsObject } from 'helpers/getErrorsObject';
import { setChildErrorsProps } from 'helpers/setChildErrorsProps';
import { WithUser } from 'components/Hocs/WithUser';
import { WithRouter } from 'components/Hocs/WithRouter';
import { getUserDataArray } from 'helpers/getUserDataArray';
import { changeUserProfile } from 'services/userData';
import { WithStore } from 'components/Hocs/WithStore';
// @ts-ignore
import avatar from '../../assets/default-avatar.png';

export type ChangeProfileProps = ProfileProps & {
  userData: Array<any>;
  onSubmit: (event: SubmitEvent) => void;
};

type ChangeUserPasswordRefs = {
  [key: string]: InputData;
};

class ChangeProfile extends Block<ChangeProfileProps, ChangeUserPasswordRefs> {
  static componentName: string = 'ChangeUserData';

  constructor(props: ChangeProfileProps) {
    super(props);

    const data = props.user ? getUserDataArray(props.user) : [];

    this.setProps({
      userData: data,

      onSubmit: async () => {
        const refs = getChildInputRefs(this.refs);
        const errors = getErrorsObject(refs);

        setChildErrorsProps(errors, this.refs);

        if (Object.keys(errors).length === 0) {
          const newData = {
            login: refs.login.value,
            first_name: refs.firstName.value,
            second_name: refs.secondName.value,
            display_name: refs.displayName.value,
            phone: refs.phone.value,
            email: refs.email.value,
          };

          this.props.store.dispatch(changeUserProfile, newData);
        }
      },
    });
  }

  render() {
    // language=hbs
    return `
        <main class='main'>
            <div class='profile'>
                {{{ReturnButton}}}

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

export default WithStore(WithRouter(WithUser(ChangeProfile)));
