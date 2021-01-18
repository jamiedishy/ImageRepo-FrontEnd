<template>
  <div class="home">
    <b-container class="mt-5">
      <b-row>
        <b-col>
          <b-img center fluid class="image" alt="Home image" src="home2.png" />
        </b-col>
      </b-row>
      <b-row class="mt-2" align-h="center">
        <b-col lg="4" class="pb-2">
          <b-button
            to="cms"
            class="ml-5 mr-5 mb-3"
            pill
            variant="primary"
            size="lg"
            >CMS</b-button
          >
          <b-button to="store" class="mb-3" pill variant="primary" size="lg"
            >Store</b-button
          >
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {}
};
</script>

<style scoped>
/* .image {
  width: 70%;
  height: auto;
} */
</style>
