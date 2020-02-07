class CardsController < ApplicationController
  before_action :set_card, only: [:show, :update, :destroy, :reorder]

  # GET /cards/1
  def show
    render json: @card
  end

  # POST /cards
  def create
    @card = Card.new(card_params)

    if @card.save
      ActionCable.server.broadcast(
        "cards_channel_for_user_#{@current_user.id}",
        @card.to_json)
      if @card.card_rack.update(card_order: params[:card_order])
        render json: @card, status: :created, location: @card
      else
        render json: @card.errors, status: :unprocessable_entity
      end
    else
      render json: @card.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /cards/1
  def update
    if @card.update(card_params)
      if @card.card_rack.update(card_order: params[:card_order])
        render json: @card
      else
        puts "--- card order NOT updated"

      end
    else
      render json: @card.errors, status: :unprocessable_entity
    end
  end

  # DELETE /cards/1
  def destroy
    @card.destroy
  end

  def reorder
    if @card.card_rack.update(card_order: params[:card_order])
      puts "--- card order updates"
    else
      puts "--- card order NOT updates"

    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_card
      @card = Card.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def card_params
      params.permit(:id, :title, :card_rack_id)
    end
end
