import Block from 'core/Block';
import './ChatItem.scss';
// @ts-ignore
import avatar from '../../assets/default-avatar.png';
import { deleteChat, getChatUsers } from 'services/chats';
import { Store } from 'store/store';
import { WithStore } from 'components/Hocs/WithStore';

export interface ChatItemPreviewProps {
  store: Store<AppState>;
  chat: ChatType;
}

type ChatItemProps = ChatItemPreviewProps & {
  deleteChatHandler: () => void;
  events: {
    click: (event: Event) => void;
  };
};

class ChatItem extends Block<ChatItemProps> {
  static componentName: string = 'ChatItem';

  constructor(props: ChatItemPreviewProps) {
    const onChatItemClick = (event: Event) => {
      if ((event.target as HTMLElement).tagName === 'BUTTON') {
        return;
      }
      this.props.store.dispatch(getChatUsers, this.props.chat);
    };

    super({
      ...props,
      events: { click: onChatItemClick },
      deleteChatHandler: () => {
        this.props.store.dispatch(deleteChat, { chatId: this.props.chat.id });
      },
    });
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
<!--                    <h4 class='chatItem__name'>{{name}}</h4>-->
<!--                    <p class='chatItem__message'>{{message}}</p>-->
                    <h4 class='chatItem__name'>{{chat.title}}</h4>
                </div>

                <div class='chatItem__info'>
                    <div class="chatItem__infoTop">
<!--                        <button class='chatItem__delete'>X</button>-->
                            {{{Button  class='chatItem__delete' title="X" onClick=deleteChatHandler}}}
<!--                        <time class='chatItem__time'>{{time}}</time>-->
                    </div>
<!--                    <p class='chatItem__unread'>{{unread}}</p>-->
                    <p class='chatItem__unread'>{{chat.unreadCount}}</p>
                </div>
            </div>
        </div>
    `;
  }
}

export default WithStore(ChatItem);
