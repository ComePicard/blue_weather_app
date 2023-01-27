<template>
    <v-card>
        <v-toolbar color="blue lighten-2">
            <v-toolbar-title>
                <v-icon icon="mdi-magnify"/>
                Search city
            </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-autocomplete
                class="mt-2"
                clearable
                auto-select-first
                flat
                v-model="selectedCity"
                :search-input.sync="searchCity"
                cache-items
                hide-no-data
                :items="cities.results"
                return-object
                item-text="name">
                <template v-slot:item="{ item }">
                    <v-list-item-content>
                        <v-list-item-title v-text="item.name"></v-list-item-title>
                        <v-list-item-subtitle v-text="item.country"></v-list-item-subtitle>
                    </v-list-item-content>                
                </template>
            </v-autocomplete>
        </v-card-text>
        <v-card-actions>
            <v-btn
                outlined
                color="secondary"
                @click="$emit('close')">
                Cancel
            </v-btn>
            <v-spacer/>
            <v-btn
                outlined
                color="success"
                @click="$emit('add', {
                    name: selectedCity['name'],
                    latitude: selectedCity['latitude'], 
                    longitude: selectedCity['longitude']
                    }
                )">
                Add
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { getCityByName } from '@/services/service';

export default {
    name: "searchCity",

    data(){
        return{
            searchCity: "",
            cities: [],
            selectedCity: [],
        }
    },

    watch :{
        searchCity: {
            async handler(){
                if(this.searchCity!=="" || this.searchCity!==null){
                    this.cities = await getCityByName({name: this.searchCity, number: 10})
                }
                else{
                    this.cities = [];
                }
            }
        },
    }
}
</script>