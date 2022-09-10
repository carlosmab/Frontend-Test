<script>
export default {
  props: ["famousPerson"],
  mounted() {
    this.date
  },  
  data() {
    return {
    };
  },
};
</script>

<template>
  <div class="voting-card">
    <div class="voting-card__header">
      <div class="voting-card__title-thumb">
        <img src="assets/img/thumbs-up.svg" alt="thumbs up" />
      </div>
      <h2 class="voting-card__title">{{ famousPerson.name }}</h2>
    </div>
    <div class="voting-card__content">
      <p class="voting-card__description">
        {{ famousPerson.description }}
      </p>
      <p class="voting-card__date">24 days ago in Bussiness</p>
      <div class="voting-card__buttons">
        <button class="icon-button" aria-label="thumbs up">
          <img src="assets/img/thumbs-up.svg" alt="thumbs up" />
        </button>
        <button class="icon-button" aria-label="thumbs down">
          <img src="assets/img/thumbs-down.svg" alt="thumbs down" />
        </button>
        <button class="voting-card__submit">
          Vote Now
        </button>
      </div>
    </div>
    <div class="voting-card__gauge">
      <div class="voting-gauge__left">
        <img class="voting-gauge__icon" src="assets/img/thumbs-up.svg" alt="thumbs up" />
        <span class="voting-gauge__number">50%</span>
      </div>
      <div class="voting-gauge__right">
        <span class="voting-gauge__number">50%</span>
        <img class="voting-gauge__icon"  src="assets/img/thumbs-down.svg" alt="thumbs down" />
      </div>
    </div>
  </div>
</template>

<style>
.voting-card {
  position: relative;
  height: 300px;
  width: 320px;
  background-image: 
    linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)),
    url("../assets/img/pope-francis.png");
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
  padding-left: .75rem;
  padding-right: .75rem;
  max-width: 3rem;
  align-items: center;
  height: 2.5rem;
  background-color: rgba(var(--color-green-positive), 1);
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

.voting-card__date {
  text-align: end;
  font-size: 1rem;
  margin-bottom: 1rem;
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
  background-color: rgba(var(--color-green-positive), .5);
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
  background-color: rgba(var(--color-yellow-negative), .5);
}

.voting-gauge__icon {
  max-width: 1.5rem;
}

.voting-gauge__number {
  color: var(--color-white);
  font-size: 1.5rem;
  font-weight: 400;
  margin-right: .5rem;
  margin-left: .5rem;
}


@media all and (min-width: 500px) {

}

@media all and (min-width: 768px) {

}

@media all and (min-width: 1100px) {

 
}
</style>
