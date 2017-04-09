import { SendgunUiPage } from './app.po';

describe('sendgun-ui App', () => {
  let page: SendgunUiPage;

  beforeEach(() => {
    page = new SendgunUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
