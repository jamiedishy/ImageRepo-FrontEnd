<template>
  <div class="cms">
    <b-container class="mt-5">
      <b-row>
        <b-col cols="6" class="mt-5">
          <h1>Gallery</h1>
          <h2 class="mt-3">Browse and purchase Biscuit's portraits!</h2>
        </b-col>
        <b-col cols="4">
          <b-img class="image mr-5" alt="Home image" src="logo-medium.png" />
        </b-col>
      </b-row>
      <hr class="my-4" />
      <b-row cols="2" class="mt-2 align-self-md-stretch">
        <!-- <b-col lg="10" class="pb-2"> -->
        <div v-for="(image, index) in imageData" :key="index">
          <!-- <img :src="imageBlobs[index]" alt="portrait" /> -->
          <b-card
            :title="image.name"
            :img-src="imageBlobs[index]"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-5 h-100"
          >
            <b-card-text>
              <p>Price: {{ image.price }}</p>
              <p>Portrait number {{ index }}</p>
            </b-card-text>

            <b-button href="#" variant="primary">Purchase</b-button>
          </b-card>
        </div>
      </b-row>

      <b-modal hide-footer ref="my-modal" title="Image upload">
        <p class="my-4">Error</p>
      </b-modal>

      <!-- {{imageData}} -->
    </b-container>
  </div>
</template>

<script>
// import axios from "axios";
import { mapState, mapActions } from "vuex";

export default {
  name: "Cms",
  components: {},
  data() {
    return {};
  },
  async created() {
    await this.getImageData();
    await this.storeImageBlobs();
  },
  methods: {
    ...mapActions(["getImageData", "storeImageBlobs"])
  },
  computed: {
    ...mapState({
      imageData: state => state.imagerepo.imageData,
      imageBlobs: state => state.imagerepo.imageBlobs
    })
  }
};
</script>

<style scoped>
h1 {
  font-size: 3rem;
}
</style>
