import Block from 'core/Block';
import { AnyProps } from 'core/RegisterComponent';
import './InputSearch.scss';

export default class InputSearch extends Block<AnyProps> {
  static componentName: string = 'InputSearch';

  render() {
    // language=hbs
    return `
    <form class='search'>
    <input name='search' placeholder='Search...' class='search__input' />
    <button type='submit' class='search__submit-button'>Search</button>
</form>
    `;
  }
}
