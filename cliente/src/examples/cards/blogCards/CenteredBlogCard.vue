<script setup>
defineProps({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div class="card">
    <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
      <div class="d-block blur-shadow-image">
        <img :src="image" :alt="title" class="img-fluid border-radius-lg" />
      </div>
    </div>
    <div class="card-body text-center">
      <h5 class="font-weight-normal">
        {{ title }}
      </h5>
      <p class="mb-0">
        {{ description }}
      </p>
    </div>
  </div>
</template>
