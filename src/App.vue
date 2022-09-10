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
    <div class="previous-rulings__container">
      <voting-card-component
        v-for="famousPerson in famousPeople"
        :famousPerson="famousPerson"
        :key="famousPerson.id"
        class="card"
      ></voting-card-component>
    </div>
  </div>
</template>

<style scoped>
  .previous-rulings__title {
    font-size: 24px;
  }

  .previous-rulings__container {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 10px;
  }
</style>
