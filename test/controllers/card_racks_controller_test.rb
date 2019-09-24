require 'test_helper'

class CardRacksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @card_rack = card_racks(:one)
  end

  test "should get index" do
    get card_racks_url, as: :json
    assert_response :success
  end

  test "should create card_rack" do
    assert_difference('CardRack.count') do
      post card_racks_url, params: { card_rack: { board_id: @card_rack.board_id, title: @card_rack.title } }, as: :json
    end

    assert_response 201
  end

  test "should show card_rack" do
    get card_rack_url(@card_rack), as: :json
    assert_response :success
  end

  test "should update card_rack" do
    patch card_rack_url(@card_rack), params: { card_rack: { board_id: @card_rack.board_id, title: @card_rack.title } }, as: :json
    assert_response 200
  end

  test "should destroy card_rack" do
    assert_difference('CardRack.count', -1) do
      delete card_rack_url(@card_rack), as: :json
    end

    assert_response 204
  end
end
