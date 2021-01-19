<template>
  <div class="cms">
    <b-container class="mt-5">
      <b-row>
        <b-col cols="6" class="mt-5">
          <h1>CMS Tool</h1>
          <h2 class="my-3">View your uploads</h2>
          <b-button
            to="cms"
            class="mb-3"
            pill
            variant="outline-primary"
            size="md"
            >Back to CMS</b-button
          >
        </b-col>
        <b-col cols="4">
          <b-img class="image mr-5" alt="Home image" src="cms2.png" />
        </b-col>
      </b-row>
      <hr class="my-4" />
      <!-- <b-row class="mt-2"> -->
      <b-col>
        <b-row cols="3" class="align-self-md-stretch">
          <div v-for="image in imageData" :key="image.index">
            <!-- <img :src="imageBlobs[index]" alt="portrait" /> -->
            <b-card :title="image.name" tag="article" class="h-100">
              <b-card-img-lazy
                style="max-height: 60%; min-height: 60%"
                :src="imageBlobs[image.index]"
                alt="image"
                top
              ></b-card-img-lazy>
              <b-card-text class="mt-3">
                <p>Price: {{ image.price }}</p>
              </b-card-text>

              <b-button pill variant="primary" v-b-modal="image._id"
                >Edit</b-button
              >

              <b-modal :id="image._id" :title="'Edit ' + image.name">
                <!-- <p class="my-4">Hello from modal!</p> -->
                <b-card-text>
                  <b-form-input
                    class="mb-3"
                    v-model="newName"
                    placeholder="Enter new name"
                  ></b-form-input>
                  <b-form-input
                    class="mb-3"
                    v-model="newPrice"
                    placeholder="Enter new price"
                  ></b-form-input>
                  <!-- <b-button pill variant="danger">Delete</b-button> -->
                  <!-- <p>Portrait number {{ image.index }}</p> -->
                </b-card-text>
                <div slot="modal-footer">
                  <b-button
                    @click="editImage(image)"
                    pill
                    class="mr-3"
                    variant="success"
                    >Update</b-button
                  >
                  <b-button @click="deleteImage(image)" pill variant="danger"
                    >Delete</b-button
                  >
                </div>
              </b-modal>
            </b-card>
          </div>
        </b-row>
      </b-col>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "Uploads",
  components: {},
  data() {
    return {
      tagValue: [],
      newPrice: null,
      newName: null,
      error: false
    };
  },
  async created() {
    await this.getImageData();
    await this.storeImageBlobs();
  },
  computed: {
    ...mapState({
      imageData: state => state.imagerepo.imageData,
      imageBlobs: state => state.imagerepo.imageBlobs
    })
  },
  methods: {
    ...mapActions([
      "getImageData",
      "storeImageBlobs",
      "deleteImageData",
      "editImageData"
    ]),
    async deleteImage(image) {
      await this.deleteImageData(image);
    },
    async editImage(image) {
      this.error = false;
      let updateValues = [];
      if (this.newPrice !== null && this.newName !== null) {
        // JSON.stringify([{"propName":"price","value":"400"},{"propName":"name","value":"Biscuit Dishy 1"}]);
        updateValues[0] = {
          propName: "price",
          value: this.newPrice
        };
        updateValues[1] = {
          propName: "name",
          value: this.newName
        };
      } else if (this.newPrice !== null) {
        updateValues[0] = {
          propName: "price",
          value: this.newPrice
        };
      } else {
        updateValues[0] = {
          propName: "name",
          value: this.newName
        };
      }
      image["updateValues"] = updateValues;
      try {
        await this.editImageData(image);
        this.$bvModal.hide(image._id);
        this.initializeVariables();
      } catch (e) {
        console.log(e);
        this.error = true;
      }
    }
    // activated() {
    //     this.$forceUpdate();
    // }
  }
};
</script>

<style scoped>
h1 {
  font-size: 3rem;
}
</style>
