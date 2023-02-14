<template>
    <v-card>
        <v-toolbar color="blue lighten-2" flat>
            <v-toolbar-title>
                <v-icon>mdi-sort-variant-remove</v-icon>
                Manage Cities
            </v-toolbar-title>
        </v-toolbar>
        <v-chip-group
            class="my-4"
            show-arrows
            multiple
            active-class="red darken-3 white--text large">
            <v-chip
                v-for="city in cities"
                :key="city.name"
                filter
                @change="getSelectedCity(city)">
                {{city.name}}
            </v-chip>
        </v-chip-group>
        <v-card-actions>
            <v-btn
                outlined
                @click="$emit('close')">
                Cancel
            </v-btn>
            <v-spacer/>
            <v-btn
                color="error"
                outlined
                @click="deleteCities()">
                Delete
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>

export default{
    name: "manageCity",

    data(){
        return {
            cities: [],
            selected_cities: []
        }
    },

    mounted() {
        this.getCities();
    },

    methods: {
        getCities(){
            const items = {...localStorage}
            this.cities = []
            Object.values(items).forEach(city => {
                this.cities.push(JSON.parse(city))
            });
        },

        getSelectedCity(item){
            if(!this.selected_cities.includes(item)){
                this.selected_cities.push(item)
            } else {
                this.selected_cities.splice(this.selected_cities.indexOf(item), 1)
            }
        },

        deleteCities(){
            this.$emit('delete', {cities: this.selected_cities})
            this.selected_cities.forEach(city =>{
                this.cities.splice(this.cities.indexOf(city), 1)
            })
            this.selected_cities = []
        }
    }
}
</script>