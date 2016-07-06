'use strict';

describe('The main view', function () {
  var page;

  beforeEach(function () {
    browser.get('http://localhost:3000/index.html');
    page = require('./main.po');
  });

  it('should redirect to the Sign-Up page when the sign-up link is clicked', function() {
    page.signUp.click();
    expect(browser.getCurrentUrl()).toContain('#/sign-up');
  });

  it('should ask the user to log in', function() {
    expect(page.h2El.getText()).toBe('Please login');
  });
});
