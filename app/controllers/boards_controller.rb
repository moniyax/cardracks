class BoardsController < ApplicationController
  before_action :set_board, only: [:show, :update, :destroy]

  # GET /boards
  def index
    @boards = @current_user.created_boards

    render json: @boards
  end

  # GET /boards/1
  def show
    render json: @board
  end

  # POST /boards
  def create
    @board = @current_user.created_boards.build(board_params)
    @board.rack_order = []

    if @board.save
      render json: @board, status: :created, location: @board
    else
      render json: @board.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /boards/1
  def update
    if @board.update(board_params)
      render json: @board
    else
      render json: @board.errors, status: :unprocessable_entity
    end
  end

  # DELETE /boards/1
  def destroy
    @board.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_board
      @board = @current_user.created_boards.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def board_params
      params.require(:board).permit(:id, :title, rack_order: [])
    end
end
