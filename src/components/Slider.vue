<template>
  <div
    class="slider__wrapper"
    @mouseover="showButtons"
    @mouseleave="hideButtons"
  >
    <button @click="slideRight" :class="`slider__button slider__button-left`">
      &lsaquo;
    </button>
    <div class="slider_image-container">
      <div
        v-for="(item, index) in items"
        :key="item.image + item.index"
        :class="index === activeIndex ? 'active dot' : 'dot'"
        :style="`left: ${(index + 1) * 1.25}rem`"
        @click="goToSlide(index)"
      ></div>
      <img
        v-for="(item, index) in items"
        :key="item.image"
        :src="item.image"
        :class="item.className"
        :style="index === 0 ? 'left: 0;' : 'left: 100%;'"
      />
    </div>
    <button @click="slideLeft" :class="`slider__button slider__button-right`">
      &rsaquo;
    </button>
  </div>
</template>

<script>
export default {
  props: ["imageUrls"],
  data() {
    return {
      // add className property to show/hide slides
      items: this.imageUrls.map((image) => ({ image, className: "" })),
      areArrowButtonsEnabled: true,
    };
  },
  methods: {
    slideLeft() {
      if (!this.areArrowButtonsEnabled) return;
      this.areArrowButtonsEnabled = false;

      this.items[0].className = "slide-left-exit";
      this.items[1].className = "slide-left-enter";

      setTimeout(() => {
        this.items[0].className = "";
        this.items[1].className = "";

        this.items.push(this.items.shift());
        this.areArrowButtonsEnabled = true;
      }, 1000);
    },
    slideRight() {
      if (!this.areArrowButtonsEnabled) return;
      this.areArrowButtonsEnabled = false;

      this.items[0].className = "slide-right-exit";
      this.items[this.items.length - 1].className = "slide-right-enter";

      setTimeout(() => {
        this.items[0].className = "";
        this.items[this.items.length - 1].className = "";

        this.items.unshift(this.items.pop());
        this.areArrowButtonsEnabled = true;
      }, 1000);
    },
    goToSlide(index) {
      // normalize items first for easier index counting
      let normalizedItems = JSON.parse(JSON.stringify(this.items))
        .slice(this.items.length - this.activeIndex)
        .concat(this.items.slice(0, this.items.length - this.activeIndex));

      if (!this.areArrowButtonsEnabled) return;
      this.areArrowButtonsEnabled = false;

      const activeIndex = this.activeIndex;
      this.items = normalizedItems
        .slice(index)
        .concat(normalizedItems.slice(0, index));

      if (index > activeIndex) {
        normalizedItems[activeIndex].className = "slide-left-exit";
        normalizedItems[index].className = "slide-left-enter";
      } else {
        normalizedItems[activeIndex].className = "slide-right-exit";
        normalizedItems[index].className = "slide-right-enter";
      }

      setTimeout(() => {
        normalizedItems[activeIndex].className = "";
        normalizedItems[index].className = "";

        this.areArrowButtonsEnabled = true;
      }, 1000);
    },

    // use direct dom access because because using data for the classNames
    // make the changing slides not smooth
    showButtons() {
      document
        .querySelector(".slider__button.slider__button-left")
        .classList.add("fade-left-in");
      document
        .querySelector(".slider__button.slider__button-right")
        .classList.add("fade-right-in");
      document
        .querySelector(".slider__button.slider__button-left")
        .classList.remove("fade-left-out");
      document
        .querySelector(".slider__button.slider__button-right")
        .classList.remove("fade-right-out");
    },
    hideButtons() {
      document
        .querySelector(".slider__button.slider__button-left")
        .classList.remove("fade-left-in");
      document
        .querySelector(".slider__button.slider__button-right")
        .classList.remove("fade-right-in");
      document
        .querySelector(".slider__button.slider__button-left")
        .classList.add("fade-left-out");
      document
        .querySelector(".slider__button.slider__button-right")
        .classList.add("fade-right-out");
    },
  },
  mounted() {
    // biar auto slideshow
    // setInterval(this.slideLeft, 3000);
  },
  computed: {
    activeIndex() {
      return this.imageUrls.findIndex((image) => image === this.items[0].image);
    },
  },
};
</script>

<style scoped>
.slider__wrapper {
  max-width: 960px;
  height: 280px;
  margin: 0 auto;
  position: relative;

  --animation-duration-slide: 1s;
  --animation-duration-button: 0.5s;
}

.slider_image-container {
  overflow: hidden;
  position: relative;
  border-radius: 20px;

  width: 100%;
  height: 100%;
}

.slider_image-container .dot {
  width: 0.75rem;
  height: 0.75rem;
  position: absolute;
  background-color: white;
  z-index: 1;
  border-radius: 50%;
  bottom: 1rem;
  cursor: pointer;
}

.slider_image-container .dot.active {
  background-color: green;
}

.slider__wrapper img {
  width: 100%;
  height: 100%;
  position: absolute;
}

.slider__button {
  background-color: white;
  position: absolute;
  font-size: 1.75rem;
  padding: 1rem 1.75rem;
  border: none;
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  opacity: 0;
}
.slider__button-right {
  right: 2rem;
}

.slider__button-left {
  left: 2rem;
}

.slide-left-exit {
  animation: slideLeftExit var(--animation-duration-slide) both;
}

.slide-left-enter {
  animation: slideLeftEnter var(--animation-duration-slide) both;
}

.slide-right-exit {
  animation: slideRightExit var(--animation-duration-slide) both;
}

.slide-right-enter {
  animation: slideRightEnter var(--animation-duration-slide) both;
}

.fade-left-in {
  animation: fadeInLeft var(--animation-duration-button) both;
}

.fade-left-out {
  animation: fadeOutLeft var(--animation-duration-button) both;
}

.fade-right-in {
  animation: fadeInRight var(--animation-duration-button) both;
}

.fade-right-out {
  animation: fadeOutRight var(--animation-duration-button) both;
}
/* animations */

@keyframes slideLeftExit {
  from {
    left: 0;
  }
  to {
    left: -100%;
  }
}

@keyframes slideLeftEnter {
  from {
    left: 100%;
  }
  to {
    left: 0;
  }
}

@keyframes slideRightExit {
  from {
    left: 0;
  }
  to {
    left: 100%;
  }
}

@keyframes slideRightEnter {
  from {
    left: -100%;
  }
  to {
    left: 0;
  }
}

@keyframes fadeInLeft {
  from {
    left: 2rem;
    opacity: 0;
  }
  to {
    left: -2rem;
    opacity: 1;
  }
}

@keyframes fadeOutLeft {
  from {
    left: -2rem;
    opacity: 1;
  }
  to {
    left: 2rem;
    opacity: 0;
  }
}

@keyframes fadeInRight {
  from {
    right: 2rem;
    opacity: 0;
  }
  to {
    right: -2rem;
    opacity: 1;
  }
}

@keyframes fadeOutRight {
  from {
    right: -2rem;
    opacity: 1;
  }
  to {
    right: 2rem;
    opacity: 0;
  }
}
</style>
