import _Slider from "./components/Slider.vue";

const Slider = {
  install(Vue, options) {
    Vue.component("slider", Slider);
  },
};

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(Slider);
}

export default Slider;
