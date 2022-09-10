<!-- eslint-disable vue/no-mutating-props -->
<script>
import { updateFamousPersonVotes } from "../models/famousPeople.model"
import moment from "moment";

export default {
  props: ["famousPerson"],
  data() {
    return {
      voted: false,
      positiveSelected: false,
      negativeSelected: false,
      voting: false,
    };
  },
  methods: {
    voteNegative() {
      this.positiveSelected = false;
      this.negativeSelected = true;
    },
    votePositive() {
      this.positiveSelected = true;
      this.negativeSelected = false;
    },
    submitVote() {
      if (!this.voted) {
        this.voting = true;
        if (this.positiveSelected) this.updateVotes(1);
        else this.updateVotes(-1);
        this.positiveSelected = false;
        this.negativeSelected = false;
      } else {
        this.voted = false;
      }
    },
    updateVotes(inc) {
      let id = this.famousPerson.id;
      let positiveVotes = this.famousPerson.votes.positive;
      let negativeVotes = this.famousPerson.votes.negative;
      let lastUpdated = new Date().toISOString();

      if (inc > 0) positiveVotes++;
      else negativeVotes++;

      updateFamousPersonVotes(id, {
        votes: {
          negative: negativeVotes,
          positive: positiveVotes,
        },
        lastUpdated: lastUpdated,
      })
        .then(() => {
          this.famousPerson.votes.negative = negativeVotes;
          this.famousPerson.votes.positive = positiveVotes;
          this.famousPerson.lastUpdated = lastUpdated;
          console.log("Vote added.");
        })
        .catch((error) => console.log(error))
        .finally(() => {
          this.voted = true;
          this.voting = false;
        });
    },
    calculatePercents() {
      const totalVotes = this.famousPerson.votes.negative + this.famousPerson.votes.positive;
      const negativePercent =
        totalVotes > 0
          ? parseInt((100 * this.famousPerson.votes.negative) / totalVotes)
          : 50;
      const positivePercent = totalVotes > 0 ? 100 - negativePercent : 0;
      return {
        negative: negativePercent,
        positive: positivePercent,
      };
    },
  },
  computed: {
    votesPercents() {
      return this.calculatePercents();
    },
    noVoteSelected() {
      return !(this.negativeSelected || this.positiveSelected || this.voted);
    },
    backgroundImage() {
      return (
        "linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)), url('../assets/img/" +
        this.famousPerson.picture +
        "')"
      );
    },
    relativeTime() {
      return moment(this.famousPerson.lastUpdated).fromNow();
    },
    submitVoteText() {
      return this.voted
        ? "Vote Again"
        : this.voting
        ? "Waiting..."
        : "Vote Now";
    }
  },
};
</script>

<template>
  <div class="voting-card" :style="{ backgroundImage: backgroundImage }">
    <div class="voting-card__header">
      <div
        v-if="votesPercents.negative < votesPercents.positive"
        class="voting-card__title-thumb"
        aria-label="thumbs up"
      >
        <img
          class="voting-card__title-icon"
          src="assets/img/thumbs-up.svg"
          alt="thumbs up"
        />
      </div>
      <div v-else class="voting-card__title-thumb" aria-label="thumbs down">
        <img
          class="voting-card__title-icon"
          src="assets/img/thumbs-down.svg"
          alt="thumbs down"
        />
      </div>
      <h2 class="voting-card__title">{{ famousPerson.name }}</h2>
    </div>
    <div class="voting-card__content">
      <p class="voting-card__description">
        {{ famousPerson.description }}
      </p>
      <p v-if="!voted && !voting" class="voting-card__relative-time">
        {{ relativeTime + " in " }}<span>{{ famousPerson.category }}</span>
      </p>
      <p v-else-if="voting" class="voting-card__relative-time">Voting...</p>
      <p v-else class="voting-card__relative-time">Thank you for your vote!</p>
      <div class="voting-card__buttons">
        <button
          v-if="!voted"
          class="icon-button"
          :class="{ selected: positiveSelected }"
          aria-label="thumbs up"
          @click="votePositive"
        >
          <img src="assets/img/thumbs-up.svg" alt="thumbs up" />
        </button>
        <button
          v-if="!voted"
          class="icon-button"
          :class="{ selected: negativeSelected }"
          aria-label="thumbs down"
          @click="voteNegative"
        >
          <img src="assets/img/thumbs-down.svg" alt="thumbs down" />
        </button>
        <button
          class="voting-card__submit"
          :disabled="noVoteSelected"
          @click="submitVote"
        >
          {{ submitVoteText }}
        </button>
      </div>
    </div>
    <div class="voting-card__gauge">
      <div
        class="voting-gauge__left"
        :style="{ width: votesPercents.positive + '%' }"
      >
        <img
          class="voting-gauge__icon"
          src="assets/img/thumbs-up.svg"
          alt="thumbs up"
        />
        <span class="voting-gauge__number">{{ votesPercents.positive }}%</span>
      </div>
      <div
        class="voting-gauge__right"
        :style="{ width: votesPercents.negative + '%' }"
      >
        <span class="voting-gauge__number">{{ votesPercents.negative }}%</span>
        <img
          class="voting-gauge__icon"
          src="assets/img/thumbs-down.svg"
          alt="thumbs down"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.voting-card {
  position: relative;
  height: 300px;
  width: 320px;
  min-width: 320px;
  background-size: cover;
}

.voting-card__header {
  position: absolute;
  bottom: 58%;
  display: flex;
  align-items: end;
  padding-right: 2rem;
}

.voting-card__title-thumb {
  display: flex;
  left: 0;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  max-width: 3rem;
  align-items: center;
  height: 2.5rem;
}

.voting-card__title-thumb[aria-label="thumbs up"] {
  background-color: rgba(var(--color-green-positive), 1);
}

.voting-card__title-thumb[aria-label="thumbs down"] {
  background-color: rgba(var(--color-yellow-negative), 1);
}

.voting-card__title {
  display: -webkit-box;
  margin-bottom: -0.5rem;
  color: var(--color-white);
  font-size: 2.6rem;
  font-weight: 400;
  line-height: normal;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.voting-card__content {
  position: absolute;
  top: 42%;
  left: 0%;
  width: 100%;
  padding-left: 3.5rem;
  padding-right: 3rem;
  color: var(--color-white);
  -webkit-box-sizing: border-box;
}

.voting-card__description {
  display: -webkit-box;
  overflow: hidden;
  margin: 1rem 0;
  -webkit-box-orient: vertical;
  font-size: 1.25rem;
  font-weight: 300;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.voting-card__relative-time {
  text-align: end;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.voting-card__relative-time > span {
  text-transform: capitalize;
}

.voting-card__buttons {
  display: flex;
  justify-content: end;
  align-items: center;
}

.voting-card__buttons > .icon-button {
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 1rem;
}

.selected {
  border: solid 1px var(--color-white);
}
.selected[aria-label="thumbs up"] {
  background-color: rgba(var(--color-green-positive), 1);
}
.selected[aria-label="thumbs down"] {
  background-color: rgba(var(--color-yellow-negative), 1);
}

.voting-card__buttons > .icon-button > img {
  max-width: 1.25rem;
}

.voting-card__buttons > .icon-button > img {
  max-width: 1.25rem;
}

.voting-card__submit {
  background-color: var(--color-darker-background);
  border: 1px solid var(--color-white);
  color: var(--color-white);
  height: 3.2rem;
  padding-left: 2rem;
  padding-right: 2rem;
  font-size: 1.25rem;
}

.voting-card__submit:active {
  background-color: var(--color-dark-background);
}

.voting-card__submit[disabled] {
  border: none;
  background-color: var(--color-dark-gray);
  color: var(--color-gray);
}

.voting-card__gauge {
  position: absolute;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 3rem;
}

.voting-gauge__left {
  display: flex;
  width: 30%;
  justify-content: flex-start;
  align-items: center;
  padding-left: 1.25rem;
  background-color: rgba(var(--color-green-positive), 0.5);
  font-weight: 300;
  text-transform: uppercase;
  width: 50%;
}

.voting-gauge__right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 1.25rem;
  width: 50%;
  background-color: rgba(var(--color-yellow-negative), 0.5);
}

.voting-gauge__icon {
  max-width: 1.5rem;
}

.voting-gauge__number {
  color: var(--color-white);
  font-size: 1.5rem;
  font-weight: 400;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
}

@media all and (min-width: 500px) {
}

@media all and (min-width: 768px) {
}

@media all and (min-width: 1100px) {
}
</style>
