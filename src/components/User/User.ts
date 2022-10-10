import Block from 'core/Block';
import { ProfileProps } from 'pages/profile/profile';
import './User.scss';

export default class User extends Block<Partial<ProfileProps>> {
  static componentName: string = 'User';

  constructor({ userData }: ProfileProps) {
    super({ userData });
  }

  render() {
    // language=hbs
    return `
    <div class='user'>
    <div class='user__avatar'>
        <a class='user__change' href='/'>Change avatar</a>
        <img
                src='./../../assets/default-avatar.png'
                alt='avatar'
                class='user__image'
        />

        <h3>Name</h3>
    </div>

    <div class='user__data'>
        {{#each profile}}
            {{{ProfileItem name="{{name}}" data="{{data}}"}}}
        {{/each}}
    </div>

    <div class='user__actions'>
        <div class='actionItem'>
            {{{Link class='actionItem__title' path='./changeUserData' text='Change user data'}}}
        </div>
        <div class='actionItem'>
            {{{Link class='actionItem__title' path='./changeUserData' text='Change password'}}}
        </div>
        <div class='actionItem'>
            {{{Link class='actionItem__title actionItem__title_warning' path='/' text='Log out'}}}
        </div>
    </div>
</div>
      
              `;
  }
}
