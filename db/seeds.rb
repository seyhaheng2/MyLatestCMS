# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

news = Category.create(name: "News")
app = Category.create(name: "App & Games")
best = Category.create(name: "The Best")
how = Category.create(name: "How To")
more = Category.create(name: "More")

Subcategory.create(name: "Root", category_id: how.id)
Subcategory.create(name: "Jailbreak", category_id: how.id)
Subcategory.create(name: "Tweak Mobile", category_id: how.id)

Subcategory.create(name: "iOS AppGames", category_id: app.id)
Subcategory.create(name: "aPK AppGames", category_id: app.id)

Subcategory.create(name: "Tech", category_id: news.id)
Subcategory.create(name: "Entertainment", category_id: news.id)
Subcategory.create(name: "Art", category_id: news.id)

AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password')
User.create!(username:'Jonh Divid', email: 'davidjonh@gmail.com')
User.create!(username:'Oliv Priv', email: 'olivpriv@gmail.com')
