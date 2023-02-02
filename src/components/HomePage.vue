<template>
    <!-- <router-view /> -->
    <v-card>
      <v-toolbar 
        color="blue lighten-2"
        flat>
        <v-row class="d-flex justify-space-between">
          <v-dialog v-model="dialogManage">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                icon>
                <v-icon>
                  mdi-format-list-bulleted
                </v-icon>
              </v-btn>
            </template>
            <ManageCity
              @close="validationDialog"/>
          </v-dialog>
          <v-spacer/>
          <v-dialog v-model="dialogSearch">
            <template v-slot:activator="{ on, attrs }">
            <v-btn 
                class="ml-2"
                v-bind="attrs"
                v-on="on"
                icon>
                <v-icon>
                    mdi-magnify
                </v-icon>
            </v-btn>
            </template>
            <SearchCity
              @add="addCity"
              @close="validationDialog"/>
          </v-dialog>          
        </v-row>
      </v-toolbar>
      <v-container>
        <v-row class="d-flex flex-column align-center">
            <v-col cols="12">
              <v-chip-group
                show-arrows
                center-active
                mandatory
                active-class="blue darken-3 white--text">
                <v-chip 
                  v-for="city in cities"
                  :key="city.name"
                  @change="selected_city(city)">
                  {{city.name}}
                </v-chip>
              </v-chip-group>
            </v-col>
        </v-row>
        <v-row class="d-flex justify-center mt-16">
          <span class="text-h2">
            {{temperature + "°C"}}
          </span>
        </v-row>
        <v-row class="d-flex justify-center mt-10">
          <span class="text-h4">
            {{ weather }}
          </span>
        </v-row>
        <v-row class="d-flex justify-center">
          <v-img
            max-width="200px"
            :src="img">
          </v-img>
        </v-row>
      </v-container>
      <v-container class="blue lighten-4">
        <v-row class="ma-2 mb-4 d-flex align-center justify-space-between">
          <v-img max-width="35px" :src="rainy_img"></v-img>
          <span class="text-h5">Tomorrow</span>
          <span class="text-h5">7° / 15°</span>
          <v-btn
            icon>
            <v-icon class="align-self-end">mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
        <v-row class="ma-2 mb-4 d-flex align-center justify-space-between">
          <v-img max-width="35px" :src="thunder_img"></v-img>
          <span class="text-h5">Sunday</span>
          <span class="text-h5">5° / 12°</span>
          <v-btn
            icon>
            <v-icon class="align-self-end">mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
        <v-row class="ma-2 mb-4 d-flex align-center justify-space-between">
          <v-img max-width="35px" :src="sunny_img"></v-img>
          <span class="text-h5">Monday</span>
          <span class="text-h5">8° / 16°</span>
          <v-btn
            icon>
            <v-icon class="align-self-end">mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
        <v-row class="mb-2 d-flex justify-center">
          <v-btn
            color="blue darken-1"
            class="white--text">
            More
          </v-btn>
        </v-row>
      </v-container>
    </v-card>
  </template>
  
  <script>
  import SearchCity from "@/components/SearchCity.vue";
  import ManageCity from "@/components/ManageCity.vue";
  import { getCityCurrentWeather } from "@/services/service";

  
  export default {
    name: "homePage",
  
    components:{
      SearchCity,
      ManageCity
    },  
  
    data(){
      return {
        dialogSearch: false,
        dialogManage: false,

        cityTest : "",

        cities: [],
        temperature: 0,
        weather: "",
        img: null,
        cloudy_img: require("../../public/images/cloudy.png"),
        thunder_img: require("../../public/images/thunder.png"),
        sunny_img: require("../../public/images/sunny.png"),
        rainy_img: require("../../public/images/rainy.png"),
        snowy_img: require("../../public/images/snowy.png")
      }
    },
  
    methods:{
      validationDialog(){
        this.dialogSearch = false;
        this.dialogManage = false;
      },

      async addCity({
        name,
        latitude,
        longitude
      }){
        try {
          this.cities.push(
            {
              "name": name,
              "weather_data":  await getCityCurrentWeather({
                latitude: latitude,
                longitude: longitude,
              })
            }
          );
        } catch (e) {
          console.error(e.message);
        }
        finally{
          this.validationDialog();
        }
      },

      selected_city(item){
        this.temperature = item["weather_data"]["current_weather"]["temperature"];
        this.getWeather({weather_code: item["weather_data"]["current_weather"]["weathercode"]})
      },

      getWeather({weather_code}) {
        switch (weather_code) {
          case 0:
          case 1:
            this.weather = "Sunny";
            this.img = this.sunny_img;
            break;
          case 2:
          case 3:
          case 45:
          case 48:
            this.weather = "Cloudy";
            this.img = this.cloudy_img;
            break;
          case 56:
          case 57:
          case 61:
          case 63:
          case 65:
          case 66:
          case 67:
          case 80:
          case 81:
          case 82:
            this.weather = "Rainy"
            this.img = this.rainy_img;
            break;
          case 71:
          case 73:
          case 75:
          case 77:
          case 85:
          case 86:
            this.weather = "Snowy"
            this.img = this.snowy_img;
            break;
          case 95:
          case 96:
          case 99:
            this.weather = "Thundery"
            this.img = this.thunder_img;
            break;
        }
      }
    },

    async created(){
      await this.addCity({
        name: "Rennes",
        latitude: 48.11198,
        longitude: -1.67429,
      });
      await this.addCity({
        name: "Lannion",
        latitude: 48.73264,
        longitude: -3.45657,
      });
      await this.addCity({
        name: "Angers",
        latitude: 47.47156,
        longitude: -0.55202,
      });
      await this.addCity({
        name: "Rodez",
        latitude: 44.35258,
        longitude: 2.57338,
      });
      await this.addCity({
        name: "Bourg-en-Bresse",
        latitude: 46.20574,
        longitude: 5.2258,
      });

      this.selected_city(this.cities[0])
    }
    
  }
  </script>