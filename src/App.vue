<script>
import VotingCard from "./components/VotingCardComponent.vue";

export default {
  components: {
    VotingCard,
  },

  data() {
    return {
      message: "Hello Vue",
    };
  },
};
</script>

<template>
  <div>
    <voting-card></voting-card>
  </div>
</template>

<style scoped></style>
