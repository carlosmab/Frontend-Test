<script>
import { fetchFamousPeople } from "./models/famousPeople.model";
import VotingCardComponent from "./components/VotingCardComponent.vue";

export default {
  components: {
    VotingCardComponent,
  },
  mounted() {
    fetchFamousPeople()
      .then((famousPeople) => {
        this.famousPeople = famousPeople;
      })
      .catch((error) => console.log(error));
  },
  data() {
    return {
      famousPeople: [],
    };
  },
};
</script>

<template>
  <div>
    <h3 class="previous-rulings__title">Previous Rulings</h3>
    <div class="previos-rulings__container">
      <voting-card-component
        v-for="famousPerson in famousPeople"
        :famousPerson="famousPerson"
        :key="famousPerson.id"
      ></voting-card-component>
    </div>
  </div>
</template>

<style scoped>
  .previous-rulings__title {
    font-size: 24px;
  }

  .previous-rulings__container {
    width: auto;
    display: flex;
    flex-direction: ro;
    flex-wrap: nowrap;
  }
</style>
