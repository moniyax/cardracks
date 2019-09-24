class CardRacksController < ApplicationController
  before_action :set_card_rack, only: [:show, :update, :destroy]

  # GET /card_racks
  def index
    @card_racks = CardRack.all

    render json: @card_racks
  end

  # GET /card_racks/1
  def show
    render json: @card_rack
  end

  # POST /card_racks
  def create
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
      params.require(:card_rack).permit(:title, :board_id)
    end
end
