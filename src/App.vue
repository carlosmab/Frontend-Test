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
      selectedLayout: "Grid",
      hideOptions: true,
    };
  },
  methods: {
    toggleLayoutOptions() {
      this.hideOptions = !this.hideOptions;
    },
    changeLayout(type) {
      this.selectedLayout = type;
      this.hideOptions = true;
    },
  },
};
</script>

<template>
  <div>
    <div class="previous-rulings__header">
      <h3 class="previous-rulings__title">Previous Rulings</h3>

      <div class="previous-rulings__menu">
        <button
          class="previous-rulings__menu-button"
          @click="toggleLayoutOptions"
        >
          {{ selectedLayout }}
        </button>
        <div
          class="previous-rulings__menu-options"
          :class="{ hide_options: hideOptions }"
        >
          <button
            class="previous-rulings__menu-option"
            @click="changeLayout('Grid')"
          >
            Grid
          </button>
          <button
            class="previous-rulings__menu-option"
            @click="changeLayout('List')"
          >
            List
          </button>
        </div>
      </div>
    </div>
    <div
      :class="{
        'previous-rulings__container': selectedLayout == 'Grid',
        'previous-rulings__container-list': selectedLayout == 'List',
      }"
    >
      <voting-card-component
        v-for="famousPerson in famousPeople"
        :famousPerson="famousPerson"
        :layout="selectedLayout"
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
  overflow-x: auto;
  gap: 10px;
  font-size: 12px;
}

.previous-rulings__container-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 12px;
}

.previous-rulings__menu {
  display: none;
}

.previous-rulings__menu-options {
  display: block;
  position: absolute;
  z-index: 100;
}

.previous-rulings__menu-button,
.previous-rulings__menu-option {
  border: 2px solid var(--color-dark-gray);
  background-color: var(--color-white);
  width: 120px;
  height: 2.25rem;
  text-align: center;
  font-family: inherit;
  font-size: 0.7rem;
  --webkit-appearance: none;
  padding: 0.2rem;
  cursor: pointer;
}

.previous-rulings__menu-option {
  margin-top: -2px;
}

.hide_options {
  display: none;
}

.previous-rulings__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

 /* Tablets Size */
 @media all and (min-width: 500px) {
  .previous-rulings__container {
    display: flex;
    flex-wrap: wrap;
    overflow: unset;
    justify-content: center;
    gap: 20px;
  }
  .previous-rulings__menu {
    display: block;
  }

  .previous-rulings__menu-button,
  .previous-rulings__menu-option {
    font-size: 1rem;
  }
 }

 @media all and (min-width: 768px) {
  .previous-rulings__title {
    font-size: 45px;
  }
  .previous-rulings__container {
    gap: 20px;
    justify-content: center;
  }
  .previous-rulings__container-list {
    gap: 20px;
    justify-content: center;
    font-size: 14px;
  }
 }

 
 @media all and (min-width: 1100px) {
  .previous-rulings__container {
    gap: 25px;
    justify-content: space-between;
  }
 }
</style>
