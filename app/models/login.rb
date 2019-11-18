class Login
  include ActiveModel::Validations
  attr_accessor :email, :password, :error_msg

  validates :email, presence: true
  validates :password, presence: true

  def self.create email, password
    l = Login.new
    l.email = email
    l.password = password
    l.validate
    l
  end

  def valid?
    !errors.any?
  end

  def error_msg
    if errors.any?
      errors.full_messages
    end
  end
end