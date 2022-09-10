<script>
import { fetchFamousPeople } from "./models/famousPeople.model";
import VotingCardComponent from "./components/VotingCardComponent.vue";

export default {
  components: {
    VotingCardComponent,
  },
  mounted() {
    fetchFamousPeople()
      .then( (famousPeople) => {
        console.log(famousPeople);
        this.famousPeople = famousPeople;
      })
      .catch( (error) => console.log(error) );
  },
  data() {
    return {
      famousPeople: [],
      message: "Hello Vue",
    };
  },
  methods: {
  }
};
</script>

<template>
  <div>
    <voting-card-component v-for="famousPerson in famousPeople" :famousPerson="famousPerson" :key="famousPerson.id"></voting-card-component>
  </div>
</template>

<style scoped></style>
