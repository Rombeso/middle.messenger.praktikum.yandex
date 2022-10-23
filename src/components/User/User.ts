import Block from 'core/Block';
import { ProfileProps } from 'pages/profile/profile';
import './User.scss';
// @ts-ignore
import avatar from '../../assets/default-avatar.png';

export default class User extends Block<Partial<ProfileProps>> {
  static componentName: string = 'User';

  constructor({ profileData }: ProfileProps) {
    super({ profileData });
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
