import Block from 'core/Block';
import './first.scss';
import Router from 'core/Router';
import { WithRouter } from 'components/Hocs/WithRouter';

export type StartPageProps = {
  router: Router;
  navigateToLogin?: () => void;
};

export class StartPage extends Block<StartPageProps> {
  static componentName = 'FirstPage';

  constructor(props: StartPageProps) {
    super(props);
    this.setProps({
      navigateToLogin: () => this.props.router.go('/login'),
    });

    console.log(this.children);
  }

  render() {
    // language=hbs
    return `
<main>
<!--    <ul class="temporaryMenu">-->
<!--        <li>-->
<!--            <a href="../404">Error 404</a>-->
<!--        </li>-->
<!--        <li>-->
<!--            <a href="../500">Error 500</a>-->
<!--        </li>-->
<!--        <li>-->
<!--            <a href="../login">Sing In</a>-->
<!--        </li> -->
<!--        <li>-->
<!--            <a href="../signUp">Sing Up</a>-->
<!--        </li> -->
<!--        <li>-->
<!--            <a href="../chats">Chats</a>-->
<!--        </li> -->
<!--        <li>-->
<!--            <a href="../profile">Profile</a>-->
<!--        </li>-->
<!--        <li>-->
<!--            <a href="../changeProfile">Change Profile</a>-->
<!--        </li>-->
<!--        <li>-->
<!--            <a href="../changePassword">Change Password</a>-->
<!--        </li>-->
<!--        <li>-->
<!--            <a href="../changeAvatar">Change Avatar</a>-->
<!--        </li>-->
<!--    </ul>-->
    {{{Button title="Do you wont start?" onClick=navigateToLogin}}}
</main>
        `;
  }
}

export default WithRouter(StartPage);
