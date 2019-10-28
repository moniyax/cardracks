class CreateCards < ActiveRecord::Migration[5.2]
  def change
    create_table :cards, id: :uuid do |t|
      t.string :title
      t.uuid :card_rack, foreign_key: true

      t.timestamps
    end
  end
end
