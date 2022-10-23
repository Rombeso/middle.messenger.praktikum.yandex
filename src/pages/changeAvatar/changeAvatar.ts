import Block from 'core/Block';
import './changeAvatar.scss';

type ChangeAvatarProps = {
  onSubmit: (event: SubmitEvent) => void;
};

export default class ChangeAvatar extends Block<ChangeAvatarProps> {
  static componentName: string = 'ChangeAvatar';

  render() {
    // language=hbs
    return `
        <main class='main'>
            <div class='popupContainer'>
                <div class='overlay'></div>
                {{{Popup title="Upload photo" helper-type="popup__warning"}}}
            </div>
        </main>
        `;
  }
}
