import Block from 'core/Block';
import Router from 'core/Router';
import { signout } from 'services/authorization';
import { Store } from 'store/store';
import { getUserDataArray } from 'utils/getUserDataArray';
import { WithRouter } from 'components/Hocs/WithRouter';
import { WithStore } from 'components/Hocs/WithStore';
import { stringToCamelCase } from 'helpers/stringToCamelCase';
import './User.scss';
// @ts-ignore
import avatar from '../../assets/default-avatar.png';

export type UserProps = {
  router: Router;
  store: Store<AppState>;
  user: Nullable<UserType>;
  userData: Array<any>;
  navigateTo: (event: PointerEvent) => void;
  signout: () => void;
};

class User extends Block<UserProps> {
  static componentName: string = 'User';

  userData: any;

  constructor(props: UserProps) {
    super(props);

    const data = props.user ? getUserDataArray(props.user) : [];

    this.setProps({
      userData: data,
      navigateTo: (event: PointerEvent) => {
        const path = (event.target as HTMLButtonElement).textContent || '';
        this.props.router.go(`/${stringToCamelCase(path)}`);
      },
      signout: () => this.props.store.dispatch(signout),
    });
  }

  render() {
    // language=hbs
    return `
    <div class='user'>
        {{{Avatar name="Vadim" imageSrc="${avatar}" isEditable=true}}}

    <div class='user__data'>
        {{#each profileData}}
            {{#with this}}
            {{{ProfileItem name="{{name}}" data="{{data}}"}}}
            {{/with}}
        {{/each}}
    </div>

    <div class='user__actions'>
        <div class='actionItem'>
            {{{Button class='action-item__title' title='Change user data' onClick=navigateTo}}}
        </div>
        <div class='actionItem'>
            {{{Button class='action-item__title' title='Change password' onClick=navigateTo}}}
        </div>
        <div class='actionItem'>
            {{{Button class='action-item__title action-item__title_warning' title='Log out' onClick=signout}}}
        </div>
    </div>
</div>
      
              `;
  }
}

export default WithStore(WithRouter(User));
