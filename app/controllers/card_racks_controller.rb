class CardRacksController < ApplicationController
  before_action :set_card_rack, only: [:show, :update, :destroy]

  # GET /card_racks
  def index
    b = Board.find(params[:board_id])
    
    card_racks = b.card_racks.includes(:cards).sort{|x,y|
      b.rack_order.find_index(x.id) <=> b.rack_order.find_index(y.id)
    }

    card_attrs = card_racks.map do |card_rack|
      ca = card_rack.attributes
      ca[:cards] = card_rack.cards
      ca
    end

    render json: card_attrs
  end

  # GET /card_racks/1
  def show
    render json: @card_rack
  end

  # POST /card_racks
  def create
    # Board.find(params[:board_id]).card_racks.create(title: params[])
    @card_rack = CardRack.new(card_rack_params)

    if @card_rack.save
      render json: @card_rack, status: :created, location: @card_rack
    else
      render json: @card_rack.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /card_racks/1
  def update
    if @card_rack.update(card_rack_params)
      render json: @card_rack
    else
      render json: @card_rack.errors, status: :unprocessable_entity
    end
  end

  # DELETE /card_racks/1
  def destroy
    @card_rack.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_card_rack
      @card_rack = CardRack.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def card_rack_params
      params.permit(:id, :title, :board_id)
    end
end
