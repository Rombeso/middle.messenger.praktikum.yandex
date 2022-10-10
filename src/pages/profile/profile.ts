import Block from 'core/Block';
import './profile.scss';

export interface UserProps {
  name: string;
  data: string;
  type: string;
}

export interface ProfileProps {
  profile: UserProps[];
  onClick: () => void;
}

export default class Profile extends Block<ProfileProps> {
  static componentName: string = 'Profile';

  constructor({ profile }: ProfileProps) {
    super();
    this.setProps({
      profile,
      onClick: () => {
        window.location.pathname = '/';
      },
    });
  }

  render() {
    // language=hbs
    return `
<main class='main'>
  <div class='profile'>
      {{{ReturnButton onClick=onClick}}}

    <section class='profile__container'>
        {{{User profile=this.props }}}
    </section>
  </div>
  <a href="./" class="backLink">Вернуться назад</a>
</main>
      
              `;
  }
}
