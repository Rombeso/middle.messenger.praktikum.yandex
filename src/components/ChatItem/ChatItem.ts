import Block from 'core/Block';
import './ChatItem.scss';
// @ts-ignore
import avatar from '../../assets/default-avatar.png';

export interface ChatItemPreviewProps {
  name: string;
  message: string;
  time: string;
  unread: string;
}

type ChatItemProps = ChatItemPreviewProps & {
  events: {
    click: () => void;
  };
};

export default class ChatItem extends Block<ChatItemProps> {
  static componentName: string = 'ChatItem';

  constructor({ name, message, time, unread }: ChatItemPreviewProps) {
    const onChatItemClick = () => console.log('chat click!');

    super({ name, message, time, unread, events: { click: onChatItemClick } });
  }

  protected render(): string {
    // language=hbs
    return `
        <div class='border'>
            <div class='chatItem'>
                <div class='chatItem__avatar'>
                    <img class='avatar' src='${avatar}' alt='avatar' />
                </div>

                <div class='chatItem__text'>
                    <h4 class='chatItem__name'>{{name}}</h4>
                    <p class='chatItem__message'>{{message}}</p>
                </div>

                <div class='chatItem__info'>
                    <div class="chatItem__infoTop">
                        <button class='chatItem__delete'>X</button>
                        <time class='chatItem__time'>{{time}}</time>
                    </div>
                    <p class='chatItem__unread'>{{unread}}</p>
                </div>
            </div>
        </div>
    `;
  }
}
