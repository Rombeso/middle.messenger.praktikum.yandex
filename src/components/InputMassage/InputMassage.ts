import Block from 'core/Block';
import './InputMassage.scss';

interface InputMessageProps {
  class: string;
}

export default class InputMessage extends Block<InputMessageProps> {
  static componentName: string = 'InputMassage';

  constructor({ class: string }: InputMessageProps) {
    super({ class: string });
  }

  render() {
    // language=hbs
    return `
    <textarea class='{{class}}' name='message' placeholder='Мessage...'></textarea>
    `;
  }
}
