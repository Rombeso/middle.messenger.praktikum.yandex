import Block from 'core/Block';
import './profile.scss';

export interface UserProps {
  name: string;
  data: string;
  type: string;
}

export interface ProfileProps {
  profileData: UserProps[];
  onClick: () => void;
}

export default class Profile extends Block<ProfileProps> {
  static componentName: string = 'Profile';

  constructor({ profileData }: ProfileProps) {
    super();
    this.setProps({
      profileData,
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
        {{{User profileData=profileData }}}
    </section>
  </div>
  <a href="./" class="backLink">Вернуться назад</a>
</main>
      
              `;
  }
}
