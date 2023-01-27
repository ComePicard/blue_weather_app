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
                flat
                v-model="selectedCity"
                :search-input.sync="searchCity"
                cache-items
                hide-no-data
                :items="cities.results"
                :item-value="getCoord"
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
                color="success">
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
            selectedCity: {},
        }
    },

    methods:{
        getCoord(item){
            return [item.latitude, item.longitude];
        }
    },

    watch :{
        searchCity: {
            async handler(){
                if(this.searchCity!=="" ||this.searchCity!==null){
                    this.cities = await getCityByName({name: this.searchCity})
                }
                else{
                    this.cities = [];
                }
            }
        },
    }
}
</script>