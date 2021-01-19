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
      <b-col class="mt-5">
        <b-row class="mb-5">
          <b-form-input
            v-model="searchQuery"
            placeholder="Search for a portrait"
          ></b-form-input>
        </b-row>
        <b-row cols="3" class="align-self-md-stretch">
          <div v-for="image in resultQuery" :key="image.index">
            <!-- <img :src="imageBlobs[index]" alt="portrait" /> -->
            <b-card :title="image.name" tag="article" class="h-100">
              <b-card-img-lazy
                style="max-height: 60%;"
                :src="imageBlobs[image.index]"
                alt="image"
                top
              ></b-card-img-lazy>
              <b-card-text class="mt-3">
                <p>Price: {{ image.price }}</p>
                <!-- <p>Portrait number {{ image.index }}</p> -->
              </b-card-text>

              <b-button href="#" variant="primary">Purchase</b-button>
            </b-card>
          </div>
        </b-row>
      </b-col>
      <b-modal hide-footer ref="my-modal" title="Image upload">
        <p class="my-4">Error</p>
      </b-modal>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Cms",
  components: {},
  data() {
    return {
      searchQuery: ""
    };
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
      imageBlobs: state => state.imagerepo.imageBlobs,
      resultQuery() {
        if (this.searchQuery !== "") {
          return this.imageData.filter(item => {
            return this.searchQuery
              .toLowerCase()
              .split(" ")
              .every(v => item.name.toLowerCase().includes(v));
          });
        } else {
          return this.imageData;
        }
      }
    })
  }
};
</script>

<style scoped>
h1 {
  font-size: 3rem;
}
</style>
