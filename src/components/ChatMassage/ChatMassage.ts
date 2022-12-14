import Block from 'core/Block';
import './ChatMassage.scss';

interface ChatMessageProps {
  class: string;
}

export default class ChatMessage extends Block<ChatMessageProps> {
  static componentName: string = 'ChatMessage';

  constructor({ class: string = 'chat-message chat-message_mate' }: ChatMessageProps) {
    super({ class: string });
  }

  protected render(): string {
    // language=hbs
    return `
        <div class='{{class}}'>
            <p>Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила
                Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с
                моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как
                астронавты с собой забрали только кассеты с пленкой.
            </p>
            <time class='chat-message__time'>21:12</time>
        </div>
    `;
  }
}
