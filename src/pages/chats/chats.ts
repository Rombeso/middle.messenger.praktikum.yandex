import { ChatItemPreviewProps } from 'components/ChatItem/ChatItem';
import InputMassage from 'components/InputMassage/InputMassage';
import Input from 'components/Input/Input';
import Block from 'core/Block';
import './chats.scss';
import { validateForm, ValidateType } from 'helpers/validateForm';
// @ts-ignore
import avatar from '../../assets/default-avatar.png';

type IncomingProps = {
  chat: ChatItemPreviewProps[];
};

type Props = IncomingProps & {
  onSubmit: (event: SubmitEvent) => void;
};

type Refs = {
  messageRef: InputMassage;
  attach: Input;
};

interface SubmitEvent extends Event {
  submitter: HTMLElement;
}

export default class ChatsPage extends Block<Props, Refs> {
  static componentName: string = 'MainPage';

  constructor({ chat }: IncomingProps) {
    super({
      chat,
      onSubmit: (event: SubmitEvent) => {
        event.preventDefault();

        const refs = Object.entries(this.refs).reduce((acc, [key, value]) => {
          acc[key] = value.getContent() as HTMLInputElement;
          return acc;
        }, {} as { [key: string]: HTMLInputElement });

        const { attach, messageRef } = refs;

        const errors = validateForm([{ type: ValidateType.Message, value: messageRef.value }]);

        if (Object.keys(errors).length !== 0) {
          for (const key in errors) {
            console.log(errors[key]);
          }
        } else {
          console.log({
            message: messageRef.value,
            attach: attach.value,
          });

          messageRef.value = '';
        }
      },
    });

    this.setProps({});
  }

  render() {
    // language=hbs
    return `

<main class='main'>
    <section class='left'>
        <div class='topList'>
            {{{Link class='topList__goto-profile' path='/' text='Profile >'}}}
            {{{InputSearch}}}
        </div>

        <div class='chatList'>
            {{#each chat}}
                {{#with this}}
                    {{{ChatItem name="{{name}}" message="{{message}}" time="{{time}}" unread="{{unread}}"}}}
                {{/with}}
            {{/each}}
        </div>
    </section>

    <section class='right'>
        <header class='right__header'>
            <div class='chat-info'>
                <div class='right__avatar'>
                    <img src='${avatar}' alt='avatar' />
                </div>

                <h4 class='chat-info__name'>Oleg</h4>
            </div>
            <div class='header-menu'>
                <div class="dots"></div>
            </div>
        </header>

        <div class='right__content'>
            <div class='conversation'>
                <div class='conversation__day'>
                    <h4>Date</h4>
                    {{{ChatMessage class="chat-message chat-message_mate"}}}
                    {{{ChatMessage class="chat-message chat-message_owner"}}}
                </div>
            </div>
        </div>

        <footer class='right__footer'>
            <form class='message-form' action='#'>
                <div class="button-container">
                    {{{Input ref='attach' id='input-file' name='attach' class="input_attach" type="file"}}}
                </div>

                {{{InputMassage ref="messageRef" class='message'}}}
                
                <div class="button-container">
                    {{{ ReturnButton class="backBlock__link buttonReverse" onClick=onSubmit}}}
                </div>
            </form>
        </footer>
    </section>
    <a href="/" class="backLink">Вернуться назад</a>
</main>
`;
  }
}
