<!-- eslint-disable vue/no-mutating-props -->
<script>
import { updateFamousPersonVotes } from "../models/famousPeople.model";
import moment from "moment";

export default {
  props: ["famousPerson", "layout"],
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
      const totalVotes =
        this.famousPerson.votes.negative + this.famousPerson.votes.positive;
      const negativePercent =
        totalVotes > 0
          ? (100 * this.famousPerson.votes.negative) / totalVotes
          : 50;
      const positivePercent = totalVotes > 0 ? 100 - negativePercent : 0;
      return {
        negative: negativePercent.toFixed(1),
        positive: positivePercent.toFixed(1),
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
      if (this.layout == "Grid") {
        return (
          "linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)), url('../assets/img/" +
          this.famousPerson.picture +
          "')"
        );
      }
      return (
        "linear-gradient(to left, rgba(136, 136, 136, 1), rgba(0, 0, 0, 0)), url('../assets/img/" +
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
    },
    isGrid() {
      return this.layout == "Grid";
    },
  },
};
</script>

<template>
  <div
    :class="{ 'voting-card': isGrid, 'voting-card-list': !isGrid }"
    :style="{ backgroundImage: backgroundImage }"
  >
    <div v-if="!isGrid" class="voting-card-list__gradient"></div>
    <div
      :class="{
        'voting-card__header': isGrid,
        'voting-card-list__header': !isGrid,
      }"
    >
      <div
        v-if="votesPercents.negative < votesPercents.positive"
        :class="{
          'voting-card__title-thumb': isGrid,
          'voting-card-list__title-thumb': !isGrid,
        }"
        aria-label="thumbs up"
      >
        <img
          class="voting-card__title-icon"
          src="/assets/img/thumbs-up.svg"
          alt="thumbs up"
        />
      </div>
      <div
        v-else
        :class="{
          'voting-card__title-thumb': isGrid,
          'voting-card-list__title-thumb': !isGrid,
        }"
        aria-label="thumbs down"
      >
        <img
          class="voting-card__title-icon"
          src="/assets/img/thumbs-down.svg"
          alt="thumbs down"
        />
      </div>
      <h2
        :class="{
          'voting-card__title': isGrid,
          'voting-card-list__title': !isGrid,
        }"
      >
        {{ famousPerson.name }}
      </h2>
    </div>
    <div
      :class="{
        'voting-card__content': isGrid,
        'voting-card-list__content': !isGrid,
      }"
    >
      <p
        :class="{
          'voting-card__description': isGrid,
          'voting-card-list__description': !isGrid,
        }"
      >
        {{ famousPerson.description }}
      </p>
      <div
        :class="{
          'voting-card__voting-area': isGrid,
          'voting-card-list__voting-area': !isGrid,
        }"
      >
        <p v-if="!voted && !voting" class="voting-card__relative-time">
          {{ relativeTime + " in " }}<span>{{ famousPerson.category }}</span>
        </p>
        <p v-else-if="voting" class="voting-card__relative-time">Voting...</p>
        <p v-else class="voting-card__relative-time">
          Thank you for your vote!
        </p>
        <div class="voting-card__buttons">
          <button
            v-if="!voted"
            class="icon-button"
            :class="{ selected: positiveSelected }"
            aria-label="thumbs up"
            @click="votePositive"
          >
            <img src="/assets/img/thumbs-up.svg" alt="thumbs up" />
          </button>
          <button
            v-if="!voted"
            class="icon-button"
            :class="{ selected: negativeSelected }"
            aria-label="thumbs down"
            @click="voteNegative"
          >
            <img src="/assets/img/thumbs-down.svg" alt="thumbs down" />
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
    </div>
    <div
      :class="{
        'voting-card__gauge': isGrid,
        'voting-card-list__gauge': !isGrid,
      }"
    >
      <div
        class="voting-gauge__left"
        :style="{ width: votesPercents.positive + '%' }"
      >
        <img
          class="voting-gauge__icon"
          src="/assets/img/thumbs-up.svg"
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
          src="/assets/img/thumbs-down.svg"
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

.voting-card-list {
  position: relative;
  height: 170px;
  width: 100%;
  min-width: 320px;
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: -4%;
  background-size: 267px 267px;
}

.voting-card-list__gradient {
  position: absolute;
  right: 0;
  height: 170px;
  width: 76%;
  background: linear-gradient(
    to left,
    rgba(51, 51, 51, 0.6),
    rgba(102, 102, 102, 1),
    rgba(136, 136, 136, 1)
  );
}

.voting-card__header,
.voting-card-list__header {
  position: absolute;
  bottom: 58%;
  display: flex;
  align-items: end;
  padding-right: 2em;
}

.voting-card__title-thumb,
.voting-card-list__title-thumb {
  display: flex;
  left: 0;
  padding-left: 0.75em;
  padding-right: 0.75em;
  max-width: 3em;
  align-items: center;
  height: 2.5em;
}

.voting-card__title-thumb[aria-label="thumbs up"],
.voting-card-list__title-thumb[aria-label="thumbs up"] {
  background-color: rgba(var(--color-green-positive), 1);
}

.voting-card__title-thumb[aria-label="thumbs down"],
.voting-card-list__title-thumb[aria-label="thumbs down"] {
  background-color: rgba(var(--color-yellow-negative), 1);
}

.voting-card__title,
.voting-card-list__title {
  display: -webkit-box;
  margin-bottom: -0.2em;
  color: var(--color-white);
  font-size: 2.6em;
  font-weight: 400;
  line-height: normal;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.voting-card-list__title {
  max-width: 40%;
  -webkit-line-clamp: 1;
}

.voting-card__content {
  position: absolute;
  top: 42%;
  left: 0%;
  width: 100%;
  padding-left: 3.5em;
  padding-right: 3em;
  color: var(--color-white);
  -webkit-box-sizing: border-box;
  z-index: 10;
}

.voting-card-list__content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding-top: 52px;
  padding-left: 150px;
  padding-right: 10px;
  color: var(--color-white);
  -webkit-box-sizing: border-box;
  z-index: 10;
  display: flex;
  align-items: bottom;
}

.voting-card__description {
  display: -webkit-box;
  overflow: hidden;
  margin: 1em 0;
  -webkit-box-orient: vertical;
  font-size: 1.25em;
  font-weight: 300;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.voting-card-list__description {
  display: -webkit-box;
  overflow: hidden;
  width: 50%;
  margin: 1em 0;
  -webkit-box-orient: vertical;
  font-size: 1.25em;
  font-weight: 300;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.voting-card__voting-area {
  margin-top: -0.3em;
}
.voting-card-list__voting-area {
  position: absolute;
  top: -5px;
  right: 15px;
}

.voting-card__relative-time {
  text-align: end;
  font-size: 1em;
  margin-bottom: 1em;
  margin-top: 1em;
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
  width: 2.5em;
  height: 2.5em;
  margin-right: 1em;
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
  max-width: 1.25em;
}

.voting-card__submit {
  background-color: var(--color-darker-background);
  border: 1px solid var(--color-white);
  color: var(--color-white);
  height: 2.5em;
  padding-left: 2em;
  padding-right: 2em;
  font-size: 1.25em;
}

.voting-card__submit:active {
  background-color: var(--color-dark-background);
}

.voting-card__submit[disabled] {
  border: none;
  background-color: var(--color-dark-gray);
  color: var(--color-gray);
}

.voting-card__gauge,
.voting-card-list__gauge {
  position: absolute;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 3em;
  font-size: 1em;
}

.voting-gauge__left {
  display: flex;
  width: 30%;
  justify-content: flex-start;
  align-items: center;
  padding-left: 1.25em;
  background-color: rgba(var(--color-green-positive), 0.5);
  font-weight: 300;
  text-transform: uppercase;
  width: 50%;
}

.voting-gauge__right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 1.25em;
  width: 50%;
  background-color: rgba(var(--color-yellow-negative), 0.5);
}

.voting-gauge__icon {
  max-width: 1.5em;
}

.voting-gauge__number {
  color: var(--color-white);
  font-size: 1.5em;
  font-weight: 400;
  margin-right: 0.5em;
  margin-left: 0.5em;
}

/* Tablets Size */
@media all and (min-width: 500px) {
  .voting-card-list__header {
    top: 0;
    align-items: start;
    width: 100%;
  }

  .voting-card-list__gradient {
    width: 76%;
  }
  .voting-card-list__title-thumb {
    top: 0;
  }

  .voting-card-list__title {
    top: 10px;
    position: absolute;
    left: 150px;
  }
}

@media all and (min-width: 768px) {
  .voting-card {
    position: relative;
    height: 350px;
    width: 350px;
    min-width: 350px;
    background-size: cover;
  }

  .voting-card__header {
    bottom: 50%;
  }

  .voting-card__content {
    top: 50%;
  }
  .voting-card-list__gradient {
    width: 80%;
  }

  .voting-card-list__content {
    padding-top: 45px;
  }
  .voting-card-list__gauge {
    font-size: 1.3em;
  }
  .voting-gauge__icon{
    width: 1.3em;
  }

  .voting-card-list__voting-area > .voting-card__buttons > .icon-button > img {
    width: 1.5em;
    max-width: 1.5em;
  }

  .voting-card-list__voting-area > .voting-card__buttons > .icon-button {
    width: 3.5em;
    height: 3.1em;
  }

  .voting-card-list__title-thumb {
    width: 2.5em;
    height: 3.1em;
    padding-right: 0;
  }
  .voting-card-list__title-thumb > img {
    width: 1.5em;
    max-width: 1.5em;
  }
}

@media all and (min-width: 1100px) {

   .voting-card-list__gradient {
    width: 80%;
  }

  .voting-card-list__title {
    max-width: 60%;
  }
  
  .voting-card-list__description {
    width: 60%;
  }
}
</style>
