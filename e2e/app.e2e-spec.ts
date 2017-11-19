import { AngularTetrisPage } from './app.po';

describe('angular-tetris App', function() {
  let page: AngularTetrisPage;

  beforeEach(() => {
    page = new AngularTetrisPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
