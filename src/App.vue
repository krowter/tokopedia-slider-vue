<template>
  <div id="app">
    <Slider :imageUrls="imageUrls" />
  </div>
</template>

<script>
import Slider from "./components/Slider.vue";
export default {
  components: {
    Slider,
  },
  data() {
    return {
      imageUrls: [
        "https://i.picsum.photos/id/294/300/100.jpg?hmac=JO9Xpfj2-hqGVBydAUfXd5zChdwTbQFSDJKpoKXYCgY",
        "https://i.picsum.photos/id/916/300/100.jpg?hmac=GCKvpeJLllKC442lRm2rRAErvNR-rUrUVHrQHddChoM",
        "https://i.picsum.photos/id/611/300/100.jpg?hmac=auzsLwEeuXBt9irLBqM0iSL-e8TSUANnFrOhCn69oag",
        "https://i.picsum.photos/id/301/300/100.jpg?hmac=l9bI4lQveoGErJ5Y1MMvkf74jGExxo0FM8CCv58hZSQ",
        "https://i.picsum.photos/id/1069/300/100.jpg?hmac=ybvA24Xy_qpXRthMiY1G1REDBwKhqA_d2RNV7lCXBP8"
      ],
    };
  },
};
</script>
