import Block from 'core/Block';
import './first.scss';

export default class StartPage extends Block<Record<string, any>> {
  static componentName = 'FirstPage';

  render() {
    // language=hbs
    return `
<main>
    <ul class="temporaryMenu">
        <li>
            <a href="../404">Error 404</a>
        </li>
        <li>
            <a href="../500">Error 500</a>
        </li>
        <li>
            <a href="../login">Sing In</a>
        </li> 
        <li>
            <a href="../signUp">Sing Up</a>
        </li> 
        <li>
            <a href="../chats">Chats</a>
        </li> 
        <li>
            <a href="../profile">Profile</a>
        </li>
        <li>
            <a href="../changeProfile">Change Profile</a>
        </li>
        <li>
            <a href="../changePassword">Change Password</a>
        </li>
    </ul>
</main>
        `;
  }
}
