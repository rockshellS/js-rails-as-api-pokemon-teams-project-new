class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all

        render json: pokemons.to_json(:include => {
            :trainer => { :only => [:name]}
        },
        :except => [:created_at, :updated_at]) 
    end 

    def create
        pokemon = Pokemon.create(species: Faker::Games::Pokemon.name, nickname: Faker::Name.first_name, trainer_id: params[:_json])

        render json: pokemon.to_json(:include => {
            :trainer => { :only => [:name]}
        },
        :except => [:created_at, :updated_at])
    end


    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
    end

end
