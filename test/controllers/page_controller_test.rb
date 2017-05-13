require 'test_helper'

class PageControllerTest < ActionDispatch::IntegrationTest
  test "should get privacy" do
    get page_privacy_url
    assert_response :success
  end

  test "should get contact" do
    get page_contact_url
    assert_response :success
  end

  test "should get dmca" do
    get page_dmca_url
    assert_response :success
  end

  test "should get about" do
    get page_about_url
    assert_response :success
  end

end
