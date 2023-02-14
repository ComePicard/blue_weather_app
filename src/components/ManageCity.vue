<template>
    <v-card>
        <v-toolbar color="blue-lighten-2">
            <v-toolbar-title>
                <v-icon icon="mdi-magnify"/>
                Search city
            </v-toolbar-title>
        </v-toolbar>
        <v-chip-group
            show-arrows
            multiple
            active-class="blue darken-3 white--text large">
            <v-chip
                v-for="city in cities"
                :key="city.name"
                filter>
                {{city.name}}
            </v-chip>
        </v-chip-group>
        <v-card-actions>
            <v-btn
                outlined
                @click="$emit('close')">
                <v-icon
                    left
                    color="secondary">
                    mdi-arrow-u-left-top
                </v-icon>
                Cancel
            </v-btn>
            <v-spacer/>
            <v-btn
                outlined>
                <v-icon
                    left
                    color="error">
                    mdi-trash-can-outline
                </v-icon>
                Delete
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>

export default{
    name: "manageCity",

    props: {
    },

    data(){
        return {
            cities : [],
        }
    },

    mounted() {
        this.getCities();
    },

    methods: {
        getCities(){
            const items = {...localStorage}
            Object.values(items).forEach(
                city => this.cities.push(JSON.parse(city)));
        }
    }
}
</script>